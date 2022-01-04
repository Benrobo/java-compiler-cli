const path = require("path");
const inquirer = require("inquirer");
const { output, colors, ANCII } = require("./util");
const { exec } = require("child_process");
const fs = require("fs");

// get java compiler
const dir = path.join(__dirname, "../", "executable");

const getCompiler = () => {
  return new Promise((res, rej) => {
    fs.readdir(dir, (err, data) => {
      err && rej(err);
      res({ java: data[0], javac: data[1] });
    });
  });
};

const createJavaFile = (filename, code = "", extension) => {
  // check if temp folder is available
  // cause that were all java files would be created

  const dir = path.join(__dirname, "../", "/temp");

  if (!fs.existsSync(dir)) {
    // if it doesnt create one
    fs.mkdirSync(dir);
  }
  const fileName = `${filename}.${extension}`;
  const fileDir = path.join(dir, fileName);

  // write data to the newly created file
  fs.writeFile(fileDir, code, (err, data) => {
    if (err) {
      throw new Error(err);
    }

    return fileDir;
  });

  return { fileDir, fileName };
};

const compileJavaCode = async (filename, code = "", ext, cb) => {
  let { fileDir, fileName } = createJavaFile(filename, code, ext);

  let { java, javac } = await getCompiler();
  let command = `cd ${path.join(
    __dirname,
    "../",
    "temp"
  )} & ${java} ${fileName}`;

  // execute the command
  let output = {};
  exec(command, (err, stdout, stderr) => {
    if (err) {
      output["errorMsg"] = `${err}`;
      output["filename"] = fileName;
      return cb(output);
    } else if (stderr) {
      output["stderr"] = `${stderr}`;
      output["filepath"] = fileDir;
      return cb(output);
    } else {
      output["output"] = stdout;
      output["filename"] = fileName;
      output["filepath"] = fileDir;
      cb(output);
    }
  });
};

const compileJavaCodeWithInput = async (
  filename,
  code = "",
  ext,
  input,
  cb
) => {
  let { fileDir, fileName } = createJavaFile(filename, code, ext);

  let { java, javac } = await getCompiler();
  let command = `cd ${path.join(
    __dirname,
    "../",
    "temp"
  )} & ${java} ${fileName}`;

  // create an input file to store the user input
  // then compile the input file with the3 Java file

  let dir = path.join(__dirname, "../", "temp");
  let inputFilePath = `${dir}/input.txt`;

  fs.writeFile(inputFilePath, input, (err, result) => {
    if (err) {
      throw Error("Error creating input file");
    }

    // else if everything went well
    // compile the java file along with the input.txt

    // execute the command
    // cd ${path.join(__dirname, "temp")} & ${javac} ${fileName} &&

    let command = `cd ${dir} && ${java} ${filename}.java < input.txt`;
    let output = {};

    exec(command, (err, stdout, stderr) => {
      if (err) {
        output["errorMsg"] = `${err}`;
        output["filename"] = fileName;
        return cb(output);
      } else if (stderr) {
        output["stderr"] = `${stderr}`;
        output["filepath"] = fileDir;
        return cb(output);
      } else {
        output["output"] = stdout;
        output["filename"] = fileName;
        output["filepath"] = fileDir;
        cb(output);
      }
    });
  });
};

const compileJavaCodeOS = async (filename, cb) => {
  const codeDir = path.join(__dirname, "../", `OS/${filename}.java`);
  let { java, javac } = await getCompiler();
  let command = `cd ${path.join(
    __dirname,
    "../",
    "OS"
  )} & ${java} ${filename}.java`;

  // check if the file exist in that directory
  if (!fs.existsSync(codeDir)) {
    cb({ errorMsg: "Failed to compile cause file not found at :" + codeDir });
    return;
  }

  // execute the command
  let output = {};
  exec(command, (err, stdout, stderr) => {
    if (err) {
      output["errorMsg"] = `${err}`;
      output["filename"] = filename;
      return cb(output);
    } else if (stderr) {
      output["stderr"] = `${stderr}`;
      output["filepath"] = fileDir;
      return cb(output);
    } else {
      output["output"] = stdout;
      output["filename"] = filename;
      output["filepath"] = fileDir;
      cb(output);
    }
  });
};

module.exports = {
  compileJavaCode,
  compileJavaCodeWithInput,
  compileJavaCodeOS,
};
