package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Controllers;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.BaseUserCumModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.LoginModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.UserModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Services.AuthServices;
import com.fasterxml.jackson.databind.JsonSerializable.Base;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthServices authservice;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginModel loginuser){
        Optional<BaseUserCumModel> user=authservice.loginuser(loginuser.getId(), loginuser.getPassword());
        if(user.isPresent()){
            return ResponseEntity.ok(user.get());
        }else{
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserModel newUser){
        Optional<UserModel> registeredUser = authservice.registerUser(newUser);
        if (registeredUser.isPresent()) {
            return ResponseEntity.ok(registeredUser.get());
        } else {
            return ResponseEntity.status(409).body("User already exists");
        }
    }
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello, World!");
    }
}
