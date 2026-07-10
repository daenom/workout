import { api } from "@/lib/api-client";
import type { LoginRequest, LoginResponse } from "../types";

export async function loginUser(loginData: LoginRequest) {
  const { data } = await api.post<LoginResponse>("/auth/login", loginData);
  return data;
}