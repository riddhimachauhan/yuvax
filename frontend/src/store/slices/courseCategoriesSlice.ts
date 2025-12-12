import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface CourseCategory {
  title: string;
  subtitle: string;
  bgColor: string;
  icon: string;
}

// Updated API response shapes to match your actual API
interface ApiCourse {
  course_id: string;
  course_name: string;
  category_id: string;
  course_description: string;
  course_content: string;
  course_image: string;
  difficulty: string;
  course_duration: string;
  language: string;
  min_age: string;
  max_age: string;
  teacher_id: string | null;
}

interface ApiCategory {
  category_id: string;
  category_name: string;
  category_description: string;
  category_image: string;
  created_at: string;
  courses: ApiCourse[];
}

interface ApiCategoriesResponse {
  success: boolean;
  message: string;
  data: ApiCategory[];
}

interface CourseCategoriesState {
  categories: CourseCategory[];
  isLoading: boolean;
  error: string | null;
  currentCategoryIndex: number;
}

const initialState: CourseCategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
  currentCategoryIndex: 0,
};

// Async thunk for fetching course categories
export const fetchCourseCategories = createAsyncThunk<
  CourseCategory[],
  void,
  { rejectValue: string }
>("courseCategories/fetchCourseCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiCategoriesResponse>(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000"
      }/api/categories/getCategories`
    );

    const categoryData = response.data;

    if (
      categoryData.success &&
      categoryData.data &&
      categoryData.data.length > 0
    ) {
      const categoryColors = [
        "bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600",
        "bg-gradient-to-r from-purple-500 via-pink-400 to-purple-600",
        "bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500",
        "bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-600",
        "bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600",
        "bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-600",
        "bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600",
        "bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-600",
      ];

      return categoryData.data.map((category: ApiCategory, index: number) => ({
        title: category.category_name,
        subtitle: category.category_description,
        bgColor: categoryColors[index % categoryColors.length],
        icon:
          category.category_image && category.category_image !== "null"
            ? category.category_image
            : "/assets/codeIcon.png",
      }));
    } else {
      return [];
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch course categories"
      );
    }
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to fetch course categories");
  }
});

const courseCategoriesSlice = createSlice({
  name: "courseCategories",
  initialState,
  reducers: {
    setCurrentCategoryIndex: (state, action: PayloadAction<number>) => {
      state.currentCategoryIndex = action.payload;
    },
    nextCategory: (state) => {
      if (state.categories.length > 0) {
        state.currentCategoryIndex =
          (state.currentCategoryIndex + 1) % state.categories.length;
      }
    },
    prevCategory: (state) => {
      if (state.categories.length > 0) {
        state.currentCategoryIndex =
          (state.currentCategoryIndex - 1 + state.categories.length) %
          state.categories.length;
      }
    },
    clearCategoriesError: (state) => {
      state.error = null;
    },
    resetCategoriesState: (state) => {
      state.categories = [];
      state.isLoading = false;
      state.error = null;
      state.currentCategoryIndex = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCourseCategories.fulfilled,
        (state, action: PayloadAction<CourseCategory[]>) => {
          state.isLoading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCourseCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.categories = [];
      });
  },
});

export const {
  setCurrentCategoryIndex,
  nextCategory,
  prevCategory,
  clearCategoriesError,
  resetCategoriesState,
} = courseCategoriesSlice.actions;

export default courseCategoriesSlice.reducer;
