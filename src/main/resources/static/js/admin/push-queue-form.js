var storeId = $("meta[name='storeId']").attr("content");
var menuSectionId = $("meta[name='menuSectionId']").attr("content");
var pushQueueId = $("meta[name='pushQueueId']").attr("content");
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
var pagePurpose = $("meta[name='pagePurpose']").attr("content");

$(function () {
    //필드들
    var pushContent = $("#pushContent");
    var willPushTime = $("#willPushTime");




    //버튼들
    var pushQueueSubmitButton = $("#pushQueueSubmitButton");
    var pushQueueDeleteButton = $("#pushQueueDeleteButton");

    initialize();
    console.log(pagePurpose);

    function initialize() {
        redirectUrl = 'admin/pushqueue';

        if(pagePurpose === "create"){
            url = '/api/admin/pushqueue';
        } else if(pagePurpose === "update"){
            url = '/api/admin/pushqueue/' + pushQueueId;
        }
            return;

    }

    console.log(url);

    pushQueueSubmitButton.on('click',function () {
        registerPushQueue(pushContent.val(),willPushTime.val());
    });

    pushQueueDeleteButton.on('click',function () {
        deletePushQueue(pushQueueId)
    });

    function deletePushQueue(menuItemIdValue) {
                $.ajax({
                    type: 'DELETE',
                    url: url,
                    dataType: 'json',
                    contentType:'application/json; charset=utf-8',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, token);
                    },
                    success: function (response) {
                        alert('삭제가 완료되었습니다.');
                        location.href= redirectUrl;
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
    }


    function registerPushQueue(pushContentValue,willPushTimeValue) {
        var data = {
            pushContent : pushContentValue,
            willPushTime : willPushTimeValue
        };

        console.log("log : " + data.pushContent);
        console.log("log : " + data.willPushTime);
        console.log("log : " + redirectUrl);
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),

            contentType:'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token);
            },
            success: function (response) {
                alert('등록이 완료되었습니다.');
                location.href= '/';
            },
            error: function (data) {
                alert(data);
                console.log(data);
            }
        });

    }

})