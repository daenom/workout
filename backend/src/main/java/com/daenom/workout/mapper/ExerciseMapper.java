package com.daenom.workout.mapper;

import org.springframework.stereotype.Component;

import com.daenom.workout.dto.exercise.CreateExerciseRequest;
import com.daenom.workout.dto.exercise.ExerciseResponse;
import com.daenom.workout.entity.Exercise;

@Component
public class ExerciseMapper {
    public Exercise toEntity(CreateExerciseRequest request) {
        return Exercise.builder()
                .name(request.name())
                .description(request.description())
                .instructions(request.instructions())
                .build();
    }

    public ExerciseResponse toResponse(Exercise exercise) {
        return new ExerciseResponse(
                exercise.getId(),
                exercise.getName(),
                exercise.getDescription(),
                exercise.getInstructions()
        );
    }
}
