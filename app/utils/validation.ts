
export function formValidation() {

  function checkPattern() {

    function checkEmail(email: string) {
      const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]+$/;
    
      const regEmail = email.match(emailPattern);
    
      return regEmail
    }
  
    function checkPassword(password: string) {
      const passwordPattern = /^(?=.*[A-Z])[0-9a-zA-Z]*$/;
      const regPassword = password.match(passwordPattern);
    
      return regPassword
    }

    return {
      checkEmail,
      checkPassword
    }
  }

  function loginFormValidation(email: string, password: string): boolean {
    const { checkEmail, checkPassword } = checkPattern();
    if(checkEmail(email) && checkPassword(password) && password.length >= 8) {
      return true
    }
    return false
  }
  
  function registerFormValidation(email: string, password: string, displayName: string): boolean {
    const { checkEmail, checkPassword } = checkPattern();
    if(checkEmail(email) && checkPassword(password) && displayName && password.length >= 8) {
      return true
    }
    return false
  }

  function updateEmailValidation(email: string): boolean {
    const { checkEmail } = checkPattern();
    if(checkEmail(email)) {
      return true
    }
    return false
  }

  return {
    loginFormValidation,
    registerFormValidation,
    updateEmailValidation
  }
}

export function checkSchedule(title: string, startTime: Date, endTime: Date): boolean {
  const isSetTitle = !!title;
  const isSetTime = startTime && endTime && startTime.getTime() < endTime.getTime();
  return isSetTitle && isSetTime;
}

