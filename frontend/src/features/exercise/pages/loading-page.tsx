import { ExerciseListHeader } from "../components/exercise-list-header";
import { ExerciseSearch } from "../components/exercise-search";
import { ExerciseCardSkeleton } from "../components/exercise-skeleton";

export function LoadingPage() {
    return (
        <div className="flex flex-col gap-2">
            <ExerciseSearch searchQuery="" setSearchQuery={() => {}} />
            <div className="flex flex-col mx-auto w-full max-w-3xl sm:border rounded-xl gap-2 sm:p-2">
                <ExerciseListHeader count={0} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <ExerciseCardSkeleton />
                    <ExerciseCardSkeleton />
                    <ExerciseCardSkeleton />
                    <ExerciseCardSkeleton />
                </div>
            </div>
        </div>
    );
}