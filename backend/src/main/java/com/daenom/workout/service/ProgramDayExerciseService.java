package com.daenom.workout.service;

import java.util.List;

import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.dto.programDayExercise.ProgramDayExerciseResponse;

public interface ProgramDayExerciseService {
    ProgramDayExerciseResponse createProgramDayExercise(CreateProgramDayExerciseRequest request);

    List<ProgramDayExerciseResponse> getProgramDayExercises(Long programDayId);

    ProgramDayExerciseResponse getProgramDayExerciseById(Long id);

    ProgramDayExerciseResponse updateProgramDayExercise(Long id, CreateProgramDayExerciseRequest request);

    void deleteProgramDayExercise(Long id);
}
