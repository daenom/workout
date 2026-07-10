import { api } from "@/lib/api-client";

export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}