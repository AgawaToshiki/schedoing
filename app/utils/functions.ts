import React from "react"

export function handleSetEmailErrorMessage(isValid: boolean, isEmpty: boolean, setter: React.Dispatch<React.SetStateAction<string>>) {
  if(isEmpty) {
    return setter("入力必須項目です");
  }
  if(!isValid) {
    return setter("メールアドレスの形式で入力してください");
  }
  return setter("");
}

export function handleSetPasswordErrorMessage(isValid: boolean, isEmpty: boolean, isLength: boolean, setter: React.Dispatch<React.SetStateAction<string>>) {
  if(isEmpty) {
    return setter("入力必須項目です");
  }
  if(!isLength) {
    return setter("8文字以上で入力してください");
  }
  if(!isValid) {
    return setter("半角英数字と1つ以上の大文字を含めてください");
  }
  return setter("");
}

export function handleSetEmptyErrorMessage(isEmpty: boolean, setter: React.Dispatch<React.SetStateAction<string>>) {
  if(isEmpty) {
    return setter("入力必須項目です");
  }
  return setter("");
}