package com.daenom.workout.service;

import java.util.List;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.ProgramResponse;

public interface ProgramService {
    ProgramResponse createProgram(CreateProgramRequest request);

    List<ProgramResponse> getAllPrograms();

    ProgramResponse getProgramById(Long id);

    ProgramResponse updateProgram(Long id, CreateProgramRequest request);

    void deleteProgram(Long id);
}
