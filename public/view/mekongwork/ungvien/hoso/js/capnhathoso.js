function loadHtml(type) {
  $.post(URL_ROOT + 'ung-vien/getHtmlEdit', {'type': type}, function (r) {
      if (r.length < 100) {
          switch (type) {
              case "hoso":
                  if (r.indexOf('info') < 0) {
                      call_noti('Hoàn thành cập nhật thông tin cá nhân trước.', 'error');
                      $('.wizard-nav a[data-type="info"]').click();
                  }
                  break;
              case "bangcap":
                  if (r.indexOf('info') < 0) {
                      call_noti('Hoàn thành cập nhật thông tin cá nhân trước.', 'error');
                      $('.wizard-nav a[data-type="info"]').click();
                  } else if (r.indexOf('hoso') < 0) {
                      call_noti('Hoàn thành cập nhật thông tin hồ sơ trước.', 'error');
                      $('.wizard-nav a[data-type="hoso"]').click();
                  }
                  break;
              case "kinhnghiem":
                  if (r.indexOf('info') < 0) {
                      call_noti('Hoàn thành cập nhật thông tin cá nhân trước.', 'error');
                      $('.wizard-nav a[data-type="info"]').click();
                  } else if (r.indexOf('hoso') < 0) {
                      call_noti('Hoàn thành cập nhật thông tin hồ sơ trước.', 'error');
                      $('.wizard-nav a[data-type="hoso"]').click();
                  } else if (r.indexOf('bangcap') < 0) {
                      call_noti('Hoàn thành cập nhật thông tin học vấn bằng cấp trước.', 'error');
                      $('.wizard-nav a[data-type="bangcap"]').click();
                  }
                  break;
              case "kynang":
                  if (r.indexOf('info') < 0) {
                      call_noti('Hoàn thành cập nhật thông tin cá nhân trước.', 'error');
                      $('.wizard-nav a[data-type="info"]').click();
                  } else if (r.indexOf('hoso') < 0) {
                      call_noti('Hoàn thành cập nhật thông tin hồ sơ trước.', 'error');
                      $('.wizard-nav a[data-type="hoso"]').click();
                  } else if (r.indexOf('bangcap') < 0) {
                      call_noti('Hoàn thành cập nhật thông tin học vấn bằng cấp trước.', 'error');
                      $('.wizard-nav a[data-type="bangcap"]').click();
                  } else if (r.indexOf('kinhnghiem') < 0) {
                      call_noti('Hoàn thành cập nhật thông tin kinh nghiệm làm việc trước.', 'error');
                      $('.wizard-nav a[data-type="kinhnghiem"]').click();
                  }
                  break;
          }
      } else {
          $('#panelContent').html(r);
      }
  })
}

function refeshKN(data) {
  var i = 0;
  html = "";
  data.forEach(function (value) {
      if (value.thangTo == 0 || value.namTo == 0)
          tgTo = "hiện tại";
      else
          tgTo = "tháng " + value.thangTo + "/" + value.namTo;
      html += `<div class="col-sm-12 mb10">
                                      <div class="itemKN">
                                          <div class="toolBoxKN">
                                              <button class="btn btn-primary btn-block btn-xs btnKinhNghiem" type="button" data-id="${i}">
                                                  <i class="far fa-edit"></i>
                                              </button>
                                              <button class="btn btn-danger btn-block btn-xs btnDelKinhNghiem" type="button" data-id="${i}">
                                                  <i class="far fa-trash-alt"></i>
                                              </button>
                                          </div>
                                          <div class="mb5" style="font-weight: 500">${value.chucdanh}</div>
                                          <div class="mb5">${value.tencty}</div>
                                          <div style="font-size: 12px">Từ tháng ${value.thangFrom}/${value.namFrom} đến ${tgTo}
                                          </div>
                                      </div>
                                  </div>`;
      i++;
  });
  $('#divKN').fadeOut(100);
  $('#divKN').html(html);
  $('#divKN').fadeIn();
}

