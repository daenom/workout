export type ExerciseFocus =
  | "Strength"
  | "Hypertrophy"
  | "Mobility"
  | "Core"
  | "Conditioning";

export type ExerciseDifficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type MuscleGroup =
  | "Chest"
  | "Back"
  | "Shoulders"
  | "Biceps"
  | "Triceps"
  | "Legs"
  | "Glutes"
  | "Core"
  | "Full Body";

export type Equipment =
  | "Barbell"
  | "Dumbbell"
  | "Kettlebell"
  | "Cable"
  | "Machine"
  | "Bodyweight"
  | "Resistance Band";

export type Exercise = {
  slug: string;
  name: string;
  image?: string;

  focus: ExerciseFocus;
  equipment: Equipment;
  muscleGroup: MuscleGroup;
  difficulty: ExerciseDifficulty;

  setsReps: string;
  rest: string;
  duration?: string;

  description: string;
  steps: string[];
  cues: string[];
  benefits: string[];
};