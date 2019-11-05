package com.validation.validationdemo.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member")
@Slf4j
@AllArgsConstructor
public class MemberController {

    @GetMapping("/join")
    public String moveToMemberJoinViewPage(){

        return "member_join";
    }
}
