package com.daenom.workout.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daenom.workout.dto.user.CreateUserRequest;
import com.daenom.workout.dto.user.UserResponse;
import com.daenom.workout.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public UserResponse createUser(@RequestBody CreateUserRequest request) {
        return userService.createUser(request);
    }
}
