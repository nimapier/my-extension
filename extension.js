// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const child_process = require("child_process");
const { argv } = require("process");
const path = require("path");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "my-extension" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposableHelloWord = vscode.commands.registerCommand(
    "my-extension.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from my-extension!");
    }
  );
  let disposablePushGerrit = vscode.commands.registerCommand(
    "my-extension.pushGerrit",
    function () {
      let branch = "master";
      const cwd = vscode.workspace.workspaceFolders[0].uri.path;
      child_process.exec("git branch", { cwd }, (error, stdout, stderr) => {
        const regex = /(^\*\s).*(\n*$)/gm;
        branch = stdout.match(regex);
        branch = branch.toString().slice(2);
        // console.log("er:", error, "out", stdout, "ser", stderr);
        // vscode.window.showInformationMessage(`branch:${branch}`);
        child_process.exec(
          `git push origin ${branch}`,
          { cwd },
          (error, stdout, stderr) => {
            // console.log("er:", error, "out", stdout, "ser", stderr);
            if (error) {
              vscode.window.showErrorMessage(error.toString());
            } else {
              vscode.window.showInformationMessage("提交成功");
            }
          }
        );
      });
      // console.log(vscode.workspace.workspaceFolders[0].uri.path);
      // vscode.window.showInformationMessage(`branch:${branch}`);
      // vscode.commands.executeCommand("git.push");
    }
  );

  context.subscriptions.push(disposablePushGerrit, disposableHelloWord);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
