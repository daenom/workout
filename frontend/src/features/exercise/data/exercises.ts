import type { Exercise } from "@/features/exercise/types";

export const exercises: Exercise[] = [
  {
    id: "1",
    slug: "bench-press",
    name: "Bench Press",
    image: "https://images.ctfassets.net/8urtyqugdt2l/2bMyO0jZaRJjfRptw60iwG/17c391156dd01ae6920c672cc2744fb1/desktop-bench-press.jpg",
    focus: "Hypertrophy",
    equipment: "Barbell",
    muscleGroup: "Chest",
    difficulty: "Intermediate",
    setsReps: "4 × 8",
    rest: "90 sec",
    duration: "15 min",
    description: "A compound exercise for building chest strength and size.",
    steps: [
      "Lie flat on the bench.",
      "Grip the bar slightly wider than shoulder width.",
      "Lower to the chest.",
      "Press until arms are locked out."
    ],
    cues: [
      "Keep your feet planted.",
      "Retract your shoulder blades.",
      "Control the descent."
    ],
    benefits: [
      "Builds chest strength",
      "Develops triceps",
      "Improves pressing power"
    ]
  },
  {
    id: "2",
    slug: "barbell-squat",
    name: "Barbell Squat",
    image: "https://hips.hearstapps.com/hmg-prod/images/man-training-with-weights-royalty-free-image-1718637105.jpg?crop=0.88931xw:1xh;center,top&resize=1200:*",
    focus: "Strength",
    equipment: "Barbell",
    muscleGroup: "Legs",
    difficulty: "Intermediate",
    setsReps: "5 × 5",
    rest: "2 min",
    duration: "20 min",
    description: "The king of lower body exercises.",
    steps: [],
    cues: [],
    benefits: []
  },
  {
    id: "3",
    slug: "deadlift",
    name: "Deadlift",
    image: "https://blogscdn.thehut.net/wp-content/uploads/sites/495/2018/10/25171220/Blog-Deadlifting-Male_1800x672_1200x672_acf_cropped.jpg",
    focus: "Strength",
    equipment: "Barbell",
    muscleGroup: "Back",
    difficulty: "Advanced",
    setsReps: "5 × 5",
    rest: "2-3 min",
    duration: "20 min",
    description: "A full-body compound pulling movement.",
    steps: [],
    cues: [],
    benefits: []
  },
  {
    id: "4",
    slug: "goblet-squat",
    name: "Goblet Squat",
    image: "https://row.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F8urtyqugdt2l%2F56AQL6OUTCfTjfSzcmkl3r%2Fe86840c8ea82de5a79f0439fd15cff7c%2Fgoblet-squat.jpg&w=3840&q=85",
    focus: "Hypertrophy",
    equipment: "Dumbbell",
    muscleGroup: "Legs",
    difficulty: "Beginner",
    setsReps: "3 × 12",
    rest: "60 sec",
    duration: "12 min",
    description: "Excellent beginner squat variation.",
    steps: [],
    cues: [],
    benefits: []
  },
  {
    id: "5",
    slug: "plank",
    name: "Plank",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUYjMR2dsVSQyEZiv3d_z3zV43gri-H2r45dMnuABVdpXFyKUXdn_HS1V1&s=10",
    focus: "Core",
    equipment: "Bodyweight",
    muscleGroup: "Core",
    difficulty: "Beginner",
    setsReps: "3 sets",
    rest: "45 sec",
    duration: "30 sec hold",
    description: "Static core stabilization exercise.",
    steps: [],
    cues: [],
    benefits: []
  },
  {
    id: "6",
    slug: "cable-face-pull",
    name: "Cable Face Pull",
    image: "https://www.newbodyplan.co.uk/wp-content/uploads/2022/12/cable_face_pull_muscular_man_gym_shoulder_training_machine_strong.jpg",
    focus: "Mobility",
    equipment: "Cable",
    muscleGroup: "Shoulders",
    difficulty: "Beginner",
    setsReps: "3 × 15",
    rest: "60 sec",
    duration: "10 min",
    description: "Improves posture and shoulder health.",
    steps: [],
    cues: [],
    benefits: []
  }
];