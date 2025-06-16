"use server"

import nodemailer from "nodemailer"

type BookingEmailData = {
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceName: string
  appointmentDate: string
  appointmentTime: string
  notes?: string
}

export async function sendBookingEmails(data: BookingEmailData) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Send email to customer
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: data.customerEmail,
      subject: "Your Appointment Confirmation - Dr. Yogita Physiotherapy",
      html: customerEmailTemplate(data),
    })

    // Send email to admin/staff
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.FROM_EMAIL!, // Admin email
      subject: `New Appointment: ${data.customerName} - ${data.serviceName}`,
      html: adminEmailTemplate(data),
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email notification" }
  }
}

function customerEmailTemplate(data: BookingEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Appointment Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: #f9d5e5;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
          background-color: #fff;
          border-left: 1px solid #eee;
          border-right: 1px solid #eee;
        }
        .footer {
          background-color: #d6e6ff;
          padding: 15px;
          text-align: center;
          font-size: 14px;
          border-radius: 0 0 8px 8px;
        }
        .appointment-details {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .appointment-details p {
          margin: 8px 0;
        }
        .cta-button {
          display: inline-block;
          background-color: #f472b6;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Your Appointment is Confirmed!</h1>
      </div>
      <div class="content">
        <p>Dear ${data.customerName},</p>
        <p>Thank you for booking an appointment with Dr. Yogita Physiotherapy. Your appointment details are as follows:</p>
        
        <div class="appointment-details">
          <p><strong>Service:</strong> ${data.serviceName}</p>
          <p><strong>Date:</strong> ${data.appointmentDate}</p>
          <p><strong>Time:</strong> ${data.appointmentTime}</p>
          <p><strong>Location:</strong> Dr. Yogita Physiotherapy Main Center, Sector 14, Gurgaon</p>
        </div>
        
        <p>Please arrive 10 minutes before your scheduled appointment time. If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
        
        <p>For any questions or concerns, please don't hesitate to contact us:</p>
        <p>Phone: +91 98765 43210<br>Email: info@dryogitaphysio.com</p>
        
        <a href="https://maps.google.com/?q=Dr+Yogita+Physiotherapy+Gurgaon" class="cta-button">Get Directions</a>
      </div>
      <div class="footer">
       <p>© 2025 <a href="https://www.cmtai.com" target="_blank" rel="noopener noreferrer">CMT AI</a>. All rights reserved.</p>

        <p>509 sector 31, Gurgaon, Haryana, India</p>
      </div>
    </body>
    </html>
  `
}

function adminEmailTemplate(data: BookingEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Appointment Notification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: #d6e6ff;
          padding: 15px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
          background-color: #fff;
          border-left: 1px solid #eee;
          border-right: 1px solid #eee;
        }
        .footer {
          background-color: #f9d5e5;
          padding: 15px;
          text-align: center;
          font-size: 14px;
          border-radius: 0 0 8px 8px;
        }
        .appointment-details {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .customer-info {
          background-color: #f0f7ff;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .notes {
          background-color: #fff9f0;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 3px solid #ffd700;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>New Appointment Booked</h2>
      </div>
      <div class="content">
        <p>A new appointment has been booked with the following details:</p>
        
        <div class="appointment-details">
          <p><strong>Service:</strong> ${data.serviceName}</p>
          <p><strong>Date:</strong> ${data.appointmentDate}</p>
          <p><strong>Time:</strong> ${data.appointmentTime}</p>
        </div>
        
        <div class="customer-info">
          <p><strong>Customer Name:</strong> ${data.customerName}</p>
          <p><strong>Email:</strong> ${data.customerEmail}</p>
          <p><strong>Phone:</strong> ${data.customerPhone}</p>
        </div>
        
        ${
          data.notes
            ? `
        <div class="notes">
          <p><strong>Additional Notes:</strong></p>
          <p>${data.notes}</p>
        </div>
        `
            : ""
        }
        
        <p>Please update the appointment calendar accordingly.</p>
      </div>
      <div class="footer">
        <p>© 2025 <a href="https://www.cmtai.com" target="_blank" rel="noopener noreferrer">CMT AI</a>. All rights reserved.</p>

      </div>
    </body>
    </html>
  `
}
