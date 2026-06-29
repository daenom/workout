package com.daenom.workout.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseSet {
    private Integer setNumber;
    private Integer minReps;
    private Integer maxReps;
    private Double targetWeight;
}
