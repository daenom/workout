package com.daenom.workout.mapper;

import org.springframework.stereotype.Component;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.ProgramResponse;
import com.daenom.workout.entity.Program;

@Component
public class ProgramMapper {
    public Program toEntity(CreateProgramRequest request) {
        return Program.builder()
                .name(request.name())
                .description(request.description())
                .userId(request.userId())
                .build();
    }

    public ProgramResponse toResponse(Program program) {
        return new ProgramResponse(
                program.getId(),
                program.getName(),
                program.getDescription()
        );
    }
}
