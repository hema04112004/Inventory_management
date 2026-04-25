package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String batch_number;
    private String password;
    private String role;
    @ManyToOne
    @JoinColumn(name = "base_id", referencedColumnName = "baseid")
    private BaseModel base;
    
}
