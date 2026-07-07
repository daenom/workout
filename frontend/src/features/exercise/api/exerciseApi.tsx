import { api } from "@/lib/apiClient";
import type { Exercise } from "../types";

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAllExercises() {
  // await delay(5000);

  const response = await api.get<Exercise[]>("/exercises/all");
  return response.data;
}   