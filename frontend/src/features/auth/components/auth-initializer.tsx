import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-auth";
import { useAuthStore } from "../store/auth-store";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

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
    return <div className="flex h-screen items-center justify-center">
        <Spinner/>
    </div>;
  }

  return <Outlet />;
}