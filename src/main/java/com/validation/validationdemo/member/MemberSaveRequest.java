package com.validation.validationdemo.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberSaveRequest {

    @NotBlank(message = "휴대폰번호를 입력해주세요.")
    @Pattern(regexp = "[0-9]{10,11}", message = "10~11자리의 숫자만 입력가능합니다")
    private String phoneNumber;

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "이메일을 확인해주세요.")
    private String email;

    public Member toEntity() {
        return Member.builder()
                .phoneNumber(phoneNumber)
                .email(email)
                .build();
    }
}
