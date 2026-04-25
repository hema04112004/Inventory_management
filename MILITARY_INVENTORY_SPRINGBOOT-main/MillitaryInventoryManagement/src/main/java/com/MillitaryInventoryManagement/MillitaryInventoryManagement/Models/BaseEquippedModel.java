package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models;
import lombok.*;
import jakarta.persistence.*;
@Data
@Entity
@Table(name = "baseequipped")
@NoArgsConstructor
@AllArgsConstructor
public class BaseEquippedModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long baseid;
    private Long equipmentid;
    private int equipmentqty;
}
