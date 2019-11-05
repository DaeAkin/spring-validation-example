$(function () {

    var storeOwnerId = $("meta[name='storeOwnerId']").attr("content");
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    var pagePurpose = $("meta[name='pagePurpose']").attr("content");

    var storeOwnerSaveButton = $("#storeOwnerSaveButton");
    var email = $("#email");
    var password = $("#password");
    var name = $("#name");
    var phoneNumber = $("#phoneNumber");
    var enabled = $("#enabled");

    var url;
    var method;

    initializeUrl();





    function initializeUrl() {
        if (pagePurpose === "create") {
            url = "/api/admin/store-owners";
            method = "POST";
        } else if (pagePurpose === "update") {
            url = "/api/admin/store-owners/" + storeOwnerId;
            method = "PATCH";
        } else if (pagePurpose === "read") {
            url = "/admin/store-owners/"+ storeOwnerId + "/form";
        } else {
        }
    }

    storeOwnerSaveButton.on('click', function () {

        if (pagePurpose === "create" || pagePurpose === "update") {
            register();
        } else if (pagePurpose === "read") {
            location.href = url;
        }

    });

    function register() {
        if (!validate()) {
            return;
        }
        if (pagePurpose === "create" && password.val().length <= 0) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        if(!chkPwd(password.val())){
            return;
        }
        var data = {
            email: email.val(),
            password: password.val(),
            name: name.val(),
            phoneNumber: phoneNumber.val(),
            enabled: enabled.prop('checked')
        };
        console.log("log" + data.email);
        $.ajax({
            type: method,
            url: url,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (xhr) {
                xhr.setRequestHeader(header, token);
            },
            success: function (response) {
                alert('등록이 완료되었습니다.');
                location.href = "/admin/store-owners";
            },
            error: function (data) {
                alert('에러가 발생했습니다.');
                console.log(data);
            }
        });
    }

    function validate() {
        if (email.val().length <= 0) {
            alert('이메일을 입력해주세요.');
            return false;
        } else if (name.val().length <= 0) {
            alert("이름을 입력해주세요.");
            return false;
        } else if (phoneNumber.val().length <= 0) {
            alert("전화번호를 입력해주세요.");
            return false;
        } else {
            return true;
        }
    }
    function chkPwd(str){
             var pw = str;
             var num = pw.search(/[0-9]/g);
             var eng = pw.search(/[a-z]/ig);
             var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
             if(pw.length < 10 || pw.length > 20){
              alert("10자리 ~ 20자리 이내로 입력해주세요.");
              return false;
             }
             if(pw.search(/₩s/) != -1){
              alert("비밀번호는 공백업이 입력해주세요.");
              return false;
             }
             if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) ){
              alert("영문,숫자 2가지를혼합하여 입력해주세요.");
              return false;
             }
             return true;
            }


});