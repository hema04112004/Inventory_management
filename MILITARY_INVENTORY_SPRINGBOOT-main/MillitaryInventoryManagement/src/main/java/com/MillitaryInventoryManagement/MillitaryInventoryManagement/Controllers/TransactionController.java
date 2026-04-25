package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.PurchaseEntryModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.PurchaseModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Services.TransactionService;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @PostMapping("/Purchase")
    public ResponseEntity<?> new_purchasing(@RequestBody PurchaseEntryModel newpurchase ){
        Optional<PurchaseModel>result=transactionService.processTransaction(newpurchase);
        if(result.isPresent()){
            return ResponseEntity.ok(result.get());
        }else{
            return ResponseEntity.badRequest().body("Transaction failed");
        }
    }
    
}
