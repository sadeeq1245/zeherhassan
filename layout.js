(function () {
    function initLayout() {
        // 1. Inject External Dependencies & Web Fonts to <head>
        const dependencies = [
            { tag: 'link', rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' },
            { tag: 'link', rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700;800;900&display=swap' },
            { tag: 'link', rel: 'icon', type: 'image/png', href: 'favicon.png' },
            { tag: 'link', rel: 'apple-touch-icon', href: 'favicon.png' }
        ];
        
        dependencies.forEach(dep => {
            if (!document.querySelector(`link[href="${dep.href}"]`)) {
                const el = document.createElement('link');
                Object.keys(dep).forEach(key => {
                    if (key !== 'tag') el.setAttribute(key, dep[key]);
                });
                document.head.appendChild(el);
            }
        });

        // 2. Inject Global CSS Styles
        if (!document.getElementById('layout-styles')) {
            const styleEl = document.createElement("style");
            styleEl.id = 'layout-styles';
            styleEl.textContent = `
                /* ── THEMING VARIABLES ── */
                :root {
                    color-scheme: dark;
                    --red: #ff3131;
                    --bg-color: #090909;
                    --text-color: #ffffff;
                    --text-muted: #aaaaaa;
                    --text-sub: #777777;
                    --card-bg: #111111;
                    --card-hover: #181818;
                    --border-color: rgba(255,255,255,0.07);
                    --header-bg: rgba(9,9,9,0.96);
                    --footer-bg: #000000;
                    --overlay-bg: rgba(5,5,5,0.98);
                    --bnav-bg: rgba(6,6,6,0.98);
                    --grad-start: rgba(9,9,9,1);
                    --grad-mid: rgba(9,9,9,0.65);
                    --grad-card: rgba(9,9,9,0.75);
                    --ghost-color: rgba(255,255,255,0.025);
                }

                [data-theme="light"] {
                    color-scheme: light;
                    --bg-color: #f4f4f4;
                    --text-color: #111111;
                    --text-muted: #666666;
                    --text-sub: #555555;
                    --card-bg: #ffffff;
                    --card-hover: #fafafa;
                    --border-color: rgba(0,0,0,0.08);
                    --header-bg: rgba(244,244,244,0.96);
                    --footer-bg: #e8e8e8;
                    --overlay-bg: rgba(244,244,244,0.98);
                    --bnav-bg: rgba(244,244,244,0.98);
                    --grad-start: rgba(244,244,244,1);
                    --grad-mid: rgba(244,244,244,0.75);
                    --grad-card: rgba(244,244,244,0.85);
                    --ghost-color: rgba(0,0,0,0.025);
                }

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }
                body {
                    background: var(--bg-color);
                    color: var(--text-color);
                    font-family: 'Inter', sans-serif;
                    -webkit-font-smoothing: antialiased;
                    transition: background 0.3s ease, color 0.3s ease;
                }
                a { text-decoration: none; color: inherit; }
                img { display: block; }

                /* ── HEADER ── */
                .site-header {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 200;
                    background: var(--header-bg);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid var(--border-color);
                    height: 60px;
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    padding: 0 18px;
                    transition: background 0.3s ease, border-color 0.3s ease;
                }
                @media(min-width:768px){ .site-header { padding: 0 36px; } }

                .hdr-logo {
                    font-family: 'Inter', sans-serif;
                    font-weight: 900;
                    font-size: 26px;
                    letter-spacing: -2px;
                    line-height: 1;
                }
                .hdr-logo .z { color: var(--text-color); }
                .hdr-logo .h { color: var(--red); }

                .hdr-brand {
                    font-family: 'Inter', sans-serif;
                    font-weight: 800;
                    font-size: 16px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    text-align: center;
                    color: var(--text-color);
                    white-space: nowrap;
                }
                .hdr-brand span { color: var(--red); }

                .hdr-menu-btn {
                    justify-self: end;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 6px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    align-items: flex-end;
                }
                .hdr-menu-btn .bar {
                    display: block;
                    height: 2px;
                    background: var(--text-color);
                    border-radius: 2px;
                    transition: background 0.2s;
                }
                .hdr-menu-btn .bar:nth-child(1) { width: 22px; }
                .hdr-menu-btn .bar:nth-child(2) { width: 16px; }
                .hdr-menu-btn .bar:nth-child(3) { width: 22px; }
                .hdr-menu-btn:hover .bar { background: var(--red); }

                /* ── BREAKING TICKER ── */
                .ticker {
                    position: fixed;
                    top: 60px; left: 0; right: 0;
                    z-index: 190;
                    height: 32px;
                    background: var(--red);
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }
                .ticker-label {
                    flex-shrink: 0;
                    background: var(--card-bg);
                    height: 100%;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 0 14px;
                    font-family: 'Space Mono', monospace;
                    font-size: 8px;
                    font-weight: 700;
                    letter-spacing: 2px;
                    color: var(--red);
                    text-transform: uppercase;
                    transition: background 0.3s ease;
                }
                .live-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: var(--red);
                    animation: blink 1.4s ease-in-out infinite;
                }
                @keyframes blink { 0%,100%{ opacity:1; } 50%{ opacity:0.3; } }
                .ticker-track-wrap { overflow: hidden; flex: 1; }
                .ticker-track {
                    display: flex;
                    white-space: nowrap;
                    animation: scroll-left 45s linear infinite;
                }
                @keyframes scroll-left {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                .ticker-item {
                    font-family: 'Space Mono', monospace;
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    color: #fff;
                    padding: 0 28px;
                }
                .ticker-sep { opacity: 0.35; }

                /* ── MAIN CONFIG ── */
                main {
                    padding-top: 110px;
                    padding-bottom: 84px; 
                }

                /* ── MENU OVERLAY ── */
                .menu-overlay {
                    position: fixed; inset: 0; z-index: 300;
                    background: var(--overlay-bg);
                    display: flex; flex-direction: column; justify-content: center;
                    padding: 60px 28px;
                    opacity: 0; visibility: hidden;
                    transition: opacity 0.3s ease, visibility 0.3s ease, background 0.3s ease;
                }
                @media(min-width:768px){ .menu-overlay{ padding:60px 64px; } }
                .menu-overlay.open { opacity: 1; visibility: visible; }
                .menu-x {
                    position: absolute; top: 16px; right: 18px;
                    background: none; border: none;
                    color: var(--text-color); font-size: 22px; cursor: pointer;
                    width: 44px; height: 44px;
                    display: flex; align-items: center; justify-content: center;
                    transition: color 0.2s;
                }
                .menu-x:hover { color: var(--red); }
                .menu-nav { display: flex; flex-direction: column; gap: 0; }
                .menu-nav-link {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(32px, 7vw, 76px);
                    font-weight: 900; line-height: 1.1;
                    color: var(--text-color); display: flex; align-items: center; gap: 14px;
                    transition: color 0.2s, transform 0.25s;
                    padding: 6px 0;
                }
                .menu-nav-link:hover { color: var(--red); transform: translateX(12px); }
                .menu-n {
                    font-family: 'Space Mono', monospace;
                    font-size: 10px; font-weight: 700;
                    color: var(--red); letter-spacing: 2px;
                    min-width: 26px; align-self: center;
                }
                .menu-sub-links {
                    display: flex; gap: 24px; margin-top: 44px; flex-wrap: wrap; align-items: center;
                }
                .menu-sub-lnk, .theme-toggle-btn {
                    font-family: 'Space Mono', monospace;
                    font-size: 10px; color: var(--text-sub);
                    text-transform: uppercase; letter-spacing: 2px;
                    transition: color 0.2s;
                    background: none; border: none; cursor: pointer;
                    display: flex; align-items: center; gap: 8px;
                    padding: 0;
                }
                .menu-sub-lnk:hover, .theme-toggle-btn:hover { color: var(--text-color); }
                .menu-ghost {
                    position: absolute; bottom: 30px; right: -10px;
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(90px, 20vw, 200px);
                    font-weight: 900; line-height: 1;
                    color: var(--ghost-color);
                    pointer-events: none; user-select: none;
                    letter-spacing: -6px;
                }

                /* ── FOOTER ── */
                footer {
                    border-top: 1px solid var(--border-color);
                    background: var(--footer-bg);
                    padding: 32px 18px 20px;
                    transition: background 0.3s ease;
                }
                @media(min-width:768px){ footer{ padding:32px 36px 20px; } }
                .ftr-brand {
                    font-family: 'Playfair Display', serif;
                    font-size: 28px; font-weight: 900; margin-bottom: 18px;
                    color: var(--text-color);
                }
                .ftr-brand span { color: var(--red); }
                .ftr-rule { height: 1px; background: var(--border-color); margin-bottom: 18px; }
                .ftr-bottom { display: flex; flex-direction: column; gap: 10px; }
                @media(min-width:600px){ .ftr-bottom{ flex-direction:row; justify-content:space-between; align-items:center; } }
                .ftr-copy {
                    font-family: 'Space Mono', monospace;
                    font-size: 9px; color: var(--text-muted);
                    text-transform: uppercase; letter-spacing: 1px;
                }
                .ftr-links { display: flex; gap: 18px; }
                .ftr-lnk {
                    font-family: 'Space Mono', monospace;
                    font-size: 9px; color: var(--text-sub);
                    text-transform: uppercase; letter-spacing: 1px;
                    transition: color 0.2s;
                }
                .ftr-lnk:hover { color: var(--text-color); }

                /* ── BOTTOM NAV ── */
                .bottom-nav {
                    position: fixed;
                    bottom: 0; left: 0; right: 0;
                    z-index: 200;
                    height: 64px;
                    background: var(--bnav-bg);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border-top: 1px solid var(--border-color);
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    transition: background 0.3s ease;
                }
                .bnav-item {
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    gap: 4px; color: var(--text-sub);
                    transition: color 0.2s;
                    position: relative;
                    cursor: pointer;
                }
                .bnav-item:hover { color: var(--text-color); }
                .bnav-item.active { color: var(--red); }
                .bnav-item.active::before {
                    content: '';
                    position: absolute; top: 0; left: 50%;
                    transform: translateX(-50%);
                    width: 28px; height: 2px;
                    background: var(--red);
                    border-radius: 0 0 3px 3px;
                }
                .bnav-item i { font-size: 18px; }
                .bnav-label {
                    font-family: 'Space Mono', monospace;
                    font-size: 8px; letter-spacing: 1.5px;
                    text-transform: uppercase;
                }
            `;
            document.head.appendChild(styleEl);
        }

        // 3. Find structural point `<main>` element
        const mainEl = document.querySelector("main");
        if (!mainEl) {
            console.error("Layout engine requires a <main> element target context.");
            return;
        }

        // 4. Inject Global Elements (Using insertAdjacentHTML to avoid extra wrappers on mobile)
        const topHTML = `
            <header class="site-header">
                <div class="hdr-logo"><span class="z">Z</span><span class="h">H</span></div>
                <a href="/" class="hdr-brand">Zeher <span>Hassan</span></a>
                <button class="hdr-menu-btn" id="menuBtn" aria-label="Open menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>
            </header>
            <div class="ticker">
                <div class="ticker-label"><span class="live-dot"></span> Breaking</div>
                <div class="ticker-track-wrap">
                    <div class="ticker-track" id="tickerTrack"></div>
                </div>
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
                    <button id="themeToggleBtn" class="theme-toggle-btn">
                        <i class="fa-solid fa-circle-half-stroke"></i> Toggle Theme
                    </button>
                    <a href="/privacy-policy.html" class="menu-sub-lnk">Privacy Policy</a>
                </div>
                <div class="menu-ghost">ZH</div>
            </div>
        `;

        const bottomHTML = `
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
                <a href="/" class="bnav-item" data-path="home">
                    <i class="fa-solid fa-house"></i>
                    <span class="bnav-label">Home</span>
                </a>
                <a href="/articles.html" class="bnav-item" data-path="articles">
                    <i class="fa-solid fa-newspaper"></i>
                    <span class="bnav-label">Articles</span>
                </a>
                <a href="/news.html" class="bnav-item" data-path="news">
                    <i class="fa-solid fa-wifi"></i>
                    <span class="bnav-label">News</span>
                </a>
                <a href="/about.html" class="bnav-item" data-path="about">
                    <i class="fa-solid fa-user"></i>
                    <span class="bnav-label">About</span>
                </a>
            </nav>
        `;

        mainEl.insertAdjacentHTML('beforebegin', topHTML);
        mainEl.insertAdjacentHTML('afterend', bottomHTML);

        // 5. Manage Theme Switch State Mechanics
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        const currentTheme = localStorage.getItem('theme') || 'dark';
        if (currentTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

        if (themeToggleBtn) {
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
        }

        // 6. Interactive Overlay Event Bindings
        const menuBtn = document.getElementById('menuBtn');
        const menuClose = document.getElementById('menuClose');
        const menuOverlay = document.getElementById('menuOverlay');
        
        if (menuBtn && menuOverlay) {
            menuBtn.addEventListener('click', () => {
                menuOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            });

            [menuClose, menuOverlay].forEach(el => {
                if(el) {
                    el.addEventListener('click', e => {
                        if (e.target === menuOverlay || e.target === menuClose || menuClose.contains(e.target)) {
                            menuOverlay.classList.remove('open');
                            document.body.style.overflow = '';
                        }
                    });
                }
            });
        }

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && menuOverlay) { 
                menuOverlay.classList.remove('open'); 
                document.body.style.overflow = ''; 
            }
        });

        // 7. Ticker Text Serialization Track Initialization 
        const headlines = [
            'US-Iran ceasefire negotiations collapse amid Gulf tensions',
            'NVIDIA unveils next-generation AI chip architecture',
            'China accelerates domestic chip manufacturing amid US export bans',
            'NATO expands eastern flank with new defence commitments',
            'Pakistan-India diplomatic talks resume after months of silence',
            'TSMC breaks ground on Arizona Fab 3 expansion',
            'South China Sea: US carrier group conducts freedom of navigation exercise',
            'OpenAI raises $40B at record valuation',
        ];
        const track = document.getElementById('tickerTrack');
        if (track) {
            track.innerHTML = [...headlines, ...headlines]
                .map(h => `<span class="ticker-item">${h} <span class="ticker-sep">//</span></span>`)
                .join('');
        }

        // 8. Synchronize Active Link Context States on Bottom Mobile Navigation Bar
        const currentPath = window.location.pathname;
        document.querySelectorAll(".bnav-item").forEach(item => {
            const targetPath = item.getAttribute("href");
            if (currentPath === targetPath || (currentPath === "/" && targetPath === "/")) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    // ── THE CRITICAL MOBILE FIX ──
    // Instead of unconditionally waiting for DOMContentLoaded (which might have already passed),
    // we check the readyState. If the HTML is already parsed, fire immediately.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLayout);
    } else {
        initLayout();
    }
})();
