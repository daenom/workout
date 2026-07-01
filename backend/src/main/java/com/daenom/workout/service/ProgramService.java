package com.daenom.workout.service;

import java.util.List;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.ProgramDetails;
import com.daenom.workout.entity.Program;

public interface ProgramService {
    Program createProgram(CreateProgramRequest request);

    List<Program> getAllPrograms();

    Program getProgramById(Long id);

    Program updateProgram(Long id, CreateProgramRequest request);

    void deleteProgram(Long id);

    ProgramDetails getProgramDetailsById(Long id);
}
