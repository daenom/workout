package com.daenom.workout.service;

import java.util.List;

import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.entity.ProgramDayExercise;

public interface ProgramDayExerciseService {
    ProgramDayExercise createProgramDayExercise(CreateProgramDayExerciseRequest request);

    List<ProgramDayExercise> getProgramDayExercises(Long programDayId);

    ProgramDayExercise getProgramDayExerciseById(Long id);

    ProgramDayExercise updateProgramDayExercise(Long id, CreateProgramDayExerciseRequest request);

    void deleteProgramDayExercise(Long id);
}
