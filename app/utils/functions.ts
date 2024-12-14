import React from "react"
import { User } from '../types';
import { toZonedTime } from "date-fns-tz";

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

export function isAdminUser(user: User | null): boolean {
  if (user && user.role === "admin") {
    return true;
  }
  return false;
}

export function getTotalMinutes (timestamp: string): number {
  const getDate = toZonedTime(new Date(timestamp), 'Asia/Tokyo');
  const hours = getDate.getHours();
  const minutes = getDate.getMinutes();
  return hours * 60 + minutes;
};