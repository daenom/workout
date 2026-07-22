package com.daenom.workout.dto.program;

import java.util.List;

import com.daenom.workout.dto.programDay.CreateProgramDayRequest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record CreateProgramRequest(
    @NotBlank(message = "Program name is required")
    String name,

    String description,

    @Valid
    List<CreateProgramDayRequest> days
) {
    
}
