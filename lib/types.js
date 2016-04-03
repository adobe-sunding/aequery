aeq = (function (aeq) {
aeq.extend({
	isNullOrUndefined: function(o) {
		return o === null || o === undefined;
	},

	isBoolean: function(o) {
		return typeof o === "boolean";
	},
	isNumber: function(o) {
		return typeof o === "number";
	},
	isString: function(o) {
		return typeof o === "string";
	},
	isObject: function(o) {
		return o instanceof Object;
	},
	isPlainObject: function(obj) {

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - After Effects objects

		if ( obj.toString() !== "[object Object]" || obj.nodeType ) {
			return false;
		}

		if ( obj.constructor &&
				!obj.constructor.prototype.hasOwnProperty("isPrototypeOf") ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isArray: function(o) {
		return o instanceof Array;
	},
	isFunc: function(o) {
		return o instanceof Function;
	},
	isAeq: function(o) {
		return o instanceof Object && o.aeq;
	},

	isApp: function(o) {
		return o instanceof Application;
	},
	isComp: function(o) {
		return o instanceof CompItem;
	},
	isAVLayer: function(o) {
		return o instanceof AVLayer;
	},
	isProperty: function(o) {
		return o instanceof Property;
	},


	reflect: function (obj) {
		var str = [];

		for (var m in obj)
		{
			if (!obj.hasOwnProperty(m))
				return;

			str.push(obj[m].constructor.name + ' ' + m + '=' + obj[m]);
		}

		return str.join();
	}
});

return aeq;
}(aeq || {}));