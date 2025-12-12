export interface CourseResponse {
  course_id: string;
  course_name: string;
  category_id: string;
  course_description?: string;
  course_content?: string;
  difficulty: string;
  course_duration: number;
  course_image: string;
  language: string;
  min_age?: number;
  max_age?: number;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    category_id: string;
    category_name: string;
    category_description?: string;
    category_image?: string;
  };
  modules?: Array<{
    module_id: string;
    module_title: string;
    duration: number;
    module_description?: string;
  }>;
  countryPrices?: Array<{
    country_id: string;
    country_name: string;
    isoCode: string;
    currency: string;
    price: {
      base: number;
      discounted: number;
      real: number;
    } | null;
  }>;
}

export interface CourseStatsResponse {
  totalModules: number;
  totalStudents: number;
  totalAssignments: number;
}

export interface CourseListResponse {
  courses: CourseResponse[];
  total: number;
  totalPages: number;
  currentPage: number;
}