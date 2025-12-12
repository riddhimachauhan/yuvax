import React, { ElementType } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  children: React.ReactNode;
  className?: string;
  as?: T;
  fullWidth?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, "children">;

export default function Container<T extends ElementType = "div">({
  children,
  className = "",
  as,
  fullWidth = false,
  ...rest
}: ContainerProps<T>) {
  const Component = as || "div";
  const paddingClass: string = fullWidth ? "" : "px-4 lg:px-[90px]";

  // Create a props object and cast it to the correct component prop type
  const componentProps = {
    className: `${paddingClass} ${className}`,
    ...(rest as unknown as Record<string, unknown>),
  } as React.ComponentPropsWithoutRef<T> & { className?: string };

  return React.createElement(Component, componentProps, children);
}
