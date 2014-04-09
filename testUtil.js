function print(object) {
  console.log("--------------------------------------------");
  console.log(object);
  console.log(JSON.stringify(object).replace(/\},/g, "},\n"));
}