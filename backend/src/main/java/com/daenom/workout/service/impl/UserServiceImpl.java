package com.daenom.workout.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.daenom.workout.dto.user.CreateUserRequest;
import com.daenom.workout.dto.user.UserResponse;
import com.daenom.workout.entity.User;
import com.daenom.workout.exception.DuplicateResourceException;
import com.daenom.workout.mapper.UserMapper;
import com.daenom.workout.repository.UserRepository;
import com.daenom.workout.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserResponse createUser(CreateUserRequest request) {
        userRepository.findByEmail(request.email())
                .ifPresent(user -> {
                    throw new DuplicateResourceException("User already exists with email: " + request.email());
                });

        User user = userMapper.toEntity(request);
        user.setPasswordHash(passwordEncoder.encode(request.password()));

        userRepository.save(user);

        return userMapper.toResponse(user);
    }
}
