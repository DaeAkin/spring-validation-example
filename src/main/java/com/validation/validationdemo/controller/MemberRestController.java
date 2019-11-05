package com.validation.validationdemo.controller;

import com.validation.validationdemo.member.MemberRepository;
import com.validation.validationdemo.member.MemberSaveRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@AllArgsConstructor
@RequestMapping("/api/member")
@Slf4j
public class MemberRestController {

    private MemberRepository memberRepository;

    @PostMapping
    public void insertMember(@Valid @RequestBody MemberSaveRequest memberSaveRequest) {
        log.info("insertMember {} " , memberSaveRequest.toString());
        memberRepository.save(memberSaveRequest.toEntity());
    }


}
