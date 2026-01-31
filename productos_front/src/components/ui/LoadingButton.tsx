import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./button";


// Tipado del componente LoadingButton
interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  children: ReactNode;
  texto?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function LoadingButton({
  isLoading,
  children,
  disabled,
  texto,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={isLoading || disabled}
      className="w-full flex items-center justify-center gap-2 "
      {...props}
    >
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {isLoading ? texto || "Cargando..." : children}
    </Button>
  );
}
