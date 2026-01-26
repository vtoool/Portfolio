# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Victor Bujor's portfolio website - a Next.js 14 application showcasing systems engineering projects and services. The site features:

- **Portfolio Projects**: Six featured projects with detailed case studies (PFCRM, Chef De Chef, FareSnap, Meta Graph Automator, CabinStory, GDS Micro-Tools)
- **Services**: Three main service offerings (Custom CRMs, API Integrations, SaaS MVPs)
- **Interactive Elements**: Floating art assets with parallax scroll animations in the hero section
- **Internationalization**: Built-in i18n support with English and Romanian translations
- **Dark Theme**: Professional dark mode design with zinc color palette

## Development Commands

```bash
# Development
npm run dev                  # Start development server at localhost:3000

# Building
npm run build               # Build for production
npm start                   # Start production server after build

# Testing
npm test                    # Run tests in watch mode
npm run test:ui            # Run tests with Vitest UI
npm run test:run            # Run tests once (CI mode)

# Code Quality
npm run lint                # Run ESLint
npm run lint:fix            # Run ESLint with auto-fix
npm run format              # Format code with Prettier

# Database
npm run migrate             # Run Supabase migrations (tsx supabase-migrate.ts)

# Deployment (PREFERRED)
vercel --prod              # Deploy to Vercel (PRODUCTION)
```

**⚠️ IMPORTANT**: Always deploy to Vercel, not localhost. Testing should be done on the live Vercel URL for accurate results.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + custom scroll reveal components
- **Database**: Supabase (PostgreSQL)
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel (auto-configured in vercel.json)

### Directory Structure

```
app/                        # Next.js App Router
├── layout.tsx              # Root layout (providers, metadata)
├── page.tsx                # Home page (portfolio sections)
├── loading.tsx             # Loading UI
└── globals.css             # Global styles

components/                 # React components
├── ScrollReveal*.tsx       # Scroll animation systems
├── BentoGrid.tsx           # Portfolio grid layout
├── ProjectCard.tsx         # Individual project cards
├── Hero.tsx                # Hero section with floating assets
├── FloatingAssets.tsx      # Parallax art assets
├── Navbar.tsx              # Navigation
├── Services.tsx            # Services section
├── TrustSection.tsx        # About/testimonials
└── [other components]     # UI components

lib/                       # Utilities and data
├── utils.ts                # cn() utility (clsx + tailwind-merge)
├── data.ts                 # Projects, services, testimonials data
├── assets.ts               # Art asset positioning config
├── supabase.ts             # Database client
└── data-service.ts         # Data fetching logic

types/                     # TypeScript definitions
├── animation.ts            # Animation component types
├── database.ts             # Database schemas
└── index.ts                # Project, Service, etc. types

messages/                  # i18n translations
├── en.json                # English
└── ro.json                # Romanian

public/art/               # Static art assets
├── Me.png                 # Hero character
├── plane.png              # Travel icon
├── guitar.png             # Creative icon
├── map.png                # Adventure icon
└── gear.png               # Engineering icon
```

## Key Components

### Animation System
The project has a sophisticated animation system with multiple layers:

1. **ScrollReveal** (`components/ScrollReveal.tsx`): Basic scroll-triggered reveal
2. **ScrollRevealEnhanced** (`components/ScrollRevealEnhanced.tsx`): Advanced animations with:
   - Multiple animation types (fade, slide, scale, parallax, rotate, bounce)
   - Performance monitoring and GPU acceleration
   - Reduced motion support for accessibility
   - Debug mode for development
   - Art asset integration

3. **FloatingAssets** (`components/FloatingAssets.tsx`): Hero section parallax assets
   - 5 art assets with staggered entry animation
   - Scroll-based parallax movement at different speeds
   - Blur and opacity transitions on scroll

### Portfolio Grid
**BentoGrid** uses CSS Grid with `grid-flow-dense` for a Pinterest-style masonry layout:
- Large items: 2x2 grid spans (PFCRM)
- Medium items: 1x2 spans (Chef De Chef, CabinStory)
- Small items: 1x1 spans (FareSnap, Meta, GDS)

### Data Structure
Projects follow STAR methodology (Situation-Task-Action-Result) format with:
- Business context and problem description
- Technical implementation details
- Measurable results and impact

## Important Configuration

### Next.js Config (`next.config.js`)
```javascript
{
  images: {
    domains: ['picsum.photos']  // Project demo images
  },
  experimental: {
    serverComponentsExternalPackages: ['next-intl']
  }
}
```

