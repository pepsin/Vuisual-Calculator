var BASIC_OPERATORS = ["+", "-", "×", "÷", "(", ")", "*", "/", "=", ","],
    ADVANCE_OPERATORS = ["POW", "SQRT"],
    LITERALS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];
    NUMBER = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];


var GLOBAL_FUNCTIONS = {

};

var GLOBAL_VARIABLES = {
};

function isEqualSign(atom) {
  return atom == "=";
}

function isFrontCurlyBracket(atom) {
  return atom == "(";
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
    var atom = currentAtom(), prev = previous();
    
    if (isBasicOperator(atom)) {
      if (!isBasicOperator(token)) {
        prevIsNumber = false;
        token_arr.push(token);
      }
      token = atom;
      token_arr.push(token);
    } else if (isLiterals(atom)){
      if (isLiterals(prev)) {
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
        token += atom;
      }
    }
    current += 1;
  }
  token_arr.push(token);
  return token_arr;
}

var tokens = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301");
console.log(Tokenize("aFunction(x, y, z) = x + (POW(x, 000.1) + x) * 30.2 + 301"));
console.log(tokens);
function Parse(tokens) {
  if (tokens.indexOf("=") > -1) {
    var equal_sign_position = tokens.indexOf("=");
    var equation_left = tokens.slice(0, equal_sign_position);
    var equation_right = tokens.slice(equal_sign_position + 1, tokens.length);
  } else {
    
  }
  //Split up the tokens base on the "equal"
  
  if (equation_left.indexOf("(") > -1) {
    count_variables(equation_left);
    GLOBAL_FUNCTIONS[function_name] = new Function(function_variables, function_body);
  } else if (equation_left.length == 1 && equation_left[0].length > 0) {
    GLOBAL_VARIABLES[equation_left[0]] = evaluate(equation_right);
  } else {
    
  }
}

Parse(tokens);