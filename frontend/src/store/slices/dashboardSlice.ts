import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type UserRole = "student" | "teacher" | "admin" | "superadmin";

interface DashboardState {
  currentPage: string;
  currentPageLabel: string;
  userRole: UserRole;
}

const initialState: DashboardState = {
  currentPage: "overview",
  currentPageLabel: "Overview",
  userRole: "student",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCurrentPage: (
      state,
      action: PayloadAction<{ page: string; label: string }>
    ) => {
      state.currentPage = action.payload.page;
      state.currentPageLabel = action.payload.label;
    },
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
    resetDashboard: (state) => {
      state.currentPage = "overview";
      state.currentPageLabel = "Overview";
    },
  },
});

export const { setCurrentPage, setUserRole, resetDashboard } =
  dashboardSlice.actions;

export const selectCurrentPage = (state: RootState) =>
  state.dashboard.currentPage;
export const selectCurrentPageLabel = (state: RootState) =>
  state.dashboard.currentPageLabel;
export const selectUserRole = (state: RootState) => state.dashboard.userRole;

export default dashboardSlice.reducer;