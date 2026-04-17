import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"migue100.com Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[migue100.com] ${subject} — from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:monospace;background:#0a0a12;color:#e8eaf0;padding:32px;border:1px solid #1e2a40;max-width:600px">
          <div style="border-bottom:1px solid #1e2a40;padding-bottom:16px;margin-bottom:24px">
            <span style="color:#3b82f6;font-weight:700;font-size:11px;letter-spacing:0.15em;text-transform:uppercase">migue100.com — New Message</span>
          </div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr><td style="color:#6b7280;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:8px 0;border-bottom:1px solid #1e2a40;width:100px">From</td><td style="padding:8px 0;border-bottom:1px solid #1e2a40;font-size:13px">${name}</td></tr>
            <tr><td style="color:#6b7280;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:8px 0;border-bottom:1px solid #1e2a40">Reply-to</td><td style="padding:8px 0;border-bottom:1px solid #1e2a40;font-size:13px;color:#3b82f6">${email}</td></tr>
            <tr><td style="color:#6b7280;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:8px 0;border-bottom:1px solid #1e2a40">Topic</td><td style="padding:8px 0;border-bottom:1px solid #1e2a40;font-size:13px">${subject}</td></tr>
          </table>
          <div style="background:#111827;border:1px solid #1e2a40;padding:16px">
            <p style="color:#6b7280;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 12px 0">Message</p>
            <p style="margin:0;font-size:13px;line-height:1.6;white-space:pre-wrap">${message}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact form error:", err)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
