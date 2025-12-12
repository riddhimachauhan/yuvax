// dto/request/categoryRequest.ts
export interface CategoryCreateRequest {
  category_name: string;
  category_description: string;
  category_image?: string;
}

export interface CategoryUpdateRequest {
  category_name?: string;
  category_description?: string;
  category_image?: string;
}