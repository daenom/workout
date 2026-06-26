package com.daenom.workout.service;

import java.util.List;

import com.daenom.workout.dto.exercise.CreateExerciseRequest;
import com.daenom.workout.dto.exercise.ExerciseResponse;

public interface ExerciseService {
    ExerciseResponse createExercise(CreateExerciseRequest request);

    List<ExerciseResponse> getAllExercises();

    ExerciseResponse getExerciseById(Long id);

    ExerciseResponse updateExercise(Long id, CreateExerciseRequest request);

    void deleteExercise(Long id);
}
