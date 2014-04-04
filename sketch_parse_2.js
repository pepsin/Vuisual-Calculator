var tokens = ["(","x", "+", "1", ")", "+", "(", "POW", "(", "x", ",", "000.1", ")", "+", "x", ")", "*", "30.2", "+", "301" ];
var another_tokens = ["x", "+", "(", "POW", "(", "x", ",", "000.1", ")", "+", "x", ")", "*", "30.2", "+", "301" ];
var tokens2 = ["POW", "(", "x", ",", "000.1", ")", "+", "x", "*", "30.2", "+", "301" ];
LITERALS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];
NUMBER = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
IDENTIFER = 0;
ARITHMETIC = 1;
NUMBER = 2;
function Parse(tokens) {
  var left, right, symbol;
  console.log(tokens);
  if (tokens.length < 2) {
    return tokens[0];
  } else {
    if (tokens[0] == "POW") {
      var pow_end_position = tokens.indexOf(")")
      var the_whole_pow_expr = tokens.slice(0, pow_end_position);
      var comma_position = the_whole_pow_expr.indexOf(",");
      left = {
        name: "POW",
        first: Parse(the_whole_pow_expr.slice(2, comma_position)),
        second: Parse(the_whole_pow_expr.slice(comma_position + 1, the_whole_pow_expr.length - 1))
      }
      var right_expr = tokens.slice(pow_end_position + 1, tokens.length);
      right = Parse(right_expr);
      symbol = tokens[pow_end_position + 1];
    }
    //} else if (tokens[0] != "(") {
    //  var left_expr = [tokens[0]];
    //  var right_expr = tokens.slice(2, tokens.length);
    //  left = Parse(left_expr);
    //  right = Parse(right_expr);
    //  symbol = tokens[1];
    //} else {
    //  var left_expr_end_position = tokens.indexOf(")");
    //  left = Parse(tokens.slice(0, left_expr_end_position).slice(1, left_expr_end_position));
    //  right = Parse(tokens.slice(left_expr_end_position + 2, tokens.length));
    //  var symbol = tokens[left_expr_end_position + 1];
    //}
    //return {
    //  name: symbol,
    //  left: left,
    //  right: right
    //};
  }
}

function PowParse(tokens) {
  if (tokens[0] == "POW") {
    var pow_end_position = tokens.indexOf(")")
    var the_whole_pow_expr = tokens.slice(0, pow_end_position);
    var comma_position = the_whole_pow_expr.indexOf(",");
    var left_expr = {
      name: "POW",
      first: Parse(the_whole_pow_expr.slice(2, comma_position)),
      second: Parse(the_whole_pow_expr.slice(comma_position + 1, the_whole_pow_expr.length - 1))
    }
    var right_expr = tokens.slice(pow_end_position + 1, tokens.length);
    var symbol = tokens[pow_end_position + 1];
  }
}

x = Parse(tokens);
y = Parse(another_tokens);
console.log(x);
console.log(y);