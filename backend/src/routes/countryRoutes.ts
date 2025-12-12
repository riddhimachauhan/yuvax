import { Router } from "express";
import {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
  getCategoriesCoursesPricingByCountryName,
} from "../controllers/countryController";
import { authenticate,authorize } from "../middlewares/authMiddleware";
import { USER_ROLES } from "../utils/constants";
const router = Router();

router.post("/create", createCountry);       // Create country
router.get("/", getCountries);         // Get all countries
router.get("/:id", getCountryById);    // Get country by ID
router.put("/:id", updateCountry);     // Update country
router.delete("/:id", deleteCountry);  // Delete country
router.post(
  "/coursebycountry",
  getCategoriesCoursesPricingByCountryName
); // Body: { country_name }

export default router;