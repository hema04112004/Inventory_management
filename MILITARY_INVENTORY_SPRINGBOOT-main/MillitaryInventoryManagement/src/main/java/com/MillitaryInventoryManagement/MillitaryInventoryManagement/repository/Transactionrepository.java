package com.MillitaryInventoryManagement.MillitaryInventoryManagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.PurchaseModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.BaseEquippedModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.EquipmentModel;

@Repository
public interface Transactionrepository extends JpaRepository<PurchaseModel, Long> {
    @Query("SELECT e.equipmentname FROM EquipmentModel e WHERE e.id = :equipmentid")
    String findEquipmentnamebyId(Long equipmentid);

    @Query("SELECT * FROM BaseEquippedModel e where e.baseid=:baseid AND e.equipmentid=:equipmentid")
    Optional<BaseEquippedModel> findIdbybaseequippedid(Long baseid,Long equipmentid);

    @Query("UPDATE BaseEquippedModel e set e.equipmentqty=:quantity where e.id=:id")
    int changeqty(Long id,int quantity);
}
