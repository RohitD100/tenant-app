import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem("token", token);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return { login, logout };
};
