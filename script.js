/* ============================================
   ROHIT AGARWAL - PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // LIVE IST CLOCK
    // ==========================================
    const clockElement = document.getElementById('ist-time');
    
    function updateISTClock() {
        if (!clockElement) return;
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const istTime = new Date().toLocaleTimeString('en-IN', options);
        clockElement.innerText = `IST // ${istTime}`;
    }
    
    if (clockElement) {
        updateISTClock();
        setInterval(updateISTClock, 1000);
    }

    // ==========================================
    // THEME TOGGLE (Light/Dark Mode)
    // ==========================================
    const themeBtn = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        root.setAttribute('data-theme', 'light');
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            icon.setAttribute('data-feather', 'sun');
        }
    }
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            const icon = themeBtn.querySelector('i');
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            
            if (newTheme === 'light') {
                icon.setAttribute('data-feather', 'sun');
            } else {
                icon.setAttribute('data-feather', 'moon');
            }
            
            feather.replace();
        });
    }

    // ==========================================
    // SEARCH MODAL (Ctrl + K)
    // ==========================================
    const cmdBtn = document.querySelector('.cmd-btn');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    const searchableItems = [];
    
    document.querySelectorAll('.project-card').forEach(card => {
        const title = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;
        searchableItems.push({ type: 'Project', title, desc, link: '#projects', element: card });
    });
    
    document.querySelectorAll('.experience-item').forEach(item => {
        const title = item.querySelector('h3').innerText;
        const company = item.querySelector('.company-name').innerText;
        searchableItems.push({ type: 'Experience', title: `${title} at ${company}`, desc: '', link: '#experience', element: item });
    });
    
    document.querySelectorAll('.cert-item').forEach(item => {
        const title = item.querySelector('h3').innerText;
        const org = item.querySelector('span').innerText;
        searchableItems.push({ type: 'Certification', title, desc: org, link: '#certifications', element: item });
    });

    // Also add sections as search keywords
    searchableItems.push({ type: 'Navigation', title: 'Tech Stack', desc: 'Programming languages and tools', link: '#tech-stack', element: document.querySelector('#tech-stack') });
    searchableItems.push({ type: 'Navigation', title: 'About Me', desc: 'Personal background and info', link: '#about', element: document.querySelector('#about') });
    searchableItems.push({ type: 'Navigation', title: 'Contact', desc: 'Email, Twitter, LinkedIn, GitHub', link: '#contact', element: document.querySelector('#contact') });
    
    function openSearch() {
        if (!searchModal) return;
        searchModal.classList.remove('hidden');
        searchInput.focus();
        renderSearchResults('');
    }
    
    function closeSearch() {
        if (!searchModal) return;
        searchModal.classList.add('hidden');
        searchInput.value = '';
    }
    
    function renderSearchResults(query) {
        if (!searchResults) return;
        searchResults.innerHTML = '';
        
        const q = query.toLowerCase().trim();
        
        if (q === '') {
            searchResults.innerHTML = '<div class="search-result-item"><div class="result-title" style="color: var(--text-tertiary);">Start typing to search projects, experience, etc...</div></div>';
            return;
        }
        
        const filtered = searchableItems.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.desc.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q)
        );
        
        if (filtered.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item"><div class="result-title" style="color: var(--text-tertiary);">No results found.</div></div>';
            return;
        }
        
        filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.innerHTML = `
                <div style="font-size: 11px; color: var(--brand-blue); font-family: var(--font-mono); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">${item.type}</div>
                <div class="result-title">${item.title}</div>
                <div class="result-desc">${item.desc.substring(0, 80)}${item.desc.length > 80 ? '...' : ''}</div>
            `;
            div.addEventListener('click', () => {
                closeSearch();
                const yOffset = -80; 
                const target = document.querySelector(item.link);
                if (target) {
                    const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                    
                    if(item.element) {
                        const el = item.element;
                        const oldBg = el.style.backgroundColor;
                        el.style.backgroundColor = 'var(--bg-hover)';
                        el.style.transition = 'background-color 0.5s';
                        setTimeout(() => el.style.backgroundColor = oldBg, 1500);
                    }
                }
            });
            searchResults.appendChild(div);
        });
    }
    
    if (cmdBtn) {
        cmdBtn.addEventListener('click', openSearch);
    }
    
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) closeSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderSearchResults(e.target.value);
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchModal && searchModal.classList.contains('hidden')) {
                openSearch();
            } else {
                closeSearch();
            }
        }
        
        if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
            closeSearch();
        }
    });

    // ==========================================
    // AUDIO BUTTON (Placeholder)
    // ==========================================
    const audioBtn = document.querySelector('.audio-btn');
    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            alert('Pronunciation audio would play here.');
        });
    }

    // ==========================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ==========================================
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                
                const targetId = this.getAttribute('href');
                
                if(targetId === '#') {
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    return;
                }
                
                const target = document.querySelector(targetId);
                if (target) {
                    const yOffset = -80; 
                    const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                }
            }
        });
    });

    // ==========================================
    // CERTIFICATE MODAL LOGIC
    // ==========================================
    const certModal = document.getElementById('cert-modal');
    const certImg = document.getElementById('cert-img');
    const certTitle = document.getElementById('cert-title');
    const closeCertBtn = document.getElementById('close-cert');

    document.querySelectorAll('.cert-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            if(!certModal) return;
            const title = item.querySelector('h3').innerText;
            const org = item.querySelector('span').innerText;
            const certSrc = item.dataset.certSrc || '';

            certTitle.innerText = `${title} - ${org}`;

            if (certSrc) {
                certImg.src = certSrc;
            } else {
                const placeholderUrl = `https://placehold.co/800x600/18181b/fafafa?text=${encodeURIComponent(title)}\n${encodeURIComponent(org)}`;
                certImg.src = placeholderUrl;
            }

            certModal.classList.remove('hidden');
        });
    });

    function closeCertModal() {
        if(certModal) certModal.classList.add('hidden');
    }

    if(closeCertBtn) closeCertBtn.addEventListener('click', closeCertModal);
    if(certModal) certModal.addEventListener('click', (e) => {
        if(e.target === certModal) closeCertModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCertModal();
        }
    });

});
