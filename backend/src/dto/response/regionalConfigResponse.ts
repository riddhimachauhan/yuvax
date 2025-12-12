export interface RegionalConfigResponse {
  config_id: string;
  country_id: string;
  default_timezone: string;
  business_hours_start: string;
  business_hours_end: string;
  weekend_days: string[];
  default_currency: string;
  tax_inclusive: boolean;
  minimum_session_price?: number | null;
  maximum_session_price?: number | null;
  payment_methods: string[];
  payment_currency: string;
  created_at: string;
  updated_at: string;

  // optional relation
  country?: {
    country_id: string;
    country_name: string;
    country_code: string;
    currency: string;
    zone_id?: string | null;
  };
}
