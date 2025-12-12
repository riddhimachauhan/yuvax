
import { Router } from "express";
import { getGeoData } from "../controllers/geoController";
import { attachGeoInfo } from "../middlewares/geomiddleware";
import { validateGeoQuery } from "../validators/geoValidator";

const router = Router();


router.use(attachGeoInfo);

router.get("/",validateGeoQuery, getGeoData);

export default router;
