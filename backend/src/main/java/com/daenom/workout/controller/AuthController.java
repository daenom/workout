package com.daenom.workout.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daenom.workout.dto.auth.SignupRequest;
import com.daenom.workout.dto.auth.SignupResponse;
import com.daenom.workout.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public SignupResponse signup(@RequestBody SignupRequest request) {
        return authService.signup(request);
    }
}
