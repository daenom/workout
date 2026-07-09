interface ExerciseListHeaderProps {
    count: number;
}

export function ExerciseListHeader({
    count,
}: ExerciseListHeaderProps) {
    return (
        <div className="flex items-center justify-between p-2 px-4">
            <span className="text-md font-semibold text-muted-foreground">
                Available Exercises
            </span>

            <span className="text-xs text-muted-foreground">
                Showing {count} results
            </span>
        </div>
    );
}