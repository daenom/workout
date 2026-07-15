package com.daenom.workout.service;

import java.util.List;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.CreateProgramResponse;
import com.daenom.workout.dto.program.ProgramDetails;
import com.daenom.workout.dto.program.ProgramResponse;
import com.daenom.workout.entity.Program;

public interface ProgramService {
    CreateProgramResponse createProgram(CreateProgramRequest request, String email);

    List<Program> getAllPrograms();

    ProgramResponse getProgramById(Long id);

    Program updateProgram(Long id, CreateProgramRequest request);

    void deleteProgram(Long id);

    ProgramDetails getProgramDetailsById(Long id);
}
