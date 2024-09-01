import { useEffect, useState } from "react"

export const useCheckChangeState = (...args: (string|Date)[]): boolean => {
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const isSetValue = args.some((value) => value === "");
    setDisabled(isSetValue);
  }, args)

  return disabled
}