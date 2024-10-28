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
type Validation = LoginValidation | RegisterValidation | UpdateValidation;



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

export function userFormValidation(
  type: "login" | "register" | "update",
  email: string,
  password: string | null,
  displayName?: string,
  role?: string
): Validation {

  const { checkEmail, checkPassword } = checkPattern();
  const isValidEmail = checkEmail(email);
  const isValidPassword = password ? checkPassword(password) : false;
  const isCheckPasswordLength = password ? password.length >= 8 : false;
  const isEmptyEmail = email === "";
  const isEmptyPassword = password === "";
  const isEmptyDisplayName = displayName === "";
  const isSetRole = !!role;
  
  if(type === "login"){
    return {
      isValid: isValidEmail && isValidPassword && isCheckPasswordLength,
      isValidEmail,
      isValidPassword,
      isCheckPasswordLength,
      isEmptyEmail,
      isEmptyPassword,
    }
  }

  if(type === "register"){
    return {
      isValid: isValidEmail && isValidPassword && isCheckPasswordLength && !isEmptyDisplayName,
      isValidEmail,
      isValidPassword,
      isCheckPasswordLength,
      isEmptyEmail,
      isEmptyPassword,
      isEmptyDisplayName
    }
  }

  if(type === "update"){
    return {
      isValid: isValidEmail && !isEmptyDisplayName && isSetRole,
      isValidEmail,
      isEmptyEmail,
      isEmptyDisplayName,
      isSetRole
    }
  }
  throw new Error("Invalid validation type");
}


export function updateEmailValidation(email: string): boolean {
  const { checkEmail } = checkPattern();
  if(checkEmail(email)) {
    return true
  }
  return false
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

