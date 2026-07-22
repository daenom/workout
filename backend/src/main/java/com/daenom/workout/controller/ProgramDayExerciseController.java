package com.daenom.workout.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.dto.programDayExercise.ProgramDayExerciseResponse;
import com.daenom.workout.entity.ProgramDayExercise;
import com.daenom.workout.mapper.ProgramDayExerciseMapper;
import com.daenom.workout.service.ProgramDayExerciseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/program-day-exercises")
@RequiredArgsConstructor
public class ProgramDayExerciseController {
    private final ProgramDayExerciseService programDayExerciseService;
    private final ProgramDayExerciseMapper programDayExerciseMapper;

    // @PostMapping()
    // @ResponseStatus(HttpStatus.CREATED)
    // public ProgramDayExerciseResponse createProgramDayExercise(@RequestBody CreateProgramDayExerciseRequest request) {
    //     ProgramDayExercise programDayExercise = programDayExerciseService.createProgramDayExercise(request);
    //     return programDayExerciseMapper.toResponse(programDayExercise);
    // }

    @GetMapping("/program-day/{programDayId}")
    public List<ProgramDayExerciseResponse> getProgramDayExercises(@PathVariable Long programDayId) {
        return programDayExerciseService.getProgramDayExercises(programDayId).stream()
                .map(programDayExerciseMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public ProgramDayExerciseResponse getProgramDayExerciseById(@PathVariable Long id) {
        ProgramDayExercise programDayExercise = programDayExerciseService.getProgramDayExerciseById(id);
        return programDayExerciseMapper.toResponse(programDayExercise);
    }

    @PutMapping("/{id}")
    public ProgramDayExerciseResponse updateProgramDayExercise(@PathVariable Long id, @RequestBody CreateProgramDayExerciseRequest request) {
        ProgramDayExercise programDayExercise = programDayExerciseService.updateProgramDayExercise(id, request);
        return programDayExerciseMapper.toResponse(programDayExercise);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProgramDayExercise(@PathVariable Long id) {
        programDayExerciseService.deleteProgramDayExercise(id);
    }
}
