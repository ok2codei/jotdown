export interface LoginFormData {
  email: string;
  password: string;
}

 export interface RegisterFormData {
  username : string;
  email : string;
  password: string;
}


export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T; // This T will be AuthResponse, Note, or Note[]
}

export interface AuthData {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}