# Resend Email Setup

This guide will help you set up Resend to handle contact form submissions.

## Prerequisites

1. Sign up for a Resend account at [resend.com](https://resend.com)
2. Get your API key from the Resend dashboard

## Setup Options

### Option 1: Netlify (Recommended for Hugo)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables in Netlify:**
   - Go to your Netlify site dashboard
   - Navigate to Site settings → Environment variables
   - Add the following variables:
     - `RESEND_API_KEY`: Your Resend API key
     - `RESEND_FROM_EMAIL`: The email address to send from (e.g., `contact@keepintracks.com`)
     - `RESEND_TO_EMAIL`: The email address to receive messages (e.g., `info@keepintracks.com`)

3. **Deploy:**
   - Push your code to GitHub/GitLab
   - Netlify will automatically build and deploy
   - The function will be available at `/api/contact`

### Option 2: Vercel

1. **Create `vercel.json`:**
   ```json
   {
     "functions": {
       "api/contact.js": {
         "runtime": "nodejs18.x"
       }
     },
     "rewrites": [
       {
         "source": "/api/contact",
         "destination": "/api/contact"
       }
     ]
   }
   ```

2. **Create `api/contact.js`:**
   ```javascript
   const { Resend } = require('resend');

   module.exports = async (req, res) => {
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method not allowed' });
     }

     try {
       const { subject, email, message } = req.body;

       if (!subject || !email || !message) {
         return res.status(400).json({ error: 'Missing required fields' });
       }

       const resend = new Resend(process.env.RESEND_API_KEY);
       
       const { data, error } = await resend.emails.send({
         from: process.env.RESEND_FROM_EMAIL || 'contact@keepintracks.com',
         to: process.env.RESEND_TO_EMAIL || 'info@keepintracks.com',
         replyTo: email,
         subject: `[Contact Form] ${subject}`,
         html: `
           <h2>New Contact Form Submission</h2>
           <p><strong>Subject:</strong> ${subject}</p>
           <p><strong>From:</strong> ${email}</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, '<br>')}</p>
         `
       });

       if (error) {
         return res.status(500).json({ error: 'Failed to send email' });
       }

       return res.status(200).json({ success: true, id: data?.id });
     } catch (error) {
       return res.status(500).json({ error: 'Internal server error' });
     }
   };
   ```

3. **Set environment variables in Vercel:**
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL`

### Option 3: Cloudflare Workers

1. **Create `wrangler.toml`:**
   ```toml
   name = "kt-website"
   compatibility_date = "2024-01-01"

   [vars]
   RESEND_API_KEY = "your-api-key"
   RESEND_FROM_EMAIL = "contact@keepintracks.com"
   RESEND_TO_EMAIL = "info@keepintracks.com"
   ```

2. **Create `workers/contact.js`:**
   ```javascript
   export default {
     async fetch(request) {
       if (request.method !== 'POST') {
         return new Response(JSON.stringify({ error: 'Method not allowed' }), {
           status: 405,
           headers: { 'Content-Type': 'application/json' }
         });
       }

       const { subject, email, message } = await request.json();
       const resend = new Resend(env.RESEND_API_KEY);

       const { data, error } = await resend.emails.send({
         from: env.RESEND_FROM_EMAIL,
         to: env.RESEND_TO_EMAIL,
         replyTo: email,
         subject: `[Contact Form] ${subject}`,
         html: `<h2>New Contact Form Submission</h2>...`
       });

       return new Response(JSON.stringify({ success: true }), {
         headers: { 'Content-Type': 'application/json' }
       });
     }
   };
   ```

## Domain Verification

1. In your Resend dashboard, add and verify your domain (`keepintracks.com`)
2. Update DNS records as instructed by Resend
3. Once verified, you can use `contact@keepintracks.com` as the from address

## Testing

1. Fill out the contact form on your website
2. Check your email inbox (the `RESEND_TO_EMAIL` address)
3. Check the Resend dashboard for delivery status

## Troubleshooting

- **"Email service not configured"**: Make sure `RESEND_API_KEY` is set in your environment variables
- **"Failed to send email"**: Check your Resend API key and domain verification status
- **CORS errors**: The function includes CORS headers, but make sure your frontend is making requests to the correct endpoint

