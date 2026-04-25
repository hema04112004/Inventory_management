package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models;
import java.time.LocalDate;

import lombok.*;
@Data
public class PurchaseEntryModel {
    private Long baseid;
    private Long equipmentid;
    private int quantity;
    private LocalDate date;

    
}
