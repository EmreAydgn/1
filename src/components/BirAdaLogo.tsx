import React from 'react';

export const BIR_ADA_LOGO_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%23FAF6EE"/><rect width="100" height="100" rx="20" stroke="%23DDCFA0" stroke-width="3" fill="%23FAF6EE"/><circle cx="50" cy="50" r="42" stroke="%23D4A373" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/><g><path d="M 50 18 L 22 80 L 35 80 L 44 60 L 56 60 L 65 80 L 78 80 Z" fill="%230F2C59"/><polygon points="50,32 40,52 60,52" fill="%23FAF6EE"/><path d="M 31 50 L 69 50 L 69 58 L 31 58 Z" fill="%23C8102E"/><path d="M 46 22 L 54 22 L 54 58 L 46 58 Z" fill="%23C8102E"/><circle cx="50" cy="54" r="3.5" fill="%23D4A373"/><path d="M 18 83 C 36 77, 64 87, 82 82" stroke="%23D4A373" stroke-width="2.5" stroke-linecap="round"/></g></svg>`;

interface BirAdaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BirAdaLogo: React.FC<BirAdaLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-11 h-11 p-1.5',
    lg: 'w-16 h-16 p-2',
    xl: 'w-24 h-24 p-3',
  };

  const iconSizes = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Icon Badge - Premium Warm Light Canvas with Union-A Monogram */}
      <div
        className={`${iconSizes} rounded-2xl bg-gradient-to-br from-[#FFFFFF] via-[#FAF6EE] to-[#F3EBDC] border border-[#DDCFA0] shadow-sm flex items-center justify-center relative overflow-hidden group-hover:border-[#C8102E] group-hover:shadow-md transition-all duration-300`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle Outer Geometric Golden Ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#D4A373"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.5"
          />

          {/* Masked Union Jack Pattern inside the Letter 'A' Monogram */}
          <g>
            {/* Outer Silhouette of 'A' */}
            {/* Left Leg of A */}
            <path
              d="M 50 18 L 22 80 L 35 80 L 44 60 L 56 60 L 65 80 L 78 80 Z"
              fill="#0F2C59"
            />

            {/* Inner Triangle Counter (Cutout of A) */}
            <polygon points="50,32 40,52 60,52" fill="#FAF6EE" />

            {/* Union Jack Red Cross & Diagonals Overlay inside the 'A' Structure */}
            {/* Horizontal Red Cross bar across the 'A' */}
            <path
              d="M 31 50 L 69 50 L 69 58 L 31 58 Z"
              fill="#C8102E"
            />

            {/* Vertical Red St. George Cross Line on the Apex */}
            <path
              d="M 46 22 L 54 22 L 54 58 L 46 58 Z"
              fill="#C8102E"
            />

            {/* Subtle Gold Trim on Cross Joints */}
            <circle cx="50" cy="54" r="3.5" fill="#D4A373" />

            {/* Sleek Island Arch Wave Underneath the 'A' */}
            <path
              d="M 18 83 C 36 77, 64 87, 82 82"
              stroke="#D4A373"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif-playfair text-2xl font-bold tracking-tight text-[#1A1A1A] block leading-none">
            BİR ADA
          </span>
          <span className="text-[10px] font-sans-inter uppercase tracking-[0.22em] text-[#C8102E] font-bold mt-1 block">
            Britanya Online Dergi &amp; Yaşam
          </span>
        </div>
      )}
    </div>
  );
};
