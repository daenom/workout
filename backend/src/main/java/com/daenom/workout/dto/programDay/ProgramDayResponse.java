package com.daenom.workout.dto.programDay;

import com.daenom.workout.model.enums.ProgramDayType;

public record ProgramDayResponse(
    Long id,
    String name,
    String description,
    ProgramDayType programDayType,
    int orderIndex
) {
}
