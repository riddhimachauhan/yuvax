import { CountryRepository } from '../repositories/countryRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export interface CreateCountryRequest {
  country_name: string;
  country_code: string;
  isoCode: string;
  currency: string;
  zoneId?: string;
}

export interface UpdateCountryRequest {
  country_name?: string;
  isoCode?: string;
  zoneId?: string;
  currency?: string;
  coursePriceFactor?: number;
  price_per_session?: number;
  [key: string]: any; // For dynamic pricing fields
}

export class CountryService {
  private countryRepository: CountryRepository;

  constructor() {
    this.countryRepository = new CountryRepository();
  }

  async createCountry(data: CreateCountryRequest) {
    // Validate required fields according to schema
    if (!data.country_name || !data.country_code || !data.isoCode || !data.currency) {
      throw new CustomError('country_name, country_code, isoCode, and currency are required', HTTP_STATUS.BAD_REQUEST);
    }

    // Uniqueness checks
    const [isoConflict, codeConflict] = await Promise.all([
      this.countryRepository.findByIsoCode(data.isoCode),
      this.countryRepository.findByCountryCode(data.country_code),
    ]);

    if (isoConflict) {
      throw new CustomError('Country with this ISO code already exists', HTTP_STATUS.CONFLICT);
    }
    if (codeConflict) {
      throw new CustomError('Country with this country code already exists', HTTP_STATUS.CONFLICT);
    }

    // Validate optional zone
    if (data.zoneId) {
      const zone = await this.countryRepository.findZoneById(data.zoneId);
      if (!zone) {
        throw new CustomError('Invalid zoneId: zone does not exist', HTTP_STATUS.BAD_REQUEST);
      }
    }

    // Map camelCase to snake_case for Prisma model fields
    const createData: any = {
      country_name: data.country_name,
      country_code: data.country_code,
      iso_code: data.isoCode,
      currency: data.currency,
    };
    if (data.zoneId !== undefined) {
      createData.zone_id = data.zoneId;
    }

    return await this.countryRepository.create(createData);
  }

async getAllCountries(page: number = 1, limit: number = 10) {
  // Just call the repository; repo handles pagination calculations
  return await this.countryRepository.findAll(page, limit);
}



  async getCountryById(countryId: string) {
    const country = await this.countryRepository.findById(countryId);
    if (!country) {
      throw new CustomError('Country not found', HTTP_STATUS.NOT_FOUND);
    }
    return country;
  }

  async getCountryByIsoCode(isoCode: string) {
    const country = await this.countryRepository.findByIsoCode(isoCode);
    if (!country) {
      throw new CustomError('Country not found', HTTP_STATUS.NOT_FOUND);
    }
    return country;
  }

  async updateCountry(countryId: string, data: UpdateCountryRequest) {
    const existingCountry = await this.countryRepository.findById(countryId);
    if (!existingCountry) {
      throw new CustomError('Country not found', HTTP_STATUS.NOT_FOUND);
    }

    // If updating ISO code, check for conflicts
    if (data.isoCode && data.isoCode !== existingCountry.iso_code) {
      const conflictCountry = await this.countryRepository.findByIsoCode(data.isoCode);
      if (conflictCountry) {
        throw new CustomError('Country with this ISO code already exists', HTTP_STATUS.CONFLICT);
      }
    }

    // Map camelCase to snake_case for Prisma model fields
    const updateData: any = { ...data };
    if (data.isoCode !== undefined) {
      updateData.iso_code = data.isoCode;
      delete updateData.isoCode;
    }
    if (data.zoneId !== undefined) {
      updateData.zone_id = data.zoneId;
      delete updateData.zoneId;
    }

    return await this.countryRepository.update(countryId, updateData);
  }

  async deleteCountry(countryId: string) {
    const existingCountry = await this.countryRepository.findById(countryId);
    if (!existingCountry) {
      throw new CustomError('Country not found', HTTP_STATUS.NOT_FOUND);
    }

    await this.countryRepository.delete(countryId);
    return { message: 'Country deleted successfully' };
  }

  async getCountriesByCategory(categoryId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [countries, total] = await Promise.all([
      this.countryRepository.findByCategory(categoryId, skip, limit),
      this.countryRepository.countByCategory(categoryId),
    ]);

    return {
      countries,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getCountriesByZone(zoneId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [countries, total] = await Promise.all([
      this.countryRepository.findByZone(zoneId, skip, limit),
      this.countryRepository.countByZone(zoneId),
    ]);

    return {
      countries,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getCategoriesCoursesPricingByCountryName(countryName: string, page: number = 1, limit: number = 10) {
    if (!countryName) {
      throw new CustomError('country_name is required', HTTP_STATUS.BAD_REQUEST);
    }

    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      this.countryRepository.getCategoriesCoursesPricingByCountryNamePaginated(countryName, skip, limit),
      this.countryRepository.countDistinctCoursesByCountryName(countryName),
    ]);

    return {
      courses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
