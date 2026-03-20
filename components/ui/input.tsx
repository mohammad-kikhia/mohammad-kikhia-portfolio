'use client';

import * as React from 'react';

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-primary placeholder:text-muted shadow-sm transition focus:border-accent focus:outline-none focus:ring-0 dark:border-slate-700 dark:bg-slate-900/70 dark:text-primary',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

