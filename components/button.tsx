import React from 'react';
import Link from 'next/link';

export interface TacticalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  isLoading = false,
  variant = 'primary',
  disabled,
  className = '',
  href,
  leftIcon,
  rightIcon,
  target,
  rel,
  ...props
}: TacticalButtonProps) {
  const theme = {
    primary: {
      wrapper: 'border-white/10 bg-black/40 hover:border-[#ff0000]/60 hover:bg-[#ff0000]/5 hover:shadow-[0_0_20px_rgba(255,0,0,0.1)]',
      text: 'text-white/70 group-hover:text-white',
      corners: 'border-[#ff0000] opacity-0 group-hover:opacity-100',
      prefix: 'text-[#ff0000]',
    },
    secondary: {
      wrapper: 'border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]',
      text: 'text-white/60 group-hover:text-white',
      corners: 'border-white opacity-0 group-hover:opacity-60',
      prefix: 'text-white/40',
    },
    danger: {
      wrapper: 'border-red-900/30 bg-red-950/20 hover:border-red-500/50 hover:bg-red-900/30',
      text: 'text-red-500 group-hover:text-red-400',
      corners: 'border-red-500 opacity-0 group-hover:opacity-100',
      prefix: 'text-red-500',
    }
  };

  const active = theme[variant];
  const isDisabled = disabled || isLoading;

  const baseClasses = `group relative inline-flex items-center justify-center h-11 px-6 font-mono text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ease-out border rounded-none active:scale-[0.98] ${
    isDisabled ? 'opacity-40 cursor-not-allowed active:scale-100 pointer-events-none' : ''
  } ${active.wrapper} ${className}`;

  const content = (
    <>
      <span className={`absolute top-[-1px] left-[-1px] w-2 h-2 border-t border-l transition-all duration-300 ease-out ${active.corners} group-hover:-translate-x-[3px] group-hover:-translate-y-[3px]`} />
      <span className={`absolute top-[-1px] right-[-1px] w-2 h-2 border-t border-r transition-all duration-300 ease-out ${active.corners} group-hover:translate-x-[3px] group-hover:-translate-y-[3px]`} />
      <span className={`absolute bottom-[-1px] left-[-1px] w-2 h-2 border-b border-l transition-all duration-300 ease-out ${active.corners} group-hover:-translate-x-[3px] group-hover:translate-y-[3px]`} />
      <span className={`absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b border-r transition-all duration-300 ease-out ${active.corners} group-hover:translate-x-[3px] group-hover:translate-y-[3px]`} />

      <span className={`relative z-10 flex items-center justify-center gap-3 transition-colors duration-300 ${active.text}`}>
        <span className={`text-[11px] transition-all duration-300 ${active.prefix} ${isDisabled ? 'opacity-30' : 'opacity-70 group-hover:opacity-100'}`}>
          {isLoading ? '>>' : ''}
        </span>

        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="opacity-70">{children}</span>
          </span>
        ) : (
          <span className="flex items-center gap-2 transition-transform duration-300 ease-out">
            {leftIcon && <span className="flex items-center justify-center">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex items-center justify-center">{rightIcon}</span>}
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        target={target} 
        rel={rel} 
        className={baseClasses} 
        onClick={props.onClick as any}
      >
        {content}
      </Link>
    );
  }

  return (
    <button 
      disabled={isDisabled} 
      className={baseClasses} 
      {...props}
    >
      {content}
    </button>
  );
}