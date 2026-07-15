package com.daenom.workout.mapper;

import org.springframework.stereotype.Component;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.CreateProgramResponse;
import com.daenom.workout.dto.program.ProgramResponse;
import com.daenom.workout.entity.Program;
import com.daenom.workout.entity.User;

@Component
public class ProgramMapper {
    public Program toEntity(String name, String description, User user) {
        return Program.builder()
                .name(name)
                .description(description)
                .user(user)
                .build();
    }

    public CreateProgramResponse toResponse(Program program) {
        return new CreateProgramResponse(
                program.getId(),
                program.getName()
        );
    }
}
