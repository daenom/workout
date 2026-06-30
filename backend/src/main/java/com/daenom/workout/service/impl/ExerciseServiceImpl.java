package com.daenom.workout.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daenom.workout.dto.exercise.CreateExerciseRequest;
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
    public Exercise createExercise(CreateExerciseRequest request) {
        
        exerciseRepository.findByName(request.name())
                .ifPresent(exercise -> {
                throw new DuplicateResourceException("Exercise already exists with name: " + request.name());
            });

        Exercise exercise = exerciseMapper.toEntity(request);
        return exerciseRepository.save(exercise);
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id: " + id));
    }

    @Override
    public Exercise updateExercise(Long id, CreateExerciseRequest request) {
        Exercise existingExercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id: " + id));

        existingExercise.setName(request.name());
        existingExercise.setDescription(request.description());
        existingExercise.setInstructions(request.instructions());

        return exerciseRepository.save(existingExercise);
    }

    @Override
    public void deleteExercise(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id: " + id));
        exerciseRepository.delete(exercise);
    }
}
