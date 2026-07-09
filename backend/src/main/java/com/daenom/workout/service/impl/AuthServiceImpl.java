package com.daenom.workout.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.daenom.workout.dto.auth.SignupRequest;
import com.daenom.workout.dto.auth.SignupResponse;
import com.daenom.workout.entity.User;
import com.daenom.workout.exception.DuplicateResourceException;
import com.daenom.workout.repository.UserRepository;
import com.daenom.workout.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
                .build();

        userRepository.save(user);

        return new SignupResponse(
            user.getId(),
            user.getFirstname(),
            user.getLastname(),
            user.getEmail()
        );
    }
}
