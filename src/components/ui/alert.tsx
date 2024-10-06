import React from 'react';

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'destructive';
}

export function Alert({ title, children, variant = 'default' }: AlertProps) {
  return (
    <div className={`rounded-lg border p-4 ${variant === 'destructive' ? 'border-red-600 bg-red-50' : 'border-gray-200 bg-gray-50'}`} role="alert">
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </div>
  );
}

export function AlertTitle({ children }: { children: React.ReactNode }) {
  return <h5 className="mb-1 font-medium leading-none tracking-tight">{children}</h5>;
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm">{children}</div>;
}