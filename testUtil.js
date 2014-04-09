function print(object) {
  console.log(JSON.stringify(object).replace(/\},/g, "},\n"));
}