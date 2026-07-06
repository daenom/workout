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
  id: string;
  slug: string;
  name: string;
  imageUrl?: string;

  focus: ExerciseFocus;
  equipment: Equipment;
  primaryMuscleGroup: MuscleGroup;
  difficulty: ExerciseDifficulty;

  description: string;
  steps: string[];
  cues: string[];
};