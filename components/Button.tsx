import { IHaveChildren } from "@/types";

import clsx from "clsx";

interface ButtonProps extends IHaveChildren {
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  variant,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        variant === "secondary" ? "text-gray-900" : "text-white",
        variant === "danger" &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        variant != "secondary" &&
          variant != "danger" &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600",
      )}
    >
      {children}
    </button>
  );
};

export default Button;
