import { EmailNotificationSettings } from "@/components/admin/email-notification-settings"
import { EmailTemplatePreview } from "@/components/admin/email-template-preview"
import FooterSection from "@/components/footer-section"

export const metadata = {
  title: "Admin: Email Notification Settings | Dr. Yogita Physiotherapy",
  description: "Manage email notification settings for appointment bookings.",
}

export default function AdminEmailSettingsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Email Notification Settings</h1>
          <p className="text-gray-600">Configure and manage email notifications for appointment bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <EmailNotificationSettings />
          </div>
          <div>
            <EmailTemplatePreview />
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  )
}
