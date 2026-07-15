package com.daenom.workout.dto.program;

import java.time.LocalDateTime;
import java.util.List;

import com.daenom.workout.dto.programDay.ProgramDayResponse;

public record ProgramResponse(
    Long id,
    String name,
    String description,
    String creator,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    List<ProgramDayResponse> days
) {

}