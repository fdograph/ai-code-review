import { generateText } from './openai';

export function buildPrompt(code: string, lang: string, metadata?: Array<{ key: string; value: string }>) {
  const meta = metadata?.map(({ key, value }) => `# ${key}: ${value}`).join('\n') ?? '';

  return `\`\`\`${lang}
${meta}

${code}`;
}

export async function generateCodeReview(code: string, lang: string, metadata?: Array<{ key: string; value: string }>) {
  const prompt = buildPrompt(code, lang, metadata);
  const response = await generateText(prompt);
  return response;
}
