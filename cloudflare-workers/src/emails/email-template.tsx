import * as React from 'react';

interface EmailTemplateProps {
  subject: string;
  email: string;
  message: string;
}

export function EmailTemplate({ subject, email, message }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        New Contact Form Submission
      </h2>
      <div style={{ marginTop: '20px' }}>
        <p><strong style={{ color: '#555' }}>Subject:</strong> {subject}</p>
        <p><strong style={{ color: '#555' }}>From:</strong> {email}</p>
        <div style={{ marginTop: '20px' }}>
          <p><strong style={{ color: '#555' }}>Message:</strong></p>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '5px', 
            whiteSpace: 'pre-wrap',
            borderLeft: '4px solid #3498db'
          }}>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailTemplate;
