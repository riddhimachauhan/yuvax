// store/quizSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Types based on your API response
interface Question {
    question_id: string;
    quiz_id: string;
    text: string;
    marks: number;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct_answer: number;
    created_at: string;
}

interface Course {
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
    teacher_id: string;
    created_at: string;
    updated_at: string;
}

interface Module {
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
    course: Course;
}

interface Chapter {
    chapter_id: string;
    module_id: string;
    chapter_name: string;
    description: string;
    capacity: number;
    updated_at: string;
    created_at: string;
    module: Module;
}

interface Quiz {
    quiz_id: string;
    chapter_id: string;
    title: string;
    description: string;
    type: string;
    total_marks: number;
    created_at: string;
    updated_at: string;
    chapter: Chapter;
    questions: Question[];
}

interface QuizApiResponse {
    success: boolean;
    message: string;
    data: {
        quizzes: Quiz[];
        total: number;
        totalPages: number;
    };
}

interface QuizState {
    quizzes: Quiz[];
    total: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
}

const initialState: QuizState = {
    quizzes: [],
    total: 0,
    totalPages: 0,
    loading: false,
    error: null,
};
interface ApiErrorResponse {
    message: string;
}
// API Response interface
export interface ApiResponse {
    success: boolean;
    message: string;
    data: Course[];
}
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
// Async thunk to fetch quizzes
export const fetchQuizzes = createAsyncThunk(
    'quiz/fetchQuizzes',
    async (_, { rejectWithValue }) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000"}/api/quizzes`;
            console.log('🌐 Fetching quizzes from:', url);
            
            const response = await axios.get<QuizApiResponse>(url);
            
            console.log("✅ Quiz API Response:", response.data);
            console.log("📝 Quizzes received:", response.data.data?.quizzes?.length || 0);

            return response.data.data;
        } catch (error) {
            console.error('❌ Fetch quizzes error:', error);
            if (axios.isAxiosError(error)) {
                console.error('Response data:', error.response?.data);
                console.error('Response status:', error.response?.status);
            }
            return rejectWithValue(handleApiError(error));
        }
    }

);

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizzes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizzes.fulfilled, (state, action) => {
                state.loading = false;
                state.quizzes = action.payload.quizzes;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchQuizzes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = quizSlice.actions;
export default quizSlice.reducer;

