// FunciÃ³n original de descarga (se mantiene para uso futuro)
async function downloadLatestRelease(e) {
    if (e) e.preventDefault();
    const btn = e.currentTarget || document.getElementById('primaryAction');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Obteniendo release...';
    btn.style.pointerEvents = 'none';
    try {
        const res = await fetch('https://api.github.com/repos/JavierFrauca/cerebria/releases/latest');
        if (!res.ok) throw new Error('No se pudo obtener la release');
        const data = await res.json();
        if (data.assets && data.assets.length > 0) {
            window.location.href = data.assets[0].browser_download_url;
        } else {
            window.open(data.html_url, '_blank');
        }
    } catch (err) {
        window.open('https://github.com/JavierFrauca/cerebria/releases/latest', '_blank');
    } finally {
        btn.innerHTML = originalHTML;
        btn.style.pointerEvents = '';
    }
}

// LÃ³gica del Modal "Coming Soon"
const modalOverlay = document.getElementById('comingSoonModal');
const closeModalBtn = document.getElementById('closeModal');
const acceptModalBtn = document.getElementById('acceptModal');

function showComingSoon(e) {
    if (e) e.preventDefault();
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evitar scroll
}

function hideComingSoon() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
}

// Event Listeners para el Modal
if (closeModalBtn) closeModalBtn.addEventListener('click', hideComingSoon);
if (acceptModalBtn) acceptModalBtn.addEventListener('click', hideComingSoon);
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) hideComingSoon();
    });
}

// Reemplazamos la acciÃ³n de descarga por el popup de Hype
const downloadButtons = [
    document.getElementById('primaryAction'),
    document.getElementById('fakeDownloadBtn'),
    document.getElementById('bottomDownload')
];

downloadButtons.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', showComingSoon);
    }
});

// Scroll suave para los enlaces de ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#") return;
        
        // Si el enlace es uno de los de descarga, ya tiene su listener
        if (this.id === 'fakeDownloadBtn' || this.id === 'primaryAction' || this.id === 'bottomDownload') return;

        if (href.startsWith("#") && href !== "#") {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
