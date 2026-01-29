# AGENTS.md

**Optimized Agent Guidelines for Victor Bujor's Portfolio Website**

This document provides specialized instructions for AI agents working on this Next.js 14 portfolio project, ensuring optimal performance, code quality, and visual excellence.

## Agent Profile & Context

**Project Type**: Professional portfolio website showcasing systems engineering projects
**Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Supabase
**Key Features**: Advanced animations, i18n support, responsive design, visual feedback loops
**Deployment Target**: Vercel (production), localhost (development)

## Core Operating Principles

### 1. Visual Quality = Code Quality Balance
- Every UI change must be visually analyzed before completion
- Performance optimization is as important as visual polish
- Use the visual feedback loop protocol for ALL styling/animation changes
- Maintain accessibility standards (reduced motion, contrast ratios)

### 2. Animation-First Development
- Understand the three-tier animation system: ScrollReveal → ScrollRevealEnhanced → FloatingAssets
- Always test animations on mobile devices (parallax performance is critical)
- Use `transform-gpu` and passive listeners for performance
- Respect `prefers-reduced-motion` for accessibility

### 3. Type Safety Enforcement
- Never use `any` types - create proper TypeScript interfaces
- Enable strict mode and fix all compilation errors before proceeding
- All data structures must be typed (Project, Service, Testimonial, etc.)
- Import types from `@/types` directory (ensure they exist)

### 4. Design System Guidelines

#### Color System
- **Never hardcode single-theme colors** - Use CSS variables or Tailwind's `dark:` modifier
- **Test both themes** - Every color decision must work in light AND dark mode
- **Contrast minimum**: 4.5:1 for text, 3:1 for UI components (WCAG AA)
- **Avoid yellow/amber on light backgrounds** - Use dark gray (`text-zinc-700`) instead

#### Theme Toggle Design Pattern
- Use **single icon** that reflects current theme
  - Light mode: Moon icon with `text-zinc-700` on white bg
  - Dark mode: Sun icon with `text-amber-500` on dark bg
- Center icons using `flex items-center justify-center` directly on button
- Consistent sizing: `h-9 w-9` (36px square)
- Use `rounded-lg` corners
- Simple button without complex animations

#### Language Switcher Design Pattern
- Same color strategy as toggle buttons
- Globe icon + language code text
- Consistent sizing: `h-9 px-3` (36px height, appropriate width)
- Both icon and text must adapt to theme
- Use `text-xs font-medium` for text

#### Component Contrast in Light Mode
- Cards must not blend into white background
- Use **subtle shadow** (`box-shadow: 0 2px 8px rgba(0,0,0,0.04)`) in light mode
- Dark mode: Use border-based separation, no shadows
- Test card visibility on both light and dark backgrounds

## Critical Knowledge Areas

### Animation System Architecture

#### ScrollReveal (`components/ScrollReveal.tsx`)
- **Purpose**: Basic scroll-triggered animations
- **Usage**: Simple fade/slide animations with directional support
- **Props**: `direction`, `delay`, `duration`, `className`

#### ScrollRevealEnhanced (`components/ScrollRevealEnhanced.tsx`)
- **Purpose**: Advanced animations with parallax, performance monitoring, debug mode
- **Animation Types**: `fade`, `slide`, `scale`, `parallax`, `rotate`, `bounce`
- **Props**: `config`, `artAsset`, `debug`, `performanceMode`
- **Performance**: Uses GPU acceleration, passive listeners, reduced motion support

#### FloatingAssets (`components/FloatingAssets.tsx`)
- **Purpose**: Hero section parallax assets with staggered animations
- **Assets**: 5 art assets (Me.png, plane.png, guitar.png, map.png, gear.png)
- **Features**: Scroll-based parallax at different speeds, blur transitions, layout mode
- **Performance**: Critical on mobile - test extensively

### Data Structure Patterns

#### Project Structure (STAR Methodology)
```typescript
interface Project {
  id: string;
  title: string;
  tag: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  visual: string; // URL to project image
  status: string;
  gridSize: "large" | "medium" | "small";
  featured: boolean;
  liveUrl?: string;
  situation: string; // Business context
  task: string;      // What needed to be done
  action: string;    // Technical implementation
  result: string;    // Measurable outcomes
}
```

#### Service Structure
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}
```

### Component Hierarchy
```
app/layout.tsx (Root with ErrorBoundary, LanguageProvider)
└── app/page.tsx (Main page)
    ├── Navbar (Navigation with LanguageSwitcher)
    ├── Hero (with FloatingAssets parallax)
    ├── ToolsSection
    ├── BentoGrid (CSS Grid with grid-flow-dense)
    │   └── ProjectCard[] (with TiltCard hover effects)
    ├── Services (3 service offerings)
    ├── TrustSection (testimonials, metrics)
    └── Footer
