﻿CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{table:function(a,c){var g=/^(\d+(?:\.\d+)?)(px|%|in|cm|mm|em|ex|pt|pc)$/,h=/^(px|%|in|cm|mm|em|ex|pt|pc)$/,f=500>c.editable().getSize("width")?!0:!1;if("table"===a.dialog.getName()){a.title=c.lang.table.ibm.createTable;a.dialog.origOnShow=a.onShow;a.onShow=function(){this.origOnShow&&this.origOnShow();a.dialog.getContentElement("info","chkFixedWidthCols").enable();"%"==a.dialog.getContentElement("info","cmbWidthType").getValue()?a.dialog.getContentElement("info",
"chkFixedWidthCols").disable():a.dialog.getContentElement("info","chkFixedWidthCols").enable()};a.removeContents("advanced");var d=a.getContents("info"),i=d.get("txtRows"),j=d.get("txtCols"),e=d.get("txtWidth");i.controlStyle=this.styleWidth100Pc;j.controlStyle=this.styleWidth100Pc;e.controlStyle=this.styleWidth100Pc;e.title=null;e["default"]=f?"100":"500";var k=d.get("txtBorder");k.style="display:none;";var l=d.get("requiredLabel")?d.get("requiredLabel"):{type:"html",html:""};e.validate=function(){var b=
this.getValue(),a=g.exec(b);a?b=parseFloat(a[1],10):h.exec(b)&&(b="");return""==b||"number"==typeof b?!0:c.lang.table.invalidWidth};e.commit=function(b){var a=this.getValue(),c=g.exec(a),d=this.id;b.info||(b.info={});c?b.info[d]=a:h.exec(a)&&(b.info[d]="")};e.getValue=function(){return this.getInputElement().getValue()+this.getDialog().getContentElement("info","cmbWidthType").getValue()};d.elements=[{type:"hbox",children:[i,j]},{type:"hbox",children:[e,{id:"cmbWidthType",requiredContent:"table{width}",
type:"select",label:c.lang.table.widthUnit,style:this.styleWidth100Pc,"default":f?"%":"px",items:[[c.lang.table.widthPx,"px"],[c.lang.table.widthPc,"%"],[c.lang.ibm.common.widthIn,"in"],[c.lang.ibm.common.widthCm,"cm"],[c.lang.ibm.common.widthMm,"mm"],[c.lang.ibm.common.widthEm,"em"],[c.lang.ibm.common.widthEx,"ex"],[c.lang.ibm.common.widthPt,"pt"],[c.lang.ibm.common.widthPc,"pc"]],commit:function(){},onChange:function(){this.getDialog().getContentElement("info","txtWidth").onChange();var b=this.getDialog().getContentElement("info",
"chkFixedWidthCols");"%"==this.getValue()?(b.setValue(!1),b.disable()):(b.isEnabled()||b.enable(),!0!=b.getValue()&&b.setValue(!0))}}]},{type:"checkbox",id:"chkFixedWidthCols",label:c.lang.table.ibm.fixedColWidths,"default":f?!1:!0,requiredContent:"table{width}",commit:function(b,a){this.getValue()&&a.setAttribute("fixedwidthcolumns","true")}},{type:"hbox",children:[k]},l]}}},!0);