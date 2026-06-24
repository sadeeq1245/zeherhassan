// layout.js

// 1. Define the HTML for your Header, Ticker, and Menu
const headerHTML = `
<header class="site-header">
    <div class="hdr-logo"><span class="z">Z</span><span class="h">H</span></div>
    <a href="/" class="hdr-brand">Zeher <span>Hassan</span></a>
    <button class="hdr-menu-btn" id="menuBtn" aria-label="Open menu">
        <span class="bar"></span><span class="bar"></span><span class="bar"></span>
    </button>
</header>

<div class="ticker">
    <div class="ticker-label"><span class="live-dot"></span> Breaking</div>
    <div class="ticker-track-wrap"><div class="ticker-track" id="tickerTrack"></div></div>
</div>

<div class="menu-overlay" id="menuOverlay">
    <button class="menu-x" id="menuClose" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    <nav class="menu-nav">
        <a href="/" class="menu-nav-link"><span class="menu-n">01</span>Home</a>
        <a href="/articles.html" class="menu-nav-link"><span class="menu-n">02</span>Latest Articles</a>
        <a href="/news.html"  class="menu-nav-link"><span class="menu-n">03</span>News</a>
        <a href="/about.html" class="menu-nav-link"><span class="menu-n">04</span>About Us</a>
        <a href="/contact.html" class="menu-nav-link"><span class="menu-n">05</span>Contact Us</a>
    </nav>
    <div class="menu-sub-links">
        <button id="themeToggleBtn" class="theme-toggle-btn"><i class="fa-solid fa-circle-half-stroke"></i> Toggle Theme</button>
        <a href="/privacy-policy.html" class="menu-sub-lnk">Privacy Policy</a>
    </div>
    <div class="menu-ghost">ZH</div>
</div>
`;

// 2. Define the HTML for your Footer and Bottom Nav
const footerHTML = `
<footer>
    <div class="ftr-brand">Zeher <span>Hassan</span></div>
    <div class="ftr-rule"></div>
    <div class="ftr-bottom">
        <div class="ftr-copy">&copy; 2026 Zeher Hassan. All rights reserved.</div>
        <div class="ftr-links">
            <a href="/about.html" class="ftr-lnk">About Us</a>
            <a href="/contact.html" class="ftr-lnk">Contact Us</a>
            <a href="/privacy-policy.html" class="ftr-lnk">Privacy</a>
        </div>
    </div>
</footer>

<nav class="bottom-nav">
    <a href="/" class="bnav-item active"><i class="fa-solid fa-house"></i><span class="bnav-label">Home</span></a>
    <a href="/articles.html" class="bnav-item"><i class="fa-solid fa-newspaper"></i><span class="bnav-label">Articles</span></a>
    <a href="/news.html" class="bnav-item"><i class="fa-solid fa-wifi"></i><span class="bnav-label">News</span></a>
    <a href="/about.html" class="bnav-item"><i class="fa-solid fa-user"></i><span class="bnav-label">About</span></a>
</nav>
`;

// 3. Inject the HTML into the page immediately
document.body.insertAdjacentHTML('afterbegin', headerHTML);
document.body.insertAdjacentHTML('beforeend', footerHTML);

// 4. NOW run all your logic (Theme, Menu, Ticker) because the HTML exists
function initializeLayout() {
    /* ── THEME TOGGLE ── */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    /* ── MENU ── */
    const menuBtn     = document.getElementById('menuBtn');
    const menuClose   = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    
    menuBtn.addEventListener('click', () => {
        menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    
    [menuClose, menuOverlay].forEach(el => el.addEventListener('click', e => {
        if (e.target === menuOverlay || e.target === menuClose || menuClose.contains(e.target)) {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }));

    /* ── TICKER ── */
    const headlines = [
        'US-Iran ceasefire negotiations collapse amid Gulf tensions',
        'NVIDIA unveils next-generation AI chip architecture',
        'China accelerates domestic chip manufacturing amid US export bans',
        'NATO expands eastern flank with new defence commitments',
        'Pakistan-India diplomatic talks resume after months of silence',
        'TSMC breaks ground on Arizona Fab 3 expansion'
    ];
    const track = document.getElementById('tickerTrack');
    track.innerHTML = [...headlines, ...headlines]
        .map(h => `<span class="ticker-item">${h} <span class="ticker-sep">//</span></span>`)
        .join('');
}

// Run the initialization
initializeLayout();
