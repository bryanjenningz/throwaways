function StrongMap() {
  this.boolean = {}, this.null = {}, this.undefined = {}, this.number = {},
  this.string = {}, this.array = {}, this.object = {}, this.function = {};
}

StrongMap.prototype.get = function(key) {
  var type = typeOf(key);
  return this[type][key];
};

StrongMap.prototype.set = function(key, value) {
  var type = typeOf(key);
  if (type === 'undefined' || type === 'function') {
    this[type][key] = value;
  } else {
    this[type][JSON.stringify(key)] = value;
  }
  return this;
};

function typeOf(value) {
  return Array.isArray(key) ? 'array' :
    typeof key === 'object' ? (key === null ? 'null' : 'object') :
                              typeof key;
}
