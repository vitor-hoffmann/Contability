// src/components/ProtectedRoute.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthService } from "../services/auth.service";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = AuthService.getToken();

    // Verifica se o token existe
    if (!token) {
      // Redireciona para a página de login
      router.push("/login");
      setIsLoading(false);
    } else {
      // Opcional: Chama uma API para validar o token no backend
      AuthService.validateToken(token).then((isValid) => {
        if (!isValid) {
          // Se o token não for válido, redireciona para o login
          router.push("/login");
        } else {
          // Token válido, renderiza o conteúdo protegido
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      });
    }
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>; // Exibe um estado de carregamento enquanto verifica a autenticação
  }

  if (!isAuthenticated) {
    return null; // Não renderiza nada se o usuário não estiver autenticado
  }

  return <>{children}</>; // Renderiza o conteúdo protegido
};

export default ProtectedRoute;
