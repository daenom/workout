package com.daenom.workout.dto.exercise;


public record CreateExerciseRequest (
    String name,
    String description,
    String instructions
) {
    
}
