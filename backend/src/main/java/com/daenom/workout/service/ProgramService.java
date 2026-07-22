package com.daenom.workout.service;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.CreateProgramResponse;
import com.daenom.workout.dto.program.ProgramResponse;

public interface ProgramService {
    ProgramResponse getProgramById(Long id, String email);
    CreateProgramResponse createProgram(CreateProgramRequest request, String email);
    CreateProgramResponse updateProgram(Long programId, CreateProgramRequest request, String email);
    void deleteProgram(Long programId, String email);
}
