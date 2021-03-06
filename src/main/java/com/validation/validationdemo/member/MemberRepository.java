package com.validation.validationdemo.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends CrudRepository<Member,Long> {
    Optional<Member> findByPhoneNumber(String phoneNumber);
}
