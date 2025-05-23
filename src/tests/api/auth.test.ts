import { describe, expect, test } from "vitest";
import { IncomingHttpHeaders } from "http";

import { getAPIKey } from "../../src/api/auth";

describe("getAPIKey", () => {
  test("return null with no headers", () => {
    const header: IncomingHttpHeaders = {};
    expect(getAPIKey(header)).toBeNull();
  });
  test("return null with empty `authorization` header", () => {
    const header: IncomingHttpHeaders = {
      authorization: "",
    };
    expect(getAPIKey(header)).toBeNull();
  });
  test("return null with invalid format `authorization` header", () => {
    const header: IncomingHttpHeaders = {
      authorization: "auth-scheme",
    };
    expect(getAPIKey(header)).toBeNull();
  });
  test("return null with no 'ApiKey' in `authorization` header", () => {
    const apiKey = "keyStringHere";
    const header: IncomingHttpHeaders = {
      authorization: `NotTheAPIKey ${apiKey}`,
    };
    expect(getAPIKey(header)).toBeNull();
  });
  test("return API Key with `authorization` header having ApiKey", () => {
    const apiKey = "keyStringHere";
    const header: IncomingHttpHeaders = {
      authorization: `ApiKey ${apiKey}`,
    };
    expect(getAPIKey(header)).toEqual(apiKey);
  });
});
