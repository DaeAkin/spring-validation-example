package com.validation.validationdemo.controller;

import com.validation.validationdemo.member.MemberRepository;
import com.validation.validationdemo.member.MemberSaveRequest;
import com.validation.validationdemo.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@AllArgsConstructor
@RequestMapping("/api/member")
@Slf4j
public class MemberRestController {

    private MemberRepository memberRepository;
    private MemberService memberService;

    @PostMapping
    public void insertMember(@Valid @RequestBody MemberSaveRequest memberSaveRequest) {
        log.info("insertMember {} " , memberSaveRequest.toString());
        memberService.phoneNumberValidationCheck(memberSaveRequest.getPhoneNumber());
        memberRepository.save(memberSaveRequest.toEntity());
    }

}
