package com.daenom.workout.dto.exercise;

import java.util.List;

public record CreateExerciseRequest (
    String name,
    String imageUrl,
    String primaryMuscleGroup,
    String equipment,
    String focus,
    String difficulty,
    String description,
    List<String> steps,
    List<String> cues
) {
    
}
