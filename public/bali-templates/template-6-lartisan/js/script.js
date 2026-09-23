// Form reservasi -> kirim ke WhatsApp
document.getElementById('resBtn').addEventListener('click', () => {
    const n = document.getElementById('resName').value || '-';
    const e = document.getElementById('resEmail').value || '-';
    const d = document.getElementById('resDate').value || '-';
    const g = document.getElementById('resGuests').value || '2';
    const msg = encodeURIComponent(`Hello L'Artisan, I would like to reserve a table.\nName: ${n}\nEmail: ${e}\nDate: ${d}\nGuests: ${g}`);
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
});

// Intersection Observer for fade-up animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll('.fade-up').forEach((el) => {
    observer.observe(el);
});
