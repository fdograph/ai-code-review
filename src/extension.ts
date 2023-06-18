import * as vscode from 'vscode';
import { registerCommands } from './commands/registry';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "ai-code-review" is now active!');

  registerCommands(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
