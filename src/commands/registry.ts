import * as vscode from 'vscode';
import { EXTENSION_NAME } from '../common/Constants';
import { createWebviewPanel } from './utils';
import { CodeSelectionSource, doCodeReviewOn, getCodeSelection } from '../common/core';

export async function codeReview(codeSource: CodeSelectionSource) {
  const selection = getCodeSelection(codeSource);

  if (!selection) {
    return;
  }

  vscode.window.showInformationMessage('Fetching Code Review...');
  const codeReview = await doCodeReviewOn(selection.code, selection.language, selection.filename);
  vscode.window.showInformationMessage('Completed! Creating Webview...');

  createWebviewPanel(codeReview);
}

export function registerCommands(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(`${EXTENSION_NAME}.codeReviewFromSelection`, () => codeReview('textSelection'))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(`${EXTENSION_NAME}.codeReviewFromFile`, () => codeReview('currentFile'))
  );
}
