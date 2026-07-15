package com.daenom.workout.service;

import com.daenom.workout.entity.User;

public interface UserService {
    User getUserByEmail(String email);
}
