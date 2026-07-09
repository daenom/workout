import { useQuery } from "@tanstack/react-query";
import { getAllExercises } from "./exercise-api";

export function useExercises() {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: getAllExercises,
  });
}