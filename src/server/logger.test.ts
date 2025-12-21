import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { appendLog, formatLogLine, isNodeEnvironment, readLogContents, resolveLogPath } from './logger';

describe('logger', () => {
  it('writes a log line with timestamp and level', async () => {
    const cwd = await mkdtemp(path.join(tmpdir(), 'pizzatagila-'));
    const message = 'Проверка логирования';

    const result = await appendLog(message, 'INFO', { cwd });
    expect(result?.logPath).toBe(resolveLogPath({ cwd }));
    expect(result?.line).toMatch(/\[INFO\]/);

    const { contents } = await readLogContents({ cwd });
    expect(contents).toContain(message);
    expect(contents).toMatch(/\d{4}-\d{2}-\d{2}T/);
  });

  it('exposes helpers for formatting and environment detection', () => {
    const fakeDate = new Date('2025-01-01T12:00:00.000Z');
    const line = formatLogLine('hello', 'DEBUG', fakeDate);

    expect(line).toBe('2025-01-01T12:00:00.000Z [DEBUG] hello\n');
    expect(isNodeEnvironment({} as typeof process)).toBe(false);
    expect(isNodeEnvironment(process)).toBe(true);
  });

  it('returns empty contents when log file is missing', async () => {
    const cwd = await mkdtemp(path.join(tmpdir(), 'pizzatagila-'));
    const { contents, logPath } = await readLogContents({ cwd, fileName: 'absent.log' });

    expect(logPath.endsWith('absent.log')).toBe(true);
    expect(contents).toBe('');
  });
});
