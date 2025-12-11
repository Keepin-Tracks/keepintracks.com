document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const formMessage = document.getElementById('form-message');
  
  if (!form) {
    console.warn('Contact form not found');
    return;
  }
  
  if (!submitBtn || !submitText || !formMessage) {
    console.error('Contact form elements not found');
    return;
  }
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const subject = formData.get('subject')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';
    
    // Validate form data
    if (!subject || !email || !message) {
      formMessage.textContent = 'Please fill in all required fields.';
      formMessage.className = 'form-message form-message-error';
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.className = 'form-message form-message-error';
      return;
    }
    
    const data = {
      subject: subject,
      email: email,
      message: message
    };
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    try {
      // Use Cloudflare Worker custom domain for contact form submissions
      const apiUrl = 'https://workers.keepintracks.com';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      // Check if response is ok before parsing JSON
      const result = await response.json();
      
      if (response.ok) {
        formMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
        formMessage.className = 'form-message form-message-success';
        form.reset();
      } else {
        // Handle error response
        const errorMessage = result.error || 'Failed to send message. Please try again.';
        throw new Error(errorMessage);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      let errorMessage = 'Failed to send message. Please try again or email us directly at info@keepintracks.com';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      formMessage.textContent = errorMessage;
      formMessage.className = 'form-message form-message-error';
      console.error('Contact form error:', error);
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
    }
  });
});

