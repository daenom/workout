package com.daenom.workout.dto.user;

import com.daenom.workout.model.enums.Role;

public record UserResponse(
    Long id,
    String firstname,
    String lastname,
    String email,
    Role role
) {
    
}
