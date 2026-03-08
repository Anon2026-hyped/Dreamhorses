'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { loginSchema, LoginFormData } from '../schemas/loginSchema'
import { useLogin } from '../hooks/useLogin'
import FormField from '../../../components/ui/FormField'
import Input from '../../../components/ui/Input'
import Checkbox from '../../../components/ui/Checkbox'
import Button from '../../../components/ui/Button'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: true },
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
  }

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}

      {/* Email field */}
      <FormField label="Email:" required htmlFor="email">
        <Input
          id="email"
          type="email"
          placeholder="Enter email"
          error={errors.email?.message}
          {...register('email')}
        />
      </FormField>

      {/* Password field */}
      <FormField label="Password:" required htmlFor="password">
        <div className="flex flex-col gap-2">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            error={errors.password?.message}
            {...register('password')}
          />
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="w-3 h-3"
            />
            <label htmlFor="showPassword" className="text-xs text-gray-600 whitespace-nowrap cursor-pointer">
              Show Password
            </label>
          </div>
        </div>
      </FormField>

      {/* Remember me */}
      <div className="flex justify-center">
        <Checkbox
          id="rememberMe"
          label="Remember me"
          defaultChecked
          {...register('rememberMe')}
        />
      </div>

      {/* Sign In button */}
      <div className="mt-2">
        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="text-base py-3"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </div>
    </div>
  )
}