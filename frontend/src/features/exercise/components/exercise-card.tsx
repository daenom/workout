import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Exercise } from "../types"
import { Dumbbell, Gauge, Target } from "lucide-react"

type ExerciseCardProps = {
  exercise: Exercise
}

export function ExerciseCard({exercise}: ExerciseCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={exercise.imageUrl}
        alt={exercise.name}
        className="relative z-40 aspect-video w-full object-cover sm:brightness-60 sm:grayscale dark:brightness-75 sm:dark:brightness-40 hover:grayscale-0 hover:brightness-100 hover:translate-y-[-2px] hover:scale-[1.02] transition-all duration-300"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="default">{exercise.primaryMuscleGroup}</Badge>
        </CardAction>
        <CardTitle>{exercise.name}</CardTitle>
        <CardDescription className="hidden sm:block sm:line-clamp-1">
          {exercise.description}
          {!exercise.description && <span className="invisible">.</span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
                <Dumbbell className="mr-1 h-4 w-4" />
                {exercise.equipment}
            </Badge>
            <Badge variant="secondary">
                <Target className="mr-1 h-4 w-4" />
                {exercise.focus}
            </Badge>
            <Badge variant="secondary">
                <Gauge className="mr-1 h-4 w-4" />
                {exercise.difficulty}
            </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
