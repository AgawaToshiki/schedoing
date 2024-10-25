
function checkPattern() {

  function checkEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]+$/;
  
    const regEmail = email.match(emailPattern);
  
    return !!regEmail
  }

  function checkPassword(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Z])[0-9a-zA-Z]*$/;
    const regPassword = password.match(passwordPattern);
  
    return !!regPassword
  }

  return {
    checkEmail,
    checkPassword
  }
}

export function loginFormValidation(email: string, password: string): { 
  isValid: boolean, 
  isValidEmail: boolean, 
  isValidPassword: boolean,
  isCheckPasswordLength: boolean, 
  isEmptyEmail: boolean, 
  isEmptyPassword: boolean,
} {
  const { checkEmail, checkPassword } = checkPattern();
  const isValidEmail = checkEmail(email);
  const isValidPassword = checkPassword(password);
  const isCheckPasswordLength = password.length >= 8;
  const isEmptyEmail = email === "";
  const isEmptyPassword = password === "";
  const isValid = isValidEmail && isValidPassword && isCheckPasswordLength;
  
  return {
    isValid,
    isValidEmail,
    isValidPassword,
    isCheckPasswordLength,
    isEmptyEmail,
    isEmptyPassword
  }
}

export function registerFormValidation(email: string, password: string, displayName: string): {
  isValid: boolean, 
  isValidEmail: boolean, 
  isValidPassword: boolean,
  isCheckPasswordLength: boolean, 
  isEmptyEmail: boolean, 
  isEmptyPassword: boolean,
  isEmptyDisplayName: boolean
} {
  const { checkEmail, checkPassword } = checkPattern();
  const isValidEmail = checkEmail(email);
  const isValidPassword = checkPassword(password);
  const isCheckPasswordLength = password.length >= 8;
  const isEmptyEmail = email === "";
  const isEmptyPassword = password === "";
  const isEmptyDisplayName = displayName === "";
  const isValid = isValidEmail && isValidPassword && isCheckPasswordLength && !isEmptyDisplayName;

  return {
    isValid,
    isValidEmail,
    isValidPassword,
    isCheckPasswordLength,
    isEmptyEmail,
    isEmptyPassword,
    isEmptyDisplayName
  }
}

export function updateEmailValidation(email: string): boolean {
  const { checkEmail } = checkPattern();
  if(checkEmail(email)) {
    return true
  }
  return false
}

export function scheduleFormValidation(title: string): {
  isEmptyTitle: boolean,
} {
  const isEmptyTitle = title === "";

  return {
    isEmptyTitle
  }
}


export function checkSchedule(title: string, startTime: Date, endTime: Date): boolean {
  const isEmptyTitle = title === "";
  const isSetTime = startTime && endTime && startTime.getTime() < endTime.getTime();

  return !isEmptyTitle && isSetTime;
}

