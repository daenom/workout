package com.daenom.workout.dto.programDay;

import java.util.List;

import com.daenom.workout.entity.ProgramDay;
import com.daenom.workout.entity.ProgramDayExercise;

public record ProgramDayDetails(
    ProgramDay programDay,
    List<ProgramDayExercise> exercises
) {
    
}
