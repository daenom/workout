package com.daenom.workout.dto.auth;

public record SignupResponse(
    Long id,
    String firstname,
    String lastname,
    String email
) {
    
}
