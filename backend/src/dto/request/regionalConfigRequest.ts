export interface CreateRegionalConfigRequest {
  country_id: string;
  default_timezone: string;
  business_hours_start: string;
  business_hours_end: string;
  weekend_days: string[]; // array of weekday names or numbers
  default_currency: string;
  tax_inclusive?: boolean;
  minimum_session_price?: number | null;
  maximum_session_price?: number | null;
  payment_methods?: string[]; // e.g. ["card", "upi"]
  payment_currency?: string;
}

export interface UpdateRegionalConfigRequest {
  country_id?: string;
  default_timezone?: string;
  business_hours_start?: string;
  business_hours_end?: string;
  weekend_days?: string[];
  default_currency?: string;
  tax_inclusive?: boolean;
  minimum_session_price?: number | null;
  maximum_session_price?: number | null;
  payment_methods?: string[];
  payment_currency?: string;
}
