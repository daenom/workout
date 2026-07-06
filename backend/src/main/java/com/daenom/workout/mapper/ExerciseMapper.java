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
                .imageUrl(request.imageUrl())
                .description(request.description())
                .primaryMuscleGroup(request.primaryMuscleGroup())
                .equipment(request.equipment())
                .focus(request.focus())
                .difficulty(request.difficulty())
                .steps(request.steps())
                .cues(request.cues())
                .build();
    }

    public ExerciseResponse toResponse(Exercise exercise) {
        return new ExerciseResponse(
                exercise.getId(),
                exercise.getName(),
                exercise.getSlug()
        );
    }
}
