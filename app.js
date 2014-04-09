
function print(object) {
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
//var tokens = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301");
var tokens2 = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301 / 31 + ((((((30))))))");
//console.log(tokens);
print(tokens2);

//x = Parse(tokens);
//y = Parse(another_tokens);
//z = Parse(tokens2);
//console.log("-----------------------------------分隔----------------------------------------");
//console.log(x);
//console.log(y);
//console.log(z);