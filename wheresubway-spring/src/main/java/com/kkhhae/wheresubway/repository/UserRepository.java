package com.kkhhae.wheresubway.repository;

import com.kkhhae.wheresubway.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,String> {


    public boolean existsByUserEmailAndUserPassword(String userEmail, String userPassword);

    public UserEntity findByUserEmail(String userEmail);

//    public UserEntity findByPassword(String userEmail);
}
