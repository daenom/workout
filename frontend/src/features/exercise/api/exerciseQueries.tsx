import { useQuery } from "@tanstack/react-query";
import { getAllExercises } from "./exerciseApi";

export function useExercises() {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: getAllExercises,
  });
}