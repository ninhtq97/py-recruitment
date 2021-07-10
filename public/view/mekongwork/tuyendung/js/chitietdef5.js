$(document).ready(function () {
    if (hasCV) {
        editor = CKEDITOR.replace('noidung',
            {
                toolbar: 'Basic'
            });
    }
    $('#frmNopHS').submit(function () {
        if (ktcv($('#cvDinhKem'))) {
            btnlinkload($('#frmNopHS .btnSub'));
            http = new XMLHttpRequest();
            $('#noidung').html(CKEDITOR.instances['noidung'].getData());

            var Form = document.querySelector('#frmNopHS');
            var formData = new FormData(Form);

            http.onreadystatechange = function (event) {
                if (http.readyState == 4 && http.status == 200) {
                    var ketqua = JSON.parse(http.responseText);
                    if (ketqua.status == 1) {
                        swal({
                                title: 'Ứng tuyển thành công',
                                text: '',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#1d769f',
                                confirmButtonText: 'Xem hồ sơ đã nộp',
                                closeOnConfirm: false
                            },
                            function (isConfirm) {
                                location.href = URL_ROOT + 'ung-vien/viec-lam-da-nop';
                            });
                    } else {
                        btnlinkthanhcong($('#frmNopHS .btnSub'), 'Lỗi! Vui lòng thử lại');
                        swal({
                                title: 'Error!',
                                text: ketqua.message,
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#1d769f',
                                closeOnConfirm: true
                            },
                            function (isConfirm) {

                            });
                    }
                }
            };
            http.open("POST", URL_ROOT + "ungvien/nophoso", true);
            http.send(formData);
        }
        return false;
    });

    $('.btnSaveTD').click(function () {
        elm = $(this);
        if (elm.hasClass('btnSaveTD')) {
            btnlinkload(elm);
            let id = $(this).attr('data-id');
            $.post(URL_ROOT + "ung-vien/saveTuyenDung", {
                "tuyendung_id": id
            }, function (o) {
                if (o.status == 1) {
                    btnlinkthanhcong(elm, '<i class="fas fa-check" style="padding-right: 5px"></i> Tuyển dụng đã lưu');
                    elm.removeClass('btn-warning');
                    elm.removeClass('btnSaveTD');
                    elm.addClass('btn-success');
                } else {
                    swal('Error!', 'Error', 'warning');
                    btnlinkthanhcong(elm, '<i class="fal fa-save" style="padding-right: 5px"></i> Lưu tin tuyển dụng');
                }
            }, "JSON");
        }
    });
});