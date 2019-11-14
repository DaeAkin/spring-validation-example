package com.validation.validationdemo.service;

import com.validation.validationdemo.ValidationException;
import com.validation.validationdemo.member.Member;
import com.validation.validationdemo.member.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {

    MemberRepository memberRepository;

    @Transactional
    public void phoneNumberValidationCheck(String phoneNumber){
        Optional<Member> optionalMember = memberRepository.findByPhoneNumber(phoneNumber);
        if(optionalMember.isPresent())
            throw new ValidationException(1004L,"폰 번호 오류!.","이미 등록된 번호입니다.","phoneNumber");
    }


}