### Tailwind Config (`tailwind.config.ts`)
- Dark mode by default
- Custom zinc color palette
- Typography and animation utilities

### Vercel Deployment (`vercel.json`)
- Security headers configured (X-Frame-Options, X-Content-Type-Options, etc.)
- Build: `npm run build`
- Output: `.next` directory
- Auto-deploy on git push

## Data Sources

All portfolio content is statically defined in `lib/data.ts`:
- 6 featured projects with detailed case studies
- 3 service offerings with feature lists
- 3 client testimonials
- 4 trust metrics
- Partner logos (RingCentral, DocuSign, Meta, Stripe, etc.)

No CMS - all content is code-based for simplicity and performance.

## Internationalization

Language system in place:
- LanguageContext provider wraps the app
- `messages/en.json` and `messages/ro.json` for translations
- LanguageSwitcher component for UI
- LocalizedSection component for translated content

Currently only UI strings are translated, not project content.

## Testing

Tests use Vitest with Testing Library:
- Component tests in `*.test.tsx` files
- Example: `components/ProjectCard.test.tsx`
- Mock Next.js components (Link, Image)
- Mock custom components (TiltCard)

## Deployment Workflow

**ALWAYS deploy to Vercel for testing and verification:**

1. Commit changes: `git add <files> && git commit -m "<message>"`
2. Push to GitHub: `git push origin main`
3. Deploy: `vercel --prod`
4. Vercel automatically builds and deploys from the main branch

**⚠️ IMPORTANT**: Never test UI/animation changes on localhost. Always verify on the live Vercel URL to ensure accurate rendering and performance.

## Development Notes

- **Client Components**: Any component using hooks, Framer Motion, or browser APIs needs `"use client"` at the top
- **Performance**: Parallax and animations use `transform-gpu` and passive listeners
- **Accessibility**: Respects `prefers-reduced-motion` for all animations
- **Image Optimization**: Uses Next.js Image component with picsum.photos
- **Error Handling**: ErrorBoundary component wraps the app
- **Type Safety**: Comprehensive TypeScript types in `/types` directory

## Context Management & Productivity System

This section describes a systematic approach to using Claude Code effectively with this repository.

### MCP Plugins and Tools

**Use Available MCP Plugins** for enhanced capabilities:
- **Context7**: Retrieve up-to-date documentation for libraries (React, Next.js, Framer Motion, etc.)
- **Playwright**: Browser automation for testing UI interactions and animations
- **Supabase**: Database operations, migrations, and project management
- **Web Search**: Research best practices and current documentation
- **GitHub (via gh CLI)**: Manage PRs, issues, and repository operations

**When to Use Plugins**:
- Research unfamiliar APIs or libraries: Use Context7 first
- Debug UI/animation issues: Use Playwright for automated testing
- Database changes: Use Supabase plugin for migrations and queries
- Verify implementation: Use Web Search for current best practices

### Visual Feedback Loop Protocol

**CRITICAL: Use Visual Analysis for Every UI/UX Change**

This project employs a continuous visual feedback loop to ensure optimal UI/UX quality. For every visual change:

1. **Make Code Changes** → Edit components, styles, layouts
2. **Deploy to Vercel** → Push to production for accurate rendering
3. **Capture Screenshots** → Use Playwright to capture targeted screenshots
4. **Analyze Visually** → Use `understand_image` tool with UI/UX expert perspective
5. **Iterate & Improve** → Make targeted adjustments based on visual analysis
6. **Repeat** → Continue until visual quality meets professional standards

**When to Trigger Visual Analysis**:
- After any layout or styling changes
- When adjusting animations or transitions
- When modifying component spacing, sizing, or positioning
- When updating color schemes or typography
- After adding new interactive elements
- When fixing visual bugs or inconsistencies
- During responsive design adjustments

**Visual Analysis Questions** (ask in `understand_image` prompt):
- Does the visual hierarchy support user goals?
- Are there alignment or spacing inconsistencies?
- Do colors and contrast meet accessibility standards?
- Is the visual balance and proportion appropriate?
- Do animations enhance or distract from the experience?
- Are interactive elements clearly distinguishable?
- Does the design feel cohesive with the overall brand?
- What specific improvements would enhance user engagement?

**Visual Analysis Context File**: Document all findings in `.context/visual-analysis.md`

### Knowledge Management System

**Create Context Files** for recurring patterns and solutions:

