package com.daenom.workout.service;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.ProgramResponse;

public interface ProgramService {
    ProgramResponse createProgram(CreateProgramRequest request);
}
