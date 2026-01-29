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

## Deployment Log

| Date | Commit | Deployment URL | Status |
|------|--------|----------------|--------|
| 2026-01-29 | b8b8d73 | portfolio-next-eight-khaki.vercel.app | ✅ Success (before error) |
| 2026-01-29 | 75624ba | portfolio-next-eight-khaki.vercel.app | ✅ Success (after fix) |

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
