package com.daenom.workout.dto.user;

public record UserResponse(
    Long id,
    String firstname,
    String lastname,
    String email,
    String role
) {
    
}
