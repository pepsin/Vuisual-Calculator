var OPERATORS = ["+", "-", "×", "÷", "(", ")", "*", "/", "=", ","];

var TYPE = {
  IDENTIFER: "IDENTIFER",
  OPERATOR: "OPERATOR"
};

function isOperator(atom) {
  return OPERATORS.indexOf(atom) != -1;
}

function Tokenize(string) {
  console.log("FUNCTION IS", string);
  string = string.replace(/\s/g, "");
  var arr = [],
      token = "";
  for (var i = 0; i < string.length; i++) {
    if (isOperator(string[i])) {
      if (!isOperator(token)) {
        arr.push({
          type: TYPE.IDENTIFER,
          token: token
        });
      }
      token = string[i];
      arr.push({
        type: TYPE.OPERATOR,
        token: token
      });
    } else {
      if (isOperator(token)) {
        token = string[i];
      } else {
        token += string[i];
      }
    }
  }
  return arr;
}