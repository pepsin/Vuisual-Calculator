function print(object) {
  console.log("--------------------------------------------");
  console.log(object);
  var x = JSON.stringify(object, null, 4);
  console.log(x);
}