```

### BentoGrid Layout System
- **CSS Grid**: Uses `grid-cols-2 md:grid-cols-2 lg:grid-cols-4`
- **Layout Pattern**: `grid-flow-dense` for Pinterest-style masonry
- **Grid Sizes**:
  - Large (2x2): PFCRM
  - Medium (1x2): Chef De Chef, CabinStory
  - Small (1x1): FareSnap, Meta Graph Automator, GDS Micro-Tools

## Development Workflow

### 1. Pre-Development Checklist
- [ ] Review `.context/` directory for relevant history and failures
- [ ] Check current deployment status on Vercel
- [ ] Verify TypeScript compilation works (`npm run build`)
- [ ] Run tests to ensure no regressions (`npm run test:run`)

### 2. Code Development Standards
- **File Structure**: Follow existing directory patterns
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: Use `@/` absolute imports consistently
- **Types**: Import all types from `@/types` directory
- **Client Components**: Add `"use client"` for any hook/Framer Motion usage

### 3. Visual Feedback Loop Protocol (MANDATORY)

**For Every UI/UX Change:**

1. **Make Code Changes** → Edit components, styles, layouts
2. **Deploy to Vercel** → `git add . && git commit -m "message" && git push && vercel --prod`
3. **Capture Screenshots** → Use Playwright to capture targeted screenshots
4. **Analyze Visually** → Use `understand_image` tool with UI/UX expert perspective
5. **Iterate & Improve** → Make targeted adjustments based on analysis
6. **Document Findings** → Update `.context/visual-analysis.md`

**Visual Analysis Questions:**
- Does the visual hierarchy support user goals?
- Are there alignment or spacing inconsistencies?
- Do colors and contrast meet accessibility standards?
- Is the visual balance and proportion appropriate?
- Do animations enhance or distract from the experience?
- Are interactive elements clearly distinguishable?
- Does the design feel cohesive with the overall brand?

**When to Trigger Visual Analysis:**
- After any layout or styling changes
- When adjusting animations or transitions
- When modifying component spacing, sizing, or positioning
- When updating color schemes or typography
- After adding new interactive elements
- When fixing visual bugs or inconsistencies
- During responsive design adjustments

### 4. Testing Strategy
- **Unit Tests**: Component testing with Vitest + Testing Library
- **Visual Testing**: Playwright screenshots for UI verification
- **Performance**: Animation smoothness testing on mobile devices
- **Accessibility**: Reduced motion testing, contrast checking

## Specialized Commands & Scripts

### Development Commands
```bash
# Development server (use for initial testing)
npm run dev

# Build verification (always test before deployment)
npm run build

# Production deployment (REQUIRED for UI testing)
vercel --prod

# Code quality checks
npm run lint
npm run lint:fix
npm run format

# Testing
npm test              # Watch mode
npm run test:ui      # Vitest UI
npm run test:run     # CI mode (for verification)
```

### Database Commands (Supabase)
```bash
npm run migrate      # Run database migrations
```

## Common Patterns & Solutions

### Animation Performance Patterns
```typescript
// ✅ Correct: Use GPU acceleration
<div className="transform-gpu" />

