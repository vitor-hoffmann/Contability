// src/services/auth.service.ts
export interface LoginResponse {
  token: string;
}

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<LoginResponse | null> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data: LoginResponse = await response.json();

      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }

  static logout() {
    localStorage.removeItem("token");
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  static getToken(): string | null {
    return localStorage.getItem("token");
  }

  static async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch("/api/validate-token", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data.valid;
    } catch (error) {
      console.error("Erro ao validar o token:", error);
      return false;
    }
  }
}
