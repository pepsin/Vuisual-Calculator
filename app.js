
function print(object) {
  console.log("--------------------------------------------");
  console.log(object);
  var x = JSON.stringify(object, null, 4);
  console.log(x);
}
function Tokenize(string) {
  var OPERATORS, TYPE, IsOperator, IsNotOperator, STRING, result, token;
  
  OPERATORS = ["+", "-", "×", "÷", "(", ")", "*", "/", "=", ","];

  TYPE = { IDENTIFER: "IDENTIFER", OPERATOR: "OPERATOR" };

  IsOperator = function(atom) {
    return OPERATORS.indexOf(atom) != -1;
  }
  
  IsNotOperator = function(atom) {
    return !IsOperator(atom);
  }

  STRING = string.replace(/\s/g, "");
  result = [];
  token = "";
  
  for (var i = 0; i < STRING.length; i++) {
    if (IsOperator(STRING[i])) {
      if (IsNotOperator(token) && token != "") {
        result.push({ type: TYPE.IDENTIFER, token: token });
      }
      token = STRING[i];
      result.push({ type: TYPE.OPERATOR, token: token });
    } else {
      token = IsOperator(token) ? STRING[i] : token + STRING[i];
    }
  }
  if (IsNotOperator(token) && token != "") {
    result.push({ type: TYPE.IDENTIFER, token: token });
  } else {
    result.push({ type: TYPE.OPERATOR, token: token });
  }
  return result;
}
//var FUNCTIONS = {};
TYPE = { IDENTIFER: "IDENTIFER", OPERATOR: "OPERATOR" };
var Loop = function(arr, func) {
  var temp = [];
  for (var i = 0; i < arr.length; i++) {
    temp.push(func(arr[i], i, arr));
  }
  return temp;
};

function FindCloseParenthesisPosition(tokens) {
  var position, parenthesis_count;
  parenthesis_count = 0;
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i]["token"] == "(") {
      parenthesis_count += 1;
    } else if (tokens[i]["token"] == ")") {
      parenthesis_count -= 1;
    }
    if (parenthesis_count == 0) {
      position = i;
      break
    }
  }
  return position;
}

function Parse(tokens, depth) {
  var depth = depth || 0;
  
  if (tokens.length == 1) {
    return tokens[0];
  }
  
  if (tokens[0].token == "(") {
    var end_position = FindCloseParenthesisPosition(tokens);
    var expr = tokens.slice(1, end_position);
    var left_expr = tokens.slice(end_position + 1, tokens.length + 1);
    return {
      left: Parse(expr),
      func: left_expr[0],
      right: left_expr.slice(1, left_expr.length + 1)
    }
  } else {
    //Match the func(2,3,3) situation
    if (tokens[0].type == TYPE.IDENTIFER && tokens[1].token == "(") {
      var end_position = FindCloseParenthesisPosition(tokens);
      var variables = [];
      var temp = [];
      Loop(tokens.slice(2, tokens.length + 1), function(el, index, arr) {
        if (el.token != "," && arr[index + 1].token == ",") {
          variables.push(el);
        } else if (el.token != ","){
          temp.push(el);
        } else {
          variables.push(Parse(temp));
          temp = [];
        }
      });
      return {
        func: tokens[0],
        variables: variables
      }
    }
    else {
      return {
        left: tokens[0],
        right: Parse(tokens.slice(2, tokens.length + 1)),
        func: tokens[1]
      }
    }
  }
}
//var tokens = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 - 301");
var tokens = Tokenize("(1 * 2 + 1) + 3");
//var tokens = Tokenize("POW(2,3) + 3");
//   (define x y z (
//      (- (+ x
//           (* (+ x 
//                 (POW x 20.1)
//              30.2)))
//       301
//     ))
//var tokens2 = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301 / 31 + ((((((30))))))");
//console.log(tokens);
//print(tokens2);

x = Parse(tokens);
//console.log(x);
print(x);