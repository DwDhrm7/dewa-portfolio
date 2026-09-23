// Language Toggle
  const langBtn = document.getElementById('langBtn');
  let lang = 'en';
  
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerHTML = el.dataset.en;
  });

  langBtn.addEventListener('click', () => {
    lang = lang === 'id' ? 'en' : 'id';
    langBtn.textContent = lang === 'en' ? 'ID' : 'EN';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-id]').forEach(el => {
      el.innerHTML = el.dataset[lang];
    });
  });

  // Nav Scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  // Reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
