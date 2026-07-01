package com.daenom.workout.dto.program;

import java.util.List;

import com.daenom.workout.dto.programDay.ProgramDayDetails;
import com.daenom.workout.entity.Program;

public record ProgramDetails(
    Program program,
    List<ProgramDayDetails> programDays
) {
    
}
