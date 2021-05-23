declare namespace API {
  interface UserInfo {
    userId?: string;
    username?: string;
    avatar?: string;
    isAdmin?: boolean;
  }
  interface LoginRequest {
    loginType?: 'code' | 'password';
    password?: string;
    code?: string;
    phone: string;
  }
}
