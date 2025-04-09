import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

// Interface para propriedades do botão
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'outline' | 'solid' | 'ghost'; // Adicionando suporte para variantes diretamente no ButtonProps
  className?: string;
}

// Função para gerar variantes de estilo do botão (definida uma única vez)
const buttonVariants = (variant: 'outline' | 'solid' | 'ghost' = 'solid'): string => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors';
  const variantStyles = {
    outline: 'border border-primary text-primary hover:bg-primary/10',
    solid: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'bg-transparent text-primary hover:bg-primary/10',
  };

  return `${baseStyles} ${variantStyles[variant]}`;
};

// Componente Button
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'solid', ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants(variant), // Aplica o estilo correto com base na variante
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          className // Adiciona classes extras se fornecidas
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; // Exportação consolidada de Button e buttonVariants
