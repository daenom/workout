package com.daenom.workout.dto.program;

public record CreateProgramRequest(
    String name,
    Long userId,
    String description
) {
    
}
