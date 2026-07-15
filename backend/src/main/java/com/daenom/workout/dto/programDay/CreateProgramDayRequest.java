package com.daenom.workout.dto.programDay;

import java.util.List;

import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.model.enums.ProgramDayType;

public record CreateProgramDayRequest(
    String name,
    String description,
    ProgramDayType programDayType,
    int orderIndex,
    List<CreateProgramDayExerciseRequest> exercises
) {
}