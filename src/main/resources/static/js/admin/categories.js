$(function(){

    var registerCategoryText = $("#registerCategoryText");
    var registerCategoryPriorityText = $("#registerCategoryPriorityText");
    var registerCategoryButton = $("#registerCategoryButton");

    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    registerCategoryButton.on('click',function(){
        if(registerCategoryText.val().length <=0){
            alert('카테고리명을 입력해주세요.');
        } else if(registerCategoryPriorityText.val().length <=0){
            alert('카테고리 우선순위를 입력해주세요.');
        } else{
            createCategory();
        }
    });

    function createCategory(){

        var data = {
            name : registerCategoryText.val(),
            priority : registerCategoryPriorityText.val()
        };
        console.log("log"+data.name);
        $.ajax({
            type: 'POST',
            url: '/api/admin/stores/categories',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token);
            }
        }).done(function(response) {
            location.reload();
        }).fail(function(request,status,error){
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        })
    }



});

function onUpdateCategoryButtonClick(categoryId){

    var data = {
        name: $("#categoryName"+categoryId).val(),
        priority: $("#categoryPriority"+categoryId).val()
    };
    console.log(data.name);
    $.ajax({
        type: 'POST',
        url: '/api/admin/stores/categories/'+categoryId,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType:'application/json; charset=utf-8',
        beforeSend: function(xhr) {
            xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
        },
    }).done(function(response) {
        location.reload();
    }).fail(function (error) {
        alert("에러가 발생하였습니다:" + error);
    });
}

function onDeleteCategoryButtonClick(categoryId){
    var ok = confirm("정말 삭제하시겠습니까?");
    if(ok === true){
        $.ajax({
            type: 'DELETE',
            url: '/api/admin/stores/categories/'+categoryId,
            contentType:'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
            }
        }).done(function(response) {
            location.reload();
        }).fail(function (error) {
            alert("에러가 발생하였습니다:" + error);
        });
    }
}