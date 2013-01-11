var arrayProperties=0;
Function.prototype.arrayProperty = function() {
	var name = "arrayProperty"+(arrayProperties++);
	var realProperty = this;
	wrapper =  function() {
		//"this" is the object having the property
		
		var result = realProperty.apply(this,arguments);
		if (!result) return null;
		
		meta = Ember.meta(this); //get the meta object of current object
		if (!(name in meta)) meta[name] = []; 
		var array = meta[name];
		var r = result.compact();
		array.set("[]",r);
		return array;
	};
	return wrapper.property.apply(wrapper,arguments);
}
