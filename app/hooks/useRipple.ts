import { useState } from "react";

export const useRipple = () => {
  const [ripples, setRipples] = useState<{ id: number, left: number, top: number, size: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;

    const newRipple = {
      id: Date.now(),
      left: e.clientX - (target.offsetLeft + radius),
      top: e.clientY - (target.offsetTop + radius),
      size: diameter,
    }
    setRipples((prev) => [...prev, newRipple]);
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
  };

  return { ripples, addRipple, removeRipple };
};