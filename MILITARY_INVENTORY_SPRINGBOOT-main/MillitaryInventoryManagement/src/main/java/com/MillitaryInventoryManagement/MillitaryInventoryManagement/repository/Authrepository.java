package com.MillitaryInventoryManagement.MillitaryInventoryManagement.repository;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.BaseUserCumModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.UserModel;
import com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.UserRegister;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface Authrepository extends JpaRepository<UserModel,Long> {
     


    @Query("SELECT new com.MillitaryInventoryManagement.MillitaryInventoryManagement.Models.BaseUserCumModel(" +
        "u.id, u.name, u.batch_number, u.password, u.role, u.base.baseid, u.base.basename) " +
        "FROM UserModel u WHERE u.id = :id")
    Optional<BaseUserCumModel> findUserWithBase(Long id);



    
}
