import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
    onClick?: () => void;
    isActive?: boolean;
    isDimmed?: boolean;
}

const GradientText = ({
    children,
    className,
    colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
    animationSpeed = 8,
    showBorder = false,
    onClick,
    isActive = false,
    isDimmed = false,
}: GradientTextProps) => {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <span
            onClick={onClick}
            className={cn(
                "relative inline-block overflow-hidden transition-all duration-500",
                isDimmed ? "opacity-30 hover:opacity-100" : "opacity-100",
                className
            )}
        >
            <span
                className="group relative z-10 block cursor-pointer backdrop-blur-xl"
            >
                {isActive ? (
                    <span className="block text-[hsl(45,48%,91%)]">
                        {children}
                    </span>
                ) : (
                    <>
                        <span
                            className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r bg-[length:300%_100%] bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={gradientStyle}
                        >
                            {children}
                        </span>
                        <span className="block opacity-100 transition-opacity duration-500 group-hover:opacity-0">
                            {children}
                        </span>
                    </>
                )}
            </span>
        </span>
    );
};

export default GradientText;
