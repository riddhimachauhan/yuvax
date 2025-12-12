import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { refreshAccessToken, selectAuthLoading, selectIsAuthenticated } from '../slices/authSlice';
import type { RootState } from '../store';

export const useTokenRefresh = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isLoading = useAppSelector(selectAuthLoading);
    const tokenExpiresAt = useAppSelector((state: RootState) => state.auth.tokenExpiresAt);
    const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isAuthenticated || isLoading || !tokenExpiresAt) {
            return;
        }

        const scheduleRefresh = () => {
            // Clear any existing timeout
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }

            const now = Date.now();
            const timeUntilExpiry = tokenExpiresAt - now;

            // Refresh 2 minutes before expiry (or immediately if already expired)
            const refreshTime = Math.max(0, timeUntilExpiry - (2 * 60 * 1000));

            console.log(`🔄 Token refresh scheduled in ${Math.round(refreshTime / 1000)}s`);

            refreshTimeoutRef.current = setTimeout(async () => {
                console.log('🔄 Refreshing token automatically...');
                try {
                    await dispatch(refreshAccessToken()).unwrap();
                    console.log('✅ Token refreshed successfully');
                } catch (error) {
                    console.error('❌ Token refresh failed:', error);
                    // User will be logged out by the interceptor
                }
            }, refreshTime);
        };

        scheduleRefresh();

        // Cleanup on unmount
        return () => {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }
        };
    }, [isAuthenticated, tokenExpiresAt, isLoading, dispatch]);
};