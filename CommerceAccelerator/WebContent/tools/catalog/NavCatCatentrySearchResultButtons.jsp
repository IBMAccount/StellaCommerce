<!--==========================================================================
Licensed Materials - Property of IBM

WebSphere Commerce

(c) Copyright IBM Corp.  2006
All Rights Reserved

US Government Users Restricted Rights - Use, duplication or
disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
===========================================================================-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN">

<%@page import="java.util.*" %>
<%@ page import="com.ibm.commerce.tools.util.*" %>
<%@ page import="com.ibm.commerce.command.CommandContext" %>

<%@include file="../common/common.jsp" %>

<%
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Get the command context
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	CommandContext cmdContext = (CommandContext)request.getAttribute(com.ibm.commerce.server.ECConstants.EC_COMMANDCONTEXT);
	Hashtable rbCategory = (Hashtable)ResourceDirectory.lookup("catalog.CatalogNLS", cmdContext.getLocale());
%>

<HTML>
<HEAD>

<LINK rel=stylesheet href="<%= UIUtil.getCSSFile(cmdContext.getLocale()) %>" type="text/css">

<SCRIPT SRC="/wcs/javascript/tools/common/Util.js"></SCRIPT>
<SCRIPT SRC="/wcs/javascript/tools/catalog/button.js"></SCRIPT>

<SCRIPT>

	function addButton()
	{
		if (isButtonEnabled(btnAdd) == false) return;
		if (parent.getWorkframeReady() == false) return;

		if (parent.currentTargetTreeElement == null) 
		{
			alertDialog("<%=UIUtil.toJavaScript((String)rbCategory.get("NavCatSourceProductsButtons_ErrorNoTarget"))%>");
			return;
		}
		top.showProgressIndicator(true);		
		parent.catentrySearchResultFrame.addButton();
		top.showProgressIndicator(false);
	}


	function setButtons(count)
	{
		if (count == 0)
		{
			enableButton(btnAdd, false);
		} else {
			enableButton(btnAdd, parent.currentTargetTreeElement.id != 0);
		} 
		
		if(parent.bStoreViewOnly)
		{
			enableButton(btnAdd, false);
		}		
	}

</SCRIPT>

</HEAD>

<BODY CLASS=content_bt ONCONTEXTMENU="return false;">

	<SCRIPT>
		beginButtonTable();
		drawEmptyButton();
		drawButton("btnAdd", "<%=UIUtil.toJavaScript((String)rbCategory.get("NavCatSourceProductsButtons_AddButton"))%>", "addButton()", "disabled");
		endButtonTable();
		AdjustRefreshButton(btnAdd);
	</SCRIPT>

</BODY>

</HTML>
