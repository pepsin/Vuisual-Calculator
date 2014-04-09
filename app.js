
var BASIC_OPERATORS = ["+", "-", "×", "÷", "(", ")", "*", "/", "=", ","],
    ADVANCE_OPERATORS = ["POW", "SQRT"],
    LITERALS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];
    NUMBER = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

var TYPE = {
  IDENTIFER: "IDENTIFER",
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR"
};

function isOperator(atom) {
  return BASIC_OPERATORS.indexOf(atom) != -1;
}

function isLiterals(atom) {
  return LITERALS.indexOf(atom) != -1;
}

function isNumber(atom) {
  return NUMBER.indexOf(atom) != -1;
}

function Tokenize(string) {
  console.log("FUNCTION IS", string);
  string = string.replace(/ /g, "");
  
  var current = 0,
      token,
      token_arr = [],
      prevIsNumber = false;
  
  function peek() {
    return string[current + 1];
  }
  
  function previous() {
    return string[current - 1];
  }
  
  function currentAtom() {
    return string[current];
  }
  
  while (current <= string.length) {
    var atom = currentAtom(), prev = previous(), type;
    
    if (isOperator(atom)) {
      if (!isOperator(token)) {
        prevIsNumber = false;
        token_arr.push({
          type: TYPE.IDENTIFER,
          token: token
        });
      }
      token = atom;
      token_arr.push({
        type: TYPE.OPERATOR,
        token: token
      });
    } else if (isLiterals(atom)){
      if (isLiterals(prev)) {
        type = TYPE.IDENTIFER;
        token += atom;
      } else {
        token = atom;
      }
    } else if (isNumber(atom)) {
      if (isOperator(prev) || prev == undefined) {
        prevIsNumber = true;
        token = atom;
        type = TYPE.NUMBER;
      //Need to throw an error here when there's multiple "0", like 00.2 is illegal
      } else if (isNumber(prev) && prevIsNumber) {
        type = TYPE.NUMBER;
        token += atom;
      }
    }
    current += 1;
  }
  console.log(token);
  token_arr.push({
    type: type,
    token: token
  });
  return token_arr;
}

var tokens = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301");
var tokens2 = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301 / 31 + ((((((30))))))");
console.log(tokens);
console.log(tokens2);
var tokens = ["(","x", "+", "1", ")", "+", "(", "POW", "(", "x", ",", "000.1", ")", "+", "x", ")", "*", "30.2", "+", "301" ];
var another_tokens = ["x", "+", "(", "POW", "(", "x", ",", "000.1", ")", "+", "x", ")", "*", "30.2", "+", "301" ];
var tokens2 = ["POW", "(", "x", ",", "000.1", ")", "+", "x", "*", "30.2", "+", "301" ];

IDENTIFER = 0;
ARITHMETIC = 1;
NUMBER = 2;
BUILDIN_FUNCTION = 3;
USER_FUNCTION = 4;

function Parse(tokens) {
  if (tokens.length < 2) {
    return tokens[0];
  } else {
    if (tokens[0] == "POW") {
      return FunctionResolver(tokens);
    } else if (tokens[0] != "(") {
      return NormalResolver(tokens);
    } else {
      return ParenthesisResolver(tokens);
    }
  }
}

function FunctionResolver(tokens) {
  var pow_end_position = tokens.indexOf(")")
  var the_whole_pow_expr = tokens.slice(0, pow_end_position);
  var comma_position = the_whole_pow_expr.indexOf(",");
  left = {
    symbol: "POW",
    type: BUILDIN_FUNCTION,
    first: Parse(the_whole_pow_expr.slice(2, comma_position)),
    second: Parse(the_whole_pow_expr.slice(comma_position + 1, the_whole_pow_expr.length))
  }
  var right_expr = tokens.slice(pow_end_position + 2, tokens.length);
  right = Parse(right_expr);
  symbol = tokens[pow_end_position + 1];
  return {
    left: left,
    right: right,
    symbol: tokens[pow_end_position + 1]
  }
}

function ParenthesisResolver(tokens) {
  var left_expr, right_expr, symbol, left_expr_end_position;
  left_expr_end_position = FindCloseParenthesisPosition(tokens.slice(0, tokens.length));
  left_expr = tokens.slice(1, left_expr_end_position);
  right_expr = tokens.slice(left_expr_end_position + 2, tokens.length);
  symbol = tokens[left_expr_end_position + 1];
  return {
    left: Parse(left_expr),
    right: Parse(right_expr),
    symbol: symbol
  };
}

function NormalResolver(tokens) {
  var left_expr, right_expr, symbol;
  left_expr = [tokens[0]];
  right_expr = tokens.slice(2, tokens.length);
  symbol = tokens[1];
  return {
    left: Parse(left_expr),
    right: Parse(right_expr),
    symbol: symbol
  };
}

function FindCloseParenthesisPosition(tokens) {
  var position, parenthesis_count;
  parenthesis_count = 0;
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i] == "(") {
      parenthesis_count += 1;
    } else if (tokens[i] == ")") {
      parenthesis_count -= 1;
    }
    if (parenthesis_count == 0) {
      position = i;
      break
    }
  }
  return position;
}

x = Parse(tokens);
y = Parse(another_tokens);
z = Parse(tokens2);
console.log("-----------------------------------分隔----------------------------------------")
console.log(x);
console.log(y);
console.log(z);
