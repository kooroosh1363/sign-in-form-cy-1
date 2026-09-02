export function validateEmail(value) {
  const email = value.trim();
  if (!email) return "Enter your email address.";
  if (email.length > 254) return "Email address is too long.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email)) {
    return "Enter a valid email address.";
  }
  return "";
}

export function validatePassword(value) {
  if (!value) return "Enter your password.";
  if (value.length < 8) return "Password must contain at least 8 characters.";
  if (value.length > 128) return "Password must contain no more than 128 characters.";
  return "";
}

export function validateCredentials({ email = "", password = "" }) {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  };
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
