import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../api/signup";

export function useSignup() {
  return useMutation({
    mutationFn: signupUser,
  });
}