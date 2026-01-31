import httpClient from "./httpClient";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user?: unknown;
}

class AuthService {
  private static instance: AuthService;

  token: string | null = null;
  user: unknown = null;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }

    this.token = localStorage.getItem("token");
    AuthService.instance = this;
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const { data } = await httpClient.post<LoginResponse>(
        "/auth/login",
        credentials,
      );

      this.token = data.token;
      this.user = data.user ?? null;

      localStorage.setItem("token", data.token);

      return data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem("token");
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getUser(): unknown {
    return this.user;
  }
}

const authService = new AuthService();
export default authService;
