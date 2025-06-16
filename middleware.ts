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

  // Check if this is a service page with a shortened slug
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "")

    // If we have a direct mapping for this slug
    if (SLUG_REDIRECTS[slug]) {
      url.pathname = `/services/${SLUG_REDIRECTS[slug]}`
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/services/:slug*",
}
