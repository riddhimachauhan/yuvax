export interface CoursePricingResponse {
  pricing_id: string;
  country_id: string;
  course_id: string;
  category_id: string;
  base_price: number;
  discounted_price?: number;
  current_price: number;
  currency: string;
  discount_percentage?: number;
  tax_rate?: number;
  price_factor: number;
  effective_from: string;
  effective_until?: string;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;

  country?: {
    country_name: string;
    country_code: string;
    currency: string;
    regional_config?: {
      default_currency: string;
      business_hours_start: string;
      business_hours_end: string;
      weekend_days: string[];
    };
    zone?: {
      gmtOffset: string;
      primeTimeStart: string;
      primeTimeEnd: string;
    };
  };
}
