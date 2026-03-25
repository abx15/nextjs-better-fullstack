# 🤝 Contributing to SarkariSaathi

Thank you for your interest in contributing to SarkariSaathi! This guide will help you get started with contributing to our open-source project.

## 🌟 Why Contribute?

SarkariSaathi is a mission-driven project aimed at making government schemes accessible to every Indian citizen. By contributing, you're helping:

- 🏛️ Bridge the gap between citizens and government welfare schemes
- 🌍 Promote digital inclusion and accessibility
- 💡 Empower millions of Indians with AI-powered scheme discovery
- 📱 Create technology that serves the public good

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **Git** for version control
- **pnpm** package manager (recommended)
- Basic knowledge of **React**, **Next.js**, and **TypeScript**
- Passion for public service and social impact

### Quick Setup

1. **Fork the Repository**
   ```bash
   # Fork on GitHub and clone your fork
   git clone https://github.com/yourusername/sarkari-saathi.git
   cd sarkari-saathi
   ```

2. **Install Dependencies**
   ```bash
   # Install pnpm if not already installed
   npm install -g pnpm@10.26.1
   
   # Install project dependencies
   pnpm install
   ```

3. **Setup Environment**
   ```bash
   # Copy environment template
   cp apps/web/.env.example apps/web/.env.local
   
   # Configure your environment variables
   # (See README.md for detailed setup)
   ```

4. **Start Development**
   ```bash
   # Start the development server
   pnpm run dev
   ```

## 📋 Types of Contributions

We welcome contributions in many forms:

### 💻 Code Contributions

#### Bug Fixes
- Search existing issues before creating new ones
- Use clear, descriptive issue titles
- Include steps to reproduce, expected vs actual behavior
- Add tests if applicable

#### New Features
- Open an issue for discussion before implementation
- Follow the existing code style and patterns
- Include comprehensive tests
- Update documentation

#### Performance Improvements
- Profile and benchmark your changes
- Explain the performance impact
- Include before/after metrics

### 📖 Documentation

- **User Documentation**: Improve user guides, tutorials, and API docs
- **Developer Documentation**: Enhance code comments, README files
- **Translation**: Help translate content to Hindi and other Indian languages
- **Examples**: Create code examples and use cases

### 🎨 Design & UX

- **UI/UX Improvements**: Enhance user experience and interface
- **Accessibility**: Improve accessibility for all users
- **Mobile Optimization**: Better mobile experience
- **Visual Design**: Improve visual design and branding

### 🌍 Localization

- **Hindi Translation**: Ensure proper Hindi translations
- **Regional Languages**: Add support for more Indian languages
- **Cultural Context**: Ensure cultural appropriateness

### 🐛 Testing

- **Unit Tests**: Write tests for components and utilities
- **Integration Tests**: Test API endpoints and workflows
- **E2E Tests**: Test complete user journeys
- **Language Testing**: Verify both Hindi and English functionality

## 🛠️ Development Workflow

### 1. Create an Issue
- Check if the issue already exists
- Use appropriate labels and templates
- Provide detailed description and context

### 2. Create a Branch
```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Or for bug fixes
git checkout -b fix/issue-description

# Or for documentation
git checkout -b docs/update-guide
```

### 3. Make Changes
- Follow the existing code style
- Write clear, descriptive commit messages
- Add tests for new functionality
- Update documentation

### 4. Test Your Changes
```bash
# Run linting and formatting
pnpm run check

# Run type checking
pnpm run check-types

# Run tests
pnpm test

# Build the application
pnpm run build
```

### 5. Submit Pull Request
- Update your branch with latest changes
- Create a descriptive PR title
- Fill out the PR template completely
- Request appropriate reviewers

## 📝 Coding Standards

### Code Style

We use the following tools to maintain code quality:

- **Biome**: For linting and formatting
- **TypeScript**: For type safety
- **ESLint**: For additional linting rules
- **Prettier**: For consistent formatting

### Component Guidelines

#### File Structure
```
src/components/
├── ui/              # shadcn/ui components
├── sarkari/         # Custom SarkariSaathi components
│   ├── auth/        # Authentication components
│   ├── dashboard/   # Dashboard components
│   └── common/      # Shared components
└── layout/          # Layout components
```

