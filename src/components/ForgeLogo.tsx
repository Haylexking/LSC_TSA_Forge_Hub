import React from 'react';

interface ForgeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  textClassName?: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
}

export function ForgeMark({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }) {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const iconSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`relative ${iconSize} rounded-xl bg-white p-[1px] shadow-[0_1px_3px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)] border border-zinc-200/90 flex items-center justify-center group shrink-0 ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[62%] h-[62%] transition-transform duration-200 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="forgeStemLight" x1="8" y1="6" x2="15" y2="25" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
          <linearGradient id="forgeWingLight" x1="15" y1="7" x2="24" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#3f3f46" />
          </linearGradient>
          <linearGradient id="forgeEmberLight" x1="15" y1="13" x2="22" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="forgeBaseLight" x1="6" y1="23" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#52525b" />
            <stop offset="100%" stopColor="#3f3f46" />
          </linearGradient>
        </defs>

        {/* Forge Pillar / Monogram F Stem */}
        <path
          d="M8 7C8 6.44772 8.44772 6 9 6H13.5C14.3284 6 15 6.67157 15 7.5V23.5C15 24.3284 14.3284 25 13.5 25H9C8.44772 25 8 24.5523 8 24V7Z"
          fill="url(#forgeStemLight)"
        />

        {/* Top Arm of the Forge / F Wing */}
        <path
          d="M15 8.5C15 7.67157 15.6716 7 16.5 7H23C23.5523 7 24 7.44772 24 8V11C24 11.5523 23.5523 12 23 12H16.5C15.6716 12 15 11.3284 15 10.5V8.5Z"
          fill="url(#forgeWingLight)"
        />

        {/* Middle Arm / Anvil Shelf with warm amber accent */}
        <path
          d="M15 14.5C15 13.6716 15.6716 13 16.5 13H20.5C21.0523 13 21.5 13.4477 21.5 14V16.5C21.5 17.0523 21.0523 17.5 20.5 17.5H16.5C15.6716 17.5 15 16.8284 15 16V14.5Z"
          fill="url(#forgeEmberLight)"
        />

        {/* Ember Spark / Diamond Accent */}
        <path
          d="M24.5 16L26 18L24.5 20L23 18L24.5 16Z"
          fill="#d97706"
        />

        {/* Anvil Base Foundation */}
        <path
          d="M6 24C6 23.4477 6.44772 23 7 23H25C25.5523 23 26 23.4477 26 24V25C26 25.5523 25.5523 26 25 26H7C6.44772 26 6 25.5523 6 25V24Z"
          fill="url(#forgeBaseLight)"
        />
      </svg>
    </div>
  );
}

export default function ForgeLogo({
  size = 'md',
  className = '',
  showText = true,
  textClassName = '',
  subtitle,
}: ForgeLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <ForgeMark size={size} />
      {showText && (
        <div className="flex flex-col">
          <div className={`font-bold tracking-tight text-zinc-900 flex items-center gap-1.5 ${textClassName || 'text-[15px]'}`}>
            <span>The Forge Hub</span>
          </div>
          {subtitle ? (
            <span className="text-[11px] font-medium text-zinc-500 tracking-tight">{subtitle}</span>
          ) : null}
        </div>
      )}
    </div>
  );
}
