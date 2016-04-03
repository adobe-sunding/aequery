/*jslint browser: true*/

var aeq = function(selector) {
	'use strict';

	if (aeq.isNullOrUndefined(selector))
		return selector;

	var result;

	if (aeq.isAeq(selector))
	{
		result = selector;
	}
	else if (aeq.isString(selector))
	{
		result = aeq.select(selector);
	}
	else if (aeq.isArray(selector))
	{
		result = aeq.arrayEx(selector);
	}
	else if (aeq.isApp(selector))
	{
		result = aeq.app;
	}
	else if (aeq.isComp(selector))
	{
		result = new aeq.Comp(selector);
	}
	else if (aeq.isLayer(selector))
	{
		result = new aeq.Layer(selector);
	}
	else if (aeq.isProperty(selector))
	{
		result = new aeq.Property(selector);
	}

	result.aeq = true;

	return result;
};

aeq.thisObj = this;
var _ = aeq;

// Copy of jQuery.extend
aeq.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !aeq.isFunction( target ) ) {
		target = {};
	}

	// Extend aeq itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( aeq.isPlainObject( copy ) ||
					( copyIsArray = aeq.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && aeq.isArray( src ) ? src : [];

					} else {
						clone = src && aeq.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = aeq.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};