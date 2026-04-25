package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models;
import lombok.*;
import jakarta.persistence.*;;
@Table(name = "users")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String batch_number;
    private String password;
    private String role;
    private Long base_id;
}
