// import { CategoryRepository } from '../repositories/categoryRepository';
// import { CustomError } from '../middlewares/errorHandler';
// import { HTTP_STATUS } from '../utils/constants';
// import { redisClient } from '../lib/redis';

// export interface CreateCategoryData {
//   category_name: string;
//   category_description: string;
//   category_image: string;
// }

// export interface UpdateCategoryData {
//   category_name?: string;
//   category_description?: string;
//   category_image?: string;
// }

// export class CategoryService {
//   private categoryRepository: CategoryRepository;
//   private readonly CACHE_KEYS = {
//     CATEGORIES: 'categories',
//     CATEGORY_BY_ID_PREFIX: 'category:',
//   };
//   private readonly CACHE_EXPIRATION = 3600; // 1 hour

//   constructor() {
//     this.categoryRepository = new CategoryRepository();
//   }

//   async createCategory(categoryData: CreateCategoryData) {
//     const exists = await this.categoryRepository.nameExists(categoryData.category_name);
//     if (exists) throw new CustomError('Category name already exists', HTTP_STATUS.CONFLICT);

//     const category = await this.categoryRepository.create(categoryData);

//     // Clear categories cache
//     await this.invalidateCategoriesCache();

//     return category;
//   }

//   async getCategoryById(id: string) {
//     const cacheKey = `${this.CACHE_KEYS.CATEGORY_BY_ID_PREFIX}${id}`;
//     const cached = await redisClient.get(cacheKey);
//     if (cached) return JSON.parse(cached);

//     const category = await this.categoryRepository.findById(id);
//     if (!category) throw new CustomError('Category not found', HTTP_STATUS.NOT_FOUND);

//     await redisClient.setEx(cacheKey, this.CACHE_EXPIRATION, JSON.stringify(category));
//     return category;
//   }

//   async getAllCategories(page?: number, limit?: number) {
//     // await redisClient.del('categories');

//     if (page && limit) return await this.categoryRepository.findAll(page, limit);

//     const cached = await redisClient.get(this.CACHE_KEYS.CATEGORIES);
//     if (cached) return JSON.parse(cached);

//     const categories = await this.categoryRepository.findAllWithoutCourses(); // no courses

//     await redisClient.setEx(
//       this.CACHE_KEYS.CATEGORIES,
//       this.CACHE_EXPIRATION,
//       JSON.stringify(categories)
//     );

//     return categories;
//   }

//   async updateCategory(id: string, data: UpdateCategoryData) {
//     const existing = await this.categoryRepository.findById(id);
//     if (!existing) throw new CustomError('Category not found', HTTP_STATUS.NOT_FOUND);

//     if (data.category_name && data.category_name !== existing.category_name) {
//       const nameExists = await this.categoryRepository.nameExists(data.category_name, id);
//       if (nameExists) throw new CustomError('Category name already exists', HTTP_STATUS.CONFLICT);
//     }

//     const updated = await this.categoryRepository.update(id, data);

//     await this.invalidateCategoryCaches(id);

//     return updated;
//   }

//   async deleteCategory(id: string) {
//     const existing = await this.categoryRepository.findById(id);
//     if (!existing) throw new CustomError('Category not found', HTTP_STATUS.NOT_FOUND);

//     if (existing.courses && existing.courses.length > 0)
//       throw new CustomError('Cannot delete category with existing courses', HTTP_STATUS.BAD_REQUEST);

//     await this.categoryRepository.delete(id);

//     await this.invalidateCategoryCaches(id);

//     return { message: 'Category deleted successfully' };
//   }

//   async getCategoryStats(id: string) {
//     const existing = await this.categoryRepository.findById(id);
//     if (!existing) throw new CustomError('Category not found', HTTP_STATUS.NOT_FOUND);

//     return await this.categoryRepository.getCategoryStats(id);
//   }

//   private async invalidateCategoriesCache() {
//     await redisClient.del(this.CACHE_KEYS.CATEGORIES);
//   }

//   private async invalidateCategoryCaches(categoryId: string) {
//     const key = `${this.CACHE_KEYS.CATEGORY_BY_ID_PREFIX}${categoryId}`;
//     await Promise.all([
//       redisClient.del(this.CACHE_KEYS.CATEGORIES),
//       redisClient.del(key),
//     ]);
//   }
// }
import { CategoryRepository } from '../repositories/categoryRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { redisClient } from '../lib/redis';

export interface CreateCategoryData {
  category_name: string;
  category_description: string;
  category_image: string;
}

