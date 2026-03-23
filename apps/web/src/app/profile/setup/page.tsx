"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'zod'
import { gsap } from 'gsap'
import { 
  MapPin, 
  Calendar, 
  User, 
  DollarSign, 
  Briefcase, 
  Users,
  ChevronLeft,
  ChevronRight,
  Check,
  Edit
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Step 1 Schema
const step1Schema = z.object({
  state: z.string().min(1, 'राज्य चुनना ज़रूरी है'),
  district: z.string().min(1, 'ज़िला डालें'),
  pincode: z.string().regex(/^\d{6}$/, 'सही 6 अंक का पिनकोड डालें').optional().or(z.literal('')),
  age: z.number().min(1, 'सही उम्र डालें').max(120, 'सही उम्र डालें'),
  gender: z.string().min(1, 'लिंग चुनें'),
})

// Step 2 Schema
const step2Schema = z.object({
  annualIncome: z.number().min(0, 'आमदनी डालें'),
  bplCard: z.boolean(),
  rationCardType: z.string().optional(),
  caste: z.string().min(1, 'जाति वर्ग चुनें'),
  religion: z.string().optional(),
})

// Step 3 Schema
const step3Schema = z.object({
  occupation: z.string().min(1, 'पेशा चुनें'),
  landHolding: z.number().optional(),
  educationLevel: z.string().optional(),
  isDisabled: z.boolean(),
  disabilityPercent: z.number().optional(),
  isWidow: z.boolean(),
  isSeniorCitizen: z.boolean(),
  isMinority: z.boolean(),
})

type Step1Data = z.infer<typeof step1Schema>
type Step2Data = z.infer<typeof step2Schema>
type Step3Data = z.infer<typeof step3Schema>

const states = [
  'आंध्र प्रदेश', 'असम', 'बिहार', 'छत्तीसगढ़', 'दिल्ली', 'गोवा', 'गुजरात',
  'हरियाणा', 'हिमाचल प्रदेश', 'जम्मू-कश्मीर', 'झारखंड', 'कर्नाटक', 'केरल',
  'मध्य प्रदेश', 'महाराष्ट्र', 'मणिपुर', 'मेघालय', 'मिजोरम', 'नागालैंड',
  'ओडिशा', 'पंजाब', 'राजस्थान', 'सिक्किम', 'तमिलनाडु', 'तेलंगाना',
  'त्रिपुरा', 'उत्तर प्रदेश', 'उत्तराखंड', 'पश्चिम बंगाल'
]

const occupations = [
  { value: 'farmer', label: 'किसान', icon: '🌾' },
  { value: 'student', label: 'छात्र/छात्रा', icon: '🎓' },
  { value: 'business', label: 'व्यापारी', icon: '🏪' },
  { value: 'salaried', label: 'नौकरी', icon: '💼' },
  { value: 'homemaker', label: 'गृहिणी', icon: '🏠' },
  { value: 'other', label: 'अन्य', icon: '🔧' }
]

export default function ProfileSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    step1: {} as Step1Data,
    step2: {} as Step2Data,
    step3: {} as Step3Data,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedStep1 = localStorage.getItem('profile-step-1')
    const savedStep2 = localStorage.getItem('profile-step-2')
    const savedStep3 = localStorage.getItem('profile-step-3')
    
    if (savedStep1) {
      setFormData(prev => ({ ...prev, step1: JSON.parse(savedStep1) }))
    }
    if (savedStep2) {
      setFormData(prev => ({ ...prev, step2: JSON.parse(savedStep2) }))
    }
    if (savedStep3) {
      setFormData(prev => ({ ...prev, step3: JSON.parse(savedStep3) }))
    }
  }, [])

  // Animate step transitions
  useEffect(() => {
    gsap.fromTo('.step-content',
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
    )
  }, [currentStep])

  const saveStep = (step: number, data: any) => {
    localStorage.setItem(`profile-step-${step}`, JSON.stringify(data))
    setFormData(prev => ({ ...prev, [`step${step}`]: data }))
  }

  const getFinalData = () => ({
    ...formData.step1,
    ...formData.step2,
    ...formData.step3,
  })

  const handleNext = async (stepData: any) => {
    saveStep(currentStep, stepData)
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleEdit = (step: number) => {
    setCurrentStep(step)
  }

  const handleSubmitProfile = async () => {
    setIsSubmitting(true)
    try {
      const finalData = getFinalData()
      
      // Auto-detect senior citizen
      if (finalData.age >= 60) {
        finalData.isSeniorCitizen = true
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })

      if (!response.ok) throw new Error('Failed to save profile')

      // Clear localStorage after successful save
      localStorage.removeItem('profile-step-1')
      localStorage.removeItem('profile-step-2')
      localStorage.removeItem('profile-step-3')

      toast.success('🎉 प्रोफाइल पूरी हो गई! अब आपकी योजनाएं खोजते हैं...')
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (error) {
      toast.error('प्रोफाइल सेव करने में गलती हुई')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
              ${currentStep === step ? 'bg-[#FF6B00] text-white' : 
                step < currentStep ? 'bg-[#1a3a6b] text-white' : 'bg-gray-300 text-gray-600'}
            `}>
              {step < currentStep ? <Check className="w-5 h-5" /> : step}
            </div>
            {step < 4 && (
              <div className={`flex-1 h-1 mx-2 transition-all ${
                step < currentStep ? 'bg-[#1a3a6b]' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>स्थान</span>
        <span>आय</span>
        <span>पेशा</span>
        <span>समीक्षा</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div 
          className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
          style={{ width: `${currentStep * 25}%` }}
        />
      </div>
    </div>
  )

  const renderStep1 = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Step1Data>({
      defaultValues: formData.step1,
      resolver: zodResolver(step1Schema),
    })

    return (
      <div className="step-content space-y-6">
        <h2 className="text-2xl font-bold text-[#1a3a6b] mb-6">स्थान और बुनियादी जानकारी</h2>
        
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">राज्य (State)*</Label>
            <Select onValueChange={(value) => setValue('state', value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="राज्य चुनें" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>

          <div>
            <Label className="text-base font-medium">ज़िला (District)*</Label>
            <Input
              placeholder="ज़िला का नाम डालें"
              className="h-12"
              {...register('district')}
            />
            {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
          </div>

          <div>
            <Label className="text-base font-medium">पिनकोड (Pincode)</Label>
            <Input
              placeholder="6 अंक का पिनकोड"
              className="h-12"
              maxLength={6}
              {...register('pincode')}
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
          </div>

          <div>
            <Label className="text-base font-medium">आपकी उम्र (Age)*</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="number"
                placeholder="उम्र डालें"
                className="pl-10 h-12"
                min="1"
                max="120"
                {...register('age', { valueAsNumber: true })}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              उम्र डालने पर वरिष्ठ नागरिक योजनाएं auto-detect होंगी
            </p>
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>

          <div>
            <Label className="text-base font-medium">लिंग (Gender)*</Label>
            <RadioGroup
              onValueChange={(value) => setValue('gender', value)}
              className="flex flex-col gap-3"
            >
              {[
                { value: 'male', label: 'पुरुष (Male)', icon: '👨' },
                { value: 'female', label: 'महिला (Female)', icon: '👩' },
                { value: 'other', label: 'अन्य (Other)', icon: '🧑' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <span className="text-2xl">{option.icon}</span>
                  <Label htmlFor={option.value} className="text-base cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>
        </div>
      </div>
    )
  }

  const renderStep2 = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Step2Data>({
      defaultValues: formData.step2,
      resolver: zodResolver(step2Schema),
    })

    const annualIncome = watch('annualIncome') || 0
    const bplCard = watch('bplCard') || false

    const getIncomeCategory = (income: number) => {
      if (income < 100000) return 'बीपीएल / बहुत गरीब'
      if (income < 250000) return 'आर्थिक रूप से कमज़ोर'
      if (income < 500000) return 'निम्न मध्यम वर्ग'
      return 'मध्यम/उच्च वर्ग'
    }

    return (
      <div className="step-content space-y-6">
        <h2 className="text-2xl font-bold text-[#1a3a6b] mb-6">आर्थिक जानकारी</h2>
        
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">सालाना आमदनी (Annual Income)*</Label>
            <div className="space-y-4">
              <Slider
                value={[annualIncome]}
                onValueChange={(value) => setValue('annualIncome', value[0])}
                max={1000000}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0</span>
                <span>₹50K</span>
                <span>₹1L</span>
                <span>₹2.5L</span>
                <span>₹5L</span>
                <span>₹10L+</span>
              </div>
              <div className="flex items-center gap-4">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <Input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setValue('annualIncome', parseInt(e.target.value) || 0)}
                  className="h-12"
                />
              </div>
              <p className="text-lg font-medium text-[#1a3a6b]">
                वर्ग: {getIncomeCategory(annualIncome)}
              </p>
            </div>
            {errors.annualIncome && <p className="text-red-500 text-sm">{errors.annualIncome.message}</p>}
          </div>

          <div>
            <Label className="text-base font-medium">BPL कार्ड है? (BPL Card)*</Label>
            <RadioGroup
              onValueChange={(value) => setValue('bplCard', value === 'true')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="true" id="bpl-yes" />
                <span className="text-green-600">✅</span>
                <Label htmlFor="bpl-yes" className="text-base cursor-pointer">हाँ</Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="false" id="bpl-no" />
                <span className="text-red-600">❌</span>
                <Label htmlFor="bpl-no" className="text-base cursor-pointer">नहीं</Label>
              </div>
            </RadioGroup>
            {errors.bplCard && <p className="text-red-500 text-sm">{errors.bplCard.message}</p>}
          </div>

          <div>
            <Label className="text-base font-medium">राशन कार्ड प्रकार (Ration Card Type)</Label>
            <Select onValueChange={(value) => setValue('rationCardType', value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="राशन कार्ड चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AAY">AAY/अंत्योदय</SelectItem>
                <SelectItem value="BPL">BPL/गरीबी रेखा</SelectItem>
                <SelectItem value="APL">APL/साधारण</SelectItem>
                <SelectItem value="none">नहीं है</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-medium">जाति वर्ग (Caste Category)*</Label>
            <RadioGroup
              onValueChange={(value) => setValue('caste', value)}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { value: 'general', label: 'सामान्य (General)' },
                { value: 'obc', label: 'अन्य पिछड़ा वर्ग (OBC)' },
                { value: 'sc', label: 'अनुसूचित जाति (SC)' },
                { value: 'st', label: 'अनुसूचित जनजाति (ST)' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-sm cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors.caste && <p className="text-red-500 text-sm">{errors.caste.message}</p>}
          </div>

          <div>
            <Label className="text-base font-medium">धर्म (Religion)</Label>
            <Select onValueChange={(value) => setValue('religion', value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="धर्म चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hindu">हिंदू</SelectItem>
                <SelectItem value="muslim">मुस्लिम</SelectItem>
                <SelectItem value="christian">ईसाई</SelectItem>
                <SelectItem value="sikh">सिख</SelectItem>
                <SelectItem value="buddhist">बौद्ध</SelectItem>
                <SelectItem value="jain">जैन</SelectItem>
                <SelectItem value="other">अन्य</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    )
  }

  const renderStep3 = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Step3Data>({
      defaultValues: formData.step3,
      resolver: zodResolver(step3Schema),
    })

    const occupation = watch('occupation')
    const isDisabled = watch('isDisabled')

    return (
      <div className="step-content space-y-6">
        <h2 className="text-2xl font-bold text-[#1a3a6b] mb-6">पेशा और विशेष वर्ग</h2>
        
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">आपका पेशा (Occupation)*</Label>
            <div className="grid grid-cols-2 gap-3">
              {occupations.map((occ) => (
                <div
                  key={occ.value}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 text-center"
                  onClick={() => setValue('occupation', occ.value)}
                >
                  <div className="text-3xl mb-2">{occ.icon}</div>
                  <div className="text-sm font-medium">{occ.label}</div>
                </div>
              ))}
            </div>
            {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation.message}</p>}
          </div>

          {occupation === 'farmer' && (
            <div>
              <Label className="text-base font-medium">ज़मीन कितनी है? (Land Holding)</Label>
              <Input
                type="number"
                placeholder="एकड़ में ज़मीन की मात्रा"
                className="h-12"
                {...register('landHolding', { valueAsNumber: true })}
              />
            </div>
          )}

          {occupation === 'student' && (
            <div>
              <Label className="text-base font-medium">कौन सी कक्षा/कोर्स? (Education Level)</Label>
              <Select onValueChange={(value) => setValue('educationLevel', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="शिक्षा स्तर चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-8">1-8</SelectItem>
                  <SelectItem value="9-10">9-10</SelectItem>
                  <SelectItem value="11-12">11-12</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="post-graduate">Post Graduate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label className="text-base font-medium">विशेष वर्ग (Special Categories)</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Checkbox
                  id="disabled"
                  onCheckedChange={(checked) => setValue('isDisabled', checked as boolean)}
                />
                <span className="text-2xl">♿</span>
                <Label htmlFor="disabled" className="text-base cursor-pointer">दिव्यांग (Disabled)</Label>
              </div>
              
              {isDisabled && (
                <div className="ml-8">
                  <Label className="text-sm">दिव्यांगता प्रतिशत</Label>
                  <Input
                    type="number"
                    placeholder="प्रतिशत डालें"
                    className="h-10"
                    {...register('disabilityPercent', { valueAsNumber: true })}
                  />
                </div>
              )}

              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Checkbox
                  id="widow"
                  onCheckedChange={(checked) => setValue('isWidow', checked as boolean)}
                />
                <span className="text-2xl">👩‍⚕️</span>
                <Label htmlFor="widow" className="text-base cursor-pointer">विधवा (Widow)</Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Checkbox
                  id="senior"
                  onCheckedChange={(checked) => setValue('isSeniorCitizen', checked as boolean)}
                />
                <span className="text-2xl">👴</span>
                <div>
                  <Label htmlFor="senior" className="text-base cursor-pointer">वरिष्ठ नागरिक 60+ (Senior Citizen)</Label>
                  <p className="text-sm text-gray-500">Note: Auto-detected from age, but can manual override</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Checkbox
                  id="minority"
                  onCheckedChange={(checked) => setValue('isMinority', checked as boolean)}
                />
                <span className="text-2xl">🕌</span>
                <Label htmlFor="minority" className="text-base cursor-pointer">अल्पसंख्यक (Minority)</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderStep4 = () => {
    const finalData = getFinalData()

    return (
      <div className="step-content space-y-6">
        <h2 className="text-2xl font-bold text-[#1a3a6b] mb-6">समीक्षा करें</h2>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                स्थान और बुनियादी जानकारी
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(1)}>
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                राज्य: {finalData.state} | ज़िला: {finalData.district}
                {finalData.pincode && ` | पिनकोड: ${finalData.pincode}`}
              </p>
              <p className="text-gray-700">
                उम्र: {finalData.age} साल | लिंग: {finalData.gender === 'male' ? 'पुरुष' : finalData.gender === 'female' ? 'महिला' : 'अन्य'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                आर्थिक जानकारी
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(2)}>
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                सालाना आमदनी: ₹{finalData.annualIncome?.toLocaleString('hi-IN')}
              </p>
              <p className="text-gray-700">
                BPL कार्ड: {finalData.bplCard ? 'हाँ' : 'नहीं'} | जाति: {finalData.caste}
              </p>
              {finalData.rationCardType && (
                <p className="text-gray-700">राशन कार्ड: {finalData.rationCardType}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                पेशा और विशेष वर्ग
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(3)}>
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                पेशा: {occupations.find(o => o.value === finalData.occupation)?.label}
              </p>
              {finalData.landHolding && (
                <p className="text-gray-700">ज़मीन: {finalData.landHolding} एकड़</p>
              )}
              {finalData.educationLevel && (
                <p className="text-gray-700">शिक्षा: {finalData.educationLevel}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {finalData.isDisabled && <span className="px-2 py-1 bg-blue-100 rounded text-sm">दिव्यांग</span>}
                {finalData.isWidow && <span className="px-2 py-1 bg-blue-100 rounded text-sm">विधवा</span>}
                {finalData.isSeniorCitizen && <span className="px-2 py-1 bg-blue-100 rounded text-sm">वरिष्ठ नागरिक</span>}
                {finalData.isMinority && <span className="px-2 py-1 bg-blue-100 rounded text-sm">अल्पसंख्यक</span>}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSubmitProfile}
            disabled={isSubmitting}
            className="w-full h-12 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-medium text-base"
          >
            {isSubmitting ? 'सेव हो रहा है...' : '✅ यह सब सही है — प्रोफाइल Save करें'}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            आपकी जानकारी सुरक्षित है और सिर्फ योजना matching के लिए use होगी
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {renderStepIndicator()}
        
        <Card className="p-8">
          <form onSubmit={handleSubmit(handleNext)}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            
            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  पिछला
                </Button>
                
                <Button
                  type="submit"
                  className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white flex items-center gap-2"
                >
                  अगला
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  )
}
