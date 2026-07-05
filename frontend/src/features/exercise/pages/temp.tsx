import { useState } from "react"
import { MultiSelect } from "@/features/exercise/components/multi"
import { Activity } from "lucide-react"

export default function MyCustomPage() {
  // 1. Create a state to hold the selected values
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])

  // 2. Define your options
  const MUSCLE_OPTIONS = [
    { label: "Chest", value: "chest" },
    { label: "Legs", value: "legs" },
    { label: "Core", value: "core" },
    { label: "Shoulders", value: "shoulders" },
    { label: "Back", value: "back" },
  ]

  return (
    <div className="p-8">
      {/* 3. Drop it in! */}
      <MultiSelect 
        title="Muscles"
        icon={<Activity className="h-4 w-4" />}
        options={MUSCLE_OPTIONS}
        value={selectedMuscles}
        onValueChange={setSelectedMuscles}
      />
    </div>
  )
}