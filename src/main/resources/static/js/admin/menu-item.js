    var storeId = $("meta[name='storeId']").attr("content");
    var menuSectionId = $("meta[name='menuSectionId']").attr("content");
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
$(function () {



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

    var dataTable = $('table#menuItemTable').DataTable({
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
        ajax: '/api/admin/stores/' + storeId + '/menu-sections/' + menuSectionId + '/menu-items/data-table',
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
                    if(row.soldOut) {
                    return '<a href=/admin/stores/'+storeId+'/menu-sections/' + menuSectionId + '/menu-item/'+row.id+' style="text-decoration:line-through; color:red">'+data+'(품절)</a>';
                    } else {
                    return '<a href=/admin/stores/'+storeId+'/menu-sections/' + menuSectionId + '/menu-item/'+row.id+ '>'+data+'</a>';
                        }
                }
            },
            {
                data: 'description',
            },
            {
                data: 'price' ,
                render: function (data, type, row, meta) {
                    if(row.onSale) {
                        return '<span style=text-decoration:line-through>'+row.beforePrice+'원</span> <span style=color:red>'+data+'원('+row.menuItemCouponResponse.discountPercent+')</span>';
                    } else {
                        return data;
                    }
                }
            },
            {
                data: 'maximumCount'
            },
            {
                data: 'priority'
            },
            {
                data: 'quantity'
            },
            {
                data: 'quantityLimit',
                render: function (data, type, row, meta) {
                    if(data) {
                        return '<span style=color:red>있음</span>';
                    } else {
                        return '없음';
                    }
                }
            },
            {
                data : 'id',
                 render: function (data, type, row, meta) {
                                if(row.onSale) {
                                    return '<span style=>'+row.menuItemCouponResponse.discountType+'('+row.menuItemCouponResponse.startDiscountTime+'~'+row.menuItemCouponResponse.endDiscountTime+')</span> ';
                                } else {
                                    return '없음';
                                }
                            }

            },
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return '<a href="/admin/stores/' + storeId + '/menu-sections/' + menuSectionId + '/menu-items/' + row.id + '/menu-option-groups" class="btn btn-warning">옵션관리</a>';
                }
            },
            {
                data : 'soldOut',
                    render: function (data, type, row, meta) {
                                    if(data) {
                                                   return '<button id="soldOutButton" onclick="soldOutButtonClick(' + row.id + '); return false;" class="btn btn-success">품절 해제</button>';
                                                   }
                                                   return '<button id="soldOutButton" onclick="soldOutButtonClick(' + row.id + ');" class="btn btn-danger">품절 하기</button>';
                             }

            }
        ],
        buttons: [
            'excelHtml5', 'csvHtml5', 'print'
        ]

    });



    var modificationId = $("#modificationId");
    var modificationName = $("#modificationName");
    var modificationDescription = $("#modificationDescription");
    var modificationPrice = $("#modificationPrice");
    var modificationMaximumCount = $("#modificationMaximumCount");
    var modificationPriority = $("#modificationPriority");
    var modifyButton = $("#modifyButton");
    var deleteButton = $("#deleteButton");

    var registrationName = $("#registrationName");
    var registrationDescription = $("#registrationDescription");
    var registrationPrice = $("#registrationPrice");
    var registrationMaximumCount = $("#registrationMaximumCount");
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
        } else if (registrationMaximumCount.val().length <= 0) {
            alert("최대개수를 입력해주세요.");
        } else {
            registerMenuSection(registrationName.val(), registrationDescription.val(), registrationPrice.val(), registrationPriority.val(), registrationMaximumCount.val());
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
        }  else if (modificationMaximumCount.val().length <= 0) {
            alert("최대개수를 입력해주세요.");
        } else {
            modifyMenuSection(modificationId.val(), modificationName.val(), modificationDescription.val(), modificationPrice.val(), modificationPriority.val(), modificationMaximumCount.val());
        }
    });

    deleteButton.on('click', function () {
        if (confirm("정말 삭제하시겠습니까?")) {
            deleteMenuSection(modificationId.val());
        }
    });





    function registerMenuSection(nameValue, descriptionValue, priceValue, priorityValue, registrationMaximumCountValue) {
        var data = {
            name : nameValue,
            description : descriptionValue,
            price : priceValue,
            priority : priorityValue,
            maximumCount : registrationMaximumCountValue
        };
        console.log("log"+data.name);
        $.ajax({
            type: 'POST',
            url: '/api/admin/stores/'+storeId+'/menu-sections/' + menuSectionId + '/menu-items',
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

    function modifyMenuSection(id, name, description, price, priority, maximumCount){
        var data = {
            name : name,
            description : description,
            price : price,
            priority : priority,
            maximumCount : maximumCount
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

    function deleteMenuSection(id){
        $.ajax({
            type: 'DELETE',
            url: '/api/admin/stores/'+storeId+'/menu-sections/'+menuSectionId + '/menu-items/' + id,
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

//function onMenuItemClick(id, name, description, price, priority, maximumCount) {
//    console.log("id:"+id + ", name:"+name+", priority:"+priority);
//    $("#modificationId").val(id);
//    $("#modificationName").val(name);
//    $("#modificationDescription").val(description);
//    $("#modificationPrice").val(price);
//    $("#modificationPriority").val(priority);
//    $("#modificationMaximumCount").val(maximumCount);
//    $("#modifyButton").prop('disabled', false);
//    $("#deleteButton").prop('disabled', false);
//}

 function soldOutButtonClick(id) {
       $.ajax({
            type: 'PUT',
            url: '/api/admin/stores/'+storeId+'/menu-sections/'+menuSectionId + '/menu-items/' + id + '/soldOut',
            dataType: 'json',
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
