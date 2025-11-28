import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // For now, just log the message. You can integrate Resend or SendGrid later.
    console.log('Contact form submission:', { name, email, message })

    // TODO: Send email via Resend or SendGrid
    // Example with Resend (requires API key in .env):
    // const { data, error } = await resend.emails.send({
    //   from: 'noreply@carsalesusa.com',
    //   to: 'your-email@example.com',
    //   subject: `New contact from ${name}`,
    //   html: `<p>From: ${email}</p><p>${message}</p>`,
    // })

    res.status(200).json({ message: 'Contact form received' })
  } catch (error) {
    console.error('Contact API error:', error)
    res.status(500).json({ error: 'Failed to send message' })
  }
}
