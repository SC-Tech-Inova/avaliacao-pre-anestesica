import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

// Define estilos utilizando cva (Class Variance Authority)
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

// Definição de tipos para o componente Label
type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & {
    children: React.ReactNode; // Propriedade children é obrigatória
  };

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        {...props}
        className={labelVariants({ className })}
      >
        {children}
      </LabelPrimitive.Root>
    );
  }
);

// Define o displayName para facilitar debugging no React DevTools
Label.displayName = "Label";

export { Label };