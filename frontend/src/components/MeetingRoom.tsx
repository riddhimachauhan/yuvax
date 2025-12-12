// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import Button from '../common/Button';

interface MeetingRoomProps {
  meetingId: string;
  token: string;
  onLeaveMeeting: () => void;
}

// interface MeetingClient {
//   join: () => Promise<void>;
//   leave?: () => Promise<void>;
//   leaveRoom?: () => Promise<void>;
//   self?: {
//     audioEnabled: boolean;
//     videoEnabled: boolean;
//   };
//   participants?: any[];
//   localUser?: any;
// }

// interface SDKInfo {
//   name: string;
//   version: string;
//   available: boolean;
// }

const MeetingRoom: React.FC<MeetingRoomProps> = ({ 
  // meetingId, 
  // token, 
  // onLeaveMeeting 
}) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [client, setClient] = useState<MeetingClient | null>(null);
  // const [sdkInfo, setSdkInfo] = useState<SDKInfo | null>(null);
  // const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'failed' | 'disconnected'>('connecting');
  // const [participants, setParticipants] = useState<any[]>([]);
  // const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  // const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  // const [showControls, setShowControls] = useState(true);
  // const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  
  // const meetingContainerRef = useRef<HTMLDivElement>(null);
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // // Auto-hide controls after inactivity
  // const resetControlsTimeout = useCallback(() => {
  //   if (controlsTimeoutRef.current) {
  //     clearTimeout(controlsTimeoutRef.current);
  //   }
  //   setShowControls(true);
  //   controlsTimeoutRef.current = setTimeout(() => {
  //     setShowControls(false);
  //   }, 5000);
  // }, []);

  // // Mouse move handler to show controls
  // const handleMouseMove = useCallback(() => {
  //   resetControlsTimeout();
  // }, [resetControlsTimeout]);

  // useEffect(() => {
  //   let mounted = true;

  //   const initializeMeeting = async () => {
  //     try {
  //       setIsLoading(true);
  //       setError(null);
  //       setConnectionStatus('connecting');

  //       // Try different SDKs in order of preference
  //       let meetingClient: MeetingClient | null = null;
  //       let usedSDK: SDKInfo | null = null;

  //       // Option 1: Try Cloudflare RealtimeKit (New)
  //       try {
  //         console.log('Attempting to load Cloudflare RealtimeKit...');
  //         const cloudflareSDK = await import('@cloudflare/realtimekit');
          
  //         meetingClient = await cloudflareSDK.RealtimeKitClient.init({
  //           authToken: token,
  //           defaults: {
  //             audio: false,
  //             video: false,
  //           }
  //         });

  //         await meetingClient.join();
  //         usedSDK = { name: 'Cloudflare RealtimeKit', version: '1.0.0', available: true };
  //         console.log('✅ Cloudflare RealtimeKit loaded successfully');

  //       } catch (cloudflareError) {
  //         console.log('❌ Cloudflare RealtimeKit failed:', cloudflareError);

  //         // Option 2: Try Dyte Web Core (Legacy)
  //         try {
  //           console.log('Attempting to load Dyte Web Core...');
  //           const dyteSDK = await import('@dytesdk/web-core');
            
  //           meetingClient = await dyteSDK.DyteClient.init({
  //             authToken: token,
  //             defaults: {
  //               audio: false,
  //               video: false,
  //             }
  //           });

  //           await meetingClient.join();
  //           usedSDK = { name: 'Dyte Web Core', version: '2.0.0', available: true };
  //           console.log('✅ Dyte Web Core loaded successfully');

  //         } catch (dyteError) {
  //           console.log('❌ Dyte Web Core failed:', dyteError);

  //           // Option 3: Try old dyte-client
  //           try {
  //             console.log('Attempting to load legacy dyte-client...');
  //             const legacySDK = await import('dyte-client');
              
  //             // Legacy client might have different initialization
  //             meetingClient = new legacySDK.DyteClient();
  //             await meetingClient.init?.({
  //               authToken: token,
  //               showSetupScreen: false,
  //             });

  //             usedSDK = { name: 'Legacy Dyte Client', version: '1.x', available: true };
  //             console.log('✅ Legacy Dyte Client loaded successfully');

  //           } catch (legacyError) {
  //             console.log('❌ Legacy Dyte Client failed:', legacyError);
  //             throw new Error('All video SDKs failed to load');
  //           }
  //         }
  //       }

  //       if (meetingClient && mounted) {
  //         setClient(meetingClient);
  //         setSdkInfo(usedSDK);
  //         setConnectionStatus('connected');
  //         setIsLoading(false);

  //         // Set up event listeners
  //         setupEventListeners(meetingClient);
  //       }

  //     } catch (error: any) {
  //       console.error('Meeting initialization error:', error);
  //       if (mounted) {
  //         setError(getErrorMessage(error));
  //         setConnectionStatus('failed');
  //         setIsLoading(false);
          
  //         // Try to fall back to custom WebRTC
  //         await initializeCustomWebRTC();
  //       }
  //     }
  //   };

  //   const setupEventListeners = (meetingClient: MeetingClient) => {
  //     try {
  //       // Different SDKs have different event systems
  //       if ((meetingClient as any).participants) {
  //         (meetingClient as any).participants.joined?.addListener?.('participantJoined', (participant: any) => {
  //           console.log('Participant joined:', participant);
  //           setParticipants(prev => [...prev, participant]);
  //         });

  //         (meetingClient as any).participants.joined?.addListener?.('participantLeft', (participant: any) => {
  //           console.log('Participant left:', participant);
  //           setParticipants(prev => prev.filter(p => p.id !== participant.id));
  //         });
  //       }

  //       // Audio/Video state listeners
  //       if ((meetingClient as any).self) {
  //         const self = (meetingClient as any).self;
  //         setIsAudioEnabled(self.audioEnabled || false);
  //         setIsVideoEnabled(self.videoEnabled || false);
  //       }

  //     } catch (error) {
  //       console.error('Error setting up event listeners:', error);
  //     }
  //   };

  //   const initializeCustomWebRTC = async () => {
  //     try {
  //       console.log('Initializing custom WebRTC fallback...');
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //         audio: true
  //       });

  //       setLocalStream(stream);
  //       setSdkInfo({ name: 'Custom WebRTC', version: '1.0.0', available: true });
  //       setConnectionStatus('connected');

  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //       }

  //       // Create a mock client for consistency
  //       const mockClient: MeetingClient = {
  //         join: async () => {},
  //         leave: async () => {
  //           stream.getTracks().forEach(track => track.stop());
  //         },
  //         self: {
  //           audioEnabled: true,
  //           videoEnabled: true
  //         }
  //       };

  //       setClient(mockClient);
  //       setIsAudioEnabled(true);
  //       setIsVideoEnabled(true);
        
  //     } catch (webRTCError) {
  //       console.error('Custom WebRTC also failed:', webRTCError);
  //       setSdkInfo({ name: 'None Available', version: '0.0.0', available: false });
  //     }
  //   };

  //   const getErrorMessage = (error: any): string => {
  //     if (error.message?.includes('Cannot resolve module')) {
  //       return 'Video SDK not installed. Please install the required packages.';
  //     }
  //     if (error.message?.includes('network')) {
  //       return 'Network connection failed. Please check your internet connection.';
  //     }
  //     if (error.message?.includes('token')) {
  //       return 'Invalid meeting token. Please try joining again.';
  //     }
  //     return error.message || 'Failed to connect to the meeting';
  //   };

  //   initializeMeeting();

  //   return () => {
  //     mounted = false;
  //     if (controlsTimeoutRef.current) {
  //       clearTimeout(controlsTimeoutRef.current);
  //     }
      
  //     // Cleanup
  //     if (client) {
  //       try {
  //         client.leaveRoom?.() || client.leave?.();
  //       } catch (error) {
  //         console.error('Error during cleanup:', error);
  //       }
  //     }
      
  //     if (localStream) {
  //       localStream.getTracks().forEach(track => track.stop());
  //     }
  //   };
  // }, [token]);

  // // Add mouse move listener for controls
  // useEffect(() => {
  //   const container = meetingContainerRef.current;
  //   if (container) {
  //     container.addEventListener('mousemove', handleMouseMove);
  //     resetControlsTimeout();
      
  //     return () => {
  //       container.removeEventListener('mousemove', handleMouseMove);
  //     };
  //   }
  // }, [handleMouseMove, resetControlsTimeout]);

  // const handleLeaveMeeting = async () => {
  //   try {
  //     setConnectionStatus('disconnected');
      
  //     if (client) {
  //       await (client.leaveRoom?.() || client.leave?.());
  //     }
      
  //     if (localStream) {
  //       localStream.getTracks().forEach(track => track.stop());
  //     }
  //   } catch (error) {
  //     console.error('Error leaving meeting:', error);
  //   } finally {
  //     onLeaveMeeting();
  //   }
  // };

  // const handleToggleAudio = async () => {
  //   try {
  //     if (client?.self) {
  //       const newState = !isAudioEnabled;
  //       client.self.audioEnabled = newState;
  //       setIsAudioEnabled(newState);
  //     } else if (localStream) {
  //       const audioTracks = localStream.getAudioTracks();
  //       audioTracks.forEach(track => {
  //         track.enabled = !track.enabled;
  //       });
  //       setIsAudioEnabled(!isAudioEnabled);
  //     }
  //   } catch (error) {
  //     console.error('Error toggling audio:', error);
  //   }
  // };

  // const handleToggleVideo = async () => {
  //   try {
  //     if (client?.self) {
  //       const newState = !isVideoEnabled;
  //       client.self.videoEnabled = newState;
  //       setIsVideoEnabled(newState);
  //     } else if (localStream) {
  //       const videoTracks = localStream.getVideoTracks();
  //       videoTracks.forEach(track => {
  //         track.enabled = !track.enabled;
  //       });
  //       setIsVideoEnabled(!isVideoEnabled);
  //     }
  //   } catch (error) {
  //     console.error('Error toggling video:', error);
  //   }
  // };

  // const handleScreenShare = async () => {
  //   try {
  //     const displayStream = await navigator.mediaDevices.getDisplayMedia({
  //       video: true,
  //       audio: true
  //     });
      
  //     // Handle screen sharing logic here
  //     console.log('Screen share started:', displayStream);
      
  //     // Stop screen share when user stops it
  //     displayStream.getVideoTracks()[0].onended = () => {
  //       console.log('Screen share ended');
  //     };
      
  //   } catch (error) {
  //     console.error('Screen share failed:', error);
  //   }
  // };

  // const copyMeetingId = () => {
  //   navigator.clipboard.writeText(meetingId);
  //   // You could show a toast notification here
  // };

  // Loading State
  // if (isLoading) {
    return (
      <div></div>
      // <div className="h-screen w-full bg-gray-900 flex items-center justify-center">
      //   <div className="text-center text-white">
      //     <div className="relative mb-8">
      //       <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
      //       <div className="absolute inset-0 flex items-center justify-center">
      //         <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      //           <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L3 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-1.254.145a1 1 0 11-.992-1.736L14 6l-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.152V12a1 1 0 11-2 0v-1.848l-1.246-.284a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v.277l1.254-.145a1 1 0 01.992 1.736L6 14l.23.132a1 1 0 11-.992 1.736l-1.733-.99A1.002 1.002 0 013 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a.996.996 0 01-.52.878l-1.734.99a1 1 0 11-1.364-.372l.23-.132L15 14l-.23-.132a1 1 0 01.992-1.736L17 12.277V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364.372L10 17.848l1.254-.716a1 1 0 11.992 1.736l-1.75 1a1 1 0 01-.992 0l-1.75-1a1 1 0 01.372-1.364z" clipRule="evenodd" />
      //         </svg>
      //       </div>
      //     </div>
      //     <h2 className="text-2xl font-semibold mb-4">Connecting to Meeting</h2>
      //     <p className="text-gray-300 mb-2">Meeting ID: {meetingId}</p>
      //     <div className="flex items-center justify-center text-sm text-gray-400">
      //       <div className="animate-pulse flex space-x-1">
      //         <div className="flex space-x-2">
      //           <div>Initializing SDK</div>
      //           <div className="flex space-x-1">
      //             <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
      //             <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
      //             <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  // }

  // Error State
  // if (error && connectionStatus === 'failed') {
  //   return (
  //     <div className="h-screen w-full bg-gray-900 flex items-center justify-center">
  //       <div className="text-center text-white max-w-2xl mx-auto p-8">
  //         <div className="mb-8">
  //           <svg className="w-20 h-20 text-red-500 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  //           </svg>
  //         </div>
          
  //         <h2 className="text-3xl font-bold mb-6 text-red-400">Connection Failed</h2>
  //         <p className="text-gray-300 mb-8 text-lg leading-relaxed">{error}</p>
          
  //         <div className="bg-gray-800 rounded-lg p-6 mb-8 text-left">
  //           <h3 className="text-lg font-semibold mb-4 text-yellow-400">Troubleshooting Steps:</h3>
  //           <div className="space-y-3 text-sm">
  //             <div className="flex items-start space-x-3">
  //               <span className="text-blue-400 font-mono">1.</span>
  //               <span>Install the required video SDK packages:</span>
  //             </div>
  //             <div className="ml-6 bg-gray-900 p-3 rounded text-green-400 font-mono text-xs">
  //               npm install @cloudflare/realtimekit @cloudflare/realtimekit-react-ui<br/>
  //               # OR<br/>
  //               npm install @dytesdk/web-core @dytesdk/react-ui-kit
  //             </div>
              
  //             <div className="flex items-start space-x-3 mt-4">
  //               <span className="text-blue-400 font-mono">2.</span>
  //               <span>Check your network connection and firewall settings</span>
  //             </div>
              
  //             <div className="flex items-start space-x-3">
  //               <span className="text-blue-400 font-mono">3.</span>
  //               <span>Verify the meeting token is valid (Meeting ID: <code className="text-yellow-400">{meetingId}</code>)</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //           <Button
  //             onClick={() => window.location.reload()}
  //             variant="primary"
  //             className="px-8 py-3"
  //           >
  //             Retry Connection
  //           </Button>
  //           <Button
  //             onClick={handleLeaveMeeting}
  //             variant="secondary"
  //             className="px-8 py-3"
  //           >
  //             Back to Lobby
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // Main Meeting Interface
  return (
    <div></div>
    // <div 
    //   ref={meetingContainerRef}
    //   className="h-screen w-full bg-gray-900 relative overflow-hidden cursor-none"
    //   onMouseMove={handleMouseMove}
    // >
    //   {/* SDK Info Badge */}
    //   {sdkInfo && (
    //     <div className="absolute top-4 left-4 z-50 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs">
    //       {sdkInfo.name} v{sdkInfo.version}
    //     </div>
    //   )}

    //   {/* Connection Status */}
    //   <div className="absolute top-4 right-4 z-50">
    //     <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
    //       connectionStatus === 'connected' ? 'bg-green-900 text-green-200' :
    //       connectionStatus === 'connecting' ? 'bg-yellow-900 text-yellow-200' :
    //       connectionStatus === 'failed' ? 'bg-red-900 text-red-200' :
    //       'bg-gray-900 text-gray-200'
    //     }`}>
    //       <div className={`w-2 h-2 rounded-full ${
    //         connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' :
    //         connectionStatus === 'connecting' ? 'bg-yellow-400 animate-spin' :
    //         connectionStatus === 'failed' ? 'bg-red-400' :
    //         'bg-gray-400'
    //       }`}></div>
    //       <span className="capitalize">{connectionStatus}</span>
    //     </div>
    //   </div>

    //   {/* Main Meeting Content */}
    //   <div className="h-full w-full flex flex-col">
    //     {/* Video Container */}
    //     <div className="flex-1 relative bg-gray-800">
    //       {/* Custom WebRTC Video */}
    //       {localStream && (
    //         <div className="w-full h-full flex items-center justify-center">
    //           <video
    //             ref={videoRef}
    //             autoPlay
    //             muted
    //             playsInline
    //             className="max-w-full max-h-full object-cover rounded-lg"
    //           />
    //           {!isVideoEnabled && (
    //             <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
    //               <div className="text-center text-white">
    //                 <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
    //                   <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
    //                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    //                   </svg>
    //                 </div>
    //                 <p className="text-lg">Camera is off</p>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       )}

    //       {/* SDK Video Component Placeholder */}
    //       {!localStream && client && (
    //         <div className="w-full h-full flex items-center justify-center">
    //           <div className="text-center text-white">
    //             <div className="mb-6">
    //               <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    //               </svg>
    //             </div>
    //             <h3 className="text-xl font-semibold mb-2">Meeting Connected</h3>
    //             <p className="text-gray-300 mb-4">SDK: {sdkInfo?.name}</p>
    //             <div className="text-sm text-gray-400">
    //               <p>Meeting ID: {meetingId}</p>
    //               <p>Participants: {participants.length + 1}</p>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>

    //     {/* Meeting Controls */}
    //     <div className={`
    //       absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 pb-8
    //       transition-all duration-300 ease-in-out
    //       ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}
    //     `}>
    //       {/* Meeting Info Bar */}
    //       <div className="flex justify-between items-center mb-6 text-white text-sm">
    //         <div className="flex items-center space-x-4">
    //           <span className="font-medium">Meeting: {meetingId}</span>
    //           <button
    //             onClick={copyMeetingId}
    //             className="text-gray-400 hover:text-white transition-colors"
    //             title="Copy Meeting ID"
    //           >
    //             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    //             </svg>
    //           </button>
    //         </div>
    //         <div className="flex items-center space-x-2 text-gray-400">
    //           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    //             <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
    //           </svg>
    //           <span>{participants.length + 1} participant{participants.length !== 0 ? 's' : ''}</span>
    //         </div>
    //       </div>

    //       {/* Control Buttons */}
    //       <div className="flex justify-center items-center space-x-6">
    //         {/* Audio Toggle */}
    //         <button
    //           onClick={handleToggleAudio}
    //           className={`
    //             p-4 rounded-full transition-all duration-200 hover:scale-110
    //             ${isAudioEnabled 
    //               ? 'bg-gray-700 text-white hover:bg-gray-600' 
    //               : 'bg-red-600 text-white hover:bg-red-700'
    //             }
    //           `}
    //           title={isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'}
    //         >
    //           {isAudioEnabled ? (
    //             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    //             </svg>
    //           ) : (
    //             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1m0 0V7a3 3 0 013-3h8a3 3 0 013 3v2M4 9h16m-7 6l3-3m0 0l3 3m-3-3v6" />
    //             </svg>
    //           )}
    //         </button>

    //         {/* Video Toggle */}
    //         <button
    //           onClick={handleToggleVideo}
    //           className={`
    //             p-4 rounded-full transition-all duration-200 hover:scale-110
    //             ${isVideoEnabled 
    //               ? 'bg-gray-700 text-white hover:bg-gray-600' 
    //               : 'bg-red-600 text-white hover:bg-red-700'
    //             }
    //           `}
    //           title={isVideoEnabled ? 'Stop Video' : 'Start Video'}
    //         >
    //           {isVideoEnabled ? (
    //             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    //             </svg>
    //           ) : (
    //             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
    //             </svg>
    //           )}
    //         </button>

    //         {/* Screen Share */}
    //         <button
    //           onClick={handleScreenShare}
    //           className="p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200 hover:scale-110"
    //           title="Share Screen"
    //         >
    //           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    //           </svg>
    //         </button>

    //         {/* Settings */}
    //         <button
    //           className="p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200 hover:scale-110"
    //           title="Settings"
    //         >
    //           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    //           </svg>
    //         </button>

    //         {/* Leave Meeting */}
    //         <button
    //           onClick={handleLeaveMeeting}
    //           className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all duration-200 hover:scale-110"
    //           title="Leave Meeting"
    //         >
    //           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l3 3m-3-3l3-3m5 3a9 9 0 11-18 0 9 9 0 0118 0z" />
    //           </svg>
    //         </button>
    //       </div>

    //       {/* Additional Controls Row */}
    //       <div className="flex justify-center items-center space-x-4 mt-4">
    //         <button
    //           className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
    //           title="Chat"
    //         >
    //           💬 Chat
    //         </button>
    //         <button
    //           className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
    //           title="Participants"
    //         >
    //           👥 Participants ({participants.length + 1})
    //         </button>
    //         <button
    //           className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
    //           title="More Options"
    //         >
    //           ⋯ More
    //         </button>
    //       </div>
    //     </div>

    //     {/* Participants Sidebar (Hidden by default, can be toggled) */}
    //     <div className="absolute right-0 top-0 h-full w-80 bg-gray-800 transform translate-x-full transition-transform duration-300 z-40">
    //       <div className="p-6">
    //         <h3 className="text-white text-lg font-semibold mb-4">Participants</h3>
    //         <div className="space-y-3">
    //           {/* Local User */}
    //           <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
    //             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
    //               You
    //             </div>
    //             <div className="flex-1">
    //               <p className="text-white font-medium">You</p>
    //               <p className="text-gray-400 text-sm">Host</p>
    //             </div>
    //             <div className="flex space-x-1">
    //               <div className={`w-2 h-2 rounded-full ${isAudioEnabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
    //               <div className={`w-2 h-2 rounded-full ${isVideoEnabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
    //             </div>
    //           </div>

    //           {/* Other Participants */}
    //           {participants.map((participant, index) => (
    //             <div key={participant.id || index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
    //               <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-medium">
    //                 {participant.name?.charAt(0).toUpperCase() || 'U'}
    //               </div>
    //               <div className="flex-1">
    //                 <p className="text-white font-medium">{participant.name || 'Unknown User'}</p>
    //                 <p className="text-gray-400 text-sm">Participant</p>
    //               </div>
    //               <div className="flex space-x-1">
    //                 <div className="w-2 h-2 rounded-full bg-gray-500"></div>
    //                 <div className="w-2 h-2 rounded-full bg-gray-500"></div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Meeting Recording Indicator */}
    //     {false && ( // Set to true when recording is active
    //       <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50">
    //         <div className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 animate-pulse">
    //           <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
    //           <span className="text-sm font-medium">Recording</span>
    //         </div>
    //       </div>
    //     )}

    //     {/* Network Quality Indicator */}
    //     <div className="absolute top-16 right-4 z-50">
    //       <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full flex items-center space-x-2">
    //         <div className="flex space-x-1">
    //           <div className="w-1 h-3 bg-green-400 rounded-full"></div>
    //           <div className="w-1 h-4 bg-green-400 rounded-full"></div>
    //           <div className="w-1 h-5 bg-green-400 rounded-full"></div>
    //           <div className="w-1 h-2 bg-gray-600 rounded-full"></div>
    //         </div>
    //         <span className="text-xs">Good</span>
    //       </div>
    //     </div>

    //     {/* Toast Notifications Area */}
    //     <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
    //       {/* Example toast - would be managed by state */}
    //       {false && (
    //         <div className="bg-black bg-opacity-75 text-white px-6 py-3 rounded-lg shadow-lg">
    //           <p className="text-sm">Meeting ID copied to clipboard!</p>
    //         </div>
    //       )}
    //     </div>

    //     {/* Keyboard Shortcuts Help (Hidden by default) */}
    //     {false && ( // Toggle with a state variable
    //       <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
    //         <div className="bg-gray-800 text-white p-8 rounded-xl max-w-md w-full mx-4">
    //           <h3 className="text-xl font-semibold mb-6">Keyboard Shortcuts</h3>
    //           <div className="space-y-3 text-sm">
    //             <div className="flex justify-between">
    //               <span>Toggle Audio</span>
    //               <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">M</kbd>
    //             </div>
    //             <div className="flex justify-between">
    //               <span>Toggle Video</span>
    //               <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">V</kbd>
    //             </div>
    //             <div className="flex justify-between">
    //               <span>Share Screen</span>
    //               <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">S</kbd>
    //             </div>
    //             <div className="flex justify-between">
    //               <span>Leave Meeting</span>
    //               <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Ctrl+L</kbd>
    //             </div>
    //             <div className="flex justify-between">
    //               <span>Show/Hide Controls</span>
    //               <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Space</kbd>
    //             </div>
    //           </div>
    //           <button
    //             className="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
    //             onClick={() => {/* Close shortcuts modal */}}
    //           >
    //             Got it
    //           </button>
    //         </div>
    //       </div>
    //     )}

    //     {/* Mobile Touch Controls Indicator */}
    //     <div className="md:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
    //       <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-xs animate-bounce">
    //         Tap screen to show controls
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default MeetingRoom;