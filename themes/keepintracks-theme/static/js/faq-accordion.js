(function() {
  'use strict';
  
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
      const button = item.querySelector('.faq-question-btn');
      const answer = item.querySelector('.faq-answer');
      
      if (!button || !answer) return;
      
      // Ensure initial state is closed
      item.setAttribute('aria-expanded', 'false');
      
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isExpanded = item.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current FAQ
        const newState = !isExpanded;
        item.setAttribute('aria-expanded', newState ? 'true' : 'false');
      });
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
  } else {
    initFAQ();
  }
})();

