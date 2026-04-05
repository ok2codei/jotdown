export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T; 
}

export interface LoginFormData {
  email: string;
  password: string;
}

 export interface RegisterFormData {
  username : string;
  email : string;
  password: string;
}


export interface AuthData {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

