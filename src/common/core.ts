import * as vscode from 'vscode';
import { generateCodeReview } from '../api/codereview';
import { type } from 'os';

export type CodeSelection = {
  code: string;
  language: string;
  filename?: string;
};

export function getCodeSelectionFromTextSelection(): CodeSelection | undefined {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('No active editor found!!');
    return;
  }

  const selectedText = editor.document.getText(editor.selection);
  const language = editor.document.languageId;

  if (!selectedText) {
    vscode.window.showErrorMessage('No text selected!!');
    return;
  }

  return {
    code: selectedText,
    language,
  };
}

export function getCodeSelectionFromCurrentFile(): CodeSelection | undefined {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('No active editor found!!');
    return;
  }

  return {
    code: editor.document.getText(),
    language: editor.document.languageId,
    filename: editor.document.fileName,
  };
}

export function getCodeSelectionFromClipboard(): CodeSelection | undefined {
  throw new Error('Not implemented yet');
}

export type CodeSelectionSource = 'textSelection' | 'currentFile' | 'clipboard';
export function getCodeSelection(source: CodeSelectionSource): CodeSelection | undefined {
  switch (source) {
    case 'textSelection':
      return getCodeSelectionFromTextSelection();
    case 'currentFile':
      return getCodeSelectionFromCurrentFile();
    case 'clipboard':
      return getCodeSelectionFromClipboard();
  }
}

export async function doCodeReviewOn(code: string, language: string, filename?: string): Promise<string> {
  try {
    return await generateCodeReview(code, language, filename ? [{ key: 'filename', value: filename }] : undefined);
  } catch (err: any) {
    vscode.window.showErrorMessage('Code review request failed!\nError: ${err.message}');
    console.error(err);
    return err.message;
  }
}
