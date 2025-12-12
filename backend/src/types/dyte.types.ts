// export interface DyteMeetingConfig {
//     title: string;
//     preferred_region?: string;
//     record_on_start?: boolean;
//     live_stream_on_start?: boolean;
// }

// export interface DyteParticipantConfig {
//     name: string;
//     picture?: string;
//     preset_name?: string;
//     custom_participant_id?: string;
//     userId?: string;
// }

// export interface DyteMeetingResponse {
//     data: {
//         id: string;
//         title: string;
//         status: string;
//         created_at: string;
//         updated_at: string;
//     };
// }

// export interface DyteParticipantResponse {
//     data: {
//         id: string;
//         user_id: string;
//         name: string;
//         picture: string;
//         token: string;
//     };
// }

// // export interface DyteApiResponse<T> {
// //     success: boolean;
// //     data: T;
// // }

// export interface CreateMeetingRequest {
//     title?: string;
// }

// export interface JoinMeetingResponse {
//     success: boolean;
//     authToken?: string;
//     meetingId?: string;
//     message?: string;
//     error?: string;
// }

// export interface CreateMeetingResponse {
//     success: boolean;
//     meeting?: {
//         id: string;
//         title: string;
//         status: string;
//     };
//     message?: string;
//     error?: string;
// }
// export interface DyteApiConfig {
//   orgId: string;
//   apiKey: string;
//   baseUrl: string;
// }

// export interface CreateMeetingRequest {
//   title: string;
//   preferred_region?: string;
//   record_on_start?: boolean;
//   live_stream_on_start?: boolean;
//   max_participants?: number;
// }

// export interface CreateMeetingResponse {
//   success: boolean;
//   data: {
//     id: string;
//     title: string;
//     status: string;
//     preferred_region: string;
//     record_on_start: boolean;
//     live_stream_on_start: boolean;
//     created_at: string;
//     updated_at: string;
//   };
// }

// export interface AddParticipantRequest {
//   name: string;
//   picture?: string;
//   preset_name?: string;
//   custom_participant_id?: string;
// }

// export interface AddParticipantResponse {
//   success: boolean;
//   data: {
//     id: string;
//     user_id: string;
//     name: string;
//     picture: string;
//     preset_name: string;
//     token: string;
//   };
// }

// export interface GetMeetingResponse {
//   success: boolean;
//   data: {
//     id: string;
//     title: string;
//     status: string;
//     preferred_region: string;
//     record_on_start: boolean;
//     live_stream_on_start: boolean;
//     created_at: string;
//     updated_at: string;
//   };
// }

// export interface DyteErrorResponse {
//   success: false;
//   message: string;
//   errors?: any[];
// }

// export type DyteApiResponse<T> = T | DyteErrorResponse;
export interface DyteApiConfig {
    orgId: string;
    apiKey: string;
    baseUrl: string;
}

export interface CreateMeetingRequest {
    title: string;
    preferred_region?: string;
    record_on_start?: boolean;
    live_stream_on_start?: boolean;
    max_participants?: number;
}

export interface CreateMeetingResponse {
    success: boolean;
    data: {
        id: string;
        title: string;
        status: string;
        preferred_region: string;
        record_on_start: boolean;
        live_stream_on_start: boolean;
        created_at: string;
        updated_at: string;
    };
}

export interface AddParticipantRequest {
    name: string;
    picture?: string;
    preset_name?: string;
    custom_participant_id?: string;
}

export interface AddParticipantResponse {
    success: boolean;
    data: {
        id: string;
        user_id: string;
        name: string;
        picture: string;
        preset_name: string;
        token: string;
    };
}

export interface GetMeetingResponse {
    success: boolean;
    data: {
        id: string;
        title: string;
        status: string;
        preferred_region: string;
        record_on_start: boolean;
        live_stream_on_start: boolean;
        created_at: string;
        updated_at: string;
    };
}

export interface DyteErrorResponse {
    success: false;
    message: string;
    errors?: any[];
}

export type DyteApiResponse<T> = T | DyteErrorResponse;