# Robust Error Detection Plan

This document provides a systematic approach to detecting, diagnosing, and resolving errors in the Next.js portfolio project.

## 1. Pre-Deployment Checklist

Before deploying any changes, always run these checks:

```bash
# 1. TypeScript compilation
npm run build

# 2. Run tests
npm run test:run

# 3. Check for linting issues
npm run lint

# 4. Verify local development server
npm run dev
```

## 2. Common Error Types & Detection Methods

### 2.1 Server Components Render Errors

**Symptoms:**
- "An error occurred in the Server Components render"
- White screen with error overlay
- 500 Internal Server Error

**Common Causes:**
- Using `"use client"` on `app/page.tsx` (root page)
- Mixing server and client component directives incorrectly
- Using server-only features in client components

**Detection:**
```bash
# Run build locally - production builds hide details
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

**Prevention:**
- NEVER add `"use client"` to `app/page.tsx`
- Keep root page as server component
- Pass data from server page to client components via props

### 2.2 Hydration Mismatch Errors

**Symptoms:**
- "Hydration failed because initial UI doesn't match"
- Content flickers on load
- "An error occurred in the Server Components render"

**Common Causes:**
- Using random values (Math.random, Date.now) in JSX
- Browser-specific code running during SSR
- Conditional rendering based on browser-only state
- Direct DOM manipulation (document.documentElement.classList)
- localStorage access without SSR guards

**Detection:**
```bash
# Check console during development
npm run dev
# Open browser console and check for warnings

# Check for unguarded localStorage access
grep -r "localStorage\." components/ --include="*.tsx" | grep -v "typeof window"

# Check for direct DOM manipulation
grep -r "document\.documentElement" components/ --include="*.tsx" | grep -v "theme-provider"
```

### 2.3 Theme Toggle Errors

**Symptoms:**
- Hydration mismatch on theme toggle
- White flash on page load
- Theme not persisting correctly

**Common Causes:**
- Using direct DOM manipulation for theme switching
- Not using next-themes useTheme hook
- Missing mounted guard on theme toggle component

**Detection:**
```bash
# Check for direct DOM manipulation in ThemeToggle
grep -A5 -B5 "document\.documentElement" components/ThemeToggle.tsx

# Should return NO results - use useTheme hook instead
```

**Prevention:**
```typescript
// ✅ CORRECT - Use useTheme hook
import { useTheme } from "next-themes";
const { theme, setTheme } = useTheme();
// ...
onClick={() => setTheme(isDark ? "light" : "dark")}

// ❌ WRONG - Direct DOM manipulation
onClick={() => {
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
}}
```

### 2.4 Import Errors

**Symptoms:**
- "Module not found"
- "Cannot find module"

**Common Causes:**
- Circular dependencies
- Wrong import paths
- Missing dependencies

**Detection:**
```bash
# Run build to catch import errors
npm run build
```

## 3. Error Detection Commands

### 3.1 Quick Health Check
```bash
# Single command to verify everything
npm run build && npm run test:run && echo "All checks passed!"
```

### 3.2 Production Verification
```bash
# Deploy and verify
npx vercel --prod
# Check deployment URL for errors
curl -s -o /dev/null -w "%{http_code}" https://your-deployment-url
```

### 3.3 Visual Regression Check
```bash
# Run Playwright visual tests
npx playwright test
```

## 4. Error Response Protocol

When an error is detected:

1. **Capture Error Details**
   - Screenshot of error
   - Browser console logs
   - Network tab errors
   - Build output

2. **Categorize Error**
   - Type: Server/Client/Hydration/Build
   - Severity: Critical/High/Medium/Low
   - Scope: Global/Component-specific

3. **Document in Logs**
   - Create entry in `.logs/error-log.md`
   - Include: Date, Error Type, Symptoms, Cause, Fix

4. **Apply Fix**
   - Create fix branch
   - Implement solution
   - Test locally
   - Deploy to staging
   - Verify fix

5. **Prevent Recurrence**
   - Add to this document
   - Update AGENTS.md if needed
   - Add test case if applicable

## 5. File Structure for Error Logging

```
.logs/
├── error-log.md          # Main error log
├── deployment-log.md     # Deployment history
└── error-detection-plan.md  # This file
```

## 6. Critical Rules

### DO:
- Test locally before deployment
- Check build output for warnings
- Use proper TypeScript types
- Keep server/client boundaries clear

### DON'T:
- Add `"use client"` to root page
- Commit without running build
- Ignore TypeScript errors
- Mix server/client features incorrectly

## 7. Quick Reference Commands

```bash
# Build and type check
npm run build

# Run tests
npm run test:run

# Lint code
npm run lint

# Full pre-deploy check
npm run build && npm run test:run && npm run lint

# Deploy to production
npx vercel --prod

# Check deployment status
curl -s -o /dev/null -w "%{http_code}" https://your-url
```

## 8. SSR Validation Commands (MANDATORY before commit)

Run these commands to catch SSR issues before they reach production:

```bash
# Check for unguarded localStorage access (should return NO results)
echo "=== Checking for unguarded localStorage ==="
UNGARDED=$(grep -r "localStorage\." components/ --include="*.tsx" | grep -v "typeof window" | grep -v "components/theme-provider")
if [ -n "$UNGARDED" ]; then
  echo "ERROR: Found unguarded localStorage access:"
  echo "$UNGARDED"
  exit 1
else
  echo "✅ No unguarded localStorage access found"
fi

# Check for direct DOM manipulation (should return NO results)
echo "=== Checking for direct DOM manipulation ==="
DOM_MANIP=$(grep -r "document\.documentElement" components/ --include="*.tsx" | grep -v "theme-provider")
if [ -n "$DOM_MANIP" ]; then
  echo "ERROR: Found direct DOM manipulation:"
  echo "$DOM_MANIP"
  exit 1
else
  echo "✅ No direct DOM manipulation found"
fi

# Run build to verify SSR safety
echo "=== Building to verify SSR safety ==="
npm run build

echo "✅ All SSR checks passed!"
```

---

**Last Updated:** 2026-01-29
**Version:** 1.0
