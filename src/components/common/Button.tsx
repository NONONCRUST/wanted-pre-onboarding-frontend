import React from 'react'
import { clsx } from '../../lib/utils'

const variantStyle = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-100 text-gray-500 border border-gray-200',
  error: 'bg-red-500 text-white',
}

const sizeStyle = {
  small: 'text-sm py-1 px-2',
  medium: 'text-base py-2 px-4',
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode
  variant?: 'primary' | 'secondary' | 'error'
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

const Button: React.FC<Props> = ({
  className,
  label,
  disabled,
  fullWidth,
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  return (
    <button
      className={clsx(
        'cursor-pointer rounded-md',
        variantStyle[variant],
        sizeStyle[size],
        disabled && 'opacity-30 cursor-default',
        fullWidth && 'flex-1',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  )
}

export default Button
