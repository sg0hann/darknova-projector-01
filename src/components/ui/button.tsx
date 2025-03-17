
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden shadow-md hover:shadow-lg before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-primary/0 before:via-primary/20 before:to-primary/0 before:animate-pulse-glow hover:before:animate-none",
  {
    variants: {
      variant: {
        default: "bg-secondary/80 text-secondary-foreground hover:bg-secondary/95 border border-secondary/20 backdrop-blur-sm",
        destructive:
          "bg-destructive/80 text-destructive-foreground hover:bg-destructive/90 border border-destructive/20",
        outline:
          "border border-input bg-background/80 hover:bg-accent/50 hover:text-accent-foreground backdrop-blur-sm",
        secondary:
          "bg-secondary/50 text-secondary-foreground hover:bg-secondary/80 border border-secondary/20 backdrop-blur-sm",
        ghost: "hover:bg-accent/30 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-primary/80 via-primary to-accent/80 text-white hover:from-primary hover:to-accent border-none",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-11 rounded-full px-8",
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
