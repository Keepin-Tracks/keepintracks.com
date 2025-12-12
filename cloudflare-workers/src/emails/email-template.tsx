import * as React from 'react';

interface EmailTemplateProps {
  subject: string;
  email: string;
  message: string;
}

export function EmailTemplate({ subject, email, message }: EmailTemplateProps) {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.6',
      color: '#333',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '0'
    }}>
      {/* Header with gradient accent */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        padding: '24px',
        borderRadius: '12px 12px 0 0',
        marginBottom: '0'
      }}>
        <h2 style={{
          color: '#ffffff',
          margin: '0',
          fontSize: '1.5rem',
          fontWeight: '700',
          lineHeight: '1.3'
        }}>
          New Contact Form Submission
        </h2>
      </div>

      {/* Content container */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '32px',
        borderRadius: '0 0 12px 12px',
        border: '1px solid #ddd',
        borderTop: 'none'
      }}>
        {/* Subject */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#6366f1',
            marginBottom: '8px'
          }}>
            Subject
          </div>
          <div style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#333',
            lineHeight: '1.5'
          }}>
            {subject}
          </div>
        </div>

        {/* From Email */}
        <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #ddd' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#6366f1',
            marginBottom: '8px'
          }}>
            From
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#333',
            lineHeight: '1.5'
          }}>
            {email}
          </div>
        </div>

        {/* Message */}
        <div>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#6366f1',
            marginBottom: '12px'
          }}>
            Message
          </div>
          <div style={{
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            padding: '20px',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            borderLeft: '4px solid #6366f1',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#333'
          }}>
            {message}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '24px',
        paddingTop: '24px',
        borderTop: '1px solid #ddd',
        fontSize: '0.875rem',
        color: '#666',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0' }}>
          This email was sent from the KeepinTracks contact form.
        </p>
      </div>
    </div>
  );
}

export default EmailTemplate;
