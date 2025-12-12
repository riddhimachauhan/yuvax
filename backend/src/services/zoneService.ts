import { ZoneRepository } from '../repositories/zoneRepository';
import { CreateZoneRequest, UpdateZoneRequest } from '../dto/request/zoneRequest';

const zoneRepo = new ZoneRepository();

export const createZone = async (data: CreateZoneRequest) => {
  return zoneRepo.create(data);
};

export const getAllZones = async (page: number = 1, limit: number = 10) => {
  return zoneRepo.findAll(page, limit);
};


export const getZoneById = async (zoneId: string) => {
  return zoneRepo.findById(zoneId);
};

export const updateZone = async (zoneId: string, data: UpdateZoneRequest) => {
  return zoneRepo.update(zoneId, data);
};

export const deleteZone = async (zoneId: string) => {
  return zoneRepo.delete(zoneId);
};
