"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function EmailNotificationSettings() {
  const [customerEnabled, setCustomerEnabled] = useState(true)
  const [adminEnabled, setAdminEnabled] = useState(true)
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [reminderHours, setReminderHours] = useState(24)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email Notification Settings</CardTitle>
        <CardDescription>Configure how and when email notifications are sent for bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customer">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customer">Customer Emails</TabsTrigger>
            <TabsTrigger value="admin">Admin Emails</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Customer Confirmation</h3>
                <p className="text-sm text-gray-500">Send booking confirmation emails to customers</p>
              </div>
              <Switch checked={customerEnabled} onCheckedChange={setCustomerEnabled} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-subject">Email Subject</Label>
              <Input
                id="customer-subject"
                defaultValue="Your Appointment Confirmation - Dr. Yogita Physiotherapy"
                disabled={!customerEnabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-template">Email Template</Label>
              <div className="relative">
                <div className="absolute right-2 top-2 bg-gray-100 text-xs px-2 py-1 rounded text-gray-500">
                  HTML Editor
                </div>
                <Textarea
                  id="customer-template"
                  rows={6}
                  placeholder="HTML template for customer emails"
                  disabled={!customerEnabled}
                  className="font-mono text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">
                Available variables: {"{customerName}"}, {"{appointmentDate}"}, {"{appointmentTime}"}, {"{serviceName}"}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Admin Notifications</h3>
                <p className="text-sm text-gray-500">Send booking notifications to admin staff</p>
              </div>
              <Switch checked={adminEnabled} onCheckedChange={setAdminEnabled} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-emails">Notification Recipients</Label>
              <Input
                id="admin-emails"
                defaultValue="admin@dryogitaphysio.com, bookings@dryogitaphysio.com"
                disabled={!adminEnabled}
              />
              <p className="text-xs text-gray-500">Separate multiple email addresses with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-subject">Email Subject</Label>
              <Input
                id="admin-subject"
                defaultValue="New Appointment: {customerName} - {serviceName}"
                disabled={!adminEnabled}
              />
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Appointment Reminders</h3>
                <p className="text-sm text-gray-500">Send reminder emails before appointments</p>
              </div>
              <Switch checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-hours">Send Reminder</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="reminder-hours"
                  type="number"
                  min="1"
                  max="72"
                  value={reminderHours}
                  onChange={(e) => setReminderHours(Number.parseInt(e.target.value))}
                  disabled={!reminderEnabled}
                  className="w-24"
                />
                <span className="text-gray-500">hours before appointment</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-subject">Email Subject</Label>
              <Input
                id="reminder-subject"
                defaultValue="Reminder: Your Appointment Tomorrow - Dr. Yogita Physiotherapy"
                disabled={!reminderEnabled}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Settings</Button>
      </CardFooter>
    </Card>
  )
}
