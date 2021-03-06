// x ^ (2+x) + 2 * x = y
// function y(x) {
//   Math.pow(x, 2 + x) + 2 * x
// }

// f(x) = ((3 + x) ^ (2 + x)) ^ (x ^ 2 + 3x - 1)
// function (x) {
//   return Math.pow(
//     Math.pow(3 + x, 2 + x),
//     Math.pow(x, 2) + 3 * x - 1
//   );
// }
var Tokenizer = function Tokenizer(string) {
  
}

var Evaluator = function Evaluator(string) {
  // body...
}

function start() {
  var board = document.querySelector("div#board");
  function addEquation(event) {
    if (event.srcElement.className != "node") {
      var equation = document.createElement("div");
      equation.style.position = "absolute";
      equation.classList.add("equation");
      equation.style.left = event.clientX + "px";
      equation.style.top = event.clientY + "px";
      board.appendChild(equation);
      var node = document.createElement("div");
      node.contentEditable = true;
      node.textContent = "";
      node.classList.add("node");
      equation.appendChild(node);
      node.focus();
    }
  }
  
  function moveNode(event) {
    var node = document.querySelector(".moveable");
    if (node) {
      var rect = node.getBoundingClientRect();
      node.style.left = event.clientX - node.gap_x + "px";
      node.style.top = event.clientY - node.gap_y + "px";
      event.stopPropagation();
    }
  }
  
  function enableNodeMove(event) {
    var node = event.srcElement;
    var rect = node.getBoundingClientRect();
    node = node.className == "equation" ? node : node.parentElement;
    node.classList.add("moveable");
    node.gap_x = event.clientX - rect.left;
    node.gap_y = event.clientY - rect.top;
  }
  
  function disableNodeMove(event) {
    var node = event.srcElement;
    document.querySelector(".moveable").classList.remove("moveable");
  }
  
  function unicodeToString(unicode_string) {
    if (unicode_string.indexOf("U+") > -1) {
      return String.fromCharCode(
        eval("0x" + unicode_string.slice(2, 6))
      );
    } else {
      return "FUNC_KEY";
    }
  }
  
  function pressKey(event) {
    var keycode = unicodeToString(event.keyIdentifier);
    console.log(keycode);
    if (event.srcElement.className == "node") {
      var OPERATOR = ["*", "+", "-", "/", "(", ")"];
      var EQUAL = ["="];
      if (OPERATOR.indexOf(keycode) > -1) {
        var operator_node = document.createElement("div");
        operator_node.contentEditable = true;
        operator_node.textContent = keycode;
        operator_node.classList.add("node");
        operator_node.classList.add("operator");
        event.srcElement.parentElement.appendChild(operator_node);
        var content_node = document.createElement("div");
        content_node.contentEditable = true;
        content_node.textContent = "";
        content_node.classList.add("node");
        event.srcElement.parentElement.appendChild(content_node);
        content_node.focus();
        return event.preventDefault();
      } else if (keycode == EQUAL) {
        var equation = event.srcElement.parentElement.textContent;
        var operator_node = document.createElement("div");
        operator_node.contentEditable = true;
        operator_node.textContent = keycode;
        operator_node.classList.add("node", "equal");
        operator_node.classList.add("operator");
        event.srcElement.parentElement.appendChild(operator_node);
        var content_node = document.createElement("div");
        content_node.contentEditable = true;
        content_node.textContent = eval(equation);
        content_node.classList.add("node");
        event.srcElement.parentElement.appendChild(content_node);
        content_node.focus();
        return event.preventDefault();
      }
    }
  }
  
  document.querySelector("div#board").addEventListener("click", addEquation);
  document.querySelector("div#board").addEventListener("mousemove", moveNode);
  document.querySelector("div#board").addEventListener("mousedown", enableNodeMove);
  document.querySelector("div#board").addEventListener("mouseup", disableNodeMove);
  document.querySelector("div#board").addEventListener("keydown", pressKey);
}