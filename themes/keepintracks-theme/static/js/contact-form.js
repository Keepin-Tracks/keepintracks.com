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
  
  // Detect language from HTML lang attribute or URL
  const htmlLang = document.documentElement.lang || 'en';
  const isFrench = htmlLang.startsWith('fr') || window.location.pathname.startsWith('/fr/');
  
  // Translation strings
  const translations = {
    en: {
      sending: 'Sending...',
      sendMessage: 'Send Message',
      fillAllFields: 'Please fill in all required fields.',
      invalidEmail: 'Please enter a valid email address.',
      success: 'Message sent successfully! We\'ll get back to you soon.',
      failed: 'Failed to send message. Please try again or email us directly at info@keepintracks.com',
      networkError: 'Network error. Please check your connection and try again.',
      tryAgain: 'Failed to send message. Please try again.'
    },
    fr: {
      sending: 'Envoi en cours...',
      sendMessage: 'Envoyer le message',
      fillAllFields: 'Veuillez remplir tous les champs requis.',
      invalidEmail: 'Veuillez entrer une adresse e-mail valide.',
      success: 'Message envoyé avec succès ! Nous vous répondrons bientôt.',
      failed: 'Échec de l\'envoi du message. Veuillez réessayer ou nous écrire directement à info@keepintracks.com',
      networkError: 'Erreur réseau. Veuillez vérifier votre connexion et réessayer.',
      tryAgain: 'Échec de l\'envoi du message. Veuillez réessayer.'
    }
  };
  
  const t = translations[isFrench ? 'fr' : 'en'];
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const subject = formData.get('subject')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';
    
    // Validate form data
    if (!subject || !email || !message) {
      formMessage.textContent = t.fillAllFields;
      formMessage.className = 'form-message form-message-error';
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.textContent = t.invalidEmail;
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
    submitText.textContent = t.sending;
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
        formMessage.textContent = t.success;
        formMessage.className = 'form-message form-message-success';
        form.reset();
      } else {
        // Handle error response
        const errorMessage = result.error || t.tryAgain;
        throw new Error(errorMessage);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      let errorMessage = t.failed;
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = t.networkError;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      formMessage.textContent = errorMessage;
      formMessage.className = 'form-message form-message-error';
      console.error('Contact form error:', error);
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitText.textContent = t.sendMessage;
    }
  });
});

