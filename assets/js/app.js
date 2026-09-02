import { simulateRecovery, simulateSignIn } from "./auth-demo.js";
import { hasErrors, validateCredentials, validateEmail, validatePassword } from "./validation.js";

const elements = {
  form: document.querySelector("#sign-in-form"),
  email: document.querySelector("#email"),
  emailError: document.querySelector("#email-error"),
  password: document.querySelector("#password"),
  passwordError: document.querySelector("#password-error"),
  capsWarning: document.querySelector("#caps-warning"),
  togglePassword: document.querySelector("#toggle-password"),
  submitButton: document.querySelector("#submit-button"),
  submitLabel: document.querySelector("#submit-button .button-label"),
  formStatus: document.querySelector("#form-status"),
  forgotButton: document.querySelector("#forgot-password"),
  recoveryDialog: document.querySelector("#recovery-dialog"),
  recoveryForm: document.querySelector("#recovery-form"),
  recoveryEmail: document.querySelector("#recovery-email"),
  recoveryError: document.querySelector("#recovery-error"),
  recoveryFormView: document.querySelector("#recovery-form-view"),
  recoverySuccessView: document.querySelector("#recovery-success-view"),
  recoveryConfirmation: document.querySelector("#recovery-confirmation"),
  modalClose: document.querySelector(".modal-close"),
  modalDone: document.querySelector(".modal-done"),
  successDialog: document.querySelector("#success-dialog"),
  successDone: document.querySelector(".success-done"),
  passkeyButton: document.querySelector("#passkey-button"),
  toast: document.querySelector("#toast"),
};

let toastTimer;

function setFieldError(input, output, message) {
  input.setAttribute("aria-invalid", String(Boolean(message)));
  output.textContent = message;
}

function clearStatus() {
  elements.formStatus.hidden = true;
  elements.formStatus.textContent = "";
}

function setLoading(isLoading) {
  elements.submitButton.disabled = isLoading;
  elements.submitButton.classList.toggle("is-loading", isLoading);
  elements.submitButton.setAttribute("aria-busy", String(isLoading));
  elements.submitLabel.textContent = isLoading ? "Checking details" : "Sign in";
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2200);
}

function closeOnBackdrop(dialog, event) {
  if (event.target === dialog) dialog.close();
}

elements.email.addEventListener("blur", () => {
  setFieldError(elements.email, elements.emailError, validateEmail(elements.email.value));
});

elements.email.addEventListener("input", () => {
  clearStatus();
  if (elements.email.getAttribute("aria-invalid") === "true") {
    setFieldError(elements.email, elements.emailError, validateEmail(elements.email.value));
  }
});

elements.password.addEventListener("blur", () => {
  setFieldError(elements.password, elements.passwordError, validatePassword(elements.password.value));
});

elements.password.addEventListener("input", () => {
  clearStatus();
  if (elements.password.getAttribute("aria-invalid") === "true") {
    setFieldError(elements.password, elements.passwordError, validatePassword(elements.password.value));
  }
});

elements.password.addEventListener("keyup", (event) => {
  elements.capsWarning.hidden = !event.getModifierState("CapsLock");
});

elements.password.addEventListener("keydown", (event) => {
  elements.capsWarning.hidden = !event.getModifierState("CapsLock");
});

elements.password.addEventListener("blur", () => {
  elements.capsWarning.hidden = true;
});

elements.togglePassword.addEventListener("click", () => {
  const revealing = elements.password.type === "password";
  elements.password.type = revealing ? "text" : "password";
  elements.togglePassword.setAttribute("aria-pressed", String(revealing));
  elements.togglePassword.setAttribute("aria-label", revealing ? "Hide password" : "Show password");
  elements.password.focus();
});

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (elements.submitButton.disabled) return;

  clearStatus();
  const credentials = {
    email: elements.email.value,
    password: elements.password.value,
  };
  const errors = validateCredentials(credentials);
  setFieldError(elements.email, elements.emailError, errors.email);
  setFieldError(elements.password, elements.passwordError, errors.password);

  if (hasErrors(errors)) {
    const firstInvalid = errors.email ? elements.email : elements.password;
    firstInvalid.focus();
    return;
  }

  setLoading(true);
  const result = await simulateSignIn(credentials);
  setLoading(false);

  if (!result.ok) {
    elements.formStatus.textContent = result.message;
    elements.formStatus.hidden = false;
    elements.formStatus.focus();
    return;
  }

  elements.successDialog.showModal();
});

elements.forgotButton.addEventListener("click", () => {
  elements.recoveryEmail.value = elements.email.value;
  elements.recoveryFormView.hidden = false;
  elements.recoverySuccessView.hidden = true;
  setFieldError(elements.recoveryEmail, elements.recoveryError, "");
  elements.recoveryDialog.showModal();
});

elements.recoveryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const error = validateEmail(elements.recoveryEmail.value);
  setFieldError(elements.recoveryEmail, elements.recoveryError, error);
  if (error) {
    elements.recoveryEmail.focus();
    return;
  }

  const submit = elements.recoveryForm.querySelector('[type="submit"]');
  submit.disabled = true;
  submit.textContent = "Preparing link…";
  const result = await simulateRecovery(elements.recoveryEmail.value);
  submit.disabled = false;
  submit.textContent = "Prepare recovery link";
  elements.recoveryConfirmation.textContent = `A demonstration recovery message is ready for ${result.email}. Nothing was sent.`;
  elements.recoveryFormView.hidden = true;
  elements.recoverySuccessView.hidden = false;
  elements.modalDone.focus();
});

elements.modalClose.addEventListener("click", () => elements.recoveryDialog.close());
elements.modalDone.addEventListener("click", () => elements.recoveryDialog.close());
elements.successDone.addEventListener("click", () => {
  elements.successDialog.close();
  elements.form.reset();
  elements.password.type = "password";
  elements.togglePassword.setAttribute("aria-pressed", "false");
  elements.togglePassword.setAttribute("aria-label", "Show password");
  elements.email.focus();
});

elements.recoveryDialog.addEventListener("click", (event) => closeOnBackdrop(elements.recoveryDialog, event));
elements.successDialog.addEventListener("click", (event) => closeOnBackdrop(elements.successDialog, event));

elements.passkeyButton.addEventListener("click", () => {
  showToast("Passkey support requires a secure server connection.");
});
