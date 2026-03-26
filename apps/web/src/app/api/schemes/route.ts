import { NextRequest, NextResponse } from 'next/server'

// Mock schemes data
const mockSchemes = [
  {
    id: 'pm-kisan',
    nameHindi: 'पीएम किसान सम्मान निधि',
    nameEnglish: 'PM Kisan Samman Nidhi',
    category: 'agriculture',
    level: 'central',
    ministry: 'Ministry of Agriculture',
    benefitAmount: '₹6,000/साल',
    difficulty: 'easy',
    description: 'Income support for small farmers'
  },
  {
    id: 'ayushman',
    nameHindi: 'आयुष्मान भारत',
    nameEnglish: 'Ayushman Bharat',
    category: 'health',
    level: 'central',
    ministry: 'Ministry of Health',
    benefitAmount: '₹5 लाख कवरेज',
    difficulty: 'medium',
    description: 'Health insurance for poor families'
  },
  {
    id: 'scholarship',
    nameHindi: 'राष्ट्रीय छात्रवृत्ति',
    nameEnglish: 'National Scholarship',
    category: 'education',
    level: 'central',
    ministry: 'Ministry of Education',
    benefitAmount: '₹12,000/साल',
    difficulty: 'medium',
    description: 'Scholarships for meritorious students'
  },
  {
    id: 'pm-awas',
    nameHindi: 'पीएम आवास योजना',
    nameEnglish: 'PM Awas Yojana',
    category: 'housing',
    level: 'central',
    ministry: 'Ministry of Housing',
    benefitAmount: '₹2.67 लाख सब्सिडी',
    difficulty: 'hard',
    description: 'Housing for all scheme'
  },
  {
    id: 'uday',
    nameHindi: 'उज्ज्वला योजना',
    nameEnglish: 'UJALA Scheme',
    category: 'energy',
    level: 'central',
    ministry: 'Ministry of Power',
    benefitAmount: 'LED bulbs at ₹10',
    difficulty: 'easy',
    description: 'LED bulb distribution scheme'
  }
]

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    
    // Get query parameters
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    let filteredSchemes = [...mockSchemes]
    
    // Apply filters
    if (category) {
      filteredSchemes = filteredSchemes.filter(scheme => 
        scheme.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    if (level) {
      filteredSchemes = filteredSchemes.filter(scheme => 
        scheme.level.toLowerCase() === level.toLowerCase()
      )
    }
    
    // Apply pagination
    const total = filteredSchemes.length
    const paginatedSchemes = filteredSchemes.slice(offset, offset + limit)
    
    return NextResponse.json({
      schemes: paginatedSchemes,
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Schemes API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schemes' },
      { status: 500 }
    )
  }
}
