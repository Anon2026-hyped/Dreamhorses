import { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  required?: boolean
  children: ReactNode
  htmlFor?: string
}

export default function FormField({ label, required, children, htmlFor }: FormFieldProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-gray-700 sm:pt-2 sm:w-24 sm:text-right shrink-0"
      >
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  )
}