# Error Log

This file documents errors encountered during development and their resolutions.

## Error Entry #001

**Date:** 2026-01-29
**Time:** ~14:00
**Type:** Server Components Render Error
**Severity:** Critical
**Status:** Resolved

### Symptoms
- Production deployment showed white error page
- Error message: "An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details."
- 500 Internal Server Error on page load

### Root Cause
Added `"use client"` directive to `app/page.tsx` (root page component). This caused a conflict because:
1. Next.js App Router requires root page to be a server component
2. Using `"use client"` on the root page breaks Server Components rendering
3. The `dynamic = 'force-directive'` also conflicted with client component

### Changes Made Before Error
- Added `"use client"` to `app/page.tsx` to use `useLanguage()` hook for section labels
- This was an incorrect architectural decision

### Fix Applied
1. Removed `"use client"` from `app/page.tsx`
2. Removed `useLanguage` import and usage from page.tsx
3. Kept section labels in English (hardcoded) to maintain server-side rendering
4. All other Romanian translations remain functional (hero, services, projects, testimonials, footer, trust metrics)

### Files Changed
- `app/page.tsx` - Removed client directive and useLanguage hook

### Verification
- Local build: ✅ Success
- Vercel deployment: ✅ Success
- HTTP status: ✅ 200
- Site loads correctly in both EN and RO

### Lessons Learned
1. **NEVER** add `"use client"` to root page (`app/page.tsx`)
2. Root page must remain a server component in Next.js App Router
3. Client components should be used for interactive parts, not the page wrapper
4. Section labels can stay in English if needed to preserve server-side rendering

### Prevention
- Added to `error-detection-plan.md` under "Common Error Types"
- Updated AGENTS.md with project organization rules
- All future changes must run `npm run build` before deployment

---

## Error Entry #002

**Date:** 2026-01-29
**Time:** ~14:30
**Type:** Server Components Render Error (Intermittent)
**Severity:** Critical
**Status:** Resolved

### Symptoms
- Site worked for ~1 minute after deployment
- Error "An error occurred in the Server Components render" appeared on refresh
- Intermittent behavior - sometimes worked, sometimes failed

### Root Cause
Hydration mismatch caused by multiple components accessing browser APIs during SSR:

1. **LanguageProvider**: Was initializing with default locale 'en' then updating from localStorage after mount
2. **useViewport hook**: Accessed `window.innerWidth` without SSR guards, causing errors during server render
3. **Hero component**: Used breakpoint values that could be undefined during SSR, causing className issues

### Changes Made Before Error
- Added Romanian translations to multiple components
- Components accessed browser-only APIs without proper SSR guards

### Fix Applied
1. **hooks/useViewport.ts**:
   - Added `mounted` state to track client-side mount
   - Added SSR guard: `if (typeof window === 'undefined') return`
   - Return `mounted` flag for components to handle SSR safely

2. **components/Hero.tsx**:
   - Use `mounted` flag from useViewport
   - Create `safeBreakpoint` with default 'desktop' value
   - Prevents undefined className values during SSR

3. **components/LanguageContext.tsx**:
   - Added `mounted` state to track hydration completion
   - Ensures localStorage read only after client mount

### Files Changed
- `hooks/useViewport.ts` - Added SSR guards and mounted state
- `components/Hero.tsx` - Safe breakpoint handling
- `components/LanguageContext.tsx` - Added mounted state

### Verification
- Local build: ✅ Success
- Vercel deployment: ✅ Success
- HTTP status: ✅ 200
- Site loads correctly in both EN and RO

### Lessons Learned
1. **ALWAYS** add SSR guards to hooks that access browser APIs
2. Use `typeof window !== 'undefined'` or `mounted` state
3. Components using browser-only values should have safe defaults
4. Test both fresh load and refresh to catch hydration issues

### Prevention
- All hooks accessing window/document must have SSR guards
- Add `mounted` state to any component reading from localStorage
- Test hydration by doing multiple page refreshes
- Run `npm run build` before every deployment

---

## Error Entry #003

