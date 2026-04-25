package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.BaseUserCumModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.UserModel;

import com.MillitaryInventoryManagement.MillitaryInventoryManagement.repository.Authrepository;


@Service

public class AuthServices {
    @Autowired
    private Authrepository authrepository;

    public Optional<BaseUserCumModel> loginuser(Long id, String password) {
        Optional<BaseUserCumModel> user = authrepository.findUserWithBase(id);
        System.out.println(user.isEmpty());
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user; // ✅ return user with base info
        }
        return Optional.empty(); // ❌ invalid credentials
    }

    public Optional<UserModel> registerUser(UserModel newUser) {
        authrepository.save(newUser);
        return Optional.of(newUser);
    }
}

