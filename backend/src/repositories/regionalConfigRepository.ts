import { PrismaClient, Prisma, RegionalConfig } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class RegionalConfigRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  //  CREATE
  async create(data: Prisma.RegionalConfigUncheckedCreateInput): Promise<RegionalConfig> {
    return this.db.regionalConfig.create({
      data,
    });
  }

  //  FIND BY ID
  async findById(id: string) {
    return this.db.regionalConfig.findUnique({
      where: { config_id: id },
      include: { country: true },
    });
  }

  //  FIND BY COUNTRY ID
  async findByCountryId(countryId: string) {
    return this.db.regionalConfig.findUnique({
      where: { country_id: countryId },
      include: { country: true },
    });
  }

  async findAll(
  page: number = 1,
  limit: number = 10
): Promise<{
  configs: any[];
  total: number;
  totalPages: number;
  currentPage: number;
  pagesLeft: number;
  totalItemsLeft: number;
}> {
  const skip = (page - 1) * limit;

  const [configs, total] = await Promise.all([
    this.db.regionalConfig.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
      // include: { country: true }, // uncomment if needed
    }),
    this.db.regionalConfig.count(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    configs,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}


  //  UPDATE
  async update(id: string, data: Prisma.RegionalConfigUncheckedUpdateInput): Promise<RegionalConfig> {
    return this.db.regionalConfig.update({
      where: { config_id: id },
      data,
    });
  }

  //  DELETE
  async delete(id: string) {
    return this.db.regionalConfig.delete({
      where: { config_id: id },
    });
  }

  //  CHECK EXISTENCE
  async existsByCountryId(countryId: string, excludeConfigId?: string) {
    const found = await this.db.regionalConfig.findFirst({
      where: {
        country_id: countryId,
        ...(excludeConfigId && { config_id: { not: excludeConfigId } }),
      },
      select: { config_id: true },
    });
    return !!found;
  }
}
