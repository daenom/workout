package com.daenom.workout.dto.user;

public record CreateUserRequest(
    String firstname,
    String lastname,
    String email,
    String password
) {
    
}
