package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models;
import lombok.*;
@AllArgsConstructor
@NoArgsConstructor
@Data

public class BaseUserCumModel {
    private Long id;
    private String name;
    private String batch_number;
    private String password;
    private String role;
    private Long base_id;
    private String base_name;
}
