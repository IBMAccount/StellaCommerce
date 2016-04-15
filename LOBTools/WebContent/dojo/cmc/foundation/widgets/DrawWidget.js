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
	"cmc/foundation/widgets/ComponentWidget",
	"dojo/dom-construct",
	"dojo/dom-style"
], function(declare, ComponentWidget, domConstruct, domStyle) {
	return declare(ComponentWidget, {
		canvasNode: null,
		context: null,
		renderActions: null,
		constructor: function(args) {
			this.renderActions = [];
		},
		render: function() {
			if (this.context == null) {
				this.canvasNode = domConstruct.toDom("<canvas style=\"position: absolute;\"></canvas>");
				this.domNode.appendChild(this.canvasNode);
				this.context = this.canvasNode.getContext("2d");
			}
			else {
				this.context.clearRect(0, 0, this.canvasNode.width, this.canvasNode.height);
				this.canvasNode.width = 0;
				this.canvasNode.height = 0;
			}
			var minX = undefined;
			var maxX = undefined;
			var minY = undefined;
			var maxY = undefined;
			var lineWidth = 1;
			var halfLineWidth = 0.5;
			var lineToAction = undefined;
			for (var i = this.renderActions.length - 1; i >= 0; i--) {
				var action = this.renderActions[i];
				if (lineToAction && (action.operator == 0 || action.operator == 1 || action.operator == 2)) {
					if (typeof minX == "undefined" || action.x < minX) {
						minX = action.x;
					}
					if (typeof maxX == "undefined" || action.x > maxX) {
						maxX = action.x;
					}
					if (typeof minY == "undefined" || action.y < minY) {
						minY = action.y;
					}
					if (typeof maxY == "undefined" || action.y > maxY) {
						maxY = action.y;
					}
					if (lineToAction.x < minX) {
						minX = lineToAction.x;
					}
					if (lineToAction.x > maxX) {
						maxX = lineToAction.x;
					}
					if (lineToAction.y < minY) {
						minY = lineToAction.y;
					}
					if (lineToAction.y > maxY) {
						maxY = lineToAction.y;
					}
					if (action.x == lineToAction.x) {
						if (action.x + lineWidth > maxX) {
							maxX = action.x + lineWidth;
						}
						action.xDelta = halfLineWidth;
						lineToAction.xDelta = halfLineWidth;
					}
					if (action.y == lineToAction.y) {
						if (action.y + lineWidth > maxY) {
							maxY = action.y + lineWidth; 
						}
						action.yDelta = halfLineWidth;
						lineToAction.yDelta = halfLineWidth;
					}
					if (action.operator == 2) {
						lineToAction = action;
					}
					else {
						lineToAction = undefined;
					}
				}
				else if (action.operator == 2) {
					lineToAction = action;
				}
				else if (action.operator == 4) {
					if (action.lineWidth > 0) {
						lineWidth = action.lineWidth;
						halfLineWidth = lineWidth / 2;
					}
				}
			}
			if (typeof minX != "undefined" && typeof maxX != "undefined" && typeof minY != "undefined" && typeof maxY != "undefined") {
				domStyle.set(this.canvasNode, "left", minX + "px");
				domStyle.set(this.canvasNode, "top", minY + "px");
				this.canvasNode.width = maxX - minX;
				this.canvasNode.height = maxY - minY;
				this.context.save();
				this.context.translate(-minX, -minY);
				for (var i = 0; i < this.renderActions.length; i++) {
					var action = this.renderActions[i];
					switch (action.operator) {
						case 0:
							this.context.beginPath();
						case 1:
							this.context.moveTo(action.x + action.xDelta, action.y + action.yDelta);
							break;
						case 2:
							this.context.lineTo(action.x + action.xDelta, action.y + action.yDelta);
							break;
						case 3:
							this.context.closePath();
							break;
						case 4:
							if (action.lineWidth > 0) {
								this.context.lineWidth = action.lineWidth;
							}
							this.context.strokeStyle = action.strokeStyle;
							this.context.stroke();
							break;
						default:
							break;
					}
				}
				this.context.restore();
			}
		},
		clear: function() {
			this.renderActions = [];
			this.render();
		},
		beginPath: function() {
			this.renderActions.push({
				operator: 0,
				x: 0,
				xDelta: 0,
				y: 0,
				yDelta: 0
			});
		},
		moveTo: function(x, y) {
			this.renderActions.push({
				operator: 1,
				x: x,
				xDelta: 0,
				y: y,
				yDelta: 0
			});
		},
		lineTo: function(x, y) {
			this.renderActions.push({
				operator: 2,
				x: x,
				xDelta: 0,
				y: y,
				yDelta: 0
			});
		},
		closePath: function() {
			this.renderActions.push({
				operator: 3
			});
		},
		stroke: function() {
			this.renderActions.push({
				operator: 4,
				lineWidth: this.component.lineWidth,
				strokeStyle: this.component.strokeStyle
			});
			this.render();
		}
	});
});
