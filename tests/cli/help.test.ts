import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, test } from "vitest";

const execFileAsync = promisify(execFile);

describe("oracle --help", () => {
  test("documents unique descriptive browser attachment basenames", async () => {
    const cliEntrypoint = path.join(process.cwd(), "bin", "oracle-cli.ts");
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      ["--import", "tsx", cliEntrypoint, "--help"],
      {
        // biome-ignore lint/style/useNamingConvention: environment variable name
        env: { ...process.env, FORCE_COLOR: "0", ORACLE_DISABLE_KEYTAR: "1" },
      },
    );
    const output = `${stdout}\n${stderr}`;

    expect(output).toContain("Browser attachments");
    expect(output).toContain("before invoking Oracle, MUST rename every uploaded file");
    expect(output).toContain("oracle-<task>-<YYYYMMDD-HHmmss>-<NN>.<ext>");
    expect(output).toContain("attachment-readiness timeouts");
  }, 30000);
});
