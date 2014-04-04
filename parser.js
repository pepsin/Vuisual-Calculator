//Variables
//Numbers
//Operators
//Brackets
//g(x) = x + (POW(x, 2) + x) * 30 + 30
//f(x) = POW(x, 2) + 2 =>
//{
//  property: "FUNCTION",
//  variables: ["x"],
//  expressions: [
//    {
//      property: "OPERATOR",
//      specific: "ADD",
//      variables: [
//        {
//          property: "OPERATOR",
//          specific: "POW",
//          variables: ["x", 2]
//        }, 2
//      ]
//    }
//  ]
//}


function Parser(string) {
  this.dictionary = {
    "*": "×",
    "/": "÷",
    "+": "+",
    "-": "−",
    "SQRT": "SQRT",
    "POW": "POW"
  }
  this.operators = {
    
  }
  this.numbers = ["1","2","3","4","5","6","7","8","9","0","."];
  this.brackets = ["(", ")"];
}

//Return a Javascript function
Parser.prototype.parse = function parse() {
  var SELF = this;
  SELF.location = 0;
  //var AST = SELF.tokenize(string);
  return SELF.assemble(AST);
}

Parser.prototype.tokenize = function tokenize(string) {
  var AST = {};
  return AST;
}

Parser.prototype.assemble = function assemble(AST) {
  
}