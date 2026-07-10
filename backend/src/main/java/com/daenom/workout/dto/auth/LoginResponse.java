package com.daenom.workout.dto.auth;

public record LoginResponse(
    String accessToken,
    Long id,
    String firstname,
    String lastname,
    String email,
    String role
) {
    
}
