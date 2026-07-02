package com.daenom.workout.mapper;

import org.springframework.stereotype.Component;

import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.dto.programDayExercise.ProgramDayExerciseResponse;
import com.daenom.workout.entity.ProgramDayExercise;

@Component
public class ProgramDayExerciseMapper {
    public ProgramDayExercise toEntity(CreateProgramDayExerciseRequest request) {
        return ProgramDayExercise.builder()
                .programDayId(request.programDayId())
                // .exerciseId(request.exerciseId())
                .orderIndex(request.orderIndex())
                .sets(request.sets())
                .build();
    }

    public ProgramDayExerciseResponse toResponse(ProgramDayExercise programDayExercise) {
        return new ProgramDayExerciseResponse(
                programDayExercise.getId(),
                programDayExercise.getProgramDayId(),
                programDayExercise.getExercise().getId(),
                programDayExercise.getOrderIndex(),
                programDayExercise.getSets()
        );
    }
}
