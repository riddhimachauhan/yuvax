import { CourseRepository } from '../repositories/courseRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { redisClient } from '../lib/redis';
import { Difficulty } from '@prisma/client';

export interface CreateCourseData {
  course_name: string;
  category_id: string;
  course_description?: string;
  course_content?: string;
  difficulty: Difficulty;
  course_duration: string;
  course_image: string;
  language: string;
  min_age?: string;
  max_age?: string;
}

export interface UpdateCourseData {
  course_name?: string;
  category_id?: string;
  course_description?: string;
  course_content?: string;
  difficulty?: Difficulty;
  course_duration?: string;
  course_image?: string;
  language?: string;
  min_age?: string;
  max_age?: string;
}

export class CourseService {
  private courseRepository: CourseRepository;
  private readonly CACHE_KEYS = {
    COURSES: 'courses:all',
    COURSE_BY_ID_PREFIX: 'course:',
    CATEGORIES: 'categories',
    COUNTRIES: 'countries:all',
  };
  private readonly CACHE_EXPIRATION = 3600; // 1 hour

  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async createCourse(courseData: CreateCourseData) {
    if (
      !courseData.course_name ||
      !courseData.category_id ||
      !courseData.difficulty ||
      !courseData.course_duration ||
      !courseData.course_image ||
      !courseData.language
    ) {
      throw new CustomError('Missing required fields', HTTP_STATUS.BAD_REQUEST);
    }

    const categoryExists = await this.courseRepository.categoryExists(courseData.category_id);
    if (!categoryExists) {
      throw new CustomError('Category not found', HTTP_STATUS.BAD_REQUEST);
    }

    const course = await this.courseRepository.create(courseData as any);
    await this.invalidateCourseCaches();

    return course;
  }

  // ✅ Clean response — no modules, slots, or enrollments
  // async getAllCourses() {
  //   const cachedCourses = await redisClient.get(this.CACHE_KEYS.COURSES);
  //   if (cachedCourses) {
  //     return JSON.parse(cachedCourses);
  //   }

  //   const { courses } = await this.courseRepository.findAll();
  //   const countries = await this.getCountries();

  //   const enrichedCourses = await Promise.all(
  //     courses.map(async (course) => {
  //       const pricingByCountry = await this.courseRepository.getPricingForCourseAcrossCountries(course.course_id);
  //       const pricingMap = new Map(pricingByCountry.map((p: any) => [p.country_id, p]));

  //       return {
  //         ...course,
  //         countryPrices: countries.map((country: any) => {
  //           const pricing = pricingMap.get(country.country_id);
  //           return {
  //             country_id: country.country_id,
  //             country_name: country.country_name,
  //             isoCode: country.iso_code,
  //             currency: country.currency,
  //             price: pricing
  //               ? {
  //                   base: pricing.base_price,
  //                   discounted: pricing.discounted_price,
  //                   real: pricing.current_price,
  //                 }
  //               : null,
  //           };
  //         }),
  //       };
  //     })
  //   );

  //   await redisClient.setEx(
  //     this.CACHE_KEYS.COURSES,
  //     this.CACHE_EXPIRATION,
  //     JSON.stringify(enrichedCourses)
  //   );

  //   return enrichedCourses;
  // }
// Correct in service
async getAllCourses(page: number, limit: number) {
  return await this.courseRepository.findAll(page, limit); // ✅ full object
}


  async getCourseById(courseId: string) {
    const cacheKey = `${this.CACHE_KEYS.COURSE_BY_ID_PREFIX}${courseId}`;
    const cachedCourse = await redisClient.get(cacheKey);
    if (cachedCourse) {
      return JSON.parse(cachedCourse);
    }

    const course = await this.courseRepository.findByIdWithRelations(courseId);
    if (!course) {
      throw new CustomError('Course not found', HTTP_STATUS.NOT_FOUND);
    }

    const countries = await this.getCountries();
    const pricingByCountry = await this.courseRepository.getPricingForCourseAcrossCountries(course.course_id);
    const pricingMap = new Map(pricingByCountry.map((p: any) => [p.country_id, p]));

    const courseWithPrices = {
      ...course,
      countryPrices: countries.map((country: any) => {
        const pricing = pricingMap.get(country.country_id);
        return {
          country_id: country.country_id,
          country_name: country.country_name,
          isoCode: country.iso_code,
          currency: country.currency,
          price: pricing
            ? {
                base: pricing.base_price,
                discounted: pricing.discounted_price,
                real: pricing.current_price,
              }
            : null,
        };
      }),
    };

    await redisClient.setEx(cacheKey, this.CACHE_EXPIRATION, JSON.stringify(courseWithPrices));
    return courseWithPrices;
  }

  async updateCourse(courseId: string, courseData: UpdateCourseData) {
    const existingCourse = await this.courseRepository.findById(courseId);
    if (!existingCourse) {
      throw new CustomError('Course not found', HTTP_STATUS.NOT_FOUND);
    }

    if (courseData.category_id && courseData.category_id !== existingCourse.category_id) {
      const categoryExists = await this.courseRepository.categoryExists(courseData.category_id);
      if (!categoryExists) {
        throw new CustomError('Category not found', HTTP_STATUS.BAD_REQUEST);
      }
    }

    const updatedCourse = await this.courseRepository.update(courseId, courseData);
    await this.invalidateCourseCaches(courseId);
    return updatedCourse;
  }

  async deleteCourse(courseId: string) {
    const existingCourse = await this.courseRepository.findById(courseId);
    if (!existingCourse) {
      throw new CustomError('Course not found', HTTP_STATUS.NOT_FOUND);
    }

    const hasModules = await this.courseRepository.hasModules(courseId);
    if (hasModules) {
      throw new CustomError('Cannot delete course with existing modules', HTTP_STATUS.BAD_REQUEST);
    }

    await this.courseRepository.delete(courseId);
    await this.invalidateCourseCaches(courseId);

    return { message: 'Course deleted successfully' };
  }

  async getCoursesByCategory(categoryId: string) {
    return this.courseRepository.findByCategory(categoryId);
  }

  async getCourseStats(courseId: string) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new CustomError('Course not found', HTTP_STATUS.NOT_FOUND);
    }

    return await this.courseRepository.getCourseStats(courseId);
  }

  private async getCountries() {
    const cachedCountries = await redisClient.get(this.CACHE_KEYS.COUNTRIES);
    if (cachedCountries) {
      return JSON.parse(cachedCountries);
    }

    const countries = await this.courseRepository.getAllCountries();
    await redisClient.setEx(this.CACHE_KEYS.COUNTRIES, this.CACHE_EXPIRATION, JSON.stringify(countries));

    return countries;
  }

  private async invalidateCourseCaches(courseId?: string) {
    const promises = [
      redisClient.del(this.CACHE_KEYS.COURSES),
      redisClient.del(this.CACHE_KEYS.CATEGORIES),
    ];
    if (courseId) {
      promises.push(redisClient.del(`${this.CACHE_KEYS.COURSE_BY_ID_PREFIX}${courseId}`));
    }
    await Promise.all(promises);
  }

  async getPurchasedCourses(userId: string) {
    return this.courseRepository.getPurchasedCourses(userId);
  }
}
