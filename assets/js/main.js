/* -- THEME -- */
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}
const themeToggleBtn = document.getElementById('themeToggleBtn');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        if (current === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

/* -- MENU -- */
const menuBtn     = document.getElementById('menuBtn');
const menuClose   = document.getElementById('menuClose');
const menuOverlay = document.getElementById('menuOverlay');
if (menuBtn && menuClose && menuOverlay) {
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
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

/* -- TICKER -- */
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

/* -- HOMEPAGE POSTS -- */
async function loadPosts() {
    const heroWrap    = document.getElementById('heroWrap');
    const articleGrid = document.getElementById('articleGrid');
    if (!heroWrap) return;

    try {
        const res = await fetch('/posts.json');
        if (!res.ok) throw new Error('posts.json not found');
        const posts = await res.json();

        if (!posts.length) {
            heroWrap.innerHTML = '<div class="loading-msg">No stories published yet.</div>';
            return;
        }

        const hero  = posts[0];
        const sides = posts.slice(1, 3);

        heroWrap.innerHTML = `
            <a href="${hero.url}" class="hero-main">
                <img src="${hero.thumbnail}" alt="${hero.title}" onerror="this.style.display='none'">
                <div class="hero-main-grad"></div>
                <div class="hero-main-body">
                    <div class="hero-cat"><span class="hero-cat-dot"></span>Top Story</div>
                    <h1 class="hero-h1">${hero.title}</h1>
                    <p class="hero-excerpt">${hero.excerpt || ''}</p>
                    <div class="hero-meta">
                        <span>${hero.date}</span>
                        <span class="hero-meta-cta">Read Full Article &rarr;</span>
                    </div>
                </div>
            </a>
            <div class="hero-side">
                ${sides.length ? sides.map(p => `
                    <a href="${p.url}" class="hero-side-card">
                        <img class="side-thumb" src="${p.thumbnail}" alt="${p.title}" onerror="this.style.display='none'">
                        <div class="hero-cat" style="width:fit-content;"><span class="hero-cat-dot"></span>News</div>
                        <h3 class="side-h3">${p.title}</h3>
                        <p class="side-excerpt">${(p.excerpt || '').slice(0, 95)}&hellip;</p>
                        <div class="side-date">${p.date}</div>
                    </a>`).join('') : '<div class="loading-msg" style="padding:20px;font-size:9px;">More stories coming soon.</div>'}
            </div>`;

        if (!articleGrid) return;
        const rest = posts.slice(3);
        if (!rest.length) return;
        articleGrid.innerHTML = rest.map(p => `
            <a href="${p.url}" class="card">
                <div class="card-img">
                    <img src="${p.thumbnail}" alt="${p.title}" onerror="this.style.display='none'">
                    <div class="card-img-grad"></div>
                </div>
                <div class="card-body">
                    <div class="hero-cat" style="width:fit-content;"><span class="hero-cat-dot"></span>News</div>
                    <h3 class="card-h3">${p.title}</h3>
                    <p class="card-excerpt">${(p.excerpt || '').slice(0, 105)}&hellip;</p>
                    <div class="card-footer">
                        <span>${p.date}</span>
                        <span class="card-arrow">Read &rarr;</span>
                    </div>
                </div>
            </a>`).join('');

    } catch (err) {
        if (heroWrap) heroWrap.innerHTML = `<div class="loading-msg" style="color:var(--red);">Error: ${err.message}</div>`;
    }
}
loadPosts();
