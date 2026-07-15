import { SVGProps } from 'react';

export const Home3D = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="homeGrad1" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fde047" />
        <stop offset="1" stopColor="#ca8a04" />
      </linearGradient>
      <linearGradient id="homeGrad2" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fef08a" />
        <stop offset="1" stopColor="#a16207" />
      </linearGradient>
      <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.3" />
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.4" />
      </filter>
      <filter id="innerGlow">
        <feComponentTransfer in="SourceAlpha">
          <feFuncA type="linear" slope="0.5"/>
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feOffset dy="-2" dx="-2"/>
        <feComposite operator="out" in2="SourceAlpha"/>
        <feComposite operator="in" in2="SourceGraphic"/>
        <feBlend mode="overlay" in2="SourceGraphic"/>
      </filter>
    </defs>
    
    <g filter="url(#shadow3d)">
      {/* Base */}
      <path d="M15 45L50 15L85 45V80C85 85.5228 80.5228 90 75 90H25C19.4772 90 15 85.5228 15 80V45Z" fill="url(#homeGrad1)" />
      {/* Roof */}
      <path d="M10 50L50 15L90 50" stroke="url(#homeGrad2)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Door */}
      <path d="M40 90V65C40 59.4772 44.4772 55 50 55C55.5228 55 60 59.4772 60 65V90" fill="#a16207" />
    </g>
  </svg>
);

export const Quran3D = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="qGrad1" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34d399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="qGrad2" x1="50" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fef08a" />
        <stop offset="1" stopColor="#ca8a04" />
      </linearGradient>
    </defs>
    <g filter="url(#shadow3d)">
      {/* Left Page */}
      <path d="M50 20C40 15 20 15 15 20V80C20 75 40 75 50 80V20Z" fill="url(#qGrad1)" />
      {/* Right Page */}
      <path d="M50 20C60 15 80 15 85 20V80C80 75 60 75 50 80V20Z" fill="url(#qGrad1)" />
      {/* Spine / Gold detail */}
      <path d="M48 20C48 20 50 18 52 20V80C52 80 50 82 48 80V20Z" fill="url(#qGrad2)" />
      <path d="M25 35H40M25 50H40M25 65H40" stroke="url(#qGrad2)" strokeWidth="3" strokeLinecap="round" />
      <path d="M75 35H60M75 50H60M75 65H60" stroke="url(#qGrad2)" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

export const Hadith3D = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="hGrad1" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fcd34d" />
        <stop offset="1" stopColor="#b45309" />
      </linearGradient>
    </defs>
    <g filter="url(#shadow3d)">
      <rect x="20" y="15" width="60" height="70" rx="6" fill="url(#hGrad1)" />
      <path d="M30 15V85" stroke="#78350f" strokeWidth="4" opacity="0.5" />
      <path d="M45 35H70M45 50H70M45 65H60" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
      <circle cx="30" cy="30" r="3" fill="#fef3c7" />
      <circle cx="30" cy="50" r="3" fill="#fef3c7" />
      <circle cx="30" cy="70" r="3" fill="#fef3c7" />
    </g>
  </svg>
);

export const Azkar3D = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="aGrad1" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa" />
        <stop offset="1" stopColor="#6d28d9" />
      </linearGradient>
      <linearGradient id="aGrad2" x1="50" y1="10" x2="50" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fde047" />
        <stop offset="1" stopColor="#transparent" />
      </linearGradient>
    </defs>
    <g filter="url(#shadow3d)">
      {/* Left Hand */}
      <path d="M45 80C45 80 30 75 25 65C20 55 25 40 30 35C35 30 40 45 45 50V80Z" fill="url(#aGrad1)" />
      {/* Right Hand */}
      <path d="M55 80C55 80 70 75 75 65C80 55 75 40 70 35C65 30 60 45 55 50V80Z" fill="url(#aGrad1)" />
      {/* Light coming from above */}
      <path d="M40 30L50 10L60 30" stroke="url(#aGrad2)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="40" r="5" fill="#fde047" opacity="0.8" />
    </g>
  </svg>
);

