package com.daenom.workout.mapper;

import org.springframework.stereotype.Component;

import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.dto.programDayExercise.ProgramDayExerciseResponse;
import com.daenom.workout.entity.Exercise;
import com.daenom.workout.entity.ProgramDayExercise;

@Component
public class ProgramDayExerciseMapper {
    public ProgramDayExercise toEntity(CreateProgramDayExerciseRequest request, Exercise exercise, Long programDayId) {
        return ProgramDayExercise.builder()
                .programDayId(programDayId)
                .exercise(exercise)
                .orderIndex(request.orderIndex())
                .sets(request.sets())
                .build();
    }

    public ProgramDayExerciseResponse toResponse(ProgramDayExercise programDayExercise) {
        return new ProgramDayExerciseResponse(
                programDayExercise.getId(),
                programDayExercise.getExercise().getId(),
                programDayExercise.getExercise().getName(),
                programDayExercise.getOrderIndex(),
                programDayExercise.getSets()
        );
    }
}
