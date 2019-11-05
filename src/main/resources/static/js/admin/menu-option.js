$(function () {

    var storeId = $("meta[name='storeId']").attr("content");
    var menuOptionGroupId = $("meta[name='menuOptionGroupId']").attr("content");
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

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

    var dataTable = $('table#menuOptionTable').DataTable({
        initComplete: function () {
            var input = $('.dataTables_filter input').unbind(),
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
            $('.dataTables_filter').append($searchButton, $clearButton);
        },
        ajax: '/api/admin/stores/' + storeId + '/menu-option-groups/'+menuOptionGroupId+'/menu-options/data-table',
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
                data: 'name',
                render: function (data, type, row, meta) {
                    return '<a href="#" onclick="onMenuOptionClick(' + row.id + ',\'' + row.name + '\',' + row.price + '); return false;">'+data+'</a>';
                }
            },
            {
                data: 'price'
            }
        ],
        buttons: [
            'excelHtml5', 'csvHtml5', 'print'
        ]

    });

    var modificationId = $("#modificationId");
    var modificationName = $("#modificationName");
    var modificationPrice = $("#modificationPrice");
    var modifyButton = $("#modifyButton");
    var deleteButton = $("#deleteButton");

    var registrationName = $("#registrationName");
    var registrationPrice = $("#registrationPrice");
    var registerButton = $("#registerButton");

    registerButton.on('click', function () {
        if (registrationName.val().length <= 0) {
            alert('이름을 입력해주세요.');
        } else if (registrationPrice.val().length <= 0) {
            alert("금액을 입력해주세요.");
        } else {
            registerMenuOption(registrationName.val(), registrationPrice.val());
        }
    });

    modifyButton.on('click', function () {
        if (modificationName.val().length <= 0) {
            alert('이름을 입력해주세요.');
        } else if (modificationPrice.val().length <= 0) {
            alert("금액을 입력해주세요.");
        } else {
            modifyMenuOption(modificationId.val() ,modificationName.val(), modificationPrice.val());
        }
    });

    deleteButton.on('click', function () {
        if (confirm("정말 삭제하시겠습니까?")) {
            deleteMenuOption(modificationId.val());
        }
    });

    function registerMenuOption(name, price) {
        var data = {
            name : name,
            price : price
        };
        console.log("log"+data.name);
        $.ajax({
            type: 'POST',
            url: '/api/admin/stores/'+storeId+'/menu-option-groups/' + menuOptionGroupId + '/menu-options',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token);
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

    function modifyMenuOption(id, name, price){
        var data = {
            name : name,
            price : price
        };
        $.ajax({
            type: 'PATCH',
            url: '/api/admin/stores/'+storeId+'/menu-option-groups/' + menuOptionGroupId + '/menu-options/'+ id,
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

    function deleteMenuOption(id){
        $.ajax({
            type: 'DELETE',
            url: '/api/admin/stores/'+storeId+'/menu-option-groups/' + menuOptionGroupId + '/menu-options/'+ id,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token);
            },
            success: function (response) {
                alert('삭제가 완료되었습니다.');
                location.reload();
            },
            error: function (data) {
                console.log(data);
            }
        });
    }


});

function onMenuOptionClick(id, name, price) {
    console.log("id:"+id + ", name:"+name);
    $("#modificationId").val(id);
    $("#modificationName").val(name);
    $("#modificationPrice").val(price);
    $("#modifyButton").prop('disabled', false);
    $("#deleteButton").prop('disabled', false);
}