function refeshTD(data) {
  var i = 0;
  html = "";
  data.forEach(function (value) {
      html += `<div class="col-sm-6 mb10">
                                      <div class="itemTD">
                                          <div class="toolBoxTD">
                                              <button class="btn btn-primary btn-block btn-xs btnTrinhDo" data-id="${i}">
                                                  <i class="far fa-edit"></i>
                                              </button>
                                              <button class="btn btn-danger btn-block btn-xs btnDelTrinhDo" data-id="${i}">
                                                  <i class="far fa-trash-alt"></i>
                                              </button>
                                          </div>
                                          <div class="mb5" style="font-weight: 500">${value.bangcap}</div>
                                          <div class="mb5">${value.truong}</div>
                                          <div style="font-size: 12px">Từ tháng ${value.thangFrom}/${value.namFrom} đến tháng ${value.thangTo}/${value.namTo}
                                          </div>
                                      </div>
                                  </div>`;
      i++;
  });
  $('#divTD').fadeOut(100);
  $('#divTD').html(html);
  $('#divTD').fadeIn();
}

function refeshTK(data) {
  var i = 0;
  html = "";
  data.forEach(function (value) {
      html += `<div class="col-sm-12 mb10">
                                      <div class="itemTK">
                                          <div class="toolBoxTK">
                                              <button class="btn btn-primary btn-block btn-xs btnThamKhao" type="button" data-id="${i}">
                                                  <i class="far fa-edit"></i>
                                              </button>
                                              <button class="btn btn-danger btn-block btn-xs btnDelThamKhao" type="button" data-id="${i}">
                                                  <i class="far fa-trash-alt"></i>
                                              </button>
                                          </div>
                                          <div class="mb5" style="font-weight: 500">${value.hoten}</div>
                                          <div class="mb5">Công ty: ${value.tencty}</div>
                                          <div style="font-size: 12px">Vị trí: ${value.chucdanh}</div>
                                      </div>
                                  </div>`;
      i++;
  });
  $('#divTK').fadeOut(100);
  $('#divTK').html(html);
  $('#divTK').fadeIn();
}

function refeshNN(data) {
  html = "";
  data.forEach(function (value) {
      html += `<div class="col-sm-12 mb10">
                                      <div class="itemNN">
                                          <div class="toolBoxNN">
                                              <button class="btn btn-primary btn-block btn-xs btnNgoaiNgu" type="button" data-id="${value.ngoaingu_id}">
                                                  <i class="far fa-edit"></i>
                                              </button>
                                              <button class="btn btn-danger btn-block btn-xs btnDelNgoaiNgu" type="button" data-id="${value.ngoaingu_id}">
                                                  <i class="far fa-trash-alt"></i>
                                              </button>
                                          </div>
                                          <div class="mb5"
                                               style="font-weight: 500">${value.ngoaingu_ten}</div>
                                          <div style="font-size: 12px">
                                              Nghe: ${value.ngoaingu_nghe} - Nói: ${value.ngoaingu_noi} - Đọc: ${value.ngoaingu_doc} - Viết: ${value.ngoaingu_viet}
                                          </div>
                                      </div>
                                  </div>`;
  });
  $('#divNN').fadeOut(100);
  $('#divNN').html(html);
  $('#divNN').fadeIn();
}

