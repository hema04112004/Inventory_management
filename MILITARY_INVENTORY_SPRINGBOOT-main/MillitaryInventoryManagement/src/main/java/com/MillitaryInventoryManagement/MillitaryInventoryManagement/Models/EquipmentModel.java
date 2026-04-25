package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models;
import lombok.*;
import jakarta.persistence.*;
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "equipments")
public class EquipmentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String equipmentname;
   

}
