import { useCallback, useMemo, useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { ExerciseCard } from "@/features/exercise/components/ExerciseCard";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Activity, Dumbbell, FunnelXIcon, ListFilterIcon, Search, Target, X } from "lucide-react";
import type { Exercise } from "@/features/exercise/types";
import { Button } from "@/components/ui/button";
import { AddExerciseForm } from "@/features/exercise/components/AddExercise";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Import your custom filter components
import { Filters, type Filter, type FilterFieldConfig } from "@/components/reui/filters";
import { useExercises } from "../api/exerciseQueries";
import { ExerciseSkeletonCard } from "../components/ExerciseSkeletonCard";

export default function ExercisesPage() {
    const {data: exercises, isLoading, isError, error} = useExercises();
    const exercisesData: Exercise[] = exercises || [];
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

    const uniqueFocuses = useMemo(() => Array.from(new Set(exercisesData.map(e => e.focus))), [exercisesData]);
    const uniqueMuscles = useMemo(() => Array.from(new Set(exercisesData.map(e => e.primaryMuscleGroup))), [exercisesData]);
    const uniqueEquipment = useMemo(() => Array.from(new Set(exercisesData.map(e => e.equipment))), [exercisesData]);

    // Base configuration for your fields
    const filterFields: FilterFieldConfig[] = useMemo(() => [
        {
            key: "focus",
            label: "Focus",
            icon: <Target className="size-3.5" />,
            type: "multiselect",
            options: uniqueFocuses.map(f => ({ value: f, label: f })),
            // TIP: If your library supports these props, uncomment them:
            // searchable: false,
            // hideOperator: true,
            // defaultOperator: "is_any_of"
        },
        {
            key: "muscles",
            label: "Muscles",
            icon: <Activity className="size-3.5" />,
            type: "multiselect",
            options: uniqueMuscles.map(m => ({ value: m, label: m })),
        },
        {
            key: "equipment",
            label: "Equipment",
            icon: <Dumbbell className="size-3.5" />,
            type: "multiselect",
            options: uniqueEquipment.map(e => ({ value: e, label: e })),
        },
    ], [uniqueFocuses, uniqueMuscles, uniqueEquipment]);

    // FIX 1: Prevent duplicate filters
    // This computes a list of fields that have NOT been selected yet.
    const availableFields = useMemo(() => {
        return filterFields.filter(
            (field) => !activeFilters.some((active) => active.id === field.key)
        );
    }, [filterFields, activeFilters]);

    const handleFiltersChange = useCallback((newFilters: Filter[]) => {
        setActiveFilters(newFilters);
    }, []);

    // 4. Apply the dynamic filters to the exercise list
    const filteredExercises = useMemo(() => {
        return exercisesData.filter((exercise) => {
            // Check Text Search
            const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exercise.description.toLowerCase().includes(searchQuery.toLowerCase());

            // FIX: Change .id to .field right here!
            const selectedFocuses = (activeFilters.find(f => f.field === "focus")?.values as string[]) || [];
            const selectedMuscles = (activeFilters.find(f => f.field === "muscles")?.values as string[]) || [];
            const selectedEquipment = (activeFilters.find(f => f.field === "equipment")?.values as string[]) || [];

            // Check against selected dynamic filters
            const matchesFocus = selectedFocuses.length === 0 || selectedFocuses.includes(exercise.focus);
            const matchesMuscle = selectedMuscles.length === 0 || selectedMuscles.includes(exercise.primaryMuscleGroup);
            const matchesEquipment = selectedEquipment.length === 0 || selectedEquipment.includes(exercise.equipment);

            return matchesSearch && matchesFocus && matchesMuscle && matchesEquipment;
        });
    }, [exercisesData, searchQuery, activeFilters]);

    const TopSection = (
        <div className="flex w-full flex-col gap-4 py-2">
            <InputGroup>
                <InputGroupAddon>
                    <Search className="h-4 w-4 text-muted-foreground" />
                </InputGroupAddon>

                <InputGroupInput
                    placeholder="Search exercises"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    /* FIX 2: Drop mobile keyboard on Enter */
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.currentTarget.blur();
                        }
                    }}
                />

                {/* FIX 1: Clear button (only renders if searchQuery has text) */}
                {searchQuery && (
                    <InputGroupAddon align="inline-end" className="pr-3">
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none "
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </InputGroupAddon>
                )}
            </InputGroup>

            <div className="flex flex-wrap items-center gap-2">
                <Filters
                    filters={activeFilters}
                    fields={availableFields}
                    //   showSearchInput={false}
                    trigger={
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-dashed"
                            disabled={availableFields.length === 0}
                        >
                            <ListFilterIcon className="mr-2 h-4 w-4" />
                            Add Filter
                        </Button>
                    }
                    onChange={handleFiltersChange}
                />

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            Add Exercise
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-background/80 backdrop-blur-lg py-6 shadow-xl">
                        <AddExerciseForm />
                    </DialogContent>
                </Dialog>

                {activeFilters.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveFilters([])}
                        className="h-8 text-muted-foreground"
                    >
                        <FunnelXIcon className="mr-2 h-4 w-4" />
                        Clear filters
                    </Button>
                )}
            </div>
        </div>
    );


    // --- MAIN CONTENT AREA ---
    const MainSection = (
        // REMOVED: h-full and w-full. Just let it act as a normal flex column block.
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-4 pt-1">
                <span className="text-md font-semibold text-muted-foreground">
                    Available Exercises
                </span>
                <span className="text-xs text-muted-foreground">
                    Showing {filteredExercises.length} results
                </span>
            </div>

            {filteredExercises.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg p-8 text-center min-h-[300px]">
                    <p className="text-sm font-medium text-muted-foreground">No matching exercises found.</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Try adjusting your filters or expanding your search query.</p>
                </div>
            ) : (
                // REMOVED: overflow-y-auto. The PageWrapper will handle the scrolling!
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 pr-1">
                    {filteredExercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <PageWrapper
            topContent={TopSection}
            mainContent={MainSection}
        />
    );
}