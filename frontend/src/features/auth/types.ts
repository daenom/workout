export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}

export interface UserResponse {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}