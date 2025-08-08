import React from 'react';
import clsx from "clsx";

interface ButtonProps{
    variant: 'primary'| 'secondary';
    buttonSize: 'sm' | 'md' | 'lg';
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick: () => void;
}

export const Button = ({
    variant,
    buttonSize,
    text,
    startIcon,
    endIcon,
    onClick,
}: ButtonProps) => {

    const baseStyles = "inline-flex items-center  cursor-pointer justify-center font-medium transition-colors duration-200";
    const variantStyles = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        secondary: "bg-indigo-100 text-gray-800 hover:bg-indigo-200",
    }
    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm rounded-sm",
        md: "px-4 py-2 text-base rounded-md",
        lg: "px-5 py-3 text-lg rounded-lg",
    };

    return (
        <button type='button'
            onClick={onClick}
            className={clsx(
                baseStyles,
                variantStyles[variant],
                sizeStyles[buttonSize]
            )}
        >
            {startIcon && <span className='mr-2'>{startIcon}</span>}
            {text}
            {endIcon && <span className='ml-2'>{endIcon}</span>}
        </button>
    );
};