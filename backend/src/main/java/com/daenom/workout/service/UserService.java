package com.daenom.workout.service;

import com.daenom.workout.dto.user.CreateUserRequest;
import com.daenom.workout.dto.user.UserResponse;

public interface UserService {
    UserResponse signup(CreateUserRequest request);
}
