document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
  
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('night-mode');
      themeToggle.textContent = body.classList.contains('night-mode') 
        ? 'Switch to Day Mode' 
        : 'Switch to Night Mode';
    });
  });
  