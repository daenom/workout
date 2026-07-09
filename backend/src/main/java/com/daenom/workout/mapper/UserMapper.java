package com.daenom.workout.mapper;

import org.springframework.stereotype.Component;

import com.daenom.workout.dto.user.CreateUserRequest;
import com.daenom.workout.dto.user.UserResponse;
import com.daenom.workout.entity.User;

@Component
public class UserMapper {
    public User toEntity(CreateUserRequest request) {
        return User.builder()
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .build();
    }

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getRole()
        );
    }
}
