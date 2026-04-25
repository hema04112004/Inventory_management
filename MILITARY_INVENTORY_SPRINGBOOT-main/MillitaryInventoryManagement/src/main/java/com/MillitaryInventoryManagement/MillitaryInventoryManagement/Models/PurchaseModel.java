package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "purchase")
public class PurchaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Long baseid;
    private Long equipmentid;
    private int equipmentqty;
    private LocalDate date;
}
