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
import com.daenom.workout.dto.program.ProgramResponse;
import com.daenom.workout.service.ProgramService;

import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/programs")
@RequiredArgsConstructor
public class ProgramController {
    private final ProgramService programService;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ProgramResponse createProgram(@RequestBody CreateProgramRequest request) {
        return programService.createProgram(request);
    }

    @GetMapping("/all")
    public List<ProgramResponse> getAllPrograms() {
        return programService.getAllPrograms();
    }

    @GetMapping("/{id}")
    public ProgramResponse getProgramById(@PathVariable Long id) {
        return programService.getProgramById(id);
    }

    @PutMapping("/{id}")
    public ProgramResponse updateProgram(@PathVariable Long id, @RequestBody CreateProgramRequest request) {
        return programService.updateProgram(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
    }
}
