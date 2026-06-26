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

import java.util.List;

import org.springframework.http.HttpStatus;

import com.daenom.workout.dto.exercise.CreateExerciseRequest;
import com.daenom.workout.dto.exercise.ExerciseResponse;
import com.daenom.workout.service.ExerciseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;
    
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseResponse createExercise(@RequestBody CreateExerciseRequest request) {
        return exerciseService.createExercise(request);
    }

    @GetMapping("/all")
    public List<ExerciseResponse> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/{id}")
    public ExerciseResponse getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id);
    }

    @PutMapping("/{id}")
    public ExerciseResponse updateExercise(@PathVariable Long id, @RequestBody CreateExerciseRequest request) {
        return exerciseService.updateExercise(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
    }
}
