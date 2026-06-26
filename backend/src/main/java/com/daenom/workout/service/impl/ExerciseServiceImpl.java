package com.daenom.workout.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daenom.workout.dto.exercise.CreateExerciseRequest;
import com.daenom.workout.dto.exercise.ExerciseResponse;
import com.daenom.workout.entity.Exercise;
import com.daenom.workout.exception.DuplicateResourceException;
import com.daenom.workout.mapper.ExerciseMapper;
import com.daenom.workout.repository.ExerciseRepository;
import com.daenom.workout.service.ExerciseService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ExerciseServiceImpl implements ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final ExerciseMapper exerciseMapper;
    @Override
    public ExerciseResponse createExercise(CreateExerciseRequest request) {
        
        exerciseRepository.findByName(request.name())
                .ifPresent(exercise -> {
                throw new DuplicateResourceException("Exercise already exists!");
            });

        Exercise exercise = exerciseMapper.toEntity(request);
        Exercise savedExercise = exerciseRepository.save(exercise);
        return exerciseMapper.toResponse(savedExercise);
    }

    @Override
    public List<ExerciseResponse> getAllExercises() {
        // Implementation for retrieving all exercises
        return null;
    }

    @Override
    public ExerciseResponse getExerciseById(Long id) {
        // Implementation for retrieving an exercise by ID
        return null;
    }

    @Override
    public ExerciseResponse updateExercise(Long id, CreateExerciseRequest request) {
        // Implementation for updating an exercise
        return null;
    }

    @Override
    public void deleteExercise(Long id) {
        // Implementation for deleting an exercise
    }
}
