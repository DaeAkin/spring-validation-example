$(function() {

    var storeId = $("meta[name='storeId']").attr("content");
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    var lang_kor = {
        "decimal" : "",
        "emptyTable" : "데이터가 없습니다.",
        "info" : "표시 _START_ ~ _END_  (총 _TOTAL_ 개)",
        "infoEmpty" : "0개",
        "infoFiltered" : "(전체 _MAX_ 개 중 검색결과)",
        "infoPostFix" : "",
        "thousands" : ",",
        "lengthMenu" : "_MENU_ 개씩 보기",
        "loadingRecords" : "로딩중...",
        "processing" : "처리중...",
        "search" : "검색 : ",
        "zeroRecords" : "검색된 데이터가 없습니다.",
        "paginate" : {
            "first" : "첫 페이지",
            "last" : "마지막 페이지",
            "next" : "다음",
            "previous" : "이전"
        },
        "aria" : {
            "sortAscending" : " :  오름차순 정렬",
            "sortDescending" : " :  내림차순 정렬"
        }
    };

    var dataTable = $('table#menuOptionGroupTable').DataTable({
        initComplete : function() {
            var input = $('.dataTables_filter input').unbind(),
                self = this.api(),
                $searchButton = $('<button class="btn btn-info ml-2">')
                    .text('search')
                    .click(function() {
                        self.search(input.val()).draw();
                    })
                ,
                $clearButton = $('<button class="btn btn-info ml-2">')
                    .text('clear')
                    .click(function() {
                        input.val('');
                        $searchButton.click();
                    });
            input.keypress(function (event){
                if(event.which === 13){
                    $searchButton.click();
                }
            });
            $('.dataTables_filter').append($searchButton, $clearButton);
        },
        ajax: '/api/admin/stores/'+storeId+'/menu-option-groups/data-table',
        language : lang_kor,
        dom :
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
                render: function(data, type, row, meta) {
                    return '<a href="#" onclick="onMenuOptionGroupClick(' + row.id + ',\'' + row.name + '\',\'' + row.optionType + '\',\'' + row.defaultSelectName   + '\',' + row.maximumCheckOptionCount+'); return false;">'+data+'</a>';
                }
            },
            {
                data: 'optionType',
                render: function(data, type, row, meta) {
                    if(data === "SELECT"){
                        return '<p>필수옵션</p>'
                    } else {
                        return '<p>선택옵션</p>'
                    }
                }
            },
            {
                data: 'defaultSelectName'
            },
            {
                data: 'maximumCheckOptionCount'
            },
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return '<a href="/admin/stores/' + storeId + '/menu-option-groups/' + row.id + '/menu-options" class="btn btn-warning">옵션그룹관리</a>';
                }

            }
        ],
        buttons: [
            'excelHtml5','csvHtml5','print'
        ]

    });

    var modificationId = $("#modificationId");
    var modificationName = $("#modificationName");
    var modificationOptionType = $("#modificationOptionType");
    var modificationDefaultSelectName = $("#modificationDefaultSelectName");
    var modificationMaximumCheckOptionCount = $("#modificationMaximumCheckOptionCount");
    var modifyButton = $("#modifyButton");
    var deleteButton = $("#deleteButton");

    var registrationName = $("#registrationName");
    var registrationOptionType = $("#registrationOptionType");
    var registrationDefaultSelectName = $("#registrationDefaultSelectName");
    var registrationMaximumCheckOptionCount = $("#registrationMaximumCheckOptionCount");
    var registerButton = $("#registerButton");

    registerButton.on('click', function () {
        if (registrationName.val().length <= 0) {
            alert('이름을 입력해주세요.');
        } else if (registrationOptionType.val().length <= 0) {
            alert("옵션을 선택해주세요.");
        } else {
            registerMenuOptionGroup(registrationName.val(), registrationOptionType.val(), registrationDefaultSelectName.val(), registrationMaximumCheckOptionCount.val());
        }
    });

    modifyButton.on('click', function () {
        if (modificationName.val().length <= 0) {
            alert('이름을 입력해주세요.');
        } else if (modificationOptionType.val().length <= 0) {
            alert("옵션을 선택해주세요.");
        } else {
            modifyMenuOptionGroup(modificationId.val() ,modificationName.val(), modificationOptionType.val(), modificationDefaultSelectName.val(), modificationMaximumCheckOptionCount.val());
        }
    });

    deleteButton.on('click', function () {
        if (confirm("정말 삭제하시겠습니까?")) {
            deleteMenuOptionGroup(modificationId.val());
        }
    });

    function registerMenuOptionGroup(name, optionType, defaultSelectName, maximumCheckOptionCount) {
        var data = {
            name : name,
            optionType : optionType,
            defaultSelectName : defaultSelectName,
            maximumCheckOptionCount : maximumCheckOptionCount
        };
        console.log("log"+data.name);
        $.ajax({
            type: 'POST',
            url: '/api/admin/stores/'+storeId+'/menu-option-groups',
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

    function modifyMenuOptionGroup(id, name, optionType, defaultSelectName, maximumCheckOptionCount){
        var data = {
            name : name,
            optionType : optionType,
            defaultSelectName : defaultSelectName,
            maximumCheckOptionCount : maximumCheckOptionCount
        };
        $.ajax({
            type: 'PATCH',
            url: '/api/admin/stores/'+storeId+'/menu-option-groups/'+id,
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

    function deleteMenuOptionGroup(id){
        $.ajax({
            type: 'DELETE',
            url: '/api/admin/stores/'+storeId+'/menu-option-groups/'+id,
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

function onMenuOptionGroupClick(id, name, optionType, defaultSelectName, maximumCheckOptionCount) {
    console.log("id:"+id + ", name:"+name+", optionType:"+optionType);
    $("#modificationId").val(id);
    $("#modificationName").val(name);
    $("#modificationOptionType").selectpicker('val', optionType);
    $("#modificationDefaultSelectName").val(defaultSelectName);
    $("#modificationMaximumCheckOptionCount").val(maximumCheckOptionCount);
    $("#modifyButton").prop('disabled', false);
    $("#deleteButton").prop('disabled', false);
}
