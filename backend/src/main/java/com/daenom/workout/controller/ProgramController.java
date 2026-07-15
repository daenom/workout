package com.daenom.workout.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.CreateProgramResponse;
import com.daenom.workout.dto.program.ProgramDetails;
import com.daenom.workout.dto.program.ProgramResponse;
import com.daenom.workout.entity.Program;
import com.daenom.workout.mapper.ProgramMapper;
import com.daenom.workout.service.ProgramService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/programs")
@RequiredArgsConstructor
public class ProgramController {
    private final ProgramService programService;
    private final ProgramMapper programMapper;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public CreateProgramResponse createProgram(@RequestBody CreateProgramRequest request, Authentication authentication) {
        return programService.createProgram(request, authentication.getName());  
    }

    // @GetMapping("/all")
    // public List<ProgramResponse> getAllPrograms() {
    //     return programService.getAllPrograms().stream()
    //             .map(programMapper::toResponse)
    //             .toList();
    // }

    @GetMapping("/{id}")
    public ProgramResponse getProgramDetails(@PathVariable Long id) {
        return programService.getProgramById(id);
    }

    // @PutMapping("/{id}")
    // public ProgramResponse updateProgram(@PathVariable Long id, @RequestBody CreateProgramRequest request) {
    //     Program program = programService.updateProgram(id, request);
    //     return programMapper.toResponse(program);
    // }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
    }
}
