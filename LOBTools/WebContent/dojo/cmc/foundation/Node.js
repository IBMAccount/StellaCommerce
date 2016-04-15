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
	"cmc/foundation/SingletonRegistry",
	"cmc/foundation/EventUtil",
	"cmc/foundation/DefinitionUtil",
	"exports"
], function(declare, SingletonRegistry, EventUtil, DefinitionUtil, exports) {
	exports.Class = declare(null, {
		nodeCounter: {value: 0},
		UID: undefined,
		module: exports,
		moduleName: "cmc/foundation/Node",
		id: null,
		classroot: undefined,
		name: null,
		defaultplacement: undefined,
		initstage: "normal",
		options: undefined,
		placement: undefined,
		ignoreplacement: false,
		inited: false,
		isinited: false,
		_initcomplete: false,
		parent: undefined,
		childNodes: undefined,
		setPendingVariables: undefined,
		initPendingVariables: undefined,
		constrainedVariables: undefined,
		variables: null,
		childDefinitions: null,
		declaredInstance: false,

		constructor: function(parent, args) {
			this.UID = this.nodeCounter.value++;
			this.childNodes = [];
			this.constrainedVariables = {};
			this.initPendingVariables = {};
			this.setPendingVariables = {};
			if (this.variables) {
				for (variableName in this.variables) {
					if (!args || typeof args[variableName] == "undefined") {
						var variable = this.variables[variableName];
						if (typeof(variable.value) == "undefined") {
							this.initPendingVariables[variableName] = variable;
						}
						else {
							if (this["set_"+variableName]) {
								this.setPendingVariables[variableName] = variable;
							}
							else {
								this[variableName] = variable.value;
							}
						}
					}
				}
			}
			if (args) {
				for (var variableName in args) {
					if (this["set_"+variableName]) {
						this.setPendingVariables[variableName] = {value:args[variableName]};
					}
					else {
						this[variableName] = args[variableName];
					}
				}
			}
			if (this.module != null && this.module.assignSingleton) {
				this.module.Singleton = this;
				delete this.module.assignSingleton;
			}
			if (this.id != null) {
				SingletonRegistry[this.id] = this;
			}
			if (parent) {
				var name = this.name;
				this.parent = parent;
				if (name) {
					this.parent[name] = this;
				}
				var placement = this.placement;
				var currentParent = parent;
				var newParent = null;
				if (this.parentBaseClass) {
					if (!placement && this.parentBaseClass.prototype.variables && this.parentBaseClass.prototype.variables.defaultplacement) {
						placement = this.parentBaseClass.prototype.variables.defaultplacement.value;
					}
					newParent = this.parentBaseClass.prototype.determinePlacement.call(currentParent, this, placement, args);
				}
				else {
					if (!placement) {
						placement = currentParent.defaultplacement;
					}
					newParent = currentParent.determinePlacement(this, placement, args);
				}
				while (newParent != null && newParent != currentParent && newParent.defaultplacement) {
					currentParent = newParent;
					newParent = currentParent.determinePlacement(this, currentParent.defaultplacement, args);
				}
				if (newParent == null) {
					newParent = currentParent;
				}
				this.immediateParent = newParent;
				this.immediateParent.childNodes.push(this);
				if (this.nestingDepth > 0) {
					this.classroot = parent;
					for (var i = 1; i < this.nestingDepth; i++) {
						this.classroot = this.classroot.parent;
					}
				}
			}
		},
	
		postscript: function(parent, args) {
			try {
				if (this.parent == null || this.parent.onConstructTriggered) {
					this.triggerOnConstruct();
				}
				if (this.handlers) {
					this.registerHandlers();
				}
				for (var variableName in this.setPendingVariables) {
					var variable = this.setPendingVariables[variableName];
					try {
						if (typeof variable.value != "undefined" && this["set_"+variableName]) {
							this["set_"+variableName](variable.value);
						}
					}
					catch (e) {
						console.log("error setting variable "+variableName+" in "+this.moduleName);
						console.error(e);
					}
				}
				this.setPendingVariables = null;
				if (this.childDefinitions) {
					this.constructChildren();
				}
				if ((this.initstage != "defer") && (this.immediateParent == null || this.immediateParent.inited || !this.declaredInstance)) {
					this.doInit();
				}
			}
			catch (e) {
				console.log("error in postscript "+this.moduleName);
				console.error(e);
			}
		},
		
		triggerOnConstruct: function() {
			if (this.handlers && !this.onConstructTriggered) {
				this.onConstructTriggered = true;
				for (var i = 0; i < this.handlers.length; i++) {
					var handler = this.handlers[i];
					if (handler.eventName == "onconstruct") {
						handler.method.call(this);
					}
				}
				for (var i = 0; i < this.childNodes.length; i++) {
					var node = this.childNodes[i];
					node.triggerOnConstruct();
				}
			}
		},

		registerHandlers: function() {
			var pendingHandlers = [];
			if ( !this['_registeredHandlers']) {
				this._registeredHandlers = [];
			}
			for (var i = 0; i < this.handlers.length; i++) {
				var handler = this.handlers[i];
				if (handler.eventName != "onconstruct") {
					var eventSource = this;
					if (handler.eventSource) {
						eventSource = undefined;
						try {
							eventSource = handler.eventSource.call(this);
						}
						catch (e) {}
					}
					if (eventSource) {
						EventUtil.connect(eventSource, handler.eventName, this, handler.method);
						this._registeredHandlers.push(handler);
					}
					else {
						pendingHandlers.push(handler);
					}
				}
			}
			this.handlers = pendingHandlers;
		},
		
		unRegisterHandlers: function() {
			while (this._registeredHandlers && this._registeredHandlers.length > 0){
				var handler = this._registeredHandlers.pop();
				var eventSource = this;
				if (handler.eventSource) {
					try {
						eventSource = handler.eventSource.call(this);
					}
					catch (e) {}
				}
				if (eventSource) {
					EventUtil.disconnect(eventSource, handler.eventName, this, handler.method);
					
				}
			}
		},
		
		constructChildren: function() {
			for (var i = 0; i < this.childDefinitions.length; i++) {
				var child = this.childDefinitions[i];
				DefinitionUtil.createClassInstance(child, this);
			}
		},
	
		doInit: function() {
			if (!this.inited) {
				try {
					this.triggerOnConstruct();
					this.inited = true;
					this.isinited = true;
					if (this.handlers) {
						this.registerHandlers();
					}
					this.initializeVariables();
					this.initializeChildren();
					this.init();
					this._initcomplete = true;
					EventUtil.trigger(this, "oninit");
				}
				catch (e) {
					console.log("error occurred during initialization of "+this.moduleName);
					console.error(e);
				}
			}
		},
		
		completeInstantiation: function() {
			this.doInit();
		},
		
		init: function() {
		},
		
		destroy: function() {
			EventUtil.trigger(this, "ondestroy");
			if (this.immediateParent) {
				this.immediateParent.releaseChild(this);
			}
			if (this.parent && this.name && this.parent[this.name] == this) {
				delete this.parent[this.name];
			}
			this.unRegisterHandlers();
			if (this.constrainedVariables) {
				for (var variableName in this.constrainedVariables) {
					var variable = this.constrainedVariables[variableName];
					if (variable) {
						EventUtil.disconnectAll(this, variable.updateMethod);
					}
				}
				this.constrainedVariables = {};
			}
			if (this.childNodes) {
				while (this.childNodes.length > 0) {
					this.childNodes[this.childNodes.length - 1].destroy();
				}
			}
		},
		
		determinePlacement: function(childNode, placement, args) {
			var ip = this;
			if (placement) {
				var parentNodes = [this];
				while (parentNodes.length > 0 && ip == this) {
					var newParentNodes = [];
					for (var i = 0; i < parentNodes.length; i++) {
						var nodes = parentNodes[i].childNodes;
						for (var j = 0; j < nodes.length; j++) {
							var n = nodes[j];
							if (n.parentBaseClass != null) {
								if (n.name == placement) {
									ip = n;
									break;
								}
								else {
									newParentNodes.push(n);
								}
							}
						}
						if (ip != this) {
							break;
						}
					}
					parentNodes = newParentNodes;
				}
			}
			return ip;
		},
		
		initializeVariables: function() {
			if (this.initPendingVariables) {
				var variables = this.initPendingVariables;
				this.initPendingVariables = null;
				for (var variableName in variables) {
					var variable = variables[variableName];
					try {
						if (typeof variable.initializeMethod != "undefined") {
							variable.initializeMethod.call(this);
						}
						if (typeof variable.updateMethod != "undefined") {
							this.addConstrainedVariable(variableName, variable);
						}
						if (typeof variable.value != "undefined" && this["set_"+variableName]) {
							this["set_"+variableName](variable.value);
						}
					}
					catch (e) {
						console.log("error initializing variable "+variableName+" in "+this.moduleName);
						console.error(e);
					}
				}
				variables = null;
				for (var i = 0; i < this.childNodes.length; i++) {
					var node = this.childNodes[i];
					if (node.initstage != "defer") {
						node.initializeVariables();
					}
				}
			}
		},
		
		loadDeferredVariable: function(variableName) {
			if (this[variableName + "_moduleName"] != null && !this[variableName + "_loading"]) {
				var context = this;
				this[variableName + "_loading"] = true;
				require([this[variableName + "_moduleName"]], function(module) {
					context.setVariable(variableName, module);
					context[variableName + "_loading"] = false;
				});
			}
		},
		
		initializeChildren: function() {
			for (var i = 0; i < this.childNodes.length; i++) {
				var node = this.childNodes[i];
				if (node.initstage != "defer") {
					node.doInit();
				}
			}
		},
		
		setVariable: function(variableName, value) {
			this.removeInitPendingVariable(variableName);
			this.removeConstrainedVariable(variableName);
			this._setVariable(variableName, value);
		},
		
		_setVariable: function(variableName, value) {
			if (this["set_"+variableName]) {
				this["set_"+variableName](value);
			}
			else {
				this[variableName] = value;
				EventUtil.trigger(this, "on"+variableName, value);
			}
		},
		
		addConstrainedVariable: function(variableName, variable, value) {
			this.removeConstrainedVariable(variableName);
			this.constrainedVariables[variableName] = variable;
			variable.updateMethod.call(this, undefined, undefined, value);
		},
		
		removeConstrainedVariable: function(variableName) {
			var variable = this.constrainedVariables[variableName];
			if (variable) {
				EventUtil.disconnectAll(this, variable.updateMethod);
				delete this.constrainedVariables[variableName];
			}
		},

		removeInitPendingVariable: function(variableName) {
			if (this.initPendingVariables){
				var variable = this.initPendingVariables[variableName];
				if (variable) {
					delete this.initPendingVariables[variableName];
				}
			}
		},
		
		releaseChild: function(child) {
			if (this.childNodes != null) {
				var index = this.childNodes.indexOf(child);
				if (index != -1) {
					this.childNodes.splice(index, 1);
				}
			}
		},
		
		getUID: function() {
			return this.UID;
		},
		
		animate: function(variableName, to, duration) {
			if (duration == 0) {
				this.setVariable(variableName, to);
			}
			else {
				var node = this;
				require(["cmc/foundation/Animator"], function(Animator) {
					new Animator.Class(node, {
						variable: variableName,
						from: node[variableName],
						to: to,
						duration: duration,
						destroyOnStop: true
					});
				});
			}
		},
		
		childOf: function(parentNode) {
			var isChild = false;
			if (parentNode != null) {
				var c = this;
				while (c != null) {
					if (parentNode == c) {
						isChild = true;
						break;
					}
					c = c.immediateParent;
				}
			}
			return isChild;
		}
	});
	return exports;
});
