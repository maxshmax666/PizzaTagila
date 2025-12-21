import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { appendLog, readLogContents, resolveLogPath } from './logger';

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
});
