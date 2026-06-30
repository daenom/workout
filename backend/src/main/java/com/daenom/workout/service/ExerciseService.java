package com.daenom.workout.service;

import java.util.List;

import com.daenom.workout.dto.exercise.CreateExerciseRequest;
import com.daenom.workout.entity.Exercise;

public interface ExerciseService {
    Exercise createExercise(CreateExerciseRequest request);

    List<Exercise> getAllExercises();

    Exercise getExerciseById(Long id);

    Exercise updateExercise(Long id, CreateExerciseRequest request);

    void deleteExercise(Long id);
}