**File: `.context/failures.md`** - Track bugs and fixes
```markdown
## Animation Performance Issues
**Date**: [When encountered]
**Problem**: [Description]
**Root Cause**: [What went wrong]
**Solution**: [How it was fixed]
**Files**: [List of affected files]
**Prevention**: [How to avoid in future]
```

**File: `.context/lessons-learned.md`** - Capture insights
```markdown
## Next.js 14 App Router Patterns
**Pattern**: [What was learned]
**Use Case**: [When to apply]
**Example**: [Code snippet]
**Related**: [Links to files]
```

**File: `.context/preferences.md`** - Document choices
```markdown
## Animation Library Decision
**Decision**: [What was chosen]
**Options Considered**: [Alternatives]
**Reasoning**: [Why this choice]
**Trade-offs**: [What was sacrificed]
```

**File: `.context/progress.md`** - Track work
```markdown
## Feature: [Name]
**Status**: [In Progress/Complete/Blocked]
**Tasks**: [List remaining items]
**Notes**: [Important context]
**Dependencies**: [What blocks this]
```

**File: `.context/visual-analysis.md`** - UI/UX visual insights
```markdown
## UI/UX Expert Evaluations
**Date**: [When analyzed]
**Component**: [Component name]
**Visual Findings**: [Analysis results]
**Screenshots**: [Reference to captured images]
**Action Items**: [List of improvements]
**Status**: [In Progress/Complete]
```

**File: `.context/design-system.md`** - Design system documentation
```markdown
## Color Palette
**Primary**: [Colors and usage]
**Secondary**: [Colors and usage]
**Typography**: [Font sizes, weights, hierarchy]
**Spacing**: [Spacing scale and rules]
```

**File: `.context/workflow.md`** - Visual feedback loop guide
```markdown
Complete guide for using visual analysis in development:
- Step-by-step workflow
- Analysis prompt templates
- Common issues and fixes
- Example workflows
```

**Use TodoWrite Tool** for all tasks:
- Break complex work into atomic todos
- Mark completed items immediately
- Use descriptive, actionable task names
- Track active work with `status: in_progress`

### Context-Aware Development

**Before Starting New Work**:
1. Review `.context/` files for relevant history
2. Search codebase for similar patterns
3. Check `.context/failures.md` for known issues

**During Development**:
1. Document new patterns/approaches in `.context/lessons-learned.md`
2. Record bugs in `.context/failures.md` with solutions
3. Update preferences when making architectural decisions
4. Use TodoWrite to track implementation steps

**After Completion**:
1. Add final implementation notes to `.context/lessons-learned.md`
2. Update progress.md to mark complete
3. Create test cases for future regression testing

### Context Files Location

Store context files in `.context/` directory (add to `.gitignore`):
```
.context/
├── failures.md           # Bug tracking
├── lessons-learned.md    # Knowledge base
├── preferences.md        # Decision log
├── progress.md           # Active work
├── visual-analysis.md    # UI/UX visual insights
├── design-system.md      # Design system documentation
└── workflow.md           # Visual feedback loop guide
```

### Research Workflow

**For Unknown Topics**:
1. Use Context7 to get official documentation
2. Search Web for community best practices
3. Search codebase for existing implementations
4. Document findings in `.context/lessons-learned.md`

**For Codebase Questions**:
1. Use Task agent with `Explore` subagent_type for deep code search
2. Trace data flow through multiple components
3. Identify patterns and anti-patterns
4. Document architectural decisions

### Continuous Improvement

**Review Context Files Weekly**:
- What patterns are emerging?
- Which failures repeat?
- What preferences have changed?
- How can processes be improved?
- What visual issues recur in `.context/visual-analysis.md`?
- Are design system guidelines being followed consistently?
- Is the visual feedback loop improving UI quality?

**Visual Feedback Loop Reviews**:
- Review iteration logs in `.context/visual-analysis.md`
- Identify recurring visual issues
- Update `.context/design-system.md` based on findings
- Improve workflow based on what works/doesn't work
- Track visual quality improvements over time

**Update Documentation**:
- When patterns emerge, update CLAUDE.md
- When patterns die out, remove from docs
- Keep `.context/` files lean and actionable

## Supabase Integration

Database integration is configured but not actively used in the current implementation:
- `lib/supabase.ts` contains client setup
- `npm run migrate` runs database migrations
- Migrations file: `supabase-migrate.ts` (tsx-based)

## Build Artifacts

The `.next` directory contains build artifacts and should not be committed:
- Already in `.gitignore`
- TypeScript build cache in `tsconfig.tsbuildinfo`
