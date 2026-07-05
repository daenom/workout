// import { useState } from "react"
// import {
//   ChevronDown,
//   Dumbbell,
//   Filter,
//   Flame,
//   RefreshCcw,
//   Sparkles,
//   TimerReset,
//   Target,
//   Zap,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ModeToggle } from "@/components/mode-toggle"
// import { cn } from "@/lib/utils"

// import { exerciseCatalog } from "../data/exercises"
// import type { ExerciseFocus } from "../types"

// const focusFilters: Array<ExerciseFocus | "All"> = [
//   "All",
//   "Strength",
//   "Hypertrophy",
//   "Mobility",
//   "Core",
//   "Conditioning",
// ]

// function ExercisePage() {
//   const [activeFocus, setActiveFocus] = useState<ExerciseFocus | "All">("All")

//   const visibleExercises =
//     activeFocus === "All"
//       ? exerciseCatalog
//       : exerciseCatalog.filter((exercise) => exercise.focus === activeFocus)

//   const summaryItems = [
//     {
//       label: "Exercises",
//       value: exerciseCatalog.length.toString(),
//       icon: Dumbbell,
//     },
//     {
//       label: "Categories",
//       value: focusFilters.length - 1,
//       icon: Filter,
//     },
//     {
//       label: "Average session",
//       value: "6 min",
//       icon: TimerReset,
//     },
//     {
//       label: "Top focus",
//       value: "Full catalog",
//       icon: Flame,
//     },
//   ]

//   return (
//     <main className="relative overflow-hidden px-4 py-6 text-left sm:px-6 lg:px-8 lg:py-8">
//       <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_60%),radial-gradient(circle_at_right,rgba(16,185,129,0.12),transparent_35%)]" />

//       <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
//         <section className="rounded-[2rem] border border-border/70 bg-card/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
//           <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
//             <div className="max-w-3xl space-y-4">
//               <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
//                 <Sparkles className="size-3.5" />
//                 Exercise library
//               </div>
//               <div className="space-y-3">
//                 <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
//                   Browse every exercise, with the details you need to coach or
//                   program them.
//                 </h1>
//                 <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
//                   Use the filters to narrow the catalog by training focus, then
//                   open each movement card for sets, reps, setup cues, benefits,
//                   and coaching notes.
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-wrap items-center gap-3">
//               <Button variant="outline" className="rounded-full px-4">
//                 <RefreshCcw className="size-4" />
//                 Refresh catalog
//               </Button>
//               <ModeToggle />
//             </div>
//           </div>

//           <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
//             {summaryItems.map((item) => {
//               const Icon = item.icon

//               return (
//                 <div
//                   key={item.label}
//                   className="rounded-2xl border border-border/70 bg-background/70 p-4"
//                 >
//                   <div className="flex items-center justify-between gap-3">
//                     <p className="text-sm text-muted-foreground">{item.label}</p>
//                     <Icon className="size-4 text-primary" />
//                   </div>
//                   <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
//                     {item.value}
//                   </p>
//                 </div>
//               )
//             })}
//           </div>
//         </section>

//         <section className="flex flex-col gap-4 rounded-[2rem] border border-border/70 bg-card/80 p-4 shadow-[0_20px_64px_rgba(15,23,42,0.06)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-5">
//           <div>
//             <p className="text-sm font-medium text-foreground">Filter by focus</p>
//             <p className="mt-1 text-sm text-muted-foreground">
//               Show the current set of exercises that match a training intent.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {focusFilters.map((filter) => {
//               const isActive = filter === activeFocus

//               return (
//                 <Button
//                   key={filter}
//                   type="button"
//                   variant={isActive ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setActiveFocus(filter)}
//                   className="rounded-full px-4"
//                 >
//                   {filter}
//                 </Button>
//               )
//             })}
//           </div>
//         </section>

//         <section className="grid gap-5">
//           {visibleExercises.map((exercise) => (
//             <article
//               key={exercise.slug}
//               className="rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] backdrop-blur sm:p-6"
//             >
//               <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
//                 <div className="space-y-4">
//                   <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
//                     <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-foreground/90">
//                       <Target className="size-3.5" />
//                       {exercise.focus}
//                     </span>
//                     <span className="inline-flex items-center rounded-full border border-border/70 px-3 py-1">
//                       {exercise.difficulty}
//                     </span>
//                   </div>

//                   <div className="space-y-2">
//                     <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
//                       {exercise.name}
//                     </h2>
//                     <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
//                       {exercise.description}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-3 self-start">
//                   <Button variant="outline" size="sm" className="rounded-full px-4">
//                     <Zap className="size-4" />
//                     Add to session
//                   </Button>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="secondary" size="sm" className="rounded-full px-4">
//                         More
//                         <ChevronDown className="size-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-56">
//                       <DropdownMenuItem>View setup cues</DropdownMenuItem>
//                       <DropdownMenuItem>Save to favorites</DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem>Open exercise notes</DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>

//               <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
//                 <div className="space-y-5">
//                   <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
//                     {[
//                       { label: "Equipment", value: exercise.equipment },
//                       { label: "Primary muscles", value: exercise.muscleGroup },
//                       { label: "Prescription", value: exercise.setsReps },
//                       { label: "Rest / time", value: `${exercise.rest} · ${exercise.duration}` },
//                     ].map((item) => (
//                       <div
//                         key={item.label}
//                         className="rounded-2xl border border-border/70 bg-muted/35 p-4"
//                       >
//                         <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
//                           {item.label}
//                         </p>
//                         <p className="mt-2 text-sm font-medium leading-6 text-foreground">
//                           {item.value}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="rounded-2xl border border-border/70 bg-background/70 p-4 sm:p-5">
//                     <p className="text-sm font-semibold text-foreground">How to perform</p>
//                     <ol className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
//                       {exercise.steps.map((step, index) => (
//                         <li key={step} className="flex gap-3">
//                           <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
//                             {index + 1}
//                           </span>
//                           <span>{step}</span>
//                         </li>
//                       ))}
//                     </ol>
//                   </div>
//                 </div>

//                 <aside className="space-y-4 rounded-2xl border border-border/70 bg-gradient-to-br from-muted/50 to-background/70 p-4 sm:p-5">
//                   <div>
//                     <p className="text-sm font-semibold text-foreground">Coaching cues</p>
//                     <div className="mt-3 space-y-2">
//                       {exercise.cues.map((cue) => (
//                         <div
//                           key={cue}
//                           className={cn(
//                             "rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-sm text-muted-foreground",
//                           )}
//                         >
//                           {cue}
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <p className="text-sm font-semibold text-foreground">Why it matters</p>
//                     <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
//                       {exercise.benefits.map((benefit) => (
//                         <li key={benefit} className="flex gap-3">
//                           <span className="mt-2 size-2 rounded-full bg-primary" />
//                           <span>{benefit}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </aside>
//               </div>
//             </article>
//           ))}

//           {visibleExercises.length === 0 ? (
//             <div className="rounded-[2rem] border border-dashed border-border/80 bg-card/70 p-10 text-center text-sm text-muted-foreground">
//               No exercises match the current filter.
//             </div>
//           ) : null}
//         </section>
//       </div>
//     </main>
//   )
// }

// export { ExercisePage }
