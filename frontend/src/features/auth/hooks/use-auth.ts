import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getCurrentUser } from "../api/me";
import type { UserResponse } from "../types";

export function useCurrentUser(
  options?: Omit<UseQueryOptions<UserResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    retry: false,
    ...options,
  });
}