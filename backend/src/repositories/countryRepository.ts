import { PrismaClient, Country } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class CountryRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: any): Promise<Country> {
    return this.db.country.create({
      data,
      include: {
        zone: true,
        // category: true,
      },
    });
  }

  async findById(countryId: string): Promise<Country | null> {
    return this.db.country.findUnique({
      where: { country_id: countryId },
      include: {
        zone: false,
        // category: true,
      },
    });
  }

  async findByIsoCode(isoCode: string): Promise<Country | null> {
    return this.db.country.findUnique({
      where: { iso_code: isoCode },
      include: {
        zone: true,
      },
    });
  }

  async findByCountryCode(countryCode: string): Promise<Country | null> {
    return this.db.country.findUnique({
      where: { country_code: countryCode },
      include: { zone: true },
    });
  }

  async findByCountryName(countryName: string): Promise<Country | null> {
    return this.db.country.findFirst({
      where: { country_name: countryName },
      include: {
        zone: true,
      },
    });
  }

  async findZoneById(zoneId: string) {
    return this.db.zone.findUnique({ where: { zone_id: zoneId } });
  }

 async findAll(page: number = 1, limit: number = 10) {
  // Ensure page and limit are positive
  const safePage = page > 0 ? page : 1;
  const safeLimit = limit > 0 ? limit : 10;

  const skip = (safePage - 1) * safeLimit;

  const [countries, total] = await Promise.all([
    this.db.country.findMany({
      include: {
        zone: true,
        regional_config: true,
      },
      orderBy: { country_name: 'asc' },
      skip,
      take: safeLimit,
    }),
    this.db.country.count(),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const pagesLeft = totalPages - safePage > 0 ? totalPages - safePage : 0;
  const totalItemsLeft = total - safePage * safeLimit > 0 ? total - safePage * safeLimit : 0;

  return {
    countries,
    total,
    totalPages,
    currentPage: safePage,
    pagesLeft,
    totalItemsLeft,
  };
}



  async update(countryId: string, data: any): Promise<Country> {
    return this.db.country.update({
      where: { country_id: countryId },
      data,
      include: {
        zone: true,
        regional_config: true,
      },
    });
  }

  async delete(countryId: string): Promise<void> {
    await this.db.country.delete({
      where: { country_id: countryId },
    });
  }

  async count(): Promise<number> {
    return this.db.country.count();
  }

  async findByCategory(categoryId: string, skip: number = 0, take: number = 10): Promise<Country[]> {
    // Country is no longer directly linked to Category in schema; use CoursePricing for pricing by category
    const countries = await this.db.country.findMany({
      include: { zone: true, regional_config: true },
      orderBy: { country_name: 'asc' },
      skip,
      take,
    });
    return countries;
  }

  async countByCategory(categoryId: string): Promise<number> {
    // Not applicable with new schema; counting all as fallback
    return this.db.country.count();
  }

  async findByZone(zoneId: string, skip: number = 0, take: number = 10): Promise<Country[]> {
    return this.db.country.findMany({
      where: { zone_id: zoneId },
      include: {
        zone: true,
        regional_config: true,
      },
      orderBy: { country_name: 'asc' },
      skip,
      take,
    });
  }

  async countByZone(zoneId: string): Promise<number> {
    return this.db.country.count({
      where: { zone_id: zoneId },
    });
  }

  async searchCountries(searchTerm: string, skip: number = 0, take: number = 10): Promise<Country[]> {
    return this.db.country.findMany({
      where: {
        OR: [
          { country_name: { contains: searchTerm, mode: 'insensitive' } },
          { iso_code: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      include: {
        zone: true,
        regional_config: true,
      },
      orderBy: { country_name: 'asc' },
      skip,
      take,
    });
  }

  async getCoursePricingByCountry(countryId: string, courseId: string) {
    return this.db.coursePricing.findFirst({
      where: { country_id: countryId, course_id: courseId, is_active: true },
      orderBy: { effective_from: 'desc' },
    });
  }

  async getActivePricingForCourseInAllCountries(courseId: string) {
    return this.db.coursePricing.findMany({
      where: { course_id: courseId, is_active: true },
      include: { country: true },
      orderBy: { effective_from: 'desc' },
    });
  }

  async getCategoriesCoursesPricingByCountryName(countryName: string) {
    return this.getCategoriesCoursesPricingByCountryNamePaginated(countryName, 0, 10);
  }

  async getCategoriesCoursesPricingByCountryNamePaginated(countryName: string, skip: number = 0, take: number = 10) {
    const where = {
      is_active: true,
      country: {
        country_name: { equals: countryName, mode: 'insensitive' },
      },
    } as const;

    const groups = await this.db.coursePricing.groupBy({
      by: ['course_id'],
      where,
      orderBy: { course_id: 'asc' },
      skip,
      take,
    });

    const courseIds = groups.map((g: any) => g.course_id);

    if (courseIds.length === 0) return [];

    const courses = await this.db.course.findMany({
      where: { course_id: { in: courseIds } },
    });

    const orderMap = new Map(courseIds.map((id, idx) => [id, idx] as const));
    return courses.sort((a: any, b: any) => (orderMap.get(a.course_id)! - orderMap.get(b.course_id)!));
  }

  async countDistinctCoursesByCountryName(countryName: string): Promise<number> {
    const where = {
      is_active: true,
      country: {
        country_name: { equals: countryName, mode: 'insensitive' },
      },
    } as const;

    const allGroups = await this.db.coursePricing.groupBy({
      by: ['course_id'],
      where,
    });
    return allGroups.length;
  }
}
