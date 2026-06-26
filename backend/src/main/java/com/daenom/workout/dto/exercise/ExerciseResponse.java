package com.daenom.workout.dto.exercise;

public record ExerciseResponse(
        Long id,
        String name,
        String description,
        String instructions
) {

}
