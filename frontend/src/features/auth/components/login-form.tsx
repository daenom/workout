import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";

// Import your login validation schema and types
import { loginSchema, type LoginFormValues } from "../schemas/login-schema";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "./auth-header";
import { useLogin } from "../hooks/useLogin";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth-store";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    try{
      const user = await loginMutation.mutateAsync(data);
      console.log("Login successful:", user);
      toast.success("Login successful!");

      const setUser = useAuthStore.getState().setUser;
      localStorage.setItem("token", user.accessToken);
      setUser({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      });

      navigate("/exercises", { replace: true });
      
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
      // Handle login failure (e.g., show error message)
    }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldSet>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <AuthHeader />
              <FieldDescription>
                Don&apos;t have an account? <NavLink to="/signup">Sign up</NavLink>
              </FieldDescription>
            </div>

            {/* Email Field */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </Field>

            {/* Submit Button */}
            <Field>
              <Button type="submit" className="py-4" disabled={isSubmitting}>
                {isSubmitting ? <><Spinner/>Signing in</>: "Sign in"}
              </Button>
            </Field>
          </FieldGroup>
          
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </FieldSet>
      </form>
    </div>
  );
}