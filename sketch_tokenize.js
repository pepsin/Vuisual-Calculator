var BASIC_OPERATORS = ["+", "-", "×", "÷", "(", ")", "*", "/", "=", ","],
    ADVANCE_OPERATORS = ["POW", "SQRT"],
    LITERALS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];
    NUMBER = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

var TYPE = {
  IDENTIFER: "IDENTIFER",
  NUMBER: "NUMBER",
  ARITHMETIC: "ARITHMETIC",
  PARENTHESIS: "PARENTHESIS"
};


function isEqualSign(atom) {
  return atom == "=";
}

function isParenthesis(atom) {
  return atom == "(" || atom == ")";
}

function isBasicOperator(atom) {
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
    
    if (isBasicOperator(atom)) {
      if (!isBasicOperator(token)) {
        prevIsNumber = false;
        token_arr.push({
          type: TYPE.IDENTIFER,
          token: token
        });
      }
      token = atom;
      if (isParenthesis(atom)) {
        token_arr.push({
          type: TYPE.PARENTHESIS,
          token: token
        });
      } else {
        token_arr.push({
          type: TYPE.ARITHMETIC,
          token: token
        });
      }
    } else if (isLiterals(atom)){
      if (isLiterals(prev)) {
        type = TYPE.IDENTIFER;
        token += atom;
      } else {
        token = atom;
      }
    } else if (isNumber(atom)) {
      if (isBasicOperator(prev) || prev == undefined) {
        prevIsNumber = true;
        token = atom;
      //Need to throw an error here when there's multiple "0", like 00.2 is illegal
      } else if (isNumber(prev) && prevIsNumber) {
        type = TYPE.NUMBER;
        token += atom;
      }
    }
    current += 1;
  }
  token_arr.push({
    type: type,
    token: token
  });
  return token_arr;
}

var tokens = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301");
console.log(tokens);