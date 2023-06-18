import { Configuration, OpenAIApi } from 'openai';
import * as vscode from 'vscode';

function getSettingsOrThrow(): { apiKey: string; model: string } {
  const config = vscode.workspace.getConfiguration('ai-code-review');
  const apiKey = config.get<string>('apiKey');
  const model = config.get<string>('model');

  if (!apiKey) {
    vscode.window.showErrorMessage('OpenAI API key not found. Please set it in the settings.');
    throw new Error('OpenAI API key not found. Please set it in the settings.');
  }

  if (!model) {
    vscode.window.showErrorMessage('OpenAI API model not found. Please set it in the settings.');
    throw new Error('OpenAI API model not found. Please set it in the settings.');
  }

  return { apiKey, model };
}

export async function generateText(prompt: string): Promise<string> {
  const settings = getSettingsOrThrow();
  const configuration = new Configuration({
    apiKey: settings.apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: settings.model,
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that performs code reviews on a given file or snippet of code and offers improvements suggestions considering best practices, performance, scalability and maintainability in valid markdown format',
      },
      { role: 'user', content: prompt },
    ],
    n: 1,
  });

  return response.data.choices[0].message?.content ?? '';
}
