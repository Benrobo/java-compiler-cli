#!/usr/bin/env node

const figlet = require("figlet");
const path = require("path");
// the below module enable us to deal with commands in our compiler-cli
const { program } = require("commander");
program.version(" jcompile version 0.0.1");

const {
  askUserForInputs,
  askUserForJavaInputs,
} = require("./lib/askUserInput");
const { compileJavaCode, compileJavaCodeWithInput } = require("./lib/cli");
const { colors, ANCII } = require("./lib/util");

// console.clear()

// show project title imn terminal
colors.green(ANCII("J-compiler"));

// setup cli commands
// set some options for the compiler cli
program
  .option("-v, --version", "display cli version number")
  .option("-h, --help", "display usage information for this cli")
  .option("-c, --compile", "compile java code without inputs")
  .option("-c-i, --compile-input", "compile java code with inputs")
  .option("-q, --quit", "quit the jcompile cli");

program.parse(process.argv);

const options = program.opts();

if (options.help || options.h) {
  colors.white(`
    usage: jcompile [option] Options and arguments (and corresponding environment variables):

    -v --version: check the version number of the jcompile cli.

    -h --help  : Display some usage informations for the compiler-cli.

    -c  --compile : Compile java codes without getting users input.

    -c-i --compile-input : Compile java codes with users input.

    -q --quit : quit the cli

  `);
} else if (options.quit || options.q) {
  process.exit();
} else if (options.compile || options.c) {
  // compile java codes without inputs
  async function run() {
    let { filename, codeInputs } = await askUserForInputs();

    compileJavaCode(filename, codeInputs, "java", (data) => {
      // get the data returned from compiling the code written
      const result = data;

      if (data.output) {
        console.log("\n");
        colors.green(data.output + "\n");
        return true;
      } else {
        console.log("\n");
        colors.red(data.errorMsg + "\n");
        return true;
      }
    });
  }
  run();
  return;
} else if (options.ci || options.compileInput) {
  // compile java codes with inputs
  async function run() {
    let { filename, codeInputs, inputs } = await askUserForJavaInputs();

    compileJavaCodeWithInput(filename, codeInputs, "java", inputs, (data) => {
      // get the data returned from compiling the code written
      const result = data;

      if (data.output) {
        console.log("\n");
        colors.green(data.output + "\n");
        return true;
      } else {
        console.log("\n");
        colors.red(data.errorMsg + "\n");
        return true;
      }
    });
  }
  run();
} else {
  colors.white(`
      usage: jcompile [option] Options and arguments (and corresponding environment variables):
  
      -v --version: check the version number of the jcompile cli.
  
      -h --help  : Display some usage informations for the compiler-cli.
  
      -c  --compile : Compile java codes without getting users input.
  
      -c-i --compile-input : Compile java codes with users input.
  
      -q --quit : quit the cli
  
    `);
}