import type { Exercise } from "../types";
import { ExerciseCard } from "./exercise-card";
import { ExerciseListHeader } from "./exercise-list-header";

type ExerciseListProps = {
    exercises: Exercise[];
};

export function ExerciseList({ exercises }: ExerciseListProps) {
    return (
        <div className="flex flex-col mx-auto w-full max-w-3xl sm:border rounded-xl gap-2 sm:p-2">
            <ExerciseListHeader count={exercises.length} />

            {exercises.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg p-8 text-center min-h-[450px]">
                    <p className="text-sm font-medium text-muted-foreground">No matching exercises found.</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Try adjusting your filters or expanding your search query.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    {exercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </div>
            )}
            </div>
    );
}