const figlet = require("figlet");

let black = "\x1b[30m";
let red = "\x1b[31m";
let green = "\x1b[32m";
let yellow = "\x1b[33m";
let blue = "\x1b[34m";
let magenta = "\x1b[35m";
let cyan = "\x1b[36m";
let white = "\x1b[37m";
let end = "\x1b[0m";

const log = (start, text, end) => {
  if (start === undefined || end === undefined) {
    return console.log(text);
  }
  return console.log(start, text, end);
};

const colors = {
  red: (text) => log(red, text, end),
  green: (text) => log(green, text, end),
  white: (text) => log(white, text, end),
  cyan: (text) => log(cyan, text, end),
  blue: (text) => log(blue, text, end),
  yellow: (text) => log(yellow, text, end),
};

const output = (data) => {
  return console.log(data);
};
const ANCII = (text) => {
  return figlet.textSync(text, { horizontalLayout: "full" });
};

module.exports = {
  output,
  ANCII,
  colors,
  log
};
