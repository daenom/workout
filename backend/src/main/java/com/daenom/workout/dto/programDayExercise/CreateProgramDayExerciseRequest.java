package com.daenom.workout.dto.programDayExercise;

import java.util.List;

import com.daenom.workout.model.ExerciseSet;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record CreateProgramDayExerciseRequest(
    @NotNull(message = "Exercise ID is required")
    Long exerciseId,

    @NotNull @PositiveOrZero
    Integer orderIndex,

    @Valid
    List<ExerciseSet> sets
) {
    
}
