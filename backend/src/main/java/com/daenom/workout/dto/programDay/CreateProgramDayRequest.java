package com.daenom.workout.dto.programDay;

import java.util.List;

import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.model.enums.ProgramDayType;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record CreateProgramDayRequest(
    @NotBlank(message = "Program day name is required")
    String name,

    String description,

    @NotNull(message = "Program day type is required")
    ProgramDayType programDayType,

    @NotNull @PositiveOrZero
    int orderIndex,

    @Valid
    List<CreateProgramDayExerciseRequest> exercises
) {
}