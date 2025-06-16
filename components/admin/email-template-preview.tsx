"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Send, Eye } from "lucide-react"

export function EmailTemplatePreview() {
  const [testEmail, setTestEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sentStatus, setSentStatus] = useState<string | null>(null)

  const handleSendTest = () => {
    if (!testEmail) return

    setIsSending(true)
    setSentStatus(null)

    // Simulate sending test email
    setTimeout(() => {
      setIsSending(false)
      setSentStatus("Test email sent successfully to " + testEmail)
    }, 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email Template Preview</CardTitle>
        <CardDescription>Preview and test your email templates</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customer">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Customer Email</TabsTrigger>
            <TabsTrigger value="admin">Admin Email</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="pt-4">
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-100 p-2 border-b flex justify-between items-center">
                <span className="text-sm font-medium">Customer Confirmation Email</span>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Eye className="h-4 w-4 mr-1" />
                  Full Preview
                </Button>
              </div>
              <div className="p-4 max-h-[400px] overflow-auto bg-white">
                <div className="bg-[#f9d5e5] p-4 text-center rounded-t-md">
                  <h2 className="text-xl font-bold">Your Appointment is Confirmed!</h2>
                </div>
                <div className="p-4 border-x border-gray-200">
                  <p className="mb-3">Dear John Doe,</p>
                  <p className="mb-3">
                    Thank you for booking an appointment with Dr. Yogita Physiotherapy. Your appointment details are as
                    follows:
                  </p>

                  <div className="bg-gray-50 p-3 rounded-md mb-4">
                    <p className="mb-1">
                      <strong>Service:</strong> Back Pain Relief
                    </p>
                    <p className="mb-1">
                      <strong>Date:</strong> May 15, 2023
                    </p>
                    <p className="mb-1">
                      <strong>Time:</strong> 10:00 AM
                    </p>
                    <p>
                      <strong>Location:</strong> Dr. Yogita Physiotherapy Main Center, Sector 14, Gurgaon
                    </p>
                  </div>

                  <p className="mb-3">Please arrive 10 minutes before your scheduled appointment time.</p>

                  <div className="text-center my-4">
                    <a href="#" className="bg-[#f472b6] text-white px-4 py-2 rounded-md inline-block">
                      Get Directions
                    </a>
                  </div>
                </div>
                <div className="bg-[#d6e6ff] p-3 text-center text-sm rounded-b-md">
                <p>© 2025 <a href="https://www.cmtai.com" target="_blank" rel="noopener noreferrer">CMT AI</a>. All rights reserved.</p>

                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="pt-4">
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-100 p-2 border-b flex justify-between items-center">
                <span className="text-sm font-medium">Admin Notification Email</span>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Eye className="h-4 w-4 mr-1" />
                  Full Preview
                </Button>
              </div>
              <div className="p-4 max-h-[400px] overflow-auto bg-white">
                <div className="bg-[#d6e6ff] p-3 text-center rounded-t-md">
                  <h2 className="text-lg font-bold">New Appointment Booked</h2>
                </div>
                <div className="p-4 border-x border-gray-200">
                  <p className="mb-3">A new appointment has been booked with the following details:</p>

                  <div className="bg-gray-50 p-3 rounded-md mb-3">
                    <p className="mb-1">
                      <strong>Service:</strong> Back Pain Relief
                    </p>
                    <p className="mb-1">
                      <strong>Date:</strong> May 15, 2023
                    </p>
                    <p>
                      <strong>Time:</strong> 10:00 AM
                    </p>
                  </div>

                  <div className="bg-[#f0f7ff] p-3 rounded-md mb-3">
                    <p className="mb-1">
                      <strong>Customer Name:</strong> John Doe
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> john@example.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +91 98765 43210
                    </p>
                  </div>

                  <div className="bg-[#fff9f0] p-3 rounded-md mb-3 border-l-3 border-[#ffd700]">
                    <p className="mb-1">
                      <strong>Additional Notes:</strong>
                    </p>
                    <p>I have lower back pain for the last 2 weeks. Need urgent consultation.</p>
                  </div>
                </div>
                <div className="bg-[#f9d5e5] p-3 text-center text-sm rounded-b-md">
          <p>© 2025 <a href="https://www.cmtai.com" target="_blank" rel="noopener noreferrer">CMT AI</a>. All rights reserved.</p>

                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="test-email">Send Test Email</Label>
            <div className="flex space-x-2">
              <Input
                id="test-email"
                type="email"
                placeholder="Enter your email address"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSendTest} disabled={!testEmail || isSending}>
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Test
                  </>
                )}
              </Button>
            </div>
          </div>

          {sentStatus && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md text-sm">
              {sentStatus}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">
          Test emails use the current template settings and are sent with sample data.
        </p>
      </CardFooter>
    </Card>
  )
}
