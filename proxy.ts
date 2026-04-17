import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',              // landing page — accessible without login
  '/sign-in(.*)',   // sign-in and all sub-paths (Clerk uses catch-all)
  '/sign-up(.*)',   // sign-up and all sub-paths
])

// Next.js 16: export must be named "proxy" (middleware.ts was renamed to proxy.ts)
export const proxy = clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}