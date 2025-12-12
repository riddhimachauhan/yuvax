import { Request, Response } from 'express';
import * as zoneService from '../services/zoneService';

export const createZone = async (req: Request, res: Response) => {
  try {
    const zone = await zoneService.createZone(req.body);
    res.status(201).json({ success: true, data: zone });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllZones = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await zoneService.getAllZones(page, limit);

    res.status(200).json({
      success: true,
      message: 'Zones retrieved successfully',
      data: result.zones,
      pagination: {
        totalItems: result.total,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pagesLeft: result.pagesLeft,
        totalItemsLeft: result.totalItemsLeft,
      },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const getZoneById = async (req: Request, res: Response) => {
  try {
    const zone = await zoneService.getZoneById(req.params.zoneId);
    if (!zone) return res.status(404).json({ success: false, message: 'Zone not found' });
    res.json({ success: true, data: zone });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateZone = async (req: Request, res: Response) => {
  try {
    const zone = await zoneService.updateZone(req.params.zoneId, req.body);
    res.json({ success: true, data: zone });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteZone = async (req: Request, res: Response) => {
  try {
    await zoneService.deleteZone(req.params.zoneId);
    res.json({ success: true, message: 'Zone deleted successfully' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
