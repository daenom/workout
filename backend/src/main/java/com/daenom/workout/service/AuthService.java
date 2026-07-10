package com.daenom.workout.service;

import com.daenom.workout.dto.auth.LoginRequest;
import com.daenom.workout.dto.auth.LoginResponse;
import com.daenom.workout.dto.auth.SignupRequest;
import com.daenom.workout.dto.auth.SignupResponse;

public interface AuthService {
    SignupResponse signup(SignupRequest request);
    LoginResponse login(LoginRequest request);
}
