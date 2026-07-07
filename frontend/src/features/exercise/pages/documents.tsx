import { Button } from "@/components/ui/button";
import { getAllExercises } from "../api/exerciseApi";
import { ExerciseSkeletonCard } from "../components/ExerciseSkeletonCard";

// src/app/pages/DocumentsPage.tsx
export default function DocumentsPage() {
  const handleClick = async () => {
    const data = await getAllExercises();

    console.log(data);       // See response in browser console
    alert(JSON.stringify(data)); // Just to verify it works
  };
  return (
    <>
      {/* 
        This content drops right into the <Outlet /> in AppLayout 
        The padding and sizing is already handled by the layout!
      */}
      <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50 flex items-center justify-center border">
        Documents Toolbar Placeholder
      </div>
      <div className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto rounded-xl border p-2 sm:[scrollbar-width:none] sm:[-ms-overflow-style:none] sm:[&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-4 pt-0">
                    <div className="flex items-center justify-between px-4 pt-1">
                        <span className="text-md font-semibold text-muted-foreground">
                            Available Exercises
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Showing results
                        </span>
                    </div>
        
                    {false ? (
                        <div className="flex flex-col items-center justify-center rounded-lg p-8 text-center min-h-[300px]">
                            <p className="text-sm font-medium text-muted-foreground">No matching exercises found.</p>
                            <p className="text-xs text-muted-foreground/70 mt-1">Try adjusting your filters or expanding your search query.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 pr-1">
                            <ExerciseSkeletonCard />
                            <ExerciseSkeletonCard />
                            <ExerciseSkeletonCard />
                            <ExerciseSkeletonCard />
                        </div>
                    )}
                </div>
      </div>
    </>
  )
}