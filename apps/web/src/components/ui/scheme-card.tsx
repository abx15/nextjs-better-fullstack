import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './card'
import { Button } from './button'
import { Badge } from './badge'
import { Progress } from './progress'
import { Clock, Users, FileText, ExternalLink, Save, Eye } from 'lucide-react'

interface SchemeCardProps {
  scheme: {
    id: string
    slug: string
    nameHindi: string
    nameEnglish: string
    descriptionHindi: string
    category: string
    difficulty: string
    benefitAmount?: string
    benefitAmountHindi?: string
    maxBenefit?: number
    documentsRequired: any[]
    applicationMode: string
    applicationUrl?: string
    totalBeneficiaries?: number
  }
  eligibilityScore?: number
  showActions?: boolean
  language?: 'hi' | 'en'
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200'
}

const categoryIcons = {
  kisan: '🌾',
  shiksha: '🎓',
  mahila: '👩',
  swasth: '🏥',
  awas: '🏠',
  vyapar: '💼',
  vridh: '👴',
  divyang: '♿',
  finance: '💰',
  other: '📋'
}

const categoryLabels = {
  kisan: { hi: 'किसान', en: 'Farmers' },
  shiksha: { hi: 'शिक्षा', en: 'Education' },
  mahila: { hi: 'महिला', en: 'Women' },
  swasth: { hi: 'स्वास्थ्य', en: 'Health' },
  awas: { hi: 'आवास', en: 'Housing' },
  vyapar: { hi: 'व्यापार', en: 'Business' },
  vridh: { hi: 'वृद्ध', en: 'Senior' },
  divyang: { hi: 'दिव्यांग', en: 'Disabled' },
  finance: { hi: 'वित्त', en: 'Finance' },
  other: { hi: 'अन्य', en: 'Other' }
}

export function SchemeCard({ 
  scheme, 
  eligibilityScore, 
  showActions = true, 
  language = 'hi' 
}: SchemeCardProps) {
  const documents = Array.isArray(scheme.documentsRequired) 
    ? scheme.documentsRequired 
    : JSON.parse(scheme.documentsRequired || '[]')
  
  const totalDocs = documents.length
  const categoryIcon = categoryIcons[scheme.category as keyof typeof categoryIcons] || categoryIcons.other
  const categoryLabel = categoryLabels[scheme.category as keyof typeof categoryLabels]?.[language] || categoryLabels.other[language]
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{categoryIcon}</span>
            <Badge variant="outline" className="text-xs">
              {categoryLabel}
            </Badge>
          </div>
          <Badge className={`text-xs ${difficultyColors[scheme.difficulty as keyof typeof difficultyColors]}`}>
            {scheme.difficulty === 'easy' ? (language === 'hi' ? 'आसान' : 'Easy') :
             scheme.difficulty === 'medium' ? (language === 'hi' ? 'मध्यम' : 'Medium') :
             (language === 'hi' ? 'कठिन' : 'Hard')}
          </Badge>
        </div>
        
        <div>
          <h3 className="font-bold text-lg text-primary line-clamp-2">
            {language === 'hi' ? scheme.nameHindi : scheme.nameEnglish}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {language === 'hi' ? scheme.descriptionHindi : scheme.descriptionHindi}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Benefit Amount */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {language === 'hi' ? 'लाभ' : 'Benefit'}
            </span>
            <span className="font-bold text-primary text-lg">
              {language === 'hi' ? scheme.benefitAmountHindi : scheme.benefitAmount}
            </span>
          </div>
        </div>
        
        {/* Eligibility Score */}
        {eligibilityScore !== undefined && (
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">
                {language === 'hi' ? 'पात्रता मैच' : 'Eligibility Match'}
              </span>
              <span className="text-primary font-bold">{eligibilityScore}%</span>
            </div>
            <Progress 
              value={eligibilityScore} 
              className="h-2"
            />
          </div>
        )}
        
        {/* Documents Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {language === 'hi' ? 'दस्तावेज़' : 'Documents'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-600 font-medium">
              {Math.floor(totalDocs * 0.7)} ✅
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="text-red-600 font-medium">
              {Math.ceil(totalDocs * 0.3)} ❌
            </span>
            <span className="text-muted-foreground text-xs ml-1">
              {language === 'hi' ? 'चाहिए' : 'needed'}
            </span>
          </div>
        </div>
        
        {/* Beneficiaries */}
        {scheme.totalBeneficiaries && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>
              {scheme.totalBeneficiaries.toLocaleString('hi-IN')}+ {language === 'hi' ? 'लाभार्थी' : 'beneficiaries'}
            </span>
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-3 gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Save className="w-4 h-4 mr-1" />
            {language === 'hi' ? 'सेव' : 'Save'}
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            {language === 'hi' ? 'विवरण' : 'Details'}
          </Button>
          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
            <ExternalLink className="w-4 h-4 mr-1" />
            {language === 'hi' ? 'आवेदन' : 'Apply'}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
