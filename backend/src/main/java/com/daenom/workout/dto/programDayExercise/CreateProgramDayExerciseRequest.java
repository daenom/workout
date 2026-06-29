package com.daenom.workout.dto.programDayExercise;

import java.util.List;

public record CreateProgramDayExerciseRequest(
    Long programDayId,
    Long exerciseId,
    Integer orderIndex,
    Integer sets,
    List<Integer> minReps,
    List<Integer> maxReps
) {
    
}