#### Component Structure
```typescript
// Component structure example
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/language-context'

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  const { t, language } = useLanguage()
  const [state, setState] = useState(initialState)

  useEffect(() => {
    // Side effects
  }, [dependencies])

  return (
    <div className="component-styles">
      {/* JSX content */}
    </div>
  )
}

export type ComponentProps = {
  prop1: string
  prop2?: number
}
```

### Language Support

#### Translation Guidelines
- Always provide both Hindi and English translations
- Use the `useLanguage` hook for translations
- Follow the translation structure in `src/lib/i18n.ts`
- Test both languages thoroughly

#### Example Usage
```typescript
import { useLanguage } from '@/contexts/language-context'

function MyComponent() {
  const { t, language } = useLanguage()
  
  return (
    <button>
      {t('buttonText')}
    </button>
  )
}
```

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

#### Examples:
```
feat(dashboard): add scheme filtering functionality

fix(auth): resolve Google OAuth redirect issue

docs(readme): update installation instructions

test(components): add unit tests for dashboard components
```

## 🧪 Testing Guidelines

### Unit Tests
- Test individual components and functions
- Mock external dependencies
- Test both success and error cases
- Aim for high code coverage

### Integration Tests
- Test API endpoints
- Test database operations
- Test authentication flows
- Test language switching

### E2E Tests
- Test complete user workflows
- Test both languages
- Test mobile and desktop views
- Test accessibility features

### Testing Commands
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e
```

## 🌍 Bilingual Development

### Hindi Development
- Use proper Devanagari script (Unicode)
- Ensure cultural appropriateness
- Test Hindi rendering on different devices
- Consider Hindi typography and readability

### English Development
- Use clear, professional English
- Follow international standards
- Ensure proper grammar and spelling
- Consider accessibility for non-native speakers

### Language Testing
Always test both languages:
```typescript
// Test language switching
const { language, setLanguage, t } = useLanguage()

// Test both languages
setLanguage('hi') // Test Hindi
setLanguage('en') // Test English
```

## 📱 Responsive Design

### Mobile-First Approach
- Design for mobile first, then scale up
- Test on various screen sizes
- Use responsive breakpoints appropriately
- Consider touch interactions

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security Guidelines

### Data Protection
- Never commit sensitive information
- Use environment variables for secrets
- Follow secure coding practices
- Validate all user inputs

### Authentication
- Use secure authentication methods
- Implement proper session management
- Follow OAuth best practices
- Test security vulnerabilities

## 🚀 Deployment

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] Code is properly formatted
- [ ] Documentation is updated
- [ ] Environment variables are set
- [ ] Build is successful
- [ ] Both languages work correctly

### Deployment Process
1. Create a release PR
2. Get code review approval
3. Merge to main branch
4. Automated deployment triggers
5. Verify deployment success

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and discussions
- **Discord**: For real-time chat (link in README)
- **Email**: conduct@sarkarisaathi.in

### Resources
- [Project Documentation](https://sarkari-saathi.vercel.app/docs)
- [API Reference](https://sarkari-saathi.vercel.app/api-docs)
- [Design System](https://sarkari-saathi.vercel.app/design)
- [Video Tutorials](https://youtube.com/sarkari-saathi)

## 🏆 Recognition

### Contributors Hall of Fame
- All contributors are listed in our README
- Top contributors get special recognition
- Contributors get access to exclusive features
- Annual contributor awards and recognition

### How to Get Recognized
- Make meaningful contributions
- Help other contributors
- Participate in community discussions
- Share the project with others

## 📋 Review Process

### Pull Request Review
- All PRs require at least one review
- Automated checks must pass
- Code quality standards must be met
- Documentation must be updated

### Review Criteria
- Code quality and style
- Functionality and correctness
- Performance implications
- Security considerations
- Documentation completeness
- Bilingual support

## 🎉 Thank You!

Thank you for considering contributing to SarkariSaathi! Your contributions help make government schemes accessible to millions of Indians and create a positive social impact.

Every contribution, no matter how small, makes a difference. Together, we can build technology that serves the public good and empowers every Indian citizen.

---

**🏛️ SarkariSaathi - Empowering Every Indian with Government Schemes**

*"सरकारी योजनाओं का लाभ हर भारतीय तक पहुंचाना"*
