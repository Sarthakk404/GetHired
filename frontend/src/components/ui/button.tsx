import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/20",
        secondary: "bg-secondary text-white hover:bg-secondary-hover shadow-lg shadow-secondary/20",
        accent: "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20",
        destructive: "bg-error text-white hover:bg-red-600 shadow-lg shadow-error/20",
        outline: "border border-border bg-transparent hover:bg-surface-hover text-muted-foreground hover:text-white",
        ghost: "text-muted-foreground hover:text-white hover:bg-surface-hover",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-white hover:bg-green-600 shadow-lg shadow-success/20",
        warning: "bg-warning text-white hover:bg-amber-600 shadow-lg shadow-warning/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
