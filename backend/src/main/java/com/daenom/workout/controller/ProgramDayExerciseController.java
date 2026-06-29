package com.daenom.workout.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.dto.programDayExercise.ProgramDayExerciseResponse;
import com.daenom.workout.service.ProgramDayExerciseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/program-day-exercises")
@RequiredArgsConstructor
public class ProgramDayExerciseController {
    private final ProgramDayExerciseService programDayExerciseService;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ProgramDayExerciseResponse createProgramDayExercise(@RequestBody CreateProgramDayExerciseRequest request) {
        return programDayExerciseService.createProgramDayExercise(request);
    }

    @GetMapping("/program-day/{programDayId}")
    public List<ProgramDayExerciseResponse> getProgramDayExercises(@PathVariable Long programDayId) {
        return programDayExerciseService.getProgramDayExercises(programDayId);
    }

    @GetMapping("/{id}")
    public ProgramDayExerciseResponse getProgramDayExerciseById(@PathVariable Long id) {
        return programDayExerciseService.getProgramDayExerciseById(id);
    }

    @PutMapping("/{id}")
    public ProgramDayExerciseResponse updateProgramDayExercise(@PathVariable Long id, @RequestBody CreateProgramDayExerciseRequest request) {
        return programDayExerciseService.updateProgramDayExercise(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProgramDayExercise(@PathVariable Long id) {
        programDayExerciseService.deleteProgramDayExercise(id);
    }
}
