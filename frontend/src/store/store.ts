import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// Slices and APIs
import { authApi } from './api/authApi'
import authReducer from './slices/authSlice' 
import modalReducer from './slices/modalSlice'
import coursesReducer from './slices/coursesSlice'
import courseCategoriesReducer from './slices/courseCategoriesSlice'
import quizReducer from './slices/quizSlice'
import dashboardReducer from './slices/dashboardSlice'
import storage from '@/lib/storage';

// Combine all reducers
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  modal: modalReducer,
  courses: coursesReducer,
  courseCategories: courseCategoriesReducer,
  quiz: quizReducer,
  dashboard: dashboardReducer,
});

// Persist config
const persistConfig = {
  key: 'yuvax_root',
  version: 1,
  storage,
  whitelist: ['auth'], 
  blacklist: [authApi.reducerPath,"modal","courses","courseCategories","quiz"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware), 
});

// Setup listeners for RTK Query
setupListeners(store.dispatch);

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;