$(function() {
    var name = $("#name");
    var locationX = $("#locationX");
    var locationY = $("#locationY");

    var storeMainImage = $("#storeMainImage");
    var storeMainImageFile = $('#storeMainImageFile');

    var storeSaveButton = $("#storeSaveButton");
    var storeDeleteButton = $("#storeDeleteButton");

    var pagePurpose = $("meta[name='pagePurpose']").attr("content");
    var storeId = $("meta[name='storeId']").attr("content");

    var categorySelect = $("#categorySelect");

    var businessLicenseCopyOfImageFile = $("#businessLicenseCopyOfImageFile");
    var businessLicenseCopyOfImage = $("#businessLicenseCopyOfImage");

    var businessLicenseCopyOfBusinessCardFile = $("#businessLicenseCopyOfBusinessCardFile");
    var businessLicenseCopyOfBusinessCardImage = $("#businessLicenseCopyOfBusinessCardImage");

    var businessHoursSelect = $("#businessHours");
    var dayOfWeek = $("#dayOfWeek");
    var businessHourStartTime = $("#businessHourStartTime");
    var businessHourEndTime = $("#businessHourEndTime");
    var registerBusinessHourButton = $("#registerBusinessHourButton");

    var enabled = $("#enabled");

    var url;

    initialize();
    console.log(pagePurpose);

    storeSaveButton.on('click', function () {
        if(pagePurpose === "create" || pagePurpose === "update"){
            save();
        } else if (pagePurpose === "read") {
            location.href = url;
        }
    });

  storeDeleteButton.on('click', function () {
        if(confirm("정말로 삭제할까요?")) {
            url = "/admin/stores/"+storeId;
            deleteStore();
        } else {
        return;
        }

    });


    
    function initialize() {
        setImagePreview();
        if(pagePurpose === "create"){
            url = "/admin/stores";
            initializeBusinessHours();

        } else if(pagePurpose === "update"){
            categorySelect.selectpicker('val', selectedCategoryList);
            initializeBusinessHours();
            url = "/admin/stores/"+storeId;

        } else if (pagePurpose === "read"){
            categorySelect.selectpicker('val', selectedCategoryList);
            businessHoursSelect.selectpicker('selectAll');
            url = "/admin/stores/"+storeId+"/form";

        } else {
            return;
        }
    }

    function initializeBusinessHours() {
        businessHoursSelect.selectpicker('selectAll');

        registerBusinessHourButton.on('click', function() {
            if (!validateBusinessHours()) {
                return;
            }
            businessHoursSelect.append('<option value="'+dayOfWeek.val() +';' + businessHourStartTime.val() + ';' + businessHourEndTime.val()+'">'+ dayOfWeekToText() + ', ' + businessHourStartTime.val() + ' ~ ' + businessHourEndTime.val() +'</option>');
            businessHoursSelect.selectpicker("refresh");
            businessHoursSelect.selectpicker('selectAll');
            businessHourStartTime.val('');
            businessHourEndTime.val('');
            alert('추가되었습니다');
        });
    }

    function deleteStore() {
var formData = new FormData($('#storeForm')[0]);
        $.ajax({
                type: 'DELETE',
                url: '/api'+url,
                processData: false,
                dataType: 'json',
                contentType:false,
                data: formData,
                statusCode: {
                    200: function() {
                        alert('정상적으로 삭제되었습니다.');
                        location.href = "/admin/stores";
                    }
                }
            }).done(function(response) {
                console.log(response.message);
            }).fail(function (error) {
                alert("에러가 발생하였습니다:" + error.toString());
            });

    }

    function save(){
        if(!validate()){
            return;
        }
        var formData = new FormData($('#storeForm')[0]);
        formData.append('storeMainImageFile', storeMainImageFile[0].files[0]);
        formData.append('businessLicenseCopyOfImageFile', businessLicenseCopyOfImageFile[0].files[0]);
        formData.append('businessLicenseCopyOfBusinessCardFile', businessLicenseCopyOfBusinessCardFile[0].files[0]);

        formData.append('enabled', enabled.prop('checked'));

        $.ajax({
            type: 'POST',
            url: '/api'+url,
            processData: false,
            dataType: 'json',
            contentType:false,
            data: formData,
            statusCode: {
                200: function() {
                    alert('정상적으로 등록되었습니다.');
                    location.href = "/admin/stores";
                }
            }
        }).done(function(response) {
            console.log(response.message);
        }).fail(function (error) {
            alert("에러가 발생하였습니다:" + error.toString());
        });
    }

    function setImagePreview(){
        storeMainImageFile.change(function(){
            storeMainImage.show();

            loadLocalImageFile(this,storeMainImage);
        });

        businessLicenseCopyOfImageFile.change(function(){
           businessLicenseCopyOfImage.show();

           loadLocalImageFile(this, businessLicenseCopyOfImage);
        });

        businessLicenseCopyOfBusinessCardFile.change(function(){
           businessLicenseCopyOfBusinessCardImage.show();

           loadLocalImageFile(this, businessLicenseCopyOfBusinessCardImage);
        });
    }

    function loadLocalImageFile(input, imageView){
        if (input.files && input.files[0]){
            var reader = new FileReader();
            reader.onload = function(e){
                imageView.attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    function validate(){
        if(name.val().length === 0){
            alert("음식점 이름을 입력하셔야 합니다.");
            return false;
        } else if (locationX.val().length === 0){
            alert("음식점 위치를 입력하셔야 합니다.");
            return false;
        } else if (locationY.val().length === 0){
            alert("음식점 위치를 입력하셔야 합니다.");
            return false;
        } else {
            return true;
        }
    }

    function validateBusinessHours() {
        if (dayOfWeek.val().length === 0) {
            alert("영업일자를 선택해주세요.");
            return false;
        } else if (businessHourStartTime.val().length === 0) {
            alert("영업 시작시간을 선택해주세요.");
            return false;
        } else if (businessHourEndTime.val().length === 0) {
            alert("영업 종료시간을 선택해주세요.");
            return false;
        } else {
            return true;
        }
    }

    function dayOfWeekToText() {
        return $( "#dayOfWeek option:selected" ).text().substring(0, 1);
    }

});