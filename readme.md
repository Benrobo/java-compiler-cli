### J-Compiler CLI

#### This is a basic nodejs cli compiler app meant to compile java codes making use of the default java compiler.

### Technologies Used

- Inquirer
  - A collection of common interactive command line user interfaces. It enables you collect input from the users within the terminal. [Inquirer](https://github.com/SBoudrias/Inquirer.js)
- Commander
  - A node module which will help us parse process. argv in much easy and better way while Inquirer. js [Commander](https://github.com/tj/commander.js) will help us design interactive CLI application.

#### Running the cli

Running the cli can be archeive in 2-steps

1. Enabling the CLI globally by running the following command within the cli directory

```javascript
    npm i -g
    //or
    npm install --global
```

and after installing it, you can simply run the cli using

```javascript
jcompile;
```

2. Running the cli locally on your computer via nodejs.

```javascript
    node app.js
```

🎉 An that it.
