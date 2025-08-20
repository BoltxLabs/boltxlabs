import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { type, data, timestamp } = await req.json()

    let emailContent = ''
    let subject = ''

    switch (type) {
      case 'contact_message':
        subject = `New Contact Message from ${data.name}`
        emailContent = `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
          <p><strong>Received at:</strong> ${new Date(timestamp).toLocaleString()}</p>
        `
        break

      case 'partnership_application':
        subject = `New Partnership Application from ${data.company}`
        emailContent = `
          <h2>New Partnership Application</h2>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Partnership Type:</strong> ${data.partnershipType}</p>
          <p><strong>Budget:</strong> ${data.budget || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
          <p><strong>Description:</strong></p>
          <p>${data.description}</p>
          <p><strong>Received at:</strong> ${new Date(timestamp).toLocaleString()}</p>
        `
        break

      case 'new_member':
        subject = `New Member Registration: ${data.email}`
        emailContent = `
          <h2>New Member Registration</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Registered at:</strong> ${new Date(timestamp).toLocaleString()}</p>
        `
        break

      default:
        throw new Error('Unknown notification type')
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Bolt X Labs <noreply@boltxlabs.com>',
        to: ['boltx.1700@gmail.com'],
        subject: subject,
        html: emailContent,
      }),
    })

    if (res.ok) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      const error = await res.text()
      throw new Error(error)
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})