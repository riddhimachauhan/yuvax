import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Price interface
export interface Price {
    base: number;
    discounted: number;
    real: number;
}

// Country Price interface
export interface CountryPrice {
    country_id: string;
    country_name: string;
    isoCode: string;
    currency: string;
    price: Price | null;
}

// Category interface
export interface Category {
    category_id: string;
    category_name: string;
    category_description: string;
    category_image: string;
    created_at: string;
}

// Module interface
export interface Module {
    module_id: string;
    course_id: string;
    student_note_link: string;
    teacher_note_link: string;
    PPT_link: string;
    module_description: string;
    module_title: string;
    duration: number;
    created_at: string;
    updated_at: string;
}

// Main Course interface matching your API response
export interface Course {
    course_id: string;
    course_name: string;
    category_id: string;
    course_description: string;
    course_content: string;
    course_image: string;
    difficulty: 'beginner' | 'intermediate' | 'advance' | 'expert';
    course_duration: string;
    language: string;
    min_age: string;
    max_age: string;
    teacher_id: string | null;
    category: Category;
    modules: Module[];
    countryPrices: CountryPrice[];
    rating?: string | number;
    type?: string;
    updated_at?: string;
}

// API Response interface
export interface ApiResponse {
    success: boolean;
    message: string;
    data: Course[];
}

interface CoursesState {
    courses: Course[];
    loading: boolean;
    error: string | null;
    selectedCourse: Course | null;
    totalCourses: number;
}

interface ApiErrorResponse {
    message: string;
}

const initialState: CoursesState = {
    courses: [],
    loading: false,
    error: null,
    selectedCourse: null,
    totalCourses: 0,
};

// Helper function to handle API errors
const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        return axiosError.response?.data?.message || axiosError.message || 'An error occurred';
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unknown error occurred';
};


export const fetchCoursesByCountry = createAsyncThunk(
    'courses/fetchByCountry',
    async (country: string, { rejectWithValue }) => {
        try {
            const response = await axios.post<ApiResponse>(
                `${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000"}/api/country/categories-courses-pricing`, {
                country_name: country
            });
            return response.data.data;
        } catch (error) {
            console.error('Fetch courses error:', error);
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Async thunk for fetching courses
export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<ApiResponse>(
                `${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000"}/api/courses`
            );
            // console.log("response is :", response.data);
            return response.data;
        } catch (error) {
            console.error('Fetch courses error:', error);
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Async thunk for fetching single course
export const fetchCourseById = createAsyncThunk(
    'courses/fetchCourseById',
    async (courseId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/courses/${courseId}`);
            console.log("response in course detaild page is :", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Async thunk for creating course
export const createCourse = createAsyncThunk(
    'courses/createCourse',
    async (courseData: Omit<Course, 'course_id'>, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/courses`, courseData);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Async thunk for updating course
export const updateCourse = createAsyncThunk(
    'courses/updateCourse',
    async ({ id, courseData }: { id: string; courseData: Partial<Course> }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/courses/${id}`, courseData);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Async thunk for deleting course
export const deleteCourse = createAsyncThunk(
    'courses/deleteCourse',
    async (courseId: string, { rejectWithValue }) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/courses/${courseId}`);
            return courseId;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        // Clear error state
        clearError: (state) => {
            state.error = null;
        },

        // Select a course
        selectCourse: (state, action: PayloadAction<Course>) => {
            state.selectedCourse = action.payload;
        },

        // Clear selected course
        clearSelectedCourse: (state) => {
            state.selectedCourse = null;
        },

        // Reset courses state
        resetCoursesState: (state) => {
            state.courses = [];
            state.loading = false;
            state.error = null;
            state.selectedCourse = null;
            state.totalCourses = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoursesByCountry.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCoursesByCountry.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload || [];
            })
            .addCase(fetchCoursesByCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch courses cases
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false;
                // Extract the courses array from the API response
                state.courses = Array.isArray(action.payload.data) ? action.payload.data : [];
                state.totalCourses = state.courses.length;
                state.error = null;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch course by ID cases
            .addCase(fetchCourseById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCourse = action.payload.data;
                state.error = null;
            })
            .addCase(fetchCourseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create course cases
            .addCase(createCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courses.push(action.payload.data);
                state.totalCourses = state.courses.length;
                state.error = null;
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update course cases
            .addCase(updateCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.courses.findIndex(course => course.course_id === action.payload.data.course_id);
                if (index !== -1) {
                    state.courses[index] = action.payload.data;
                }
                if (state.selectedCourse?.course_id === action.payload.data.course_id) {
                    state.selectedCourse = action.payload.data;
                }
                state.error = null;
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete course cases
            .addCase(deleteCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = state.courses.filter(course => course.course_id !== action.payload);
                state.totalCourses = state.courses.length;
                if (state.selectedCourse?.course_id === action.payload) {
                    state.selectedCourse = null;
                }
                state.error = null;
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    clearError,
    selectCourse,
    clearSelectedCourse,
    resetCoursesState
} = coursesSlice.actions;

export default coursesSlice.reducer;