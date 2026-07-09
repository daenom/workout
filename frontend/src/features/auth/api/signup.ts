import { api } from "@/lib/api-client";

export interface SignupRequest {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
}

export async function signupUser(signupData: SignupRequest) {
  const { data } = await api.post("/auth/signup", signupData);
  return data;
}