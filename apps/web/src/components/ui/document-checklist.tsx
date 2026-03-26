import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Badge } from './badge'
import { Progress } from './progress'
import { FileText, Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface DocumentChecklistProps {
  documents: Array<{
    name: string
    nameEnglish: string
    required: boolean
  }>
  userHasDocuments?: string[]
  language?: 'hi' | 'en'
}

export function DocumentChecklist({ 
  documents, 
  userHasDocuments = [], 
  language = 'hi' 
}: DocumentChecklistProps) {
  const totalDocs = documents.length
  const requiredDocs = documents.filter(doc => doc.required).length
  const userDocsCount = userHasDocuments.length
  const progressPercentage = totalDocs > 0 ? (userDocsCount / totalDocs) * 100 : 0
  
  const getDocumentStatus = (docName: string) => {
    const hasDocument = userHasDocuments.some(userDoc => 
      userDoc.toLowerCase().includes(docName.toLowerCase()) ||
      docName.toLowerCase().includes(userDoc.toLowerCase())
    )
    return hasDocument
  }
  
  const getDocumentInfo = (docName: string) => {
    const docInfo: Record<string, { time: string; cost: string; where: string }> = {
      'आधार कार्ड': {
        time: language === 'hi' ? '15 मिनट' : '15 minutes',
        cost: language === 'hi' ? 'मुफ़्त' : 'Free',
        where: language === 'hi' ? 'आधार केंद्र' : 'Aadhar Center'
      },
      'बैंक खाता': {
        time: language === 'hi' ? '30 मिनट' : '30 minutes',
        cost: language === 'hi' ? 'मुफ़्त' : 'Free',
        where: language === 'hi' ? 'किसी भी बैंक शाखा' : 'Any bank branch'
      },
      'भूमि रिकॉर्ड': {
        time: language === 'hi' ? '2-3 दिन' : '2-3 days',
        cost: language === 'hi' ? '₹50-100' : '₹50-100',
        where: language === 'hi' ? 'पटवारी कार्यालय' : 'Patwari office'
      },
      'जन्म प्रमाण पत्र': {
        time: language === 'hi' ? '7 दिन' : '7 days',
        cost: language === 'hi' ? '₹20' : '₹20',
        where: language === 'hi' ? 'नगर निकाय कार्यालय' : 'Municipal office'
      },
      'राशन कार्ड': {
        time: language === 'hi' ? '15 दिन' : '15 days',
        cost: language === 'hi' ? 'मुफ़्त' : 'Free',
        where: language === 'hi' ? 'खाद्य विभाग कार्यालय' : 'Food department office'
      }
    }
    
    return docInfo[docName] || {
      time: language === 'hi' ? '1-3 दिन' : '1-3 days',
      cost: language === 'hi' ? '₹50-200' : '₹50-200',
      where: language === 'hi' ? 'संबंधित विभाग' : 'Concerned department'
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <span>{language === 'hi' ? 'दस्तावेज़ चेकलिस्ट' : 'Document Checklist'}</span>
        </CardTitle>
        
        {/* Progress Overview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {language === 'hi' ? 'तैयारी' : 'Progress'}
            </span>
            <span className="text-primary font-bold">
              {userDocsCount}/{totalDocs} {language === 'hi' ? 'दस्तावेज़ तैयार' : 'documents ready'}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{language === 'hi' ? 'है ✅' : 'Have ✅'}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>{language === 'hi' ? 'चाहिए ❌' : 'Need ❌'}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>{language === 'hi' ? `आवश्यक ${requiredDocs}` : `Required ${requiredDocs}`}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {documents.map((doc, index) => {
          const hasDocument = getDocumentStatus(doc.name)
          const docInfo = getDocumentInfo(doc.name)
          const isRequired = doc.required
          
          return (
            <div key={doc.name || index} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {hasDocument ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : isRequired ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                  
                  <div>
                    <h4 className="font-medium text-sm">
                      {language === 'hi' ? doc.name : doc.nameEnglish}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={isRequired ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {isRequired ? (language === 'hi' ? 'आवश्यक' : 'Required') : (language === 'hi' ? 'वैकल्पिक' : 'Optional')}
                      </Badge>
                      {hasDocument && (
                        <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                          {language === 'hi' ? 'उपलब्ध' : 'Available'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {!hasDocument && (
                <div className="bg-muted/50 rounded p-2 space-y-1">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{docInfo.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{docInfo.cost}</span>
                    </div>
                    <div className="text-muted-foreground text-right">
                      {docInfo.where}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        
        {userDocsCount < requiredDocs && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'hi' 
                  ? `${requiredDocs - userDocsCount} और दस्तावेज़ चाहिए` 
                  : `${requiredDocs - userDocsCount} more documents needed`
                }
              </span>
            </div>
          </div>
        )}
        
        {userDocsCount >= requiredDocs && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'hi' 
                  ? 'सभी आवश्यक दस्तावेज़ तैयार हैं!' 
                  : 'All required documents are ready!'
                }
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
