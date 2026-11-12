import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

const { outputText } = ts.transpileModule(
  readFileSync(new URL("../src/lib/validation.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.ESNext } },
);
const { validateDNSRecords } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

test("reject duplicate DNS values while keeping distinct TXT values", () => {
  const txt = { type: "TXT", value: "kata-verify=duplicate" };
  for (const duplicate of [txt, { ...txt, value: ` ${txt.value} ` }]) {
    const result = validateDNSRecords([txt, duplicate]);
    assert.equal(result.isValid, false);
    assert.match(result.errors.join("\n"), /Record 2.*Duplicate DNS record/);
  }
  assert.equal(validateDNSRecords([txt, { ...txt, value: "other" }]).isValid, true);
  assert.equal(validateDNSRecords([
    { type: "CNAME", value: "example.com" }, { type: "TXT", value: "example.com" },
  ]).isValid, true);
  assert.equal(validateDNSRecords([{ type: "A", value: "invalid" }]).isValid, false);
});
