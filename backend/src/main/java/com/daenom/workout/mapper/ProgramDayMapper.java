package com.daenom.workout.mapper;

import org.springframework.stereotype.Component;

import com.daenom.workout.dto.programDay.CreateProgramDayRequest;
import com.daenom.workout.dto.programDay.ProgramDayResponse;
import com.daenom.workout.entity.ProgramDay;

@Component
public class ProgramDayMapper {
    public ProgramDay toEntity(CreateProgramDayRequest request) {
        return ProgramDay.builder()
                .name(request.name())
                .programId(request.programId())
                .description(request.description())
                .programDayType(request.programDayType())
                .orderIndex(request.orderIndex())
                .build();
    }

    public ProgramDayResponse toResponse(ProgramDay programDay) {
        return new ProgramDayResponse(
                programDay.getId(),
                programDay.getName(),
                programDay.getDescription(),
                programDay.getProgramDayType(),
                programDay.getOrderIndex()
        );
    }
}
