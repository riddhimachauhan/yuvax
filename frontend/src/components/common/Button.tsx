"use client";
import React from "react";
import cn from "clsx";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonOrAnchorProps =
  | (NativeButtonProps & { href?: undefined })
  | (AnchorProps & { href: string });

type ButtonPropsBase = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
};

export type ButtonProps = React.PropsWithChildren<ButtonPropsBase & ButtonOrAnchorProps>;

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-[14px] md:px-4 md:text-[16px]",
  md: "px-4 py-2 text-[15px] md:px-5 md:text-[17px]",
  lg: "px-6 py-2.5 text-[16px] md:px-8 md:text-[18px]",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  size = "md",
  className,
  href,
  disabled,
  ...rest
}) => {
  const base =
    "rounded-full font-semibold transition-colors shadow-2xl inline-flex items-center justify-center cursor-pointer";
  const variantClass =
    variant === "solid"
      ? "bg-black text-white"
      : variant === "outline"
      ? "border-2 border-white text-white bg-transparent"
      : "bg-transparent text-white/90";

  const finalClass = cn(base, variantClass, sizeMap[size], className, {
    "opacity-50 cursor-not-allowed": disabled,
  });

  if (href) {
    const anchorProps: AnchorProps = {
      href,
      className: finalClass,
      "aria-disabled": disabled,
      ...rest,
    } as AnchorProps; 
    return <a {...anchorProps}>{children}</a>;
  }

  const buttonProps: NativeButtonProps = {
    className: finalClass,
    disabled,
    ...rest,
  } as NativeButtonProps;
  return <button {...buttonProps}>{children}</button>;
};

export default Button;



