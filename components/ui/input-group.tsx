'use client';

import * as React from 'react';

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
}

export function InputGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('relative flex w-full items-stretch gap-2', className)}
      {...props}
    />
  );
}

export type InputGroupTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  InputGroupTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'min-h-24 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-primary placeholder:text-muted shadow-sm transition focus:border-accent focus:outline-none focus:ring-0 dark:border-slate-700 dark:bg-slate-900/70 dark:text-primary',
        className,
      )}
      {...props}
    />
  );
});

InputGroupTextarea.displayName = 'InputGroupTextarea';

export function InputGroupAddon({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center text-xs text-muted',
        className,
      )}
      {...props}
    />
  );
}

export function InputGroupText({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-slate-800 px-2 py-1 text-[11px] text-primary',
        className,
      )}
      {...props}
    />
  );
}

