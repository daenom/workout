package com.daenom.workout.dto.programDay;

import java.util.List;

import com.daenom.workout.dto.programDayExercise.ProgramDayExerciseResponse;
import com.daenom.workout.model.enums.ProgramDayType;

public record ProgramDayResponse(
    Long id,
    String name,
    String description,
    ProgramDayType programDayType,
    int orderIndex,
    List<ProgramDayExerciseResponse> exercises
) {
}
