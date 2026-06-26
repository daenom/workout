package com.daenom.workout.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daenom.workout.dto.exercise.CreateExerciseRequest;
import com.daenom.workout.dto.exercise.ExerciseResponse;
import com.daenom.workout.entity.Exercise;
import com.daenom.workout.exception.DuplicateResourceException;
import com.daenom.workout.exception.ResourceNotFoundException;
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
                throw new DuplicateResourceException("Exercise already exists with name: " + request.name());
            });

        Exercise exercise = exerciseMapper.toEntity(request);
        Exercise savedExercise = exerciseRepository.save(exercise);
        return exerciseMapper.toResponse(savedExercise);
    }

    @Override
    public List<ExerciseResponse> getAllExercises() {
        List<Exercise> exercises = exerciseRepository.findAll();
        return exercises.stream()
                .map(exerciseMapper::toResponse)
                .toList();
    }

    @Override
    public ExerciseResponse getExerciseById(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id: " + id));
        return exerciseMapper.toResponse(exercise);
    }

    @Override
    public ExerciseResponse updateExercise(Long id, CreateExerciseRequest request) {
        Exercise existingExercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id: " + id));

        existingExercise.setName(request.name());
        existingExercise.setDescription(request.description());
        existingExercise.setInstructions(request.instructions());

        Exercise updatedExercise = exerciseRepository.save(existingExercise);
        return exerciseMapper.toResponse(updatedExercise);
    }

    @Override
    public void deleteExercise(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id: " + id));
        exerciseRepository.delete(exercise);
    }
}
