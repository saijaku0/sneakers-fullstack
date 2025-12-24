export interface AuthResponce {
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface Registration extends LoginRequest {
    firstName: string;
    lastName: string;
}