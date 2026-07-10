package com.daenom.workout.service.impl;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.daenom.workout.dto.auth.LoginRequest;
import com.daenom.workout.dto.auth.LoginResponse;
import com.daenom.workout.dto.auth.SignupRequest;
import com.daenom.workout.dto.auth.SignupResponse;
import com.daenom.workout.dto.user.UserResponse;
import com.daenom.workout.entity.User;
import com.daenom.workout.exception.DuplicateResourceException;
import com.daenom.workout.model.enums.Role;
import com.daenom.workout.repository.UserRepository;
import com.daenom.workout.security.JwtService;
import com.daenom.workout.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public SignupResponse signup(SignupRequest request) {
        userRepository.findByEmail(request.email())
                .ifPresent(user -> {
                    throw new DuplicateResourceException("User already exists with email: " + request.email());
                });

        User user = User.builder()
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(Role.ROLE_USER)
                .build();

        userRepository.save(user);

        return new SignupResponse(
            user.getId(),
            user.getFirstname(),
            user.getLastname(),
            user.getEmail()
        );
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String accessToken = jwtService.generateToken(user.getEmail());

        return new LoginResponse(accessToken, user.getId(), user.getFirstname(), user.getLastname(), user.getEmail(), user.getRole().name());
    }

    @Override
    public UserResponse me(String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        return new UserResponse(
            user.getId(),
            user.getFirstname(),
            user.getLastname(),
            user.getEmail(),
            user.getRole()
        );
    }
}
