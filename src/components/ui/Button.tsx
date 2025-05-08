import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Button = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={cn("cursor-pointer", className)} {...props}>
      {children}
    </button>
  );
};
