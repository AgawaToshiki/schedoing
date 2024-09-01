export function checkPattern(email: string, password: string) {
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]+$/;
  const passwordPattern = /^(?=.*[A-Z])[0-9a-zA-Z]*$/;

  const regEmail = email.match(emailPattern);
  const regPassword = password.match(passwordPattern);

  return {
    regEmail,
    regPassword
  }
}

export function loginFormValidation(email: string, password: string): boolean {
  const {regEmail, regPassword} = checkPattern(email, password);
  if(regEmail && regPassword) {
    return true
  }
  return false
}

export function registerFormValidation(email: string, password: string, displayName: string): boolean {
  const {regEmail, regPassword} = checkPattern(email, password);
  if(regEmail && regPassword && displayName) {
    return true
  }
  return false
}