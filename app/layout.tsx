import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display as PlayfairDisplay, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import WhatsAppChat from "@/components/whatsapp-chat"
import Script from "next/script"

const playfair = PlayfairDisplay({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dr. Yogita Physiotherapy | Pain-Free Living. Powerful Healing.",
  description:
    "Expert physiotherapy services with 22+ years of experience. Relieve pain and regain power with Dr. Yogita's specialized care.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F06NY9SX94"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F06NY9SX94');
          `}
        </Script>
      </head>
      <body className={`${playfair.variable} ${poppins.variable} font-poppins`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <WhatsAppChat />
        </ThemeProvider>
      </body>
    </html>
  )
}