export interface UpdateCategoryData {
  category_name?: string;
  category_description?: string;
  category_image?: string;
}

export class CategoryService {
  private categoryRepository: CategoryRepository;
  private readonly CACHE_KEYS = {
    CATEGORIES: 'categories',
    CATEGORY_BY_ID_PREFIX: 'category:',
  };
  private readonly CACHE_EXPIRATION = 3600; // 1 hour

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(categoryData: CreateCategoryData) {
    const exists = await this.categoryRepository.nameExists(categoryData.category_name);
    if (exists)
      throw new CustomError('Category name already exists', HTTP_STATUS.CONFLICT);

    const category = await this.categoryRepository.create(categoryData);

    // Clear categories cache
    await this.invalidateCategoriesCache();

    return category;
  }

  async getCategoryById(id: string) {
    const cacheKey = `${this.CACHE_KEYS.CATEGORY_BY_ID_PREFIX}${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const category = await this.categoryRepository.findById(id);
    if (!category)
      throw new CustomError('Category not found', HTTP_STATUS.NOT_FOUND);

    await redisClient.setEx(cacheKey, this.CACHE_EXPIRATION, JSON.stringify(category));
    return category;
  }

  // ✅ Fetch categories (supports pagination, returns only category data)
  // async getAllCategories(page?: number, limit?: number) {
  //   if (page && limit) {
  //     const categories = await this.categoryRepository.findAll(page, limit);
  //     return categories; // only category data
  //   }

  //   // Cached all categories (no pagination)
  //   const cached = await redisClient.get(this.CACHE_KEYS.CATEGORIES);
  //   if (cached) return JSON.parse(cached);

  //   const categories = await this.categoryRepository.findAllWithoutCourses();

  //   await redisClient.setEx(
  //     this.CACHE_KEYS.CATEGORIES,
  //     this.CACHE_EXPIRATION,
  //     JSON.stringify(categories)
  //   );

  //   return categories;
  // }


async getAllCategories(page?: number, limit?: number) {
  if (page && limit) {
    return this.categoryRepository.findAll(page, limit);
  }

  // If no pagination, return cached or all categories
  const cached = await redisClient.get(this.CACHE_KEYS.CATEGORIES);
  if (cached) return JSON.parse(cached);

  const categories = await this.categoryRepository.findAll();

  await redisClient.setEx(
    this.CACHE_KEYS.CATEGORIES,
    this.CACHE_EXPIRATION,
    JSON.stringify(categories)
  );

  return categories;
}














  async updateCategory(id: string, data: UpdateCategoryData) {
    const existing = await this.categoryRepository.findById(id);
    if (!existing)
      throw new CustomError('Category not found', HTTP_STATUS.NOT_FOUND);

    if (data.category_name && data.category_name !== existing.category_name) {
      const nameExists = await this.categoryRepository.nameExists(
        data.category_name,
        id
      );
      if (nameExists)
        throw new CustomError('Category name already exists', HTTP_STATUS.CONFLICT);
    }

    const updated = await this.categoryRepository.update(id, data);

    await this.invalidateCategoryCaches(id);

    return updated;
  }

  async deleteCategory(id: string) {
    const existing = await this.categoryRepository.findById(id);
    if (!existing)
      throw new CustomError('Category not found', HTTP_STATUS.NOT_FOUND);

    if (existing.courses && existing.courses.length > 0)
      throw new CustomError(
        'Cannot delete category with existing courses',
        HTTP_STATUS.BAD_REQUEST
      );

    await this.categoryRepository.delete(id);
    await this.invalidateCategoryCaches(id);

    return { message: 'Category deleted successfully' };
  }

  async getCategoryStats(id: string) {
    const existing = await this.categoryRepository.findById(id);
    if (!existing)
      throw new CustomError('Category not found', HTTP_STATUS.NOT_FOUND);

    return await this.categoryRepository.getCategoryStats(id);
  }

  // 🔹 Helper methods for cache invalidation
  private async invalidateCategoriesCache() {
    await redisClient.del(this.CACHE_KEYS.CATEGORIES);
  }

  private async invalidateCategoryCaches(categoryId: string) {
    const key = `${this.CACHE_KEYS.CATEGORY_BY_ID_PREFIX}${categoryId}`;
    await Promise.all([
      redisClient.del(this.CACHE_KEYS.CATEGORIES),
      redisClient.del(key),
    ]);
  }
}
