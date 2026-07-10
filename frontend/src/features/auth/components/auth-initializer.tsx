import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-auth";
import { useAuthStore } from "../store/auth-store";

export default function AuthInitializer() {
  const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useCurrentUser({
    enabled: !!token,
  });

  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (data) {
      setUser(data);
    }

    if (isError) {
      logout();
    }
  }, [data, isError, setUser, logout]);

  if (token && isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}