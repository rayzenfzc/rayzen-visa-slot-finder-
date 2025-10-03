import React from 'react';

const SheikhZayedMosqueIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 200 100" 
        className={className} 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        {/* Main Dome */}
        <path d="M100 20 C 80 20, 80 50, 100 50 C 120 50, 120 20, 100 20 Z" />
        <path d="M100 20 V 15" />

        {/* Medium Domes */}
        <path d="M65 40 C 55 40, 55 60, 65 60 C 75 60, 75 40, 65 40 Z" />
        <path d="M65 40 V 37" />
        <path d="M135 40 C 125 40, 125 60, 135 60 C 145 60, 145 40, 135 40 Z" />
        <path d="M135 40 V 37" />

        {/* Small Domes */}
        <path d="M40 55 C 35 55, 35 65, 40 65 C 45 65, 45 55, 40 55 Z" />
        <path d="M40 55 V 53" />
        <path d="M160 55 C 155 55, 155 65, 160 65 C 165 65, 165 55, 160 55 Z" />
        <path d="M160 55 V 53" />

        {/* Minarets */}
        <path d="M20 90 V 40 L 22 40 V 35 C 20 33, 18 33, 20 35 L 20 40" />
        <path d="M180 90 V 40 L 178 40 V 35 C 180 33, 182 33, 180 35 L 180 40" />
        <path d="M50 90 V 50 L 52 50 V 45 C 50 43, 48 43, 50 45 L 50 50" />
        <path d="M150 90 V 50 L 148 50 V 45 C 150 43, 152 43, 150 45 L 150 50" />

        {/* Base and Arches */}
        <path d="M5 90 H 195" />
        <path d="M25 90 C 25 80, 45 80, 45 90" />
        <path d="M55 90 C 55 80, 75 80, 75 90" />
        <path d="M85 90 C 85 75, 115 75, 115 90" />
        <path d="M125 90 C 125 80, 145 80, 145 90" />
        <path d="M155 90 C 155 80, 175 80, 175 90" />
    </svg>
);

export default SheikhZayedMosqueIcon;