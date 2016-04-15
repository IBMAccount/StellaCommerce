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
	"cmc/foundation/Node",
	"cmc/foundation/EventUtil",
	"exports"
], function(declare, Node, EventUtil, exports) {
	exports.Class = declare(Node.Class, {
		active: false,
		savedConstrainedVariables: null,

		set_active: function(value) {
			if (this.active != value) {
				this.active = value;
				if (value) {
					this.activate();
				}
				else {
					this.deactivate();
				}
			}
			EventUtil.trigger(this, "onactive", value);
		},
		
		initializeVariables: function() {
			if (this.initPendingVariables) {
				var newInitPendingVariables = {};
				if (this.initPendingVariables.active) {
					newInitPendingVariables.active = this.initPendingVariables.active;
				}
				this.initPendingVariables = newInitPendingVariables;
				this.inherited(arguments);
			}
		},
		
		activate: function() {
			if (this.variables) {
				var newConstrainedVariables = {};
				for (var variableName in this.variables) {
					if (variableName != "active" && variableName != "name") {
						if (this.parent.constrainedVariables[variableName]) {
							if (this.savedConstrainedVariables == null) {
								this.savedConstrainedVariables = {};
							}
							var constrainedVariable = this.parent.constrainedVariables[variableName];
							if (this.parent.variables && constrainedVariable == this.parent.variables[variableName]) { 
								this.savedConstrainedVariables[variableName] = this.parent.constrainedVariables[variableName];
							}
							this.parent.removeConstrainedVariable(variableName);
						}
						var variable = this.variables[variableName];
						try {
							if (typeof variable.initializeMethod != "undefined") {
								variable.initializeMethod.call(this.parent);
							}
							if (typeof variable.updateMethod != "undefined") {
								newConstrainedVariables[variableName] = variable;
							}
							if (typeof variable.value != "undefined") {
								if (this.parent["set_"+variableName]) {
									this.parent["set_"+variableName](variable.value);
								}
								else {
									this.parent[variableName] = variable.value;
								}
							}
						}
						catch (e) {
							console.log("error initializing variable "+variableName+" in "+this.parent.moduleName);
							console.error(e);
						}
					}
				}
				for (var variableName in newConstrainedVariables) {
					this.parent.addConstrainedVariable(variableName, newConstrainedVariables[variableName]);
				}
			}
		},
		
		deactivate: function() {
			if (this.variables) {
				for (variableName in this.variables) {
					if (variableName != "active" && variableName != "name") {
						if (this.parent.constrainedVariables[variableName]) {
							var constrainedVariable = this.parent.constrainedVariables[variableName];
							if (constrainedVariable == this.variables[variableName]) { 
								this.parent.removeConstrainedVariable(variableName);
							}
						}
						if (this.savedConstrainedVariables && this.savedConstrainedVariables[variableName]) {
							this.parent.addConstrainedVariable(variableName, this.savedConstrainedVariables[variableName], this.parent[variableName]);
						}
					}
				}
				this.savedConstrainedVariables = null;
			}
		}
	});
    return exports;
});
