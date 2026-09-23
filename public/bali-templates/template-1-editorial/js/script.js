// ---- Bilingual toggle (ID default, EN for tourists) ----
  const langBtn = document.getElementById('langBtn');
  let lang = 'en';
  document.querySelectorAll('[data-id]').forEach(el => { el.innerHTML = el.dataset['en'] || el.innerHTML; });
  document.documentElement.lang = 'en';
  langBtn.textContent = 'ID';
  langBtn.addEventListener('click', () => {
    lang = lang === 'id' ? 'en' : 'id';
    langBtn.textContent = lang === 'en' ? 'ID' : 'EN';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-id]').forEach(el => {
      el.textContent = el.dataset[lang];
    });
  });

  // ---- Nav shadow saat scroll ----
  const navEl = document.querySelector('nav');
  window.addEventListener('scroll', () => navEl.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

  // ---- Scroll reveal ----
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
