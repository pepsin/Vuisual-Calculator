
function print(object) {
  console.log("--------------------------------------------");
  console.log(object);
  console.log(JSON.stringify(object).replace(/\},/g, "},\n"));
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
      if (IsNotOperator(token)) {
        result.push({ type: TYPE.IDENTIFER, token: token });
      }
      token = STRING[i];
      result.push({ type: TYPE.OPERATOR, token: token });
    } else {
      token = IsOperator(token) ? STRING[i] : token + STRING[i];
    }
  }
  return result;
}
var FUNCTIONS = {};
function Parse(tokens) {
  TYPE = { IDENTIFER: "IDENTIFER", OPERATOR: "OPERATOR" };
  if (tokens.length < 2) {
    return tokens[0];
  } else {
    if (tokens[0]["token"] != "(") {
      if (tokens[0]["type"] == TYPE.IDENTIFER) {
        if (tokens[tokens.length - 1]["token"] == "=") {
        
        } else {
          if (tokens[1]["token"] == "(") {
            var definition_tokens, left_tokens, end_parenthesis;
            end_parenthesis = FindCloseParenthesisPosition(tokens.slice(1, tokens.length));
            left_tokens = tokens.slice(end_parenthesis + 2, tokens.length);
            console.log(left_tokens);
            definition_tokens = tokens.slice(0, end_parenthesis + 2);
            return FunctionDefineResolver(definition_tokens, left_tokens);
          } else {
            return NormalResolver(tokens);
          }
        }
      }
    } else {
      return ParenthesisResolver(tokens);
    }
  }
}

function FunctionDefineResolver(definition_tokens, left_tokens) {
  var definition;
  if (left_tokens[0]["token"] == "=") {
    definition = Parse(left_tokens.slice(1, left_tokens.length));
  } else {
    definition = "";
  }
  return {
    symbol: definition_tokens[0]["token"],
    type: "function",
    variables: definition_tokens.slice(2, definition_tokens.length - 1).filter(function(el) { return el.type != TYPE.OPERATOR; }),
    definition: definition
  }
}

function ParenthesisResolver(tokens) {
  var left_expr, right_expr, symbol, left_expr_end_position;
  left_expr_end_position = FindCloseParenthesisPosition(tokens);
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
var tokens = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301");
var tokens2 = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301 / 31 + ((((((30))))))");
//console.log(tokens);
//print(tokens2);

x = Parse(tokens);
console.log(x);
//print(x);
//y = Parse(another_tokens);
//z = Parse(tokens2);
//console.log("-----------------------------------分隔----------------------------------------");
//console.log(x);
//console.log(y);
//console.log(z);