import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MultiSelect } from "./multi"
import { useState } from "react"
import { DIFFICULTY, EQUIPMENTS, FOCUS, MUSCLES } from "../constants"



export function AddExerciseForm() {
  const [name, setName] = useState("")
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])
  const muscles = MUSCLES
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([])
  const equipments = EQUIPMENTS
  const [focus, setFocus] = useState<string[]>([])
  const focusOptions = FOCUS
  const [difficulty, setDifficulty] = useState<string[]>([])
  const difficultyOptions = DIFFICULTY
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")



  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-4">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Add Exercise</FieldLegend>
            <FieldDescription>
              Fill in the details for the new exercise
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">


                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Name
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="Evil Rabbit"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Slug
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="evil-rabbit"
                    value={slug || "evil-rabbit"}
                    disabled
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Image URL
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <MultiSelect
                  title="Muscles"
                    options={muscles}
                    value={selectedMuscles}
                    onValueChange={setSelectedMuscles}
                  />
                </Field>
                <Field>
                  <MultiSelect
                    title="Equipment"
                    options={equipments}
                    value={selectedEquipments}
                    onValueChange={setSelectedEquipments}
                  />
                </Field>

                <Field>
                  <MultiSelect
                    title="Focus"
                    options={focusOptions}
                    value={focus}
                    onValueChange={setFocus}
                  />
                </Field>
                <Field>
                  <MultiSelect
                    title="Difficulty"
                    options={difficultyOptions}
                    value={difficulty}
                    onValueChange={setDifficulty}
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Description
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Add the exercise description here..."
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
