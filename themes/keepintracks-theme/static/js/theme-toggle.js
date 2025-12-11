(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('theme-icon-moon');
  const sunIcon = document.getElementById('theme-icon-sun');
  const html = document.documentElement;

  // Get system preference
  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Get saved theme preference (null if user hasn't set one)
  const savedTheme = localStorage.getItem('theme');
  
  // Check current theme state (may have been set by inline script in head)
  const currentThemeState = html.getAttribute('data-theme');
  
  // Determine current theme: use existing state if set, otherwise check saved/system
  let currentTheme;
  if (currentThemeState === 'dark') {
    currentTheme = 'dark';
  } else if (savedTheme) {
    currentTheme = savedTheme;
  } else {
    currentTheme = getSystemTheme();
  }
  
  // Apply theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      html.removeAttribute('data-theme');
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  }

  // Sync icons with current theme (theme may already be applied by inline script)
  applyTheme(currentTheme);

  // Listen for system theme changes (only if user hasn't set a preference)
  if (!savedTheme && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only update if user hasn't explicitly set a preference
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    // Save user's explicit preference
    localStorage.setItem('theme', newTheme);
  });
})();

