import { appendFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

export interface LoggerOptions {
  cwd?: string;
  fileName?: string;
}

const defaultFileName = 'data/app.log';

function resolveLogPath(options?: LoggerOptions) {
  const baseDir = options?.cwd ?? process.cwd();
  const fileName = options?.fileName ?? defaultFileName;
  return path.resolve(baseDir, fileName);
}

export function formatLogLine(
  message: string,
  level: LogLevel,
  timestamp: Date,
) {
  return `${timestamp.toISOString()} [${level}] ${message}\n`;
}

export async function appendLog(
  message: string,
  level: LogLevel = 'INFO',
  options?: LoggerOptions,
) {
  if (typeof process === 'undefined' || !process.versions?.node) {
    // Browser/runtime fallback
    console.log(`${level}: ${message}`);
    return null;
  }

  const logPath = resolveLogPath(options);
  const directory = path.dirname(logPath);

  await mkdir(directory, { recursive: true });
  const line = formatLogLine(message, level, new Date());
  await appendFile(logPath, line, { encoding: 'utf8' });

  return { line, logPath };
}

export async function readLogContents(options?: LoggerOptions) {
  const logPath = resolveLogPath(options);
  const buffer = await readFile(logPath, { encoding: 'utf8' });
  return { logPath, contents: buffer };
}

export { resolveLogPath };
