package com.daenom.workout.dto.auth;

public record LoginRequest(
    String email,
    String password
) {
    
}