export const Tasbeeh3D = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="tGrad1" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6ee7b7" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
    </defs>
    <g filter="url(#shadow3d)">
      {/* Main cord */}
      <ellipse cx="50" cy="50" rx="30" ry="35" stroke="#fde047" strokeWidth="2" opacity="0.6" />
      {/* Beads */}
      <circle cx="50" cy="15" r="5" fill="url(#tGrad1)" />
      <circle cx="68" cy="21" r="5" fill="url(#tGrad1)" />
      <circle cx="80" cy="35" r="5" fill="url(#tGrad1)" />
      <circle cx="80" cy="55" r="5" fill="url(#tGrad1)" />
      <circle cx="68" cy="74" r="5" fill="url(#tGrad1)" />
      
      <circle cx="32" cy="21" r="5" fill="url(#tGrad1)" />
      <circle cx="20" cy="35" r="5" fill="url(#tGrad1)" />
      <circle cx="20" cy="55" r="5" fill="url(#tGrad1)" />
      <circle cx="32" cy="74" r="5" fill="url(#tGrad1)" />
      
      {/* Tassel */}
      <path d="M50 85L50 95M47 88L45 95M53 88L55 95" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
      <path d="M46 80H54V85H46V80Z" fill="#ca8a04" />
    </g>
  </svg>
);

export const Settings3D = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="sGrad1" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#94a3b8" />
        <stop offset="1" stopColor="#334155" />
      </linearGradient>
    </defs>
    <g filter="url(#shadow3d)">
      <path d="M50 20C47 20 45 17 45 15C45 12 47 10 50 10C53 10 55 12 55 15C55 17 53 20 50 20Z" fill="url(#sGrad1)" />
      <path d="M50 90C47 90 45 87 45 85C45 82 47 80 50 80C53 80 55 82 55 85C55 87 53 90 50 90Z" fill="url(#sGrad1)" />
      <path d="M20 50C20 47 17 45 15 45C12 45 10 47 10 50C10 53 12 55 15 55C17 55 20 53 20 50Z" fill="url(#sGrad1)" />
      <path d="M90 50C90 47 87 45 85 45C82 45 80 47 80 50C80 53 82 55 85 55C87 55 90 53 90 50Z" fill="url(#sGrad1)" />
      
      <path d="M28.7868 28.7868C26.6655 30.9081 23.2263 30.9081 21.1049 28.7868C18.9836 26.6655 18.9836 23.2263 21.1049 21.1049C23.2263 18.9836 26.6655 18.9836 28.7868 21.1049C30.9081 23.2263 30.9081 26.6655 28.7868 28.7868Z" fill="url(#sGrad1)" />
      <path d="M78.8951 78.8951C76.7738 81.0164 73.3346 81.0164 71.2133 78.8951C69.0919 76.7738 69.0919 73.3346 71.2133 71.2133C73.3346 69.0919 76.7738 69.0919 78.8951 71.2133C81.0164 73.3346 81.0164 76.7738 78.8951 78.8951Z" fill="url(#sGrad1)" />
      <path d="M78.8951 21.1049C81.0164 23.2263 81.0164 26.6655 78.8951 28.7868C76.7738 30.9081 73.3346 30.9081 71.2133 28.7868C69.0919 26.6655 69.0919 23.2263 71.2133 21.1049C73.3346 18.9836 76.7738 18.9836 78.8951 21.1049Z" fill="url(#sGrad1)" />
      <path d="M28.7868 71.2133C30.9081 73.3346 30.9081 76.7738 28.7868 78.8951C26.6655 81.0164 23.2263 81.0164 21.1049 78.8951C18.9836 76.7738 18.9836 73.3346 21.1049 71.2133C23.2263 69.0919 26.6655 69.0919 28.7868 71.2133Z" fill="url(#sGrad1)" />
      
      <circle cx="50" cy="50" r="20" fill="url(#sGrad1)" stroke="#cbd5e1" strokeWidth="4" />
      <circle cx="50" cy="50" r="8" fill="#1e293b" />
    </g>
  </svg>
);
