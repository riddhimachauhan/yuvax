import { Router } from 'express';
import { 
  validateZoneCreation, 
  validateZoneUpdate, 
  validateZoneIdParam
} from '../validators/zoneValidator';
import { 
  createZone,
  getAllZones,
  getZoneById,
  updateZone,
  deleteZone 
} from '../controllers/zoneController';

const router = Router();

router.post('/createZone', validateZoneCreation, createZone);
router.get('/allZones', getAllZones);
router.get('/getZoneById/:zoneId', validateZoneIdParam, getZoneById);
router.put('/updateZone/:zoneId', validateZoneIdParam, validateZoneUpdate, updateZone);
router.delete('/:zoneId', validateZoneIdParam, deleteZone);

export default router;
