
import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Image 
        src="/assets/vistaforge-logo.png" 
        alt="VistaForge" 
        width={40}
        height={40}
        className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
      />
      <span className="text-base sm:text-lg md:text-xl font-semibold text-foreground tracking-tight whitespace-nowrap">
        VistaForge
      </span>
    </div>
  );
};

export default Logo;
