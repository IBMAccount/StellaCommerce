﻿(function(){CKEDITOR.plugins.add("ibmspellchecker",{lang:"ar,ca,cs,da,de,el,en,es,fi,fr,he,hr,hu,it,iw,ja,kk,ko,nb,nl,no,pl,pt,pt-br,ro,ru,sk,sl,sv,th,tr,uk,zh,zh-cn,zh-tw",icons:"ibmspellchecker",requires:["ajax","ibmajax","dialog"],init:function(a){a.addCommand("ibmspellchecker",new CKEDITOR.dialogCommand("ibmspellchecker"));a.ui.addButton("IbmSpellChecker",{label:a.lang.ibmspellchecker.title,command:"ibmspellchecker",toolbar:"editing,50",modes:{source:0,wysiwyg:1}});CKEDITOR.dialog.add("ibmspellchecker",
this.path+"dialogs/ibmspellchecker.js")}})})();