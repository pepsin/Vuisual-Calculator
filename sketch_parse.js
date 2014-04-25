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

function Parse(tokens, depth, father) {
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