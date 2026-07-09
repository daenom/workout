import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";

import { signupSchema, type SignupFormValues } from "../schemas/signup-schema";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "./auth-header";
import { useSignup } from "../hooks/useSignup";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const signupMutation = useSignup();
  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormValues) => {
  try {
    const user = await signupMutation.mutateAsync(data);

    console.log("Signup successful:", user);
    toast.success("Signup successful!");
    navigate("/");
    
  } catch (error) {
    console.error(error);
    
    if (error instanceof AxiosError && error.response?.status === 409) {
      toast.error("Email already registered.", {
        description: "Please log in or use a different email.",
      });
    }
    else {
      toast.error("Signup failed. Please try again.");
    }
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
                Already have an account? <NavLink to="/login">Sign in</NavLink>
              </FieldDescription>
            </div>

            {/* Name Fields */}
            <Field>
              <FieldLabel>Name</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="First Name"
                    {...register("firstname")}
                  />
                  {errors.firstname && (
                    <p className="text-xs text-red-500 mt-1">{errors.firstname.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Last Name"
                    {...register("lastname")}
                  />
                  {errors.lastname && (
                    <p className="text-xs text-red-500 mt-1">{errors.lastname.message}</p>
                  )}
                </div>
              </div>
            </Field>

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
                {isSubmitting ? "Signing up..." : "Sign up"}
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