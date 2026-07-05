import { useQuery } from "@tanstack/react-query";
import { getExercises } from "./exerciseApi";

export function useExercises() {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });
}