/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
  // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';
  config.extraPlugins = 'wordcount';
  config.wordcount = {
    // Whether or not you want to show the Paragraphs Count
    showParagraphs: false,
    
    // Whether or not you want to show the Word Count
    showWordCount: false,

    // Whether or not you want to show the Char Count
    showCharCount: true,
  };
  config.toolbarGroups = [
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    {
      name: 'editing',
      groups: ['find', 'selection', 'spellchecker', 'editing'],
    },
    { name: 'forms', groups: ['forms'] },
    '/',
    { name: 'styles', groups: ['styles'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'links', groups: ['links'] },
    {
      name: 'paragraph',
      groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'],
    },
    { name: 'insert', groups: ['insert'] },
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    '/',
    { name: 'colors', groups: ['colors'] },
    { name: 'tools', groups: ['tools'] },
    { name: 'others', groups: ['others'] },
    { name: 'about', groups: ['about'] },
  ];

  config.removeButtons =
    'Source,Save,Templates,Cut,NewPage,ExportPdf,Preview,Print,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,RemoveFormat,CopyFormatting,Unlink,Anchor,CreateDiv,BidiRtl,Language,Flash,HorizontalRule,Smiley,PageBreak,Iframe,SpecialChar,BGColor,TextColor,Maximize,ShowBlocks,About,BidiLtr,Image,Font,Styles,FontSize,Underline,Strike,Subscript,Superscript,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock';
};
