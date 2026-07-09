package com.daenom.workout.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daenom.workout.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
