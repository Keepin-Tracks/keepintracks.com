import * as React from 'react';
import { Resend } from 'resend';
import { EmailTemplate } from './emails/email-template';

export default {
  async fetch(request, env, context): Promise<Response> {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Handle GET requests for testing
    if (request.method === 'GET') {
      return Response.json(
        {
          status: 'ok',
          message: 'Contact form API is running',
          endpoint: 'POST to this URL with { subject, email, message }',
          example: {
            subject: 'Test Subject',
            email: 'test@example.com',
            message: 'Test message',
          },
        },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Only allow POST requests for actual form submissions
    if (request.method !== 'POST') {
      return Response.json(
        { error: 'Method not allowed' },
        {
          status: 405,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    }

    try {
      // Parse request body
      const { subject, email, message } = await request.json() as { subject: string; email: string; message: string };

      // Validate required fields
      if (!subject || !email || !message) {
        return Response.json(
          { error: 'Missing required fields' },
          {
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          }
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return Response.json(
          { error: 'Invalid email format' },
          {
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          }
        );
      }

      // Check if API key is configured
      if (!env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return Response.json(
          { error: 'Email service not configured' },
          {
            status: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          }
        );
      }

      // Initialize Resend
      const resend = new Resend(env.RESEND_API_KEY);

      // Send email with actual form data
      const { data, error } = await resend.emails.send({
        from: 'KeepinTracks.com <admin@keepintracks.com>',
        to: ['info@keepintracks.com'],
        replyTo: email,
        subject: `[Contact Form] ${subject}`,
        react: <EmailTemplate subject={subject} email={email} message={message} />,
      });

      if (error) {
        console.error('Resend error:', error);
        return Response.json(
          { error: 'Failed to send email' },
          {
            status: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return Response.json(
        { success: true, id: data?.id },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error processing request:', error);
      return Response.json(
        { error: 'Internal server error' },
        {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    }
  },
} satisfies ExportedHandler<Env, ExecutionContext>;
