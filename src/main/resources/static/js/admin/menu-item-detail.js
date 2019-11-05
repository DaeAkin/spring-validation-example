var storeId = $("meta[name='storeId']").attr("content");
var menuSectionId = $("meta[name='menuSectionId']").attr("content");
var menuItemId = $("meta[name='menuItemId']").attr("content");
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
var pagePurpose = $("meta[name='pagePurpose']").attr("content");

$(function () {
    //필드들
    var name = $("#name");
    var description = $("#description");
    var priority = $("#priority");
    var price = $("#price");
    var maximumCount = $("#maximumCount");
    var quantity = $("#quantity")
    var quantityLimit = $("#quantityLimit");
    var menuItemCoupon = $("#menuItemCoupon option:selected");

    var quantityLimitValue = false;



    //버튼들

    var menuItemSubmitButton = $("#menuItemSubmitButton");
    var menuItemDeleteButton = $("#menuItemDeleteButton");
    var showDiscountFormButton = $("#showDiscountFormButton");

    var beforePriceForm = $("#beforePriceForm");
    var discountPercentForm = $("#discountPercentForm");
    var discountTypesForm = $("#discountTypesForm");

    var discountType = $("discountType");

  quantityLimit.change(function(){
        if(quantityLimit.is(":checked")){
             $("#quantity").prop('disabled', false);
        }else{
            $("#quantity").prop('disabled', true);
        }
    });

    initialize();
    console.log(pagePurpose);


    showDiscountFormButton.on('click',function () {

        beforePriceForm.addClass('d-block');
        discountPercentForm.addClass('d-block');
        discountTypesForm.addClass('d-block');
    });



    function initialize() {

    if(quantityLimit.is(":checked")){
             $("#quantity").prop('disabled', false);
        }else{
            $("#quantity").prop('disabled', true);
        }
        if(pagePurpose === "create"){
            url = '/api/admin/stores/'+storeId+'/menu-sections/' + menuSectionId + '/menu-item';
//            initializeBusinessHours();

        } else if(pagePurpose === "update"){
//            discountType.custom-select('val', selectedDiscountType);
//            initializeBusinessHours();
            url = '/api/admin/stores/'+storeId+'/menu-sections/' + menuSectionId + '/menu-item/' + menuItemId;

        } else if (pagePurpose === "read"){
//            categorySelect.selectpicker('val', selectedCategoryList);
//            businessHoursSelect.selectpicker('selectAll');
            url = "/admin/stores/"+storeId+"/form";

        } else {
            return;
        }
    }

    console.log(url);

    menuItemSubmitButton.on('click',function () {
        registerMenuItem(name.val(),description.val(),priority.val(),price.val(),maximumCount.val(),menuItemCoupon.val(),quantity.val());
    });

    menuItemDeleteButton.on('click',function () {
        deleteMenuItem(menuItemId)
    });

    function deleteMenuItem(menuItemIdValue) {
                $.ajax({
                    type: 'DELETE',
                    url: '/api/admin/stores/'+storeId+'/menu-sections/' + menuSectionId + '/menu-item/'+menuItemIdValue,
                    dataType: 'json',
                    contentType:'application/json; charset=utf-8',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, token);
                    },
                    success: function (response) {
                        alert('삭제가 완료되었습니다.');
                        location.href= '/admin/stores/'+storeId+'/menu-sections/' + menuSectionId + '/menu-items';
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
    }


    function registerMenuItem(nameValue,descriptionValue,priorityValue,priceValue,maximumCountValue,menuItemCouponValue,quantityValue) {
        var data = {
            name : nameValue,
            description : descriptionValue,
            priority : priorityValue,
            price : priceValue,
            maximumCount : maximumCountValue,
            menuItemCouponId : $("#menuItemCoupon option:selected").val(),
            quantity : quantityValue,
            quantityLimit : $("#quantityLimit").is(":checked")

        };

        console.log("log : " + data.name);
        console.log("log : " + data.menuItemCouponId);
        console.log("log : " + data.quantity);
        console.log("log : " + data.quantityLimit);


        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token);
            },
            success: function (response) {
                alert('등록이 완료되었습니다.');
                location.href= '/admin/stores/'+storeId+'/menu-sections/' + menuSectionId + '/menu-items';
            },
            error: function (data) {
                alert(data);
                console.log(data);
            }
        });

    }

})