// import { useState, useCallback } from 'react';
// // import apiService from '../services/apiService';
// import { MeetingState, User, MeetingConfig } from '../types/meeting.types';
// import ApiService from '@/services/ApiService';

// export const useDyteMeeting = () => {
//   const [meetingState, setMeetingState] = useState<MeetingState>({
//     token: '',
//     meetingId: '',
//     joined: false,
//     loading: false,
//     error: null,
//     connectionStatus: 'disconnected'
//   });

//   const updateState = useCallback((updates: Partial<MeetingState>) => {
//     setMeetingState(prev => ({ ...prev, ...updates }));
//   }, []);

//   const createMeeting = useCallback(async (config: MeetingConfig) => {
//     try {
//       updateState({ loading: true, error: null });
      
//       const response = await ApiService.createMeeting(config);
      
//       if (response.success && response.data) {
//         updateState({
//           meetingId: response.data.id,
//           loading: false
//         });
//         return response.data;
//       } else {
//         throw new Error(response.message || 'Failed to create meeting');
//       }
//     } catch (error: unknown) {
//       updateState({
//         loading: false,
//         // error: error.message
//       });
//       throw error;
//     }
//   }, [updateState]);

//   const joinMeeting = useCallback(async (meetingId: string, user: User) => {
//     try {
//       updateState({ 
//         loading: true, 
//         error: null, 
//         connectionStatus: 'connecting' 
//       });

//       const response = await ApiService.joinMeeting(meetingId, {
//         name: user.full_name,
//         picture: user.picture,
//         custom_participant_id: user.id || `user-${Date.now()}`
//       });

//       if (response.success && response.data) {
//         updateState({
//           token: response.data.token,
//           meetingId: response.data.meetingId,
//           loading: false,
//           connectionStatus: 'connected'
//         });
//         return response.data;
//       } else {
//         throw new Error(response.message || 'Failed to join meeting');
//       }
//     } catch (error: unknown) {
//       updateState({
//         loading: false,
//         connectionStatus: 'failed'
//       });
//       throw error;
//     }
//   }, [updateState]);

//   const testCreateMeeting = useCallback(async (title: string = 'Test Meeting') => {
//     try {
//       updateState({ loading: true, error: null });

//       const response = await ApiService.testCreate(title);

//       if (response.success && response.data) {
//         updateState({
//           token: response.data.participantToken || '',
//           meetingId: response.data.meetingId || response.data.id,
//           loading: false,
//           connectionStatus: 'connected'
//         });
//         return response.data;
//       } else {
//         throw new Error(response.message || 'Test creation failed');
//       }
//     } catch (error: unknown) {
//       updateState({
//         loading: false,
//         // error: error.message,
//         connectionStatus: 'failed'
//       });
//       throw error;
//     }
//   }, [updateState]);

//   const leaveMeeting = useCallback(() => {
//     updateState({
//       token: '',
//       meetingId: '',
//       joined: false,
//       connectionStatus: 'disconnected',
//       error: null
//     });
//   }, [updateState]);

//   const clearError = useCallback(() => {
//     updateState({ error: null });
//   }, [updateState]);

//   return {
//     meetingState,
//     createMeeting,
//     joinMeeting,
//     testCreateMeeting,
//     leaveMeeting,
//     clearError
//   };
// };