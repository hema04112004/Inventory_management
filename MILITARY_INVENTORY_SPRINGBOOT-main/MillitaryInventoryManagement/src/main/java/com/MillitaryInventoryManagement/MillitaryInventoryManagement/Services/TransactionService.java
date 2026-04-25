package com.MillitaryInventoryManagement.MillitaryInventoryManagement.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MillitaryInventoryManagement.MillitaryInventoryManagement.repository.Transactionrepository;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.BaseEquippedModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.PurchaseEntryModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.PurchaseModel;
@Service
public class TransactionService {
    @Autowired
    private Transactionrepository transactionRepository;

    public Optional<PurchaseModel> processTransaction(PurchaseEntryModel entry ) {
        // Transaction processing logic here
      String equipmentName = transactionRepository.findEquipmentnamebyId(entry.getEquipmentid());
      if(equipmentName==null||equipmentName.equals("")){
        return Optional.empty();
      }
      else{
        PurchaseModel new_purchase=new PurchaseModel(0,entry.getBaseid(),entry.getEquipmentid(),entry.getQuantity(),entry.getDate());
        transactionRepository.save(new_purchase);
        Optional<BaseEquippedModel> temp=transactionRepository.findIdbybaseequippedid(entry.getBaseid(),entry.getEquipmentid());
        int updated=transactionRepository.changeqty(temp.get().getId(),temp.get().getEquipmentqty()+entry.getQuantity());
        if(updated==0){
          return Optional.empty();
        }
        return Optional.of(new_purchase);
      }

    }
}
