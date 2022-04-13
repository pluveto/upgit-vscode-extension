import * as vscode from "vscode";
import { spawn, spawnSync } from "child_process";
const { window, commands, workspace } = vscode;

function insertToSelections(content: string) {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }
  editor.edit((textEditorEdit) => {
    editor.selections.forEach((selection) => {
      textEditorEdit.insert(selection.active, content);
    });
  });
}

enum CommandType {
  UploadClipboardImage = "extension.upgit.upload-clipboard-image"
}

function getExtensionConfig() {
  const extConfig = workspace.getConfiguration("upgit");
  let upgitPath = extConfig.get("upgitPath", "");
  const upgitDefaultArgs = {
    "": ":clipboard",
    "--output-type": "stdout",
    "--output-format": "markdown",
  };
  const upgitExtraArgs = extConfig.get("upgitArgs", {});
  const upgitArgs = { ...upgitDefaultArgs, ...upgitExtraArgs };

  if (upgitPath === "") {
    const isWindowsOS = process.platform === "win32";
    upgitPath = isWindowsOS ? "upgit.exe" : "upgit";
  }

  // const quoteString = (str: string) => {
  //   return `"${str}"`;
  // };

  // upgitPath = quoteString(upgitPath);

  const isUpgitAvailable = () => {
    const child = spawnSync(upgitPath, ["--help"]);
    if (child.stdout === null) {
      console.log(`${upgitPath} is not available`);
      return false;
    }
    return child.stderr.toString() === "" && child.status === 0 && child.stdout.toString() !== "";
  };

  if (!isUpgitAvailable()) {
    window.showErrorMessage("Unable to find upgit. Please check your upgitPath in settings.");
    return;
  }

  return { upgitPath, upgitArgs };
}

export function activate(context: vscode.ExtensionContext) {
  console.log("upgit: activate");
  const commandUploadClipboardImage = vscode.commands.registerCommand(CommandType.UploadClipboardImage, () => {
    {
      const editor = window.activeTextEditor;
      if (!editor) {
        return;
      }
    }
    const config = getExtensionConfig();
    if (!config) {
      return;
    }
    const { upgitPath, upgitArgs } = config;
    const args = (() => {
      const args = [];
      for (const key in upgitArgs) {
        if (upgitArgs.hasOwnProperty(key)) {
          const value = upgitArgs[key];
          if (key !== "") { args.push(key); }
          if (value !== "") { args.push(value); }
        }
      }
      return args;

    })();
    const child = require("child_process").spawn(upgitPath, args);

    child.stdout.on("data", (data: any) => {
      const output = data.toString().trim();
      if (output.length <= 0) {
        window.showErrorMessage("Unable to upload image, no output returned.");
      }
      insertToSelections(output);
    });
    child.stderr.on("data", (data: any) => {
      const output = data.toString().trim();
      if (output.length <= 0) {
        return;
      }
      window.showErrorMessage("Unable to upload image, error: " + output);
    });

    context.subscriptions.push(commandUploadClipboardImage);
    console.log("upgit: activated");
  }
  );
}

export function deactivate() {
  console.log("upgit: deactivate");
}
