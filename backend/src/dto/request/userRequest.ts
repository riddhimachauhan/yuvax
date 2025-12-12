// dto/request/userRequest.ts
export interface UserRegisterRequest {
  full_name: string;
  age?: string;
  date_of_birth?: string; // ISO Date
  gender: "female" | "male";
  phone: string;
  email: string;
  password: string;
  role?: "Student" | "Teacher" | "Admin" | "SuperAdmin" | "Sales";
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserUpdateRequest {
  full_name?: string;
  age?: string;
  country?: string;
  parents_name?: string;
  zone?: string;
  is_active?: boolean;
  role?: "Student" | "Teacher" | "Admin" | "SuperAdmin" | "Sales";
}