$(function () {

    var storeId = $("meta[name='storeId']").attr("content");
    var menuItemId = $("meta[name='menuItemId']").attr("content");
    var menuSectionId = $("meta[name='menuSectionId']").attr("content");
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    var url = 'api/admin/pushqueue';

    var lang_kor = {
        "decimal": "",
        "emptyTable": "데이터가 없습니다.",
        "info": "표시 _START_ ~ _END_  (총 _TOTAL_ 개)",
        "infoEmpty": "0개",
        "infoFiltered": "(전체 _MAX_ 개 중 검색결과)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "_MENU_ 개씩 보기",
        "loadingRecords": "로딩중...",
        "processing": "처리중...",
        "search": "검색 : ",
        "zeroRecords": "검색된 데이터가 없습니다.",
        "paginate": {
            "first": "첫 페이지",
            "last": "마지막 페이지",
            "next": "다음",
            "previous": "이전"
        },
        "aria": {
            "sortAscending": " :  오름차순 정렬",
            "sortDescending": " :  내림차순 정렬"
        }
    };

    var willPushTable = $('table#willPushTable').DataTable({
        initComplete: function () {
            var input = $('.dataTables_filter input:first').unbind(),
                self = this.api(),
                $searchButton = $('<button class="btn btn-info ml-2">')
                    .text('search')
                    .click(function () {
                        self.search(input.val()).draw();
                    })
                ,
                $clearButton = $('<button class="btn btn-info ml-2">')
                    .text('clear')
                    .click(function () {
                        input.val('');
                        $searchButton.click();
                    });
            input.keypress(function (event) {
                if (event.which === 13) {
                    $searchButton.click();
                }
            });
            $('.dataTables_filter:first').append($searchButton, $clearButton);
        },
        ajax: '/api/admin/pushqueue/push-success-false/data-table',
        language: lang_kor,
        dom:
            "<'row'<'col-sm-12 col-md-3'l><'col-sm-12 col-md-3'B><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        serverSide: true,
        columns: [
            {
                data: 'id'
            },
            {
                data: 'pushContent'
            },
            {
                data: 'willPushTime',
            },
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return '<a href="#" onclick="removeMenuOptionGroup(\'' +url + '\'' + ',' + row.id + '); return false;" class="btn btn-danger">삭제</a>';
                }
            },
            {
              data: 'id',
                render: function (data, type, row, meta) {
                    return '<a href="#" onclick="removeMenuOptionGroup(\'' +url + '\'' + ',' + row.id + '); return false;" class="btn btn-warning">푸쉬하기</a>';
                }
            }

        ],
        buttons: [
            'excelHtml5', 'csvHtml5', 'print'
        ]

    });

    var alreadyPushedTable = $('table#alreadyPushedTable').DataTable({
        initComplete: function () {
            var input = $('.dataTables_filter input:last').unbind(),
                self = this.api(),
                $searchButton = $('<button class="btn btn-primary ml-2">')
                    .text('search')
                    .click(function () {
                        self.search(input.val()).draw();
                    })
                ,
                $clearButton = $('<button class="btn btn-primary ml-2">')
                    .text('clear')
                    .click(function () {
                        input.val('');
                        $searchButton.click();
                    });
            input.keypress(function (event) {
                if (event.which === 13) {
                    $searchButton.click();
                }
            });
            $('.dataTables_filter:last').append($searchButton, $clearButton);
        },
        ajax: '/api/admin/pushqueue/push-success-true/data-table',
        language: lang_kor,
        dom:
            "<'row'<'col-sm-12 col-md-3'l><'col-sm-12 col-md-3'B><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        serverSide: true,
        columns: [
            {
                data: 'id'
            },
            {
                data: 'pushContent'
            },
            {
                data: 'willPushTime',
            },
        ],
        buttons: [
            'excelHtml5', 'csvHtml5', 'print'
        ]

    });



    var modificationId = $("#modificationId");
    var modificationName = $("#modificationName");
    var modificationDescription = $("#modificationDescription");
    var modificationPrice = $("#modificationPrice");
    var modificationPriority = $("#modificationPriority");
    var modifyButton = $("#modifyButton");
    var deleteButton = $("#deleteButton");

    var registrationName = $("#registrationName");
    var registrationDescription = $("#registrationDescription");
    var registrationPrice = $("#registrationPrice");
    var registrationPriority = $("#registrationPriority");
    var registerButton = $("#registerButton");

    registerButton.on('click', function () {
        if (registrationName.val().length <= 0) {
            alert('이름을 입력해주세요.');
        } else if (registrationDescription.val().length <= 0) {
            alert("설명을 입력해주세요.");
        } else if (registrationPrice.val().length <= 0) {
            alert('가격을 입력해주세요.');
        } else if (registrationPriority.val().length <= 0) {
            alert("우선순위를 입력해주세요.");
        }{
            registerMenuSection(registrationName.val(), registrationDescription.val(), registrationPrice.val(), registrationPriority.val());
        }
    });

    modifyButton.on('click', function () {
        if (modificationName.val().length <= 0) {
            alert('이름을 입력해주세요.');
        } else if (modificationDescription.val().length <= 0) {
            alert("설명을 입력해주세요.");
        } else if (modificationPrice.val().length <= 0) {
            alert('가격을 입력해주세요.');
        } else if (modificationPriority.val().length <= 0) {
            alert("우선순위를 입력해주세요.");
        } else {
            modifyMenuSection(modificationId.val(), modificationName.val(), modificationDescription.val(), modificationPrice.val(), modificationPriority.val());
        }
    });

    deleteButton.on('click', function () {
        if (confirm("정말 삭제하시겠습니까?")) {
            deleteMenuSection(modificationId.val());
        }
    });

    function modifyMenuSection(id, name, description, price, priority){
        var data = {
            name : name,
            description : description,
            price : price,
            priority : priority
        };
        $.ajax({
            type: 'PATCH',
            url: '/api/admin/stores/'+storeId+'/menu-sections/'+menuSectionId + '/menu-items/' + id,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token);
            },
            success: function (response) {
                alert('수정이 완료되었습니다.');
                location.reload();
            },
            error: function (data) {
                console.log(data);
            }
        });
    }






});



function addMenuOptionGroup(url, id){
    $.ajax({
        type: 'PATCH',
        url: url + id+'/attach',
        dataType: 'json',
        contentType:'application/json; charset=utf-8',
        beforeSend: function(xhr) {
            xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
        },
        success: function (response) {
            alert('등록이 완료되었습니다.');
            location.reload();
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function removeMenuOptionGroup(url, id){
    $.ajax({
        type: 'PATCH',
        url: url + id + '/detach',
        dataType: 'json',
        contentType:'application/json; charset=utf-8',
        beforeSend: function(xhr) {
            xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
        },
        success: function (response) {
            alert('해제가 완료되었습니다.');
            location.reload();
        },
        error: function (data) {
            console.log(data);
        }
    });
}