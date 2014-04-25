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