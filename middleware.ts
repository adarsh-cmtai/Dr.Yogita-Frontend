import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Map of common shortened slugs to their full versions
const SLUG_REDIRECTS: Record<string, string> = {
  "back-pain": "back-pain-relief",
  posture: "posture-correction",
  online: "online-therapy",
  fatigue: "chronic-fatigue-relief",
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname
  const response = NextResponse.next()

  // Check if this is a service page with a shortened slug
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "")

    // If we have a direct mapping for this slug
    if (SLUG_REDIRECTS[slug]) {
      url.pathname = `/services/${SLUG_REDIRECTS[slug]}`
      return NextResponse.redirect(url)
    }
  }

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true"

    // If not authenticated and trying to access any admin route
    if (!isAuthenticated) {
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
  } else {
    // If user is navigating away from admin routes, remove the auth cookie
    if (request.cookies.has("isAuthenticated")) {
      response.cookies.delete("isAuthenticated")
    }
  }

  return response
}

export const config = {
  matcher: [
    "/services/:slug*",
    "/admin/:path*",
    "/admin/dashboard/:path*",
    "/admin/bookings/:path*"
  ],
}
