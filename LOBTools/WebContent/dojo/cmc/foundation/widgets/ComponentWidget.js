//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2015 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/on",
	"dojo/dom",
	"dojo/dom-class",
	"dijit/registry",
	"dojo/query",
	"cmc/foundation/EventUtil",
	"cmc/foundation/MouseUtil",
	"cmc/foundation/ModalUtil"
], function(declare, _WidgetBase, domConstruct, domStyle, on, dom, domClass, registry, query, EventUtil, MouseUtil, ModalUtil) {
	return declare(_WidgetBase, {
		component: null,
		parentWidget: null,
		mouseHandles: null,
		swfNode: null,
		imgNode: null,
		imgNodeHandles: null,
		buildRendering: function() {
			if (!this.domNode) {
				this.domNode = domConstruct.toDom("<div style=\"position:absolute;-moz-user-select:none;outline:none\"></div>");
			}
			this.containerNode = this.domNode;
			this.applyWidth();
			this.applyHeight();
			this.applyX();
			this.applyY();
			this.applyCurrentImageSource();
			this.applyImageSource();
			this.applyStretches();
			this.applyBGColor();
			this.applyFGColor();
			this.applyFontstyle();
			this.applyFontsize();
			this.applyVisible();
			this.applyClickable();
			this.applyClip();
			this.applyOpacity();
			this.applyModal();
			this.applyContextMenu();
			this.inherited(arguments);
		},
		postCreate: function() {
			this.inherited(arguments);
			if (this.parentWidget != null && this.parentWidget.containerNode != null) {
				this.parentWidget.containerNode.appendChild(this.domNode);
			}
		},
		destroy: function() {
			if (this.mouseHandles != null) {
				for (var i = 0; i < this.mouseHandles.length; i++) {
					this.mouseHandles[i].remove();
				}
				this.mouseHandles = null;
			}
			if (this.swfNode != null) {
				if(this.swfNode.parentNode)this.swfNode.parentNode.removeChild(this.swfNode);
				this.swfNode = null;
			}
			if (this.imgNodeHandles != null) {
				for (var i = 0; i < this.imgNodeHandles.length; i++) {
					this.imgNodeHandles[i].remove();
				}
				this.imgNodeHandles = null;
			}
			if (this.imgNode != null) {
				if(this.imgNode.parentNode) this.imgNode.parentNode.removeChild(this.imgNode);
				this.imgNode = null;
			}
			this.inherited(arguments);
			this.component.widget = null;
		},
		applyWidth: function() {
			var width = "";
			if (this.component.hasSetWidth || !this.component.hasDerivedSize()) {
				width = this.component.width + "px";
			}
			domStyle.set(this.domNode, "width", width);
		},
		applyHeight: function() {
			var height = "";
			if (this.component.hasSetHeight || !this.component.hasDerivedSize()) {
				height = this.component.height + "px";
			}
			domStyle.set(this.domNode, "height", height);
		},
		applyX: function() {
			domStyle.set(this.domNode, "left", (this.component.x - this.component.xoffset) + "px");
		},
		applyY: function() {
			domStyle.set(this.domNode, "top", (this.component.y - this.component.yoffset) + "px");
		},
		applyCurrentImageSource: function() {
			if (this.component.ancestorsDisplayed && this.component.visible) {
				if (this.swfNode) {
					if(this.swfNode.parentNode)this.swfNode.parentNode.removeChild(this.swfNode);
					this.swfNode = null;
				}
				var url = this.component.currentImageSource ? "url('" + this.component.currentImageSource + "')" : "none";
				if (this.component.currentImageSource && this.component.currentImageSource.endsWith(".swf")) {
					var scale = "default";
					var width = this.component.currentImageWidth;
					var height = this.component.currentImageHeight;
					var stretches = this.component.stretches;
					if (stretches == "both" || stretches == "width") {
						width = "100%";
						scale = "exactfit";
					}
					if (stretches == "both" || stretches == "height") {
						height = "100%"
						scale = "exactfit";
					}
					this.swfNode = domConstruct.toDom("<embed id=\"progressIndicatorOnFlashObject\" src=\"" + this.component.currentImageSource + "\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" menu=\"false\" width=\"" + width + "\" height=\"" + height + "\" scale=\"" + scale + "\" style=\"position: absolute; pointer-events:none;\" />");
					//pointer events set to none, so onclick event will be fired on this.domNode. 
					this.domNode.insertBefore(this.swfNode, this.domNode.firstChild);
					url = "none";
				}
				domStyle.set(this.domNode, "backgroundImage", url);
			}
		},
		applyImageSource: function() {
			if (this.imgNodeHandles != null) {
				for (var i = 0; i < this.imgNodeHandles.length; i++) {
					this.imgNodeHandles[i].remove();
				}
				this.imgNodeHandles = null;
				this.component.imageNaturalWidth = null;
				this.component.imageNaturalHeight = null;
				this.component.updateSize();
			}
			if (this.imgNode) {
				if (this.imgNode.parentNode) this.imgNode.parentNode.removeChild(this.imgNode);
				this.imgNode = null;
			}
			if (this.component.imageSource) {
				this.imgNode = domConstruct.toDom("<img style=\"position:absolute;-moz-user-select:none;outline:none\" src=\"" + this.component.imageSource + "\"></img>");
				if (this.imgNodeHandles == null) {
					this.imgNodeHandles = [];
					var widget = this;
					this.imgNodeHandles.push(on(this.imgNode, "load", function(e) {
						widget.component.imageNaturalHeight = widget.imgNode.naturalHeight;
						widget.component.imageNaturalWidth = widget.imgNode.naturalWidth;
						widget.component.updateSize();
						EventUtil.trigger(widget.component, "onload");
					}));
				}
				this.domNode.insertBefore(this.imgNode, this.domNode.firstChild);
			}
		},
		applyStretches: function() {
			var backgroundRepeat = "no-repeat";
			var backgroundSize = "";
			if (this.component.currentImageWidth != null && !isNaN(this.component.currentImageWidth) &&
				this.component.currentImageHeight != null && !isNaN(this.component.currentImageHeight) &&
				this.component.width != null && !isNaN(this.component.width) &&
				this.component.height != null && !isNaN(this.component.height)) {
				if (this.component.stretches == "width") {
					backgroundSize = this.component.width + "px " + this.component.currentImageHeight + "px";
				}
				else if (this.component.stretches == "height") {
					backgroundSize = this.component.currentImageWidth + "px " + this.component.height + "px";
				}
				else if (this.component.stretches == "both") {
					backgroundSize = this.component.width + "px " + this.component.height + "px";
				}
			}
			domStyle.set(this.domNode, "backgroundRepeat", backgroundRepeat);
			domStyle.set(this.domNode, "backgroundSize", backgroundSize);
			if (this.imgNode) {
				var imgWidth = "";
				var imgHeight = "";
				if (this.component.stretches == "width") {
					imgWidth = this.component.width + "px";
					imgHeight = this.imgNode.naturalHeight + "px";
				}
				else if (this.component.stretches == "height") {
					imgWidth = this.imgNode.naturalWidth + "px";
					imgHeight = this.component.height + "px";
				}
				else if (this.component.stretches == "both") {
					imgWidth = this.component.width + "px";
					imgHeight = this.component.height + "px";
				}
				domStyle.set(this.imgNode, "width", imgWidth);
				domStyle.set(this.imgNode, "height", imgHeight);
			}
		},
		applyBGColor: function() {
			domStyle.set(this.domNode, "backgroundColor", this.component.bgcolor ? this.component.bgcolor : "transparent");
		},
		applyFGColor: function() {
			domStyle.set(this.domNode, "color", this.component.fgcolor ? this.component.fgcolor : "currentColor");
		},
		applyFontstyle: function() {
			var fontWeight = "inherit";
			var fontStyle = "inherit";
			if (this.component.fontstyle == "bold") {
				fontWeight = "bold";
				fontStyle = "normal";
			}
			else if (this.component.fontstyle == "bolditalic") {
				fontWeight = "bold";
				fontStyle = "italic";
			}
			else if (this.component.fontstyle == "italic") {
				fontWeight = "normal";
				fontStyle = "italic";
			}
			else if (this.component.fontstyle == "plain") {
				fontWeight = "normal";
				fontStyle = "normal";
			}
			domStyle.set(this.domNode, "fontWeight", fontWeight);
			domStyle.set(this.domNode, "fontStyle", fontStyle);
		},
		applyFontsize: function() {
			var fontSize = "inherit";
			if (this.component.fontsize != null && !isNaN(this.component.fontsize)) {
				fontSize = this.component.fontsize + "px";
			}
			domStyle.set(this.domNode, "fontSize", fontSize);
		},
		applyVisible: function() {
			domStyle.set(this.domNode, "display", this.component.visible ? "block" : "none");
		},
		applyClickable: function() {
			if (this.component.clickable) {
				domStyle.set(this.domNode, "pointerEvents", "auto");
				domClass.add(this.domNode, "cmcClickable");
				if (this.mouseHandles == null) {
					this.mouseHandles = [];
					var widget = this;
					this.mouseHandles.push(on(this.domNode, "click", function(e) {
						if (ModalUtil.inputAllowed(widget.component)) {
							if (EventUtil.trigger(widget.component, "onclick")) {
								e.stopPropagation();
							}
						}
					}));
					this.mouseHandles.push(on(this.domNode, "dblclick", function(e) {
						if (ModalUtil.inputAllowed(widget.component)) {
							if (EventUtil.trigger(widget.component, "ondblclick") || widget.component.stopDoubleClickPropagation) {
								e.stopPropagation();
							}
						}
					}));
					this.mouseHandles.push(on(this.domNode, "mouseover", function(e) {
						if (MouseUtil.currentMouseOverComponent != widget.component) {
							if (MouseUtil.currentMouseOverComponent != null) {
								EventUtil.trigger(MouseUtil.currentMouseOverComponent, "onmouseout");
								EventUtil.trigger(MouseUtil, "onmouseout", MouseUtil.currentMouseOverComponent);
							}
							if (ModalUtil.inputAllowed(widget.component)) {
								MouseUtil.currentMouseOverComponent = widget.component;
								EventUtil.trigger(widget.component, "onmouseover");
							}
						}
						e.stopPropagation();
						EventUtil.trigger(MouseUtil, "onmouseover", widget.component);
					}));
					this.mouseHandles.push(on(this.domNode, "mouseout", function(e) {
						var triggerMouseOut = widget.component == MouseUtil.currentMouseOverComponent;
						if (e.relatedTarget && dom.isDescendant(e.relatedTarget, widget.domNode)) {
							var relatedWidget = registry.getEnclosingWidget(e.relatedTarget);
							while (relatedWidget && !relatedWidget.component.clickable) {
								if (relatedWidget.component.immediateParent) {
									relatedWidget = relatedWidget.component.immediateParent.widget;
								}
								else {
									relatedWidget = null;
								}
							}
							if (relatedWidget == widget) {
								triggerMouseOut = false;
							}
						}
						if (triggerMouseOut) {
							MouseUtil.currentMouseOverComponent = null;
							EventUtil.trigger(widget.component, "onmouseout");
						}
						e.stopPropagation();
						EventUtil.trigger(MouseUtil, "onmouseout", widget.component);
					}));
				}
			}
			else {
				domStyle.set(this.domNode, "pointerEvents", "none");
				domClass.remove(this.domNode, "cmcClickable");
				if (this.mouseHandles != null) {
					for (var i = 0; i < this.mouseHandles.length; i++) {
						this.mouseHandles[i].remove();
					}
					this.mouseHandles = null;
				}
			}
		},
		applyContextMenu: function(){
			if (this.component.contextMenu){
				domStyle.set(this.domNode, "pointerEvents", "auto");
			}
		},
		applyClip: function() {
			domStyle.set(this.domNode, "overflow", this.component.clip ? "hidden" : "");
		},
		applyOpacity: function() {
			domStyle.set(this.domNode, "opacity", (this.component.opacity == null || isNaN(this.component.opacity)) ? "" : this.component.opacity);
		},
		applyModal: function() {
			var modal = ModalUtil.getModalComponent() == this.component;
			if (modal) {
				domClass.add(this.domNode, "cmcModal");
			}
			else {
				domClass.remove(this.domNode, "cmcModal");
			}
		},
		sendBehind: function(component) {
			var widget = component ? component.widget : null;
			if (widget != null && widget.parentWidget != null && widget.parentWidget.containerNode != null && widget.domNode != null &&
				this.parentWidget != null && widget.parentWidget.containerNode == this.parentWidget.containerNode && this.domNode != null) {
				this.removeCKEditor();
				widget.parentWidget.containerNode.insertBefore(this.domNode, widget.domNode);
				this.restoreCKEditor();
			}
		},
		sendInFrontOf: function(component) {
			var widget = component ? component.widget : null;
			if (widget != null && widget.parentWidget != null && widget.parentWidget.containerNode != null && widget.domNode != null &&
				this.parentWidget != null && widget.parentWidget.containerNode == this.parentWidget.containerNode && this.domNode != null) {
				widget.removeCKEditor();
				widget.parentWidget.containerNode.insertBefore(widget.domNode, this.domNode);
				widget.restoreCKEditor();
			}
		},
		sendToBack: function() {
			if (this.parentWidget != null && this.parentWidget.containerNode != null && this.parentWidget.containerNode.firstChild != this.domNode && this.domNode != null) {
				this.removeCKEditor();
				this.parentWidget.containerNode.insertBefore(this.domNode, this.parentWidget.containerNode.firstChild);
				this.restoreCKEditor();
			}
		},
		bringToFront: function() {
			if (this.parentWidget != null && this.parentWidget.containerNode != null && this.domNode != null && this.domNode != this.parentWidget.containerNode.lastChild) {
				this.removeCKEditor();
				this.parentWidget.containerNode.appendChild(this.domNode);
				this.restoreCKEditor();
			}
		},
		getIndex: function() {
			var index = -1;
			if (this.parentWidget != null && this.parentWidget.containerNode != null && this.domNode != null) {
				var nodeList = this.parentWidget.containerNode.children;
				for (var i = 0; i < nodeList.length; i++) {
					if (nodeList.item(i) == this.domNode) {
						index = i;
						break;
					}
				}
			}
			return index;
		},
		setFocus: function() {
			this.domNode.tabIndex = -1;
			this.domNode.focus();
		},
		getWidgetWidth: function() {
			return this.domNode != null ? this.domNode.offsetWidth : 0;
		},
		getWidgetHeight: function() {
			return this.domNode != null ? this.domNode.offsetHeight : 0;
		},
		restoreCKEditor: function(){
			query('.CMCtextarea.richInputText', this.domNode).forEach(function(node){
				var w = registry.getEnclosingWidget(node);
				if (typeof w['restoreCKEditor'] == 'function'){
					w.restoreCKEditor();
				}
			});
			
		},
		removeCKEditor: function(){
			query('.CMCtextarea.richInputText', this.domNode).forEach(function(node){
				var w = registry.getEnclosingWidget(node);
				if (typeof w['removeCKEditor'] == 'function'){
					w.removeCKEditor();
				}
			});
			
		}
	});
});
