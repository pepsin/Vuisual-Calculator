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