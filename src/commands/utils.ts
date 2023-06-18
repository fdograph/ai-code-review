import * as vscode from 'vscode';
import * as markdownIt from 'markdown-it';

export function createWebviewPanel(content: string, title: string = 'Code Review') {
  const panel = vscode.window.createWebviewPanel('responseWebView', title, vscode.ViewColumn.Beside, {});

  const formattedReview = `# ${title}\n\n${content}`;

  const md = new markdownIt();
  const htmlContent = md.render(formattedReview);

  panel.webview.html = htmlContent;
}
