declare namespace API {
  interface UserInfo {
    userId?: string;
    userName?: string;
    avatar?: string;
    isAdmin?: boolean;
    access: {
      isPlatformAdmin?: boolean;
      isBarSupperAdmin?: boolean;
      isBarViceAdmin?: boolean;
    };
  }
}
