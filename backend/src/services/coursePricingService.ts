import { CoursePricingRepository } from '../repositories/coursePricingRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { redisClient } from '../lib/redis';
import { CreateCoursePricingRequest, UpdateCoursePricingRequest } from '../dto/request/coursePricingRequest';

export class CoursePricingService {
  private repo: CoursePricingRepository;
  private readonly CACHE_KEYS = {
    PRICING_ALL: 'course_pricing_all',
    PRICING_BY_ID_PREFIX: 'course_pricing:',
  };
  private readonly CACHE_EXPIRATION = 3600; // 1 hour

  constructor() {
    this.repo = new CoursePricingRepository();
  }

  async createPricing(data: CreateCoursePricingRequest) {
    const exists = await this.repo.existsCombination(data.country_id, data.course_id, new Date(data.effective_from || Date.now()));
    if (exists) throw new CustomError('Pricing already exists for this country/course/effective_from', HTTP_STATUS.CONFLICT);

    const pricing = await this.repo.create(data);
    await this.invalidateCaches(pricing.pricing_id);
    return pricing;
  }

  async getPricingById(id: string) {
    const cacheKey = `${this.CACHE_KEYS.PRICING_BY_ID_PREFIX}${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const pricing = await this.repo.findById(id);
    if (!pricing) throw new CustomError('Course pricing not found', HTTP_STATUS.NOT_FOUND);

    await redisClient.setEx(cacheKey, this.CACHE_EXPIRATION, JSON.stringify(pricing));
    return pricing;
  }

  async getAllPricing(page: number = 1, limit: number = 10) {
  return this.repo.findAll(page, limit);
}


  async updatePricing(id: string, data: UpdateCoursePricingRequest) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new CustomError('Course pricing not found', HTTP_STATUS.NOT_FOUND);

    const updated = await this.repo.update(id, data);
    await this.invalidateCaches(id);
    return updated;
  }

  async deactivatePricing(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new CustomError('Course pricing not found', HTTP_STATUS.NOT_FOUND);

    const result = await this.repo.deactivate(id);
    await this.invalidateCaches(id);
    return result;
  }

  private async invalidateCaches(id: string) {
    await Promise.all([
      redisClient.del(this.CACHE_KEYS.PRICING_ALL),
      redisClient.del(`${this.CACHE_KEYS.PRICING_BY_ID_PREFIX}${id}`),
    ]);
  }
}
