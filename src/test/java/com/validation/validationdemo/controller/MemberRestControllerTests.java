package com.validation.validationdemo.controller;

import com.validation.validationdemo.TestConfiguration;
import com.validation.validationdemo.member.MemberSaveRequest;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestConfiguration.class)
//@ActiveProfiles(profiles = "test")
@Slf4j
public class MemberRestControllerTests {

    @Autowired
    MemberRestController memberRestController;

    @Test
    public void validation_테스트() {
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();

        MemberSaveRequest memberSaveRequest = new MemberSaveRequest();

        memberSaveRequest.setEmail("kei890@naver.com");
        memberSaveRequest.setPhoneNumber("01029904450");
        Set<ConstraintViolation<MemberSaveRequest>> violations = validator.validate(memberSaveRequest);

        System.out.println("violations : " + violations.toString());

        //유효성이 성공적으로 통과됐으면 empty
        assertTrue(violations.isEmpty());

        validatorFactory.close();

    }

    @Test
    public void controller_테스트() {

        MemberSaveRequest memberSaveRequest = new MemberSaveRequest();

        memberSaveRequest.setEmail("kei890@naver.com");
//        memberSaveRequest.setPhoneNumber("01029904450");

        memberRestController.insertMember(memberSaveRequest);

    }
}
