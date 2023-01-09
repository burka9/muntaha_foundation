export interface LoginRequest {
  username: string,
  password: string
}

export interface LoginResponse {
  username: string,
  type: string,
  token: string
}

export interface LogoutRequest {
  username: string,
  token: string
}

export interface LogoutResponse {
  logoutCount: number
}

export interface ResumeRequest {
  username: string,
  token: string
}

export interface ResumeResponse {
  success: boolean
}
