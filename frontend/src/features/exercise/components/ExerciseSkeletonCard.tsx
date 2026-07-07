import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function ExerciseSkeletonCard() {
  return (
    <Card className="overflow-hidden pt-0 animate-pulse">
      {/* Image */}
      <Skeleton className="aspect-[16/8] w-full rounded-none" />

      <CardHeader>
        {/* Focus badge */}
        <div className="flex justify-end">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Description */}
        <Skeleton className="hidden h-4 w-full sm:block" />
      </CardHeader>

      <CardContent className="pb-2 sm:pb-0">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="hidden sm:flex">
        <div className="flex w-full gap-2">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
}