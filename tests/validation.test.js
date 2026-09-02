import test from "node:test";
import assert from "node:assert/strict";
import { hasErrors, validateCredentials, validateEmail, validatePassword } from "../assets/js/validation.js";

test("accepts a well-formed email address", () => {
  assert.equal(validateEmail("person@example.com"), "");
});

test("rejects an empty email address", () => {
  assert.equal(validateEmail("  "), "Enter your email address.");
});

test("rejects malformed email addresses", () => {
  assert.equal(validateEmail("person.example.com"), "Enter a valid email address.");
  assert.equal(validateEmail("person@localhost"), "Enter a valid email address.");
});

test("trims email whitespace before validation", () => {
  assert.equal(validateEmail("  person@example.com  "), "");
});

test("requires a password", () => {
  assert.equal(validatePassword(""), "Enter your password.");
});

test("enforces the minimum password length", () => {
  assert.equal(validatePassword("short"), "Password must contain at least 8 characters.");
  assert.equal(validatePassword("long-enough"), "");
});

test("enforces a defensive maximum password length", () => {
  assert.equal(validatePassword("x".repeat(129)), "Password must contain no more than 128 characters.");
});

test("returns errors for both credential fields", () => {
  assert.deepEqual(validateCredentials({ email: "bad", password: "123" }), {
    email: "Enter a valid email address.",
    password: "Password must contain at least 8 characters.",
  });
});

test("detects whether a validation result contains errors", () => {
  assert.equal(hasErrors({ email: "", password: "" }), false);
  assert.equal(hasErrors({ email: "Invalid", password: "" }), true);
});
