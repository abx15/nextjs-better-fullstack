"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, User, Phone, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { useLanguage } from '@/contexts/language-context'

const schema = z.object({
  name: z.string().min(2, 'auth.nameRequired'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'auth.phoneInvalid'),
  email: z.string().email('auth.emailInvalid').optional().or(z.literal('')),
  password: z.string()
    .min(8, 'auth.passwordMinLength')
    .regex(/\d/, 'auth.passwordNumberRequired'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(v => v, 'auth.termsRequired'),
}).refine(d => d.password === d.confirmPassword, {
  message: 'auth.passwordMismatch',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const password = watch('password')

  // Calculate password strength
  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return 'weak'
    
    let strength = 0
    if (pwd.length >= 8) strength++
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[^a-zA-Z\d]/.test(pwd)) strength++

    if (strength <= 2) return 'weak'
    if (strength <= 3) return 'medium'
    return 'strong'
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPasswordStrength(calculatePasswordStrength(newPassword))
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'strong': return 'bg-green-500'
    }
  }

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return t('auth.weak')
      case 'medium': return t('auth.medium')
      case 'strong': return t('auth.strong')
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(t(result.error) || t('auth.registerError'))
        return
      }

      // Auto login after successful registration
      const loginResult = await signIn('credentials', {
        email: data.email || data.phone, // Use phone if no email
        password: data.password,
        redirect: false,
      })

      if (loginResult?.error) {
        toast.success(t('auth.registerSuccess'))
        router.push('/login')
      } else {
        toast.success(t('auth.registerSuccess'))
        router.push('/dashboard/profile/setup')
      }
    } catch (error) {
      toast.error(t('auth.genericError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/profile/setup' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header - Hidden since we have navbar now */}
      
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        {/* Left Panel - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#1a3a6b] text-white p-12 flex-col justify-between">
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🏛️</div>
              <h1 className="text-4xl font-bold mb-2">SarkariSaathi</h1>
              <p className="text-xl opacity-90">सरकारी योजनाएं अब आसान</p>
            </div>
            
            <div className="space-y-6 max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg">1,000+ सरकारी योजनाएं</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg">AI से personalized matching</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg">बिल्कुल मुफ़्त — हमेशा</span>
              </div>
            </div>
          </div>
          
          {/* India flag colors decoration at bottom */}
          <div className="flex justify-center gap-2">
            <div className="w-16 h-2 bg-orange-500 rounded"></div>
            <div className="w-16 h-2 bg-white rounded"></div>
            <div className="w-16 h-2 bg-green-500 rounded"></div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 bg-white p-4 sm:p-6 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Language Toggle */}
            <div className="flex justify-end mb-4 lg:mb-6">
              <LanguageToggle size="sm" variant="outline" />
            </div>

            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{t('auth.registerTitle')}</h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">{t('auth.registerSubtitle')}</p>
            </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Google Sign In Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full h-11 sm:h-12 border-2 hover:bg-gray-50 flex items-center gap-3 text-sm sm:text-base"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google से Register करें
            </Button>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">या</span>
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm sm:text-base font-medium">{t('auth.name')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  id="name"
                  placeholder={t('auth.namePlaceholder')}
                  className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs sm:text-sm">{t(errors.name.message as string)}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm sm:text-base font-medium">{t('auth.phone')}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  id="phone"
                  placeholder={t('auth.phonePlaceholder')}
                  className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                  maxLength={10}
                  {...register('phone')}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs sm:text-sm">{t(errors.phone.message as string)}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base font-medium">{t('auth.emailOptional')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm">{t(errors.email.message as string)}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base font-medium">{t('auth.password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.passwordPlaceholder')}
                  className="pl-10 pr-10 h-11 sm:h-12 text-sm sm:text-base"
                  {...register('password', { onChange: handlePasswordChange })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%' }}
                      />
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${
                      passwordStrength === 'weak' ? 'text-red-500' : 
                      passwordStrength === 'medium' ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm">{t(errors.password.message as string)}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm sm:text-base font-medium">{t('auth.confirmPassword')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('auth.passwordPlaceholder')}
                  className="pl-10 pr-10 h-11 sm:h-12 text-sm sm:text-base"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm">{t(errors.confirmPassword.message as string)}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                {...register('terms')}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                {t('auth.termsAgreement')}
              </Label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{t(errors.terms.message as string)}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 sm:h-12 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-medium text-sm sm:text-base"
            >
              {isLoading ? t('auth.registering') : t('auth.registerButton')}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-4 lg:mt-6">
            <span className="text-gray-600 text-sm sm:text-base">{t('auth.haveAccount')} </span>
            <Button
              type="button"
              variant="link"
              className="text-[#FF6B00] hover:text-[#FF6B00]/80 p-0 font-medium text-sm sm:text-base"
              onClick={() => router.push('/login')}
            >
              {t('auth.loginButton')} →
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
