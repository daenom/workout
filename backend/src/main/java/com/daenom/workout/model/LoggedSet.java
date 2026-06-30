package com.daenom.workout.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoggedSet {
    private Integer setNumber;
    private Integer reps;
    private Double weight;
    private Boolean isCompleted;
}
