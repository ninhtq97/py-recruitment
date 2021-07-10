$(document).ready(function () {
    $('.loginNtdModal').click(function () {
        $('#tabNtd').click();
        $('#modal_login').modal('show');
    });

    $('.loginUvModal').click(function () {
        $('#tabUv').click();
        $('#modal_login').modal('show');
    });

    $('.frmLogin').submit(function () {
        btnSub = $(this).find('.btnSubmit');
        textBtn = btnSub.html();
        btnlinkload(btnSub);
        $.post(URL_ROOT + 'login/login', $(this).serializeArray(), function (o) {
            if (o.status == 1) {
                location.reload();
            } else {
                call_noti(o.message, 'error', 3000);
            }
            btnlinkthanhcong($('.btnSubmit'), textBtn);
        }, 'JSON');
        return false;
    });

    function popupCenter(url, title, w, h, toolbar, status) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var systemZoom = width / window.screen.availWidth;
        var left = (width - w) / 2 / systemZoom + dualScreenLeft;
        var top = (height - h) / 2 / systemZoom + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left + ', toolbar=' + toolbar + ', status=' + status);

        // Puts focus on the newWindow
        if (window.focus) newWindow.focus();
    }

    /* Mạng xã hội */
    mywindow = $(".logingoogle").click(function () {
        popupCenter(URL_ROOT + "login/google", 'Login', '614', '600', 0, 0);
    });

    $(".loginfacebook").click(function () {
        popupCenter(URL_ROOT + "login/facebook", 'Login', '614', '600', 0, 0);
        return false;
    });

    $('#frmReset').submit(function () {
        elmBtn = $("#frmReset .btnSub");
        btnlinkload(elmBtn);
        $.post(URL_ROOT + "taikhoan/resetPass", $(this).serializeArray(), function (r) {
            btnlinkload(elmBtn, 'Reset mật khẩu');
            $('#modal_reset').modal('hide');
            if (r.status == 1) {
                swal('', 'Một email đã được gửi đến hộp thư của bạn, vui lòng thực hiện theo hướng dẫn trong mail để tạo mật khẩu mới', 'success');
            } else if (r.status == 2) {
                swal('', r.message, 'warning');
            } else {
                swal('Error!', r.message, 'error');
            }
        }, 'JSON');
        return false;
    });
});