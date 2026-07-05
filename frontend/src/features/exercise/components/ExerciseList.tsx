import { exercises } from "@/features/exercise/data/exercises";
import { ExerciseCard } from "@/features/exercise/components/ExerciseCard";
import { PageWrapper } from "@/components/page-wrapper";

function ExerciseList() {

    const topSection = (
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Exercise Library</h1>
        <p className="text-muted-foreground">
          Browse exercises by focus, equipment and muscle group.
        </p>
      </div>
    )

    // <main className="container mx-auto sm:px-6 lg:px-8">
    //   <div className="mb-8">
    //     <h1 className="text-3xl font-bold">
    //       Exercise Library
    //     </h1>

    //     <p className="text-muted-foreground">
    //       Browse exercises by focus, equipment and muscle group.
    //     </p>
    //   </div>

    const mainSection = (

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.slug}
            exercise={exercise}
          />
        ))}
      </div>)

      return (
        <PageWrapper
          topContent={topSection}
          mainContent={mainSection}
        />
      );
}

export default ExerciseList;