**Date:** 2026-01-29
**Time:** ~16:00
**Type:** SSR Hydration Error
**Severity:** Critical
**Status:** Resolved

### Symptoms
- "An error occurred in the Server Components render" appearing in production
- ErrorBoundary triggered on page load
- Hydration mismatch between server and client

### Root Cause
Direct DOM manipulation and localStorage access without SSR guards in two components:

1. **components/ThemeToggle.tsx**:
   - Used `document.documentElement.classList` directly for theme switching
   - Accessed `localStorage` during render without guards
   - Caused mismatch between server-rendered HTML and client hydration

2. **components/LanguageContext.tsx**:
   - `setLocale()` function accessed `localStorage` without `typeof window` check
   - Even though mounted state existed, the function itself wasn't guarded

### Changes Made Before Error
- Previous hydration fixes addressed initial mount issues
- ThemeToggle was missed in the initial fix pass
- LanguageContext setLocale had a latent SSR bug

### Fix Applied
1. **components/ThemeToggle.tsx**:
   - Refactored to use `useTheme()` hook from `next-themes`
   - Added `mounted` state to prevent rendering until hydration complete
   - Return placeholder button during SSR
   - Use `setTheme()` API instead of direct DOM manipulation

2. **components/LanguageContext.tsx**:
   - Added `typeof window !== 'undefined'` check in `setLocale()` function
   - Ensures localStorage access only happens on client

### Files Changed
- `components/ThemeToggle.tsx` - Complete refactor to use useTheme hook
- `components/LanguageContext.tsx` - Added SSR guard in setLocale

### Verification
- Local build: ✅ Success
- Vercel deployment: ✅ Success
- HTTP status: ✅ 200
- Site loads correctly with no hydration errors

### Prevention
- **ALWAYS** use library-provided hooks (like `useTheme`) instead of direct DOM manipulation
- **ALWAYS** guard ALL localStorage access with SSR checks, not just initial reads
- Components that access browser APIs should have mounted guards
- Add SSR guard pattern to code review checklist

---

## Error Entry #004

**Date:** 2026-01-29
**Time:** ~16:30
**Type:** Prevention & Documentation Update
**Severity:** Low
**Status:** Completed

### Changes Made
- Updated AGENTS.md with strict SSR/Hydration prevention rules
- Added SSR guard pattern to error-detection-plan.md
- Created comprehensive checklist for component development

### Files Changed
- `AGENTS.md` - Added SSR/Hydration prevention section
- `.logs/error-detection-plan.md` - Created detection plan

### Prevention
All new components must follow this checklist:
1. ✅ Does component access `window`, `document`, or `localStorage`?
2. ✅ Is there a `mounted` state guard?
3. ✅ Are all browser API accesses wrapped in `typeof window !== 'undefined'`?
4. ✅ If using theme context, is `useTheme` hook used instead of direct DOM?
5. ✅ Does the component render safely during SSR (no undefined values)?

---

## Deployment Log

| Date | Commit | Deployment URL | Status |
|------|--------|----------------|--------|
| 2026-01-29 | b8b8d73 | portfolio-next-eight-khaki.vercel.app | ✅ Success (before error) |
| 2026-01-29 | 75624ba | portfolio-next-eight-khaki.vercel.app | ✅ Success (after fix #1-2) |
| 2026-01-29 | 32f91ee | portfolio-next-8dvo7n1u4.vercel.app | ✅ Success (after fix #3) |

---

## Adding New Entries

When adding new errors:

```markdown
## Error Entry #XXX

**Date:** YYYY-MM-DD
**Time:** HH:MM
**Type:** [Server/Client/Hydration/Build]
**Severity:** [Critical/High/Medium/Low]
**Status:** [Resolved/Pending]

### Symptoms
- Description of what users saw

### Root Cause
- What caused the error

### Fix Applied
- How it was fixed

### Files Changed
- List of modified files

### Verification
- How the fix was verified

### Prevention
- How to prevent recurrence
```

---

**Maintained by:** Development Team
**Last Updated:** 2026-01-29
