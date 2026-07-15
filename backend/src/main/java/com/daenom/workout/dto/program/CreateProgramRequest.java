package com.daenom.workout.dto.program;

import java.util.List;

import com.daenom.workout.dto.programDay.CreateProgramDayRequest;

public record CreateProgramRequest(
    String name,
    String description,
    List<CreateProgramDayRequest> days
) {
    
}
