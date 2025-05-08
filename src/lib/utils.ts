import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  // twMerge optimizies tw classnames
  return twMerge(clsx(inputs));
}