// ✅ Correct: Passive scroll listeners
useEffect(() => {
  const handleScroll = () => requestAnimationFrame(updateParallax);
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// ✅ Correct: Respect reduced motion
const reduceMotion = useReducedMotion();
if (reduceMotion) return <div>{children}</div>;
```

### Type Safety Patterns
```typescript
// ✅ Correct: Import from types directory
import { Project, Service } from "@/types";

// ✅ Correct: Proper interface definitions
interface AnimationConfig {
  type: "fade" | "slide" | "scale" | "parallax" | "rotate" | "bounce";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  triggerOnce?: boolean;
}
```

### Responsive Design Patterns
```typescript
// ✅ Correct: Mobile-first Tailwind classes
<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3" />

// ✅ Correct: Breakpoint-specific logic
const isMobile = useViewport().width < 768;
if (isMobile) {
  // Mobile-specific optimizations
}
```

## Security & Deployment Guidelines

### Security Requirements
- **Next.js Version**: Always use latest patched version (check CVEs)
- **Dependencies**: Regularly audit and update packages
- **Environment Variables**: Never commit secrets, use Vercel environment
- **Headers**: Vercel.json configured with security headers

### Deployment Protocol
1. **Test Changes**: Verify on localhost for basic functionality
2. **Commit & Push**: `git add . && git commit -m "descriptive message" && git push`
3. **Deploy Production**: `vercel --prod`
4. **Verify Live**: Test on Vercel URL for accurate behavior
5. **Visual Analysis**: Run visual feedback loop for UI changes

### Build Verification
```bash
# Full build verification before deployment
npm run build
npm run lint
npm run test:run
```

## Internationalization Guidelines

### Current Implementation
- **Languages**: English (`en.json`), Romanian (`ro.json`)
- **Context**: `LanguageContext` for React state management
- **Components**: `LanguageSwitcher`, `LocalizedSection`

### Usage Patterns
```typescript
// ✅ Correct: Use LanguageContext
import { useLanguage } from "@/components/LanguageContext";
const { language, setLanguage } = useLanguage();

// ✅ Correct: Translate UI strings
const messages = {
  en: { "portfolio.title": "Featured Work" },
  ro: { "portfolio.title": "Lucrări Recomandate" }
};
```

## Error Handling & Debugging

### Error Boundary Usage
- **Root Level**: ErrorBoundary wraps entire app in layout.tsx
- **Component Level**: Add error boundaries for critical components
- **Fallbacks**: Provide user-friendly error messages

### Debug Mode (Animations)
```typescript
// Enable debug mode for ScrollRevealEnhanced
<ScrollRevealEnhanced 
  config={config} 
  debug={true}  // Shows animation boundaries and timing
/>
```

## Context Management System

### `.context/` Directory Structure
```
.context/
├── failures.md           # Bug tracking with solutions
├── lessons-learned.md    # Knowledge base and patterns
├── preferences.md        # Decision log and trade-offs
├── progress.md           # Active work tracking
├── visual-analysis.md    # UI/UX visual insights
├── design-system.md      # Design system documentation
└── workflow.md           # Visual feedback loop guide
```

### Usage Guidelines
- **Before Starting Work**: Review context files for relevant history
- **During Development**: Document new patterns and record bugs
- **After Completion**: Update progress.md and create test cases

## Performance Optimization

### Animation Performance
- **Mobile First**: Test parallax effects extensively on mobile
- **GPU Acceleration**: Use `transform-gpu` for animations
- **Passive Listeners**: Always use passive scroll event listeners
- **Reduced Motion**: Respect user accessibility preferences

### Bundle Optimization
- **Code Splitting**: Use dynamic imports for large components
- **Image Optimization**: Next.js Image component with proper sizing
- **Font Optimization**: Next.js Font with proper subsets

## Project Organization Standards

### File & Directory Management
- **Screenshots**: ALL screenshots must be saved to `.screenshots/` directory
  - Never leave screenshots in the project root
  - Use descriptive filenames: `feature-name-theme-viewport.png` (e.g., `hero-section-dark-mobile.png`)
  - Delete temporary screenshots after visual analysis is complete
  - Run `ls .screenshots/` before committing to verify no strays

- **Test Artifacts**: Keep test-related files organized
  - Playwright screenshots: `.screenshots/`
  - Test reports: `.playwright-report/` (auto-generated)
  - Coverage reports: `coverage/` (auto-generated)

- **Configuration Files**: Keep in designated locations
  - `.env*` files: NEVER commit (add to .gitignore)
  - `.vercel/`: Auto-generated, do not manually edit
  - `.next/`: Build output, never commit

### Commit Hygiene
- **Clean Working Directory**: Before committing, run:
  ```bash
  # Check for stray files in root
  ls *.png *.jpg *.jpeg *.gif 2>/dev/null

  # Verify screenshots are in correct folder
  ls .screenshots/

  # Check for untracked files
  git status
  ```

- **Meaningful Commits**: Group related changes together
  - Avoid mixing visual fixes with functional changes
  - Separate screenshot commits from code commits when possible

### Clean-Up Protocol
After completing visual analysis or testing:
1. Delete temporary screenshot files from `.screenshots/` if no longer needed
2. Remove test scripts from project root
3. Run `git status` to verify clean state
4. Commit only necessary changes

## Continuous Improvement

### Review Protocols
- **Weekly**: Review `.context/` files for emerging patterns
- **Monthly**: Check for dependency updates and security patches
- **Per Release**: Review visual quality trends and user feedback

### Knowledge Sharing
- **Document Everything**: All decisions and patterns in context files
- **Update AGENTS.md**: When patterns emerge or change
- **Maintain Cleanliness**: Keep context files lean and actionable

---

## Emergency Procedures

### Build Failure Recovery
1. Check TypeScript compilation errors first
2. Verify all imports from `@/types` resolve correctly
3. Check for missing dependencies (`npm install`)
4. Review recent git commits for breaking changes

### Deployment Issues
1. Check Vercel build logs for specific errors
2. Verify environment variables are set correctly
3. Test locally with `npm run build` first
4. Rollback if necessary using Vercel dashboard

### Visual Regression Recovery
1. Review recent `.context/visual-analysis.md` entries
2. Use git bisect to identify problematic commit
3. Restore from backup if available
4. Re-run visual feedback loop to verify fix

---

**This document is a living guide. Update it when patterns emerge, technologies change, or new best practices are discovered.**