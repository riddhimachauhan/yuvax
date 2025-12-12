// dto/response/categoryResponse.ts
export interface CategoryResponse {
  category_id: string;
  category_name: string;
  category_description: string;
  category_image?: string;
  created_at: string;
}