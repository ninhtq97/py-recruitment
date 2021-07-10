$('#saveEditedAvatar').ajaxForm({beforeSend:function(){showLoadingImageEditor('Đang lưu thay đổi ...');},success:function(response){hideLoadingImageEditor();if(response.status=='success'){closeImageEditor();window.location.reload();}else{alert(response.error);}},error:function(error){hideLoadingImageEditor();alert('Lỗi!');console.log(error);}})
function uploadAvatar()
{var uploadForm=$('#upload-avatar-form').clone();uploadForm.ajaxForm({contentType:'json',cache:false,beforeSend:function(){showLoadingImageEditor('Đang tải ảnh lên ...');},success:function(response){hideLoadingImageEditor();if(response.status=='success'){$('#saveEditedAvatar input[name=key]').val(response.data.key);$('.tipCompress').hide();initCropper(response.data.image_url);}else{alert(response.error,'error');}},error:function(error){hideLoadingImageEditor();alert('Lỗi!');}});uploadForm.find('[name=avatar]').change(function(){if($(this).val()){uploadForm.submit();}}).trigger('click');}
function showLoadingImageEditor(message){$('.loadingMessage').text(message);$('.loadingShow').show();}
function hideLoadingImageEditor(){$('.loadingShow').hide();}
function initCropper(image)
{if('undefined'==typeof cropRatio){cropRatio=1;}
$('.imageEditor > img').hide().cropper('destroy').attr('src',image).cropper({aspectRatio:cropRatio,preview:'.img-edit-preview'}).show();$('.editorChooseImage').hide();$('.imageEditor').show();$('.edit-image-btns').show();$('#inpNoImage').val(0);$('#imgChanged').val(1);$('.image-controls').show();}
function setNoImage()
{$('.imageEditor').hide();$('.editorChooseImage').show();$('.imageEditor > img').hide().cropper('destroy');$('.img-edit-preview img').attr('src','/images/avatar-default.jpg');$('#inpNoImage').val(1);$('#imgChanged').val(1);$('.image-controls').hide()}
function saveAvatar()
{if($('#imgChanged').val()==0){closeImageEditor();return;}
if($('#inpNoImage').val()==1){$('#saveEditedAvatar').trigger('noavatar');$('#saveEditedAvatar').submit();closeImageEditor();return;}
var data=$('.imageEditor > img').cropper('getData');$('#inpCropX').val(data.x);$('#inpCropY').val(data.y);$('#inpCropW').val(data.width);$('#inpCropH').val(data.height);$('#inpRotate').val(data.rotate);$('#saveEditedAvatar').submit();}
function closeImageEditor()
{$('#imageEditorWraper').hide();}
function initImageControls()
{$('.btn-zoom-in-image').click(function(){$('.imageEditor > img').cropper('zoom',0.1);});$('.btn-zoom-out-image').click(function(){$('.imageEditor > img').cropper('zoom',-0.1);});$('.btn-rotate-left').click(function(){$('.imageEditor > img').cropper('rotate',-90);});$('.btn-rotate-right').click(function(){$('.imageEditor > img').cropper('rotate',90);});}
$('.imageEditorControls .btn-close-image-editor').click(function(){$('.imageEditor').hide();$('.editorChooseImage').show();$('.imageEditor > img').hide().cropper('destroy');$('.img-edit-preview img').attr('src','/images/avatar-default.jpg');$('#inpNoImage').val(0);$('#imgChanged').val(0);$('.image-controls').hide()
closeImageEditor();});$('.imageEditorControls .btn-save-image').click(function(){saveAvatar();});$('.imageEditorControls .btn-remove-image').click(function(){setNoImage();});$('.imageEditorControls .btn-change-image, .editorChooseImage a').click(function(){uploadAvatar();});