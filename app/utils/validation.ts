import { Database } from '../../database.types';

type User = Database['public']['Tables']['users']['Row'];
type LoginValidation = {
  isValid: boolean;
  isValidEmail: boolean;
  isEmptyEmail: boolean;
  isValidPassword: boolean;
  isCheckPasswordLength: boolean;
  isEmptyPassword: boolean;
}
type RegisterValidation = {
  isValid: boolean;
  isValidEmail: boolean;
  isEmptyEmail: boolean;
  isValidPassword: boolean;
  isCheckPasswordLength: boolean;
  isEmptyPassword: boolean;
  isEmptyDisplayName: boolean;
}
type UpdateValidation = {
  isValid: boolean;
  isValidEmail: boolean;
  isEmptyEmail: boolean;
  isEmptyDisplayName: boolean;
  isSetRole: boolean;
}


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

function isValidEmail(email: string): boolean {
  const { checkEmail } = checkPattern();
  return checkEmail(email);
}
function isValidPassword(password: string): boolean {
  const { checkPassword } = checkPattern();
  return checkPassword(password);
}
function isCheckPasswordLength(password: string): boolean {
  return password.length >= 8;
}
function isEmptyEmail(email: string): boolean {
  return email === "";
}
function isEmptyPassword(password: string): boolean {
  return password === "";
}
function isEmptyDisplayName(displayName: string): boolean {
  return displayName === "";
}
function isSetRole(role: string): boolean {
  return !!role;
}

export function loginValidation(email: string, password: string): LoginValidation {
  return {
    isValid: isValidEmail(email) && isValidPassword(password) && isCheckPasswordLength(password),
    isValidEmail: isValidEmail(email),
    isEmptyEmail: isEmptyEmail(email),
    isValidPassword: isValidPassword(password),
    isEmptyPassword: isEmptyPassword(password),
    isCheckPasswordLength: isCheckPasswordLength(password)
  }
}

export function registerValidation(email: string, password: string, displayName: string): RegisterValidation {
  return {
    isValid: isValidEmail(email) && isValidPassword(password) && isCheckPasswordLength(password) && !isEmptyDisplayName(displayName),
    isValidEmail: isValidEmail(email),
    isEmptyEmail: isEmptyEmail(email),
    isValidPassword: isValidPassword(password),
    isEmptyPassword: isEmptyPassword(password),
    isCheckPasswordLength: isCheckPasswordLength(password),
    isEmptyDisplayName: isEmptyDisplayName(displayName)
  }
}

export function updateValidation(email: string, displayName: string, role: string): UpdateValidation {
  return {
    isValid: isValidEmail(email) && !isEmptyDisplayName(displayName),
    isValidEmail: isValidEmail(email),
    isEmptyEmail: isEmptyEmail(email),
    isEmptyDisplayName: isEmptyDisplayName(displayName),
    isSetRole: isSetRole(role)
  }
}


export function checkSchedule(title: string, startTime: Date, endTime: Date): boolean {
  const isEmptyTitle = title === "";
  const isSetTime = startTime && endTime && startTime.getTime() < endTime.getTime();

  return !isEmptyTitle && isSetTime;
}


export function isAdminUser(user: User | null): boolean {
  if (user && user.role === "admin") {
    return true;
  }
  return false;
}

