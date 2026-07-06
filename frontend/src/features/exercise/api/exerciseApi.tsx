import { api } from "@/lib/apiClient";
import type { Exercise } from "../types";

export async function getAllExercises() {
  const response = await api.get<Exercise[]>("/exercises/all");
  return response.data;
}   