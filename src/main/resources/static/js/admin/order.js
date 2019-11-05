 var token = $("meta[name='_csrf']").attr("content");
 var header = $("meta[name='_csrf_header']").attr("content");
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

    $('#paymentCanclePopUp').on('shown.bs.modal', function (e) {

    var triggerLink = $(e.relatedTarget);
    var id = triggerLink.data("id");
//    var title = triggerLink.data("title");

    $("#paymentId").val(id);
//    $(this).find(".modal-body").html("<h5>id: "+id+"</h5>");

    });

    var dataTable = $('table#orderTable').DataTable({

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
        scrollX: true,
        ajax: '/api/admin/orders/data-table',
        language : lang_kor,
        dom :
            "<'row'<'col-sm-12 col-md-5'l><'col-sm-12 col-md-1'B><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        serverSide: true,
        columns: [
            {
                data: 'id'
            },
            {
                data: 'buyerTel'
            },
            {
                data: 'buyerEmail'
            },
            {
                data: 'name'
            },
            {
                data: 'amount'
            },
            {
                data: 'userMessage'
            },
            {
                data : 'storeId'
            },
            {
                data: 'storeName'
            },
            {
                data: 'orderNumber'
            },
            {
                data: 'paymentStatus'
            },
            {
                searchable: false,
                orderable: false,
                render: function ( data, type, row ) {
                    if(row.paymentStatus == 'SUCCESS')
                    return '<button type="button" class="btn btn-danger" data-id="'+row.id+'"data-toggle="modal" data-target="#paymentCanclePopUp">결제취소 </button>';

                    return '';
                  },


            },
            {
                data: 'orderStatus'
            },
            {
                data: 'orderRefuseReason'
            },
            {
                data: 'finishPaymentTime'
            },
            {
                data: 'limitTimeToWaitOrder'
            },
            {
                data: 'finishTimeToWaitOrder'
            },
            {
                data: 'estimatedTimeToPrepareFood'
            },
            {
                data: 'finishTimeToPrepareFood'
            },
            {
                data: 'finishOrderTime'
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

 function cancelButton() {

    var placedOrderId = $("#paymentId").val();
    var canceler = $("#canceler").val();
    var cancelReason = $("#message-text").val();

    var data = {
        placedOrderId : placedOrderId,
        canceler : canceler,
        cancelReason : cancelReason

    };


    $.ajax({
        type: 'POST',
        url: '/api/admin/paymentcancel',
        data : JSON.stringify(data),

        contentType:'application/json; charset=utf-8',
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (response) {
            alert('처리되었습니다.');
            location.reload();
        },
        error: function (data) {
            console.log(data);
        }
    });
}
