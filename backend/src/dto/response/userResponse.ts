// dto/response/userResponse.ts
export interface UserResponse {
  user_id: string;
  full_name: string;
  age?: string;
  date_of_birth?: string;
  gender: "female" | "male";
  phone: string;
  email: string;
  role: string;
  is_active: boolean;
  is_trial: boolean;
  created_at: string;
  updated_at: string;
}