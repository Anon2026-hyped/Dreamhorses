import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'font-semibold py-2 px-6 rounded transition-colors cursor-pointer text-sm'

  const variants = {
    primary: 'bg-dh-green hover:bg-dh-green-hover text-white py-3',
    outline: 'border border-gray-300 text-dh-link hover:bg-gray-50 bg-white',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}