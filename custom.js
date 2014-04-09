var tokens = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301");
var tokens2 = Tokenize("aFunction(x, y, z) = x + (POW(x, 20.1) + x) * 30.2 + 301 / 31 + ((((((30))))))");
console.log(tokens);
console.log(tokens2);

x = Parse(tokens);
y = Parse(another_tokens);
z = Parse(tokens2);
console.log("-----------------------------------分隔----------------------------------------");
console.log(x);
console.log(y);
console.log(z);