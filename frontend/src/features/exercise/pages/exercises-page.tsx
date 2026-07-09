import { ExerciseList } from "../components/exercise-list";
import { ExerciseSearch } from "../components/exercise-search";
import { useState } from "react";
import { useExercises } from "../api/exercise-queries";
import { LoadingPage } from "./loading-page";

export function ExercisesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: exercises = [],
        isLoading,
        isError,
    } = useExercises();

    if (isLoading) {
        return <LoadingPage />;
    }

    // if (isError) {
    //     return <p>Failed to load exercises.</p>;
    // }
    
    const filteredExercises = exercises.filter((exercise) =>{
        const query = searchQuery.toLowerCase();
        return (
            exercise.name.toLowerCase().includes(query) ||
            exercise.primaryMuscleGroup.toLowerCase().includes(query) ||
            exercise.equipment.toLowerCase().includes(query) 
        );
    }
    );

    return (
        <div className="flex flex-col gap-2">
            <ExerciseSearch 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ExerciseList exercises={filteredExercises} />
        </div>
    )
}