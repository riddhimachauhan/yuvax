import { PrismaClient, CoursePricing } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class CoursePricingRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: any): Promise<CoursePricing> {
    return this.db.coursePricing.create({ data });
  }

  async findById(id: string) {
    return this.db.coursePricing.findUnique({
      where: { pricing_id: id },
      include: {
        country: {
          include: {
            regional_config: true,
            zone: true,
          },
        },
        course: true,
        category: true,
      },
    });
  }

  async findAll(
  page: number = 1,
  limit: number = 10
): Promise<{
  pricing: any[];
  total: number;
  totalPages: number;
  currentPage: number;
  pagesLeft: number;
  totalItemsLeft: number;
}> {
  const skip = (page - 1) * limit;

  const [pricing, total] = await Promise.all([
    this.db.coursePricing.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    this.db.coursePricing.count(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    pricing,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}


  async update(id: string, data: any) {
    return this.db.coursePricing.update({
      where: { pricing_id: id },
      data,
    });
  }

  async deactivate(id: string) {
    return this.db.coursePricing.update({
      where: { pricing_id: id },
      data: { is_active: false },
    });
  }

  async existsCombination(country_id: string, course_id: string, effective_from: Date, excludeId?: string) {
    const pricing = await this.db.coursePricing.findFirst({
      where: {
        country_id,
        course_id,
        effective_from,
        ...(excludeId && { pricing_id: { not: excludeId } }),
      },
    });
    return !!pricing;
  }
}
