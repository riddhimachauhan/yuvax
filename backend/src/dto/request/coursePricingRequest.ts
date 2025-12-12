export interface CreateCoursePricingRequest {
  country_id: string;
  course_id: string;
  category_id: string;
  base_price: number;
  discounted_price?: number;
  current_price: number;
  currency: string;
  discount_percentage?: number;
  tax_rate?: number;
  price_factor?: number;
  effective_from?: string;
  effective_until?: string;
  is_active?: boolean;
  created_by?: string;
}

export interface UpdateCoursePricingRequest {
  base_price?: number;
  discounted_price?: number;
  current_price?: number;
  currency?: string;
  discount_percentage?: number;
  tax_rate?: number;
  price_factor?: number;
  effective_from?: string;
  effective_until?: string;
  is_active?: boolean;
}
