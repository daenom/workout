package com.daenom.workout.dto.auth;

public record SignupRequest(
    String firstname,
    String lastname,
    String email,
    String password
) {
    
}
