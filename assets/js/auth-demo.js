const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export async function simulateSignIn({ email, password }) {
  await wait(650);
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === "locked@example.com") {
    return {
      ok: false,
      code: "account_locked",
      message: "This demonstration account is locked. Try another email address.",
    };
  }

  if (password.toLowerCase() === "incorrect") {
    return {
      ok: false,
      code: "invalid_credentials",
      message: "The email or password did not match. Check the details and try again.",
    };
  }

  return { ok: true, code: "authenticated" };
}

export async function simulateRecovery(email) {
  await wait(500);
  return { ok: true, email: email.trim() };
}
