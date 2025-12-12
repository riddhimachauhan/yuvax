import { Request, Response } from 'express';
import { CountryService } from '../services/countryService';
import { CustomError } from '../middlewares/errorHandler';

const countryService = new CountryService();

export const createCountry = async (req: Request, res: Response) => {
  try {
    const result = await countryService.createCountry(req.body);

    return res.status(201).json({
      success: true,
      message: 'Country created successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Create Country Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const getCountries = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // Validate input
    if (page < 1 || limit < 1) {
      return res.status(400).json({ success: false, message: 'Invalid page or limit' });
    }

    const result = await countryService.getAllCountries(page, limit);

    return res.status(200).json({
      success: true,
      message: 'Countries fetched successfully',
      data: result.countries,
      pagination: {
        totalItems: result.total,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pagesLeft: result.pagesLeft,
        totalItemsLeft: result.totalItemsLeft,
      },
    });
  } catch (error: any) {
    console.error('Get Countries Error:', error);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};



export const getCountryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await countryService.getCountryById(id);

    return res.status(200).json({
      success: true,
      message: 'Country fetched successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Get Country By ID Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const getCountryByIsoCode = async (req: Request, res: Response) => {
  try {
    const { isoCode } = req.params;
    
    const result = await countryService.getCountryByIsoCode(isoCode);

    return res.status(200).json({
      success: true,
      message: 'Country fetched successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Get Country By ISO Code Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const updateCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await countryService.updateCountry(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Country updated successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Update Country Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await countryService.deleteCountry(id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    console.error('Delete Country Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const getCountriesByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const result = await countryService.getCountriesByCategory(categoryId, Number(page), Number(limit));

    return res.status(200).json({
      success: true,
      message: 'Countries by category fetched successfully',
      ...result,
    });
  } catch (error: any) {
    console.error('Get Countries By Category Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const getCountriesByZone = async (req: Request, res: Response) => {
  try {
    const { zoneId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const result = await countryService.getCountriesByZone(zoneId, Number(page), Number(limit));

    return res.status(200).json({
      success: true,
      message: 'Countries by zone fetched successfully',
      ...result,
    });
  } catch (error: any) {
    console.error('Get Countries By Zone Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const getCategoriesCoursesPricingByCountryName = async (req: Request, res: Response) => {
  try {
    const { country_name } = req.body as { country_name?: string };
    const { page = 1, limit = 10 } = req.query as any;
    const result = await countryService.getCategoriesCoursesPricingByCountryName(country_name || '', Number(page), Number(limit));

    return res.status(200).json({
      success: true,
      message: 'Categories with course pricing fetched successfully',
      ...result,
    });
  } catch (error: any) {
    console.error('Get Categories/Courses Pricing By Country Name Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};