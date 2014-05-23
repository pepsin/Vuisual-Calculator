function Parser(tokens) {
  this.index = 0;
  this.tokens = tokens;
}

Parser.prototype.consume = function() {
  this.index += 1;
}

Parser.prototype.match = function(type) {
  
}

Parser.prototype.