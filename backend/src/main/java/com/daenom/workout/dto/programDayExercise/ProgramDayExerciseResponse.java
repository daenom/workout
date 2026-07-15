package com.daenom.workout.dto.programDayExercise;

import java.util.List;

import com.daenom.workout.model.ExerciseSet;

public record ProgramDayExerciseResponse(
    Long id,
    Long exerciseId,
    String exerciseName,
    Integer orderIndex,
    List<ExerciseSet> sets
) {
    
}
