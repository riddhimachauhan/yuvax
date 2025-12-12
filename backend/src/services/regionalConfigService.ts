import { RegionalConfigRepository } from '../repositories/regionalConfigRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { redisClient } from '../lib/redis';
import { CreateRegionalConfigRequest, UpdateRegionalConfigRequest } from '../dto/request/regionalConfigRequest';

export class RegionalConfigService {
  private repo: RegionalConfigRepository;
  private readonly CACHE_KEYS = {
    ALL: 'regional_config_all',
    BY_ID_PREFIX: 'regional_config:',
    BY_COUNTRY_PREFIX: 'regional_config_country:',
  };
  private readonly CACHE_EXPIRATION = 3600; // seconds

  constructor() {
    this.repo = new RegionalConfigRepository();
  }

  async createConfig(data: CreateRegionalConfigRequest) {
    // Ensure country doesn't already have a config (unique constraint)
    const exists = await this.repo.existsByCountryId(data.country_id);
    if (exists) {
      throw new CustomError('Regional config already exists for this country', HTTP_STATUS.CONFLICT);
    }

    // Create
    const created = await this.repo.create({
      ...data,
      tax_inclusive: data.tax_inclusive ?? false,
      payment_methods: data.payment_methods ?? [],
    } as any);

    await this.invalidateCaches(created.config_id, created.country_id);
    return created;
  }

  async getConfigById(id: string) {
    const cacheKey = `${this.CACHE_KEYS.BY_ID_PREFIX}${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const config = await this.repo.findById(id);
    if (!config) throw new CustomError('Regional config not found', HTTP_STATUS.NOT_FOUND);

    await redisClient.setEx(cacheKey, this.CACHE_EXPIRATION, JSON.stringify(config));
    return config;
  }

  async getConfigByCountry(countryId: string) {
    const cacheKey = `${this.CACHE_KEYS.BY_COUNTRY_PREFIX}${countryId}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const config = await this.repo.findByCountryId(countryId);
    if (!config) throw new CustomError('Regional config not found for country', HTTP_STATUS.NOT_FOUND);

    await redisClient.setEx(cacheKey, this.CACHE_EXPIRATION, JSON.stringify(config));
    return config;
  }

 async getAllConfigs(page: number = 1, limit: number = 10) {
  const cachedKey = `${this.CACHE_KEYS.ALL}_${page}_${limit}`;
  const cached = await redisClient.get(cachedKey);

  if (cached) return JSON.parse(cached);

  const result = await this.repo.findAll(page, limit);

  await redisClient.setEx(cachedKey, this.CACHE_EXPIRATION, JSON.stringify(result));

  return result;
}


  async updateConfig(id: string, data: UpdateRegionalConfigRequest) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new CustomError('Regional config not found', HTTP_STATUS.NOT_FOUND);

    // If country_id changing ensure uniqueness
    if (data.country_id && data.country_id !== existing.country_id) {
      const exists = await this.repo.existsByCountryId(data.country_id, id);
      if (exists) throw new CustomError('Another regional config exists for the provided country', HTTP_STATUS.CONFLICT);
    }

    const updated = await this.repo.update(id, data as any);
    await this.invalidateCaches(updated.config_id, updated.country_id);
    return updated;
  }

  async deleteConfig(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new CustomError('Regional config not found', HTTP_STATUS.NOT_FOUND);

    await this.repo.delete(id);
    await this.invalidateCaches(id, existing.country_id);
    return { message: 'Regional config deleted successfully' };
  }

  private async invalidateCaches(configId?: string, countryId?: string) {
    const keys = [
      this.CACHE_KEYS.ALL,
      configId ? `${this.CACHE_KEYS.BY_ID_PREFIX}${configId}` : null,
      countryId ? `${this.CACHE_KEYS.BY_COUNTRY_PREFIX}${countryId}` : null,
    ].filter(Boolean) as string[];

    if (keys.length) {
      await Promise.all(keys.map(k => redisClient.del(k)));
    }
  }
}
