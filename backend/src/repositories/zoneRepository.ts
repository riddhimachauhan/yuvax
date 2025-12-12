import { PrismaClient, Zone } from '@prisma/client';
import { getPrismaClient } from '../config/database';
import { CreateZoneRequest, UpdateZoneRequest } from '../dto/request/zoneRequest';



export class ZoneRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: CreateZoneRequest): Promise<Zone> {
    return this.db.zone.create({ data });
  }

  async findAll(
  page: number = 1,
  limit: number = 10
): Promise<{
  zones: Zone[];
  total: number;
  totalPages: number;
  currentPage: number;
  pagesLeft: number;
  totalItemsLeft: number;
}> {
  const skip = (page - 1) * limit;

  const [zones, total] = await Promise.all([
    this.db.zone.findMany({
     
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }, // <-- use actual field name
    }),
    this.db.zone.count(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    zones,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}



  async findById(zoneId: string): Promise<Zone | null> {
    return this.db.zone.findUnique({ where: { zone_id: zoneId }, include: { countries: true } });
  }

  async update(zoneId: string, data: Partial<UpdateZoneRequest>): Promise<Zone> {
    return this.db.zone.update({ where: { zone_id: zoneId }, data });
  }

  async delete(zoneId: string): Promise<Zone> {
    return this.db.zone.delete({ where: { zone_id: zoneId } });
  }
}
