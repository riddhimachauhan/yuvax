// import { useDyteMeeting } from '@/hooks/useDyteMeeting';
// import { User } from '@/lib/types';
// import ApiService from '@/services/ApiService';
// import React, { useState, useEffect } from 'react';
// import { Button } from './ui/button';
// import Input from './common/Input';
// import Modal from './common/Modal';
// // import Modal from './common/Modal';
// // import Button from '../common/Button';
// // import Input from '../common/Input';
// // import Modal from '../common/Modal';
// // import { useDyteMeeting } from '../../hooks/useDyteMeeting';
// // import { User } from '../../types/meeting.types';
// // import apiService from '../../services/apiService';

// interface MeetingLobbyProps {
//     onJoinMeeting: (meetingId: string, token: string) => void;
// }

// const MeetingLobby: React.FC<MeetingLobbyProps> = ({ onJoinMeeting }) => {
//     const [user, setUser] = useState<User>({
//         id: '',
//         full_name: '',
//         email: '',
//         role: 'STUDENT', // or another default role as per your User type
//     });
//     const [meetingId, setMeetingId] = useState<string>('');
//     const [meetingTitle, setMeetingTitle] = useState<string>('');
//     const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
//     const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'failed'>('checking');

//     const {
//         meetingState,
//         createMeeting,
//         joinMeeting,
//         testCreateMeeting,
//         clearError
//     } = useDyteMeeting();

//     useEffect(() => {
//         // Test connection on component mount
//         const testConnection = async () => {
//             try {
//                 const isConnected = await ApiService.testConnection();
//                 setConnectionStatus(isConnected ? 'connected' : 'failed');
//             } catch (error) {
//                 setConnectionStatus("failed");

//                 if (error instanceof Error) {
//                     console.error("Error:", error.message);
//                 }
//             }
//         };

//         testConnection();
//     }, []);

//     const handleCreateMeeting = async () => {
//         if (!meetingTitle.trim()) return;

//         try {
//             const meeting = await createMeeting({
//                 title: meetingTitle,
//                 recordOnStart: false
//             });

//             if (meeting) {
//                 setMeetingId(meeting.id);
//                 setShowCreateModal(false);
//                 setMeetingTitle('');

//                 // Auto-join the created meeting
//                 await handleJoinMeeting(meeting.id);
//             }
//         } catch (error) {
//             console.error('Failed to create meeting:', error);
//         }
//     };

//     const handleJoinMeeting = async (targetMeetingId?: string) => {
//         const idToUse = targetMeetingId || meetingId;

//         if (!idToUse.trim() || !user.full_name.trim()) return;

//         try {
//             const joinData = await joinMeeting(idToUse, user);
//             if (joinData) {
//                 onJoinMeeting(joinData.meetingId, joinData.token);
//             }
//         } catch (error) {
//             console.error('Failed to join meeting:', error);
//         }
//     };

//     const handleQuickTest = async () => {
//         if (!user.full_name.trim()) {
//             setUser(prev => ({ ...prev, name: 'Test User' }));
//         }

//         try {
//             const testData = await testCreateMeeting('Quick Test Meeting');
//             if (testData && testData.participantToken) {
//                 onJoinMeeting(testData.meetingId || testData.id, testData.participantToken);
//             }
//         } catch (error) {
//             console.error('Quick test failed:', error);
//         }
//     };

//     const isFormValid = user.full_name.trim() && meetingId.trim();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//             <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                         Video Meetings
//                     </h1>
//                     <p className="text-gray-600">
//                         Connect with your team instantly
//                     </p>

//                     {/* Connection Status */}
//                     <div className="mt-4">
//                         {connectionStatus === 'checking' && (
//                             <div className="flex items-center justify-center text-yellow-600">
//                                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
//                                 Connecting to service...
//                             </div>
//                         )}
//                         {connectionStatus === 'connected' && (
//                             <div className="flex items-center justify-center text-green-600">
//                                 <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                                 </svg>
//                                 Service Connected
//                             </div>
//                         )}
//                         {connectionStatus === 'failed' && (
//                             <div className="flex items-center justify-center text-red-600">
//                                 <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                 </svg>
//                                 Connection Failed
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Error Display */}
//                 {meetingState.error && (
//                     <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//                         <div className="flex">
//                             <div className="flex-shrink-0">
//                                 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                             <div className="ml-3">
//                                 <h3 className="text-sm font-medium text-red-800">
//                                     Error
//                                 </h3>
//                                 <div className="mt-2 text-sm text-red-700">
//                                     {meetingState.error}
//                                 </div>
//                                 <div className="mt-3">
//                                     <Button
//                                         size="sm"
//                                         variant="secondary"
//                                         onClick={clearError}
//                                     >
//                                         Dismiss
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* User Info Form */}
//                 <div className="space-y-6">
//                     <div>
//                         <Input
//                             label="Your Name"
//                             value={user.full_name}
//                             onChange={(value) => setUser(prev => ({ ...prev, name: value }))}
//                             placeholder="Enter your name"
//                             required
//                         />
//                         <Input
//                             label="Profile Picture URL (Optional)"
//                             value={''}
//                             onChange={(value) => setUser(prev => ({ ...prev, picture: value }))}
//                             placeholder="https://example.com/avatar.jpg"
//                             type="url"
//                         />
//                     </div>

//                     {/* Quick Test */}
//                     <div className="border-t border-gray-200 pt-6">
//                         <Button
//                             onClick={handleQuickTest}
//                             disabled={connectionStatus !== 'connected'}
//                             //   loading={meetingState.loading}
//                             className="w-full"
//                             variant="default"
//                         >
//                             🚀 Quick Test Meeting
//                         </Button>
//                         <p className="text-xs text-gray-500 mt-2 text-center">
//                             Creates a test meeting instantly
//                         </p>
//                     </div>

//                     {/* Create New Meeting */}
//                     <div className="border-t border-gray-200 pt-6">
//                         <Button
//                             onClick={() => setShowCreateModal(true)}
//                             disabled={connectionStatus !== 'connected' || !user.full_name.trim()}
//                             className="w-full mb-4"
//                         >
//                             Create New Meeting
//                         </Button>

//                         {/* Join Existing Meeting */}
//                         <div>
//                             <Input
//                                 label="Meeting ID"
//                                 value={meetingId}
//                                 onChange={setMeetingId}
//                                 placeholder="Enter meeting ID to join"
//                             />
//                             <Button
//                                 onClick={() => handleJoinMeeting()}
//                                 disabled={!isFormValid || connectionStatus !== 'connected'}
//                                 // loading={meetingState.loading}
//                                 className="w-full"
//                                 variant="outline"
//                             >
//                                 Join Meeting
//                             </Button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Create Meeting Modal */}
//                 <Modal
//                     isOpen={showCreateModal}
//                     onClose={() => setShowCreateModal(false)}
//                     title="Create New Meeting"
//                 >
//                     <div className="space-y-4">
//                         <Input
//                             label="Meeting Title"
//                             value={meetingTitle}
//                             onChange={setMeetingTitle}
//                             placeholder="Enter meeting title"
//                             required
//                         />
//                         <div className="flex space-x-3">
//                             <Button
//                                 onClick={handleCreateMeeting}
//                                 disabled={!meetingTitle.trim()}
//                                 // loading={meetingState.loading}
//                                 className="flex-1"
//                             >
//                                 Create Meeting
//                             </Button>
//                             <Button
//                                 onClick={() => setShowCreateModal(false)}
//                                 variant="secondary"
//                                 disabled={meetingState.loading}
//                             >
//                                 Cancel
//                             </Button>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         </div>
//     );
// };

// export default MeetingLobby;