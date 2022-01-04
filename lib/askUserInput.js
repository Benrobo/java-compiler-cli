const inquirer = require("inquirer");

// ask user for inputs

function askUserForInputs() {
  // ask the user for questions on what file to create
  const questions = [
    {
      name: "filename",
      type: "input",
      message:
        "Enter just the name of the Java file you would like to create for eg [Main, Test,randomName]: ",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please enter the name of the Java file you would like to create.";
        }
      },
    },
    {
      name: "codeInputs",
      type: "editor",
      message:
        "Write some java code snippets and close the default editor window after writing your code..",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Java File cant be empty, write some code.";
        }
      },
    },
  ];

  return inquirer.prompt(questions);
}

function askUserForJavaInputs() {
  // ask the user for questions on what file to create
  const questions = [
    {
      name: "filename",
      type: "input",
      message:
        "Enter just the name of the Java file you would like to create for eg [Main, Test,randomName]: ",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please enter the name of the Java file you would like to create.";
        }
      },
    },
    {
      name: "codeInputs",
      type: "editor",
      message:
        "Write some java code snippets asking user for inputs and close the default editor window after writing your code..",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Java File cant be empty, write some code.";
        }
      },
    },
    {
      name: "inputs",
      type: "input",
      message: "Your program require an input, please provide the input here..",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Input can be empty.";
        }
      },
    },
  ];

  return inquirer.prompt(questions);
}

function askUserForInputsOS() {
  const questions = [
    {
      name: "filename",
      type: "input",
      message:
        "Enter just the name of the Java file you would like to compile: ",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please enter the name of the Java file you would like to comopile.";
        }
      },
    },
  ];

  return inquirer.prompt(questions);
}

module.exports = {
  askUserForJavaInputs,
  askUserForInputs,
  askUserForInputsOS,
};
