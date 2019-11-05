$(function() {
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

    var dataTable = $('table#storeOwnerTable').DataTable({
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
        ajax: '/api/admin/store-owners/data-table',
        language : lang_kor,
        dom :
            "<'row'<'col-sm-12 col-md-3'l><'col-sm-12 col-md-3'B><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        serverSide: true,
        columns: [
            {
                data: 'id',
                render: function(data, type, row, meta) {
                    return '<a href="/admin/store-owners/' + row.id + '">' + data + '</a>';
                }
            },
            {
                data: 'email'
            },
            {
                data: 'name'
            },
            {
                data: 'phoneNumber'
            },
            {
                data: 'createdTime',
                render: function(data, type, row, meta){
                    return (data!==null)?data.replace("T", " "):"데이터가 없습니다.";
                }
            }
        ],
        buttons: [
            'excelHtml5','csvHtml5','print'
        ]

    });

});
