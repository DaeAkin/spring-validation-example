var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

$(function () {

    //필드들
    var everyOnSale = $("#everyOnSale");
    var startDiscountTime = $("#startDiscountTime");
    var endDiscountTime = $("#endDiscountTime");
    var everyOnSaleChecked = $("input:checkbox[id='everyOnSale']").is(":checked");

    //버튼들
    var menuItemCouponSaveButton = $("#menuItemCouponSaveButton")

    //변수들
    var url;

    initialize();


    function initialize() {
        setImagePreview();
        if(pagePurpose === "create"){
            url = "/admin/stores";


        } else if(pagePurpose === "update"){
//            categorySelect.selectpicker('val', selectedCategoryList);

            url = "/admin/stores/"+storeId;

        } else if (pagePurpose === "read"){
//            categorySelect.selectpicker('val', selectedCategoryList);

            url = "/admin/stores/"+storeId+"/form";

        } else {
            return;
        }
    }

    if(everyOnSaleChecked) {
        dateTimeOnDeActive();
    }

  everyOnSale.change(function(){
        if(everyOnSale.is(":checked")){
            dateTimeOnDeActive();
        }else{
            datetimeOnActive();
        }
    });



    function datetimeOnActive() {
        $("#startDiscountTime").prop('disabled', false);
        $("#endDiscountTime").prop('disabled', false);
    }

    function dateTimeOnDeActive() {
         $("#startDiscountTime").prop('disabled', true);
         $("#endDiscountTime").prop('disabled', true);
    }

})