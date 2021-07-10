$(document).ready(function (e) {
    $('#frmDkNtd').submit(function () {
        if ($('#ckbAgree').is(":checked")) {
            btnlinkload($('#btnDkNtd'));
            $.post(URL_ROOT + "nhatuyendung/insertNtd", $(this).serializeArray(), function (o) {
                btnlinkthanhcong($('#btnDkNtd'), 'ĐĂNG KÝ NHÀ TUYỂN DỤNG');
                if (o.status == 1) {
                    call_noti("Đăng ký thành công!", 'success', 3000);
                    $('#divDK').remove();
                    $('#divXacThuc').fadeIn();
                    var timeRedirect = parseInt($('#timeRedirect').html());
                    var interReditect = setInterval(function () {
                        if (timeRedirect == 0) {
                            clearInterval(interReditect);
                            location.href = URL_ROOT;
                        } else
                            $('#timeRedirect').html(--timeRedirect);
                    }, 1000)

                } else {
                    call_noti(o.message, 'error', o.time);
                }
            }, 'JSON')
        } else {
            call_noti('Vui lòng đọc và đồng ý với điều khoản đăng ký!', 'info');
        }
        return false;
    });
});