package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models;
import jakarta.persistence.*;

import lombok.*;
@Entity
@Table(name = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long baseid;

    private String basename;
}

