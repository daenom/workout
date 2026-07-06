import type { Exercise } from "@/features/exercise/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";

import { Dumbbell, Gauge, Heart, Target } from "lucide-react";

type ExerciseCardProps = {
  exercise: Exercise;
};

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Card  className="overflow-hidden pt-0">
      <div className="relative">
        <div className="absolute inset-0 bg-black/35" />

        <img
          src={exercise.imageUrl}
          alt={exercise.name}
          className="aspect-[16/8] w-full object-cover grayscale-0 sm:grayscale brightness-75 hover:grayscale-0 hover:brightness-100 hover:translate-y-[-2px] hover:scale-[1.02] transition-all duration-300"
        />
      </div>

      <CardHeader>
        <CardAction>
          <Badge>{exercise.focus}</Badge>
        </CardAction>

        <CardTitle>{exercise.name}</CardTitle>

        <CardDescription className="hidden sm:block sm:line-clamp-1">
          {exercise.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2 sm:pb-0">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            <Target className="mr-1 h-3 w-3" />
            {exercise.primaryMuscleGroup}
          </Badge>

          <Badge variant="secondary">
            <Dumbbell className="mr-1 h-3 w-3" />
            {exercise.equipment}
          </Badge>

          <Badge variant="secondary">
            <Gauge className="mr-1 h-3 w-3" />
            {exercise.difficulty}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="hidden sm:flex">
        <div className="flex w-full items-center gap-2">
          <Button className="flex-1">
            View Details
          </Button>

          <Toggle variant="outline" size="sm">
            <Heart className="group-aria-pressed/toggle:fill-foreground" />
          </Toggle>
        </div>
      </CardFooter>
    </Card>
  );
}