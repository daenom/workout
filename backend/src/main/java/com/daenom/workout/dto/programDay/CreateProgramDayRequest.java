package com.daenom.workout.dto.programDay;

import com.daenom.workout.model.enums.ProgramDayType;

public record CreateProgramDayRequest(
    String name,
    Long programId,
    String description,
    ProgramDayType programDayType,
    int orderIndex
) {
}