$(document).ready(function () {
  $('.wizard-nav a').click(function () {
      $('.wizard-nav li').removeClass('active');
      $(this).parent().addClass('active');
      $('#panelContent').html(`<div class="panel">
          <div class="panel-body">
              <div class="lds-ellipsis" style="margin: 0 auto">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
          </div>
      </div>`);
      loadHtml($(this).attr('data-type'));
  });

  loadHtml('info');

  $(document).on('click', '.btnKinhNghiem', function () {
      $('#modalGeneralHoSo .modal-content').html(`
          <div class="lds-ellipsis" style="margin: 20px auto">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      `);
      $('#modalGeneralHoSo').modal('show');
      id = $(this).attr('data-id');
      $.post(URL_ROOT + 'ung-vien/editKinhNghiem', {'id': id}, function (r) {
          $('#modalGeneralHoSo .modal-content').html(r);
      });
  });

  $(document).on('click', '.btnDelKinhNghiem', function () {
      elm = $(this);
      swal({
              title: 'Bạn có chắc muốn xóa kinh nghiệm này?',
              text: '',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'OK',
              closeOnConfirm: true
          },
          function () {
              $('.btnDelKinhNghiem').prop('disabled', true);
              id = elm.attr('data-id');
              $.post(URL_ROOT + 'ung-vien/xoaKinhNghiem', {'key': id}, function (r) {
                  if (r.status == 1) {
                      refeshKN(r.data);
                      updateDiem(r.diem);
                  } else {
                      swal({
                              title: 'Error',
                              text: r.message + '\nVui lòng liên hệ quản trị viên để biết thêm.',
                              type: 'error',
                              showCancelButton: false,
                              confirmButtonColor: '#DD6B55',
                              confirmButtonText: 'OK',
                              closeOnConfirm: true
                          },
                          function () {
                          });
                  }
                  $('.btnDelKinhNghiem').prop('disabled', false);
              }, 'JSON');
          });
  });

  $(document).on('click', '.btnTrinhDo', function () {
      $('#modalGeneralHoSo .modal-content').html(`
          <div class="lds-ellipsis" style="margin: 20px auto">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      `);
      $('#modalGeneralHoSo').modal('show');
      id = $(this).attr('data-id');
      $.post(URL_ROOT + 'ung-vien/editTrinhDo', {'id': id}, function (r) {
          $('#modalGeneralHoSo .modal-content').html(r);
      });
  });

  $(document).on('click', '.btnDelTrinhDo', function () {
      elm = $(this);
      swal({
              title: 'Bạn có chắc muốn xóa thông tin này?',
              text: '',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'OK',
              closeOnConfirm: true
          },
          function () {
              $('.btnDelTrinhDo').prop('disabled', true);
              id = elm.attr('data-id');
              $.post(URL_ROOT + 'ung-vien/xoaTrinhDo', {'key': id}, function (r) {
                  if (r.status == 1) {
                      refeshTD(r.data);
                      updateDiem(r.diem);
                  } else {
                      swal({
                              title: 'Error',
                              text: r.message + '\nVui lòng liên hệ quản trị viên để biết thêm.',
                              type: 'error',
                              showCancelButton: false,
                              confirmButtonColor: '#DD6B55',
                              confirmButtonText: 'OK',
                              closeOnConfirm: true
                          },
                          function () {
                          });
                  }
                  $('.btnDelTrinhDo').prop('disabled', false);
              }, 'JSON');
          });
  });

  $(document).on('click', '.btnThamKhao', function () {
      $('#modalGeneralHoSo .modal-content').html(`
          <div class="lds-ellipsis" style="margin: 20px auto">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      `);
      $('#modalGeneralHoSo').modal('show');
      id = $(this).attr('data-id');
      $.post(URL_ROOT + 'ung-vien/editThamKhao', {'id': id}, function (r) {
          $('#modalGeneralHoSo .modal-content').html(r);
      });
  });

  $(document).on('click', '.btnDelThamKhao', function () {
      elm = $(this);
      swal({
              title: 'Bạn có chắc muốn xóa thông tin này?',
              text: '',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'OK',
              closeOnConfirm: true
          },
          function () {
              $('.btnDelThamKhao').prop('disabled', true);
              id = elm.attr('data-id');
              $.post(URL_ROOT + 'ung-vien/xoaThamKhao', {'key': id}, function (r) {
                  if (r.status == 1) {
                      refeshTK(r.data);
                  } else {
                      swal({
                              title: 'Error',
                              text: r.message + '\nVui lòng liên hệ quản trị viên để biết thêm.',
                              type: 'error',
                              showCancelButton: false,
                              confirmButtonColor: '#DD6B55',
                              confirmButtonText: 'OK',
                              closeOnConfirm: true
                          },
                          function () {
                          });
                  }
                  $('.btnDelThamKhao').prop('disabled', false);
              }, 'JSON');
          });
  });

  $(document).on('click', '.btnNgoaiNgu', function () {
      $('#modalGeneralHoSo .modal-content').html(`
          <div class="lds-ellipsis" style="margin: 20px auto">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      `);
      $('#modalGeneralHoSo').modal('show');
      id = $(this).attr('data-id');
      $.post(URL_ROOT + 'ung-vien/editNgoaiNgu', {'id': id}, function (r) {
          $('#modalGeneralHoSo .modal-content').html(r);
      });
  });

  $(document).on('click', '.btnDelNgoaiNgu', function () {
      elm = $(this);
      id = elm.attr('data-id');
      swal({
              title: 'Bạn có chắc muốn xóa thông tin này?',
              text: '',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'OK',
              closeOnConfirm: true
          },
          function () {
              $('.btnDelNgoaiNgu').prop('disabled', true);
              $.post(URL_ROOT + 'ung-vien/xoaNgoaiNgu', {'ngoaingu_id': id}, function (r) {
                  if (r.status == 1) {
                      refeshNN(r.data);
                  } else {
                      swal({
                              title: 'Error',
                              text: r.message + '\nVui lòng liên hệ quản trị viên để biết thêm.',
                              type: 'error',
                              showCancelButton: false,
                              confirmButtonColor: '#DD6B55',
                              confirmButtonText: 'OK',
                              closeOnConfirm: true
                          },
                          function () {
                          });
                  }
                  $('.btnDelNgoaiNgu').prop('disabled', false);
              }, 'JSON');
          });
  });

  $('#ungvien_hienthihs').click(function () {
      elm = $(this);
      btnlinkload(elm);
      hienthi = $(this).attr('data-value');
      $.post(URL_ROOT + "ung-vien/updateHienThi", {'value': hienthi}, function (r) {
          if (r.status == 1) {
              if (hienthi == 0) {
                  call_noti('Hồ sơ của bạn đã được ẩn', 'success');
                  btnlinkthanhcong(elm, '<i class="far fa-eye"></i> Hiển thị hồ sơ');
                  elm.removeClass('btn-gray');
                  elm.addClass('btn-primary');
                  elm.attr('data-value', 1);
                  elm.next().html('Hồ sơ của bạn đang ẩn, click để hiển thị hồ sơ<br/>* Hiển thị hồ sơ cho phép nhà tuyển dụng tìm kiếm thông tin của bạn và chủ động liên hệ mời phỏng vấn.');
              } else {
                  call_noti('Hồ sơ của bạn đã được hiển thị', 'success');
                  btnlinkthanhcong(elm, '<i class="far fa-eye-slash"></i> Ẩn hồ sơ');
                  elm.removeClass('btn-primary');
                  elm.addClass('btn-gray');
                  elm.attr('data-value', 0);
                  elm.next().html('Hồ sơ đang được hiển thị, click để ẩn hồ sơ<br/>* Lưu ý: Nhà tuyển dụng sẽ không thể tìm kiếm hồ sơ của bạn khi hồ sơ được ẩn.');
              }
          } else {
              call_noti(r.message, 'error');
              if (hienthi == 1) {
                  btnlinkthanhcong(elm, '<i class="far fa-eye"></i> Hiển thị hồ sơ');
              } else {
                  btnlinkthanhcong(elm, '<i class="far fa-eye-slash"></i> Ẩn hồ sơ');
              }
          }
      }, 'JSON');
  });
});