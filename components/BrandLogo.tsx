import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string;
  alt?: string;
}

const SIZE_MAP = {
  sm: "w-7 h-7",
  md: "w-8 h-8 sm:w-9 sm:h-9",
  lg: "w-11 h-11",
  xl: "w-16 h-16",
};

export default function BrandLogo({
  size = "md",
  className = "",
  alt = "Grade Calculator Logo",
}: BrandLogoProps) {
  const sizeClass = typeof size === "string" ? SIZE_MAP[size] : `w-[${size}px] h-[${size}px]`;

  return (
    <img
      src="/logo.svg"
      alt={alt}
      width={36}
      height={36}
      className={`rounded-xl shadow-xs shrink-0 object-contain transition-transform duration-200 group-hover:scale-105 ${sizeClass} ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}
