// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const gunCards = document.querySelectorAll('.gun-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    gunCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.classList.add('animate__animated', 'animate__fadeIn');
        } else {
            card.style.display = 'none';
        }
    });
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Notification System
function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    const messageElement = notification.querySelector('.notification-message');
    messageElement.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

document.querySelector('.notification-close').addEventListener('click', () => {
    document.getElementById('notification').classList.remove('show');
});

// Image Loading Handler
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gun-card img');
    
    images.forEach(img => {
        // Show loading state
        const container = img.parentElement;
        container.classList.add('loading');
        
        // Handle successful load
        img.addEventListener('load', () => {
            container.classList.remove('loading');
            img.classList.add('loaded');
        });
        
        // Handle error
        img.addEventListener('error', () => {
            container.classList.remove('loading');
            container.innerHTML = '<div class="image-error">Failed to load image</div>';
        });
        
        // Force image load
        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Message sent successfully! We will get back to you soon.');
    e.target.reset();
});

// Loader Animation
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = 0;
        setTimeout(() => loader.style.display = 'none', 400);
    }, 900);
});

// Initialize AOS
AOS.init({
    duration: 700,
    once: true,
    offset: 80
});

// --- FILTERS & SORT ---
const filterEra = document.getElementById('filterEra');
const filterOrigin = document.getElementById('filterOrigin');
const filterType = document.getElementById('filterType');
const sortGallery = document.getElementById('sortGallery');
const galleryItems = document.querySelectorAll('.gallery-item');

function filterGallery() {
    const era = filterEra.value;
    const origin = filterOrigin.value;
    const type = filterType.value;
    const search = searchInput.value.toLowerCase();
    galleryItems.forEach(item => {
        let show = true;
        const title = item.querySelector('h3').textContent.toLowerCase();
        const desc = item.querySelector('p').textContent.toLowerCase();
        // Custom data attributes for filtering (add these in HTML for full effect)
        const itemEra = item.getAttribute('data-era') || '';
        const itemOrigin = item.getAttribute('data-origin') || '';
        const itemType = item.getAttribute('data-type') || '';
        if (era && itemEra !== era) show = false;
        if (origin && itemOrigin !== origin) show = false;
        if (type && itemType !== type) show = false;
        if (search && !title.includes(search) && !desc.includes(search)) show = false;
        item.style.display = show ? '' : 'none';
    });
}
[filterEra, filterOrigin, filterType, searchInput].forEach(el => el.addEventListener('input', filterGallery));

// --- SORTING ---
sortGallery.addEventListener('change', () => {
    const sortBy = sortGallery.value;
    const grid = document.querySelector('.gallery-grid');
    const items = Array.from(galleryItems).filter(i => i.style.display !== 'none');
    let sorted;
    if (sortBy === 'year') {
        sorted = items.sort((a, b) => (a.dataset.year || 0) - (b.dataset.year || 0));
    } else if (sortBy === 'country') {
        sorted = items.sort((a, b) => (a.dataset.origin || '').localeCompare(b.dataset.origin || ''));
    } else if (sortBy === 'popularity') {
        sorted = items.sort((a, b) => (b.dataset.popularity || 0) - (a.dataset.popularity || 0));
    } else {
        sorted = items;
    }
    sorted.forEach(item => grid.appendChild(item));
});

// --- MODAL/LIGHTBOX LOGIC ---
const weaponModal = document.getElementById('weaponModal');
const compareModal = document.getElementById('compareModal');
const modalWeaponDetails = document.querySelector('.modal-weapon-details');
const comparisonCards = document.querySelector('.comparison-cards');
let compareList = [];

document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', e => {
        const card = btn.closest('.gallery-item, .gun-card');
        showWeaponModal(card);
    });
});
function showWeaponModal(card) {
    // Extract details from card
    const img = card.querySelector('img').src;
    const title = card.querySelector('h3').textContent;
    const desc = card.querySelector('p').textContent;
    modalWeaponDetails.innerHTML = `<img src="${img}" style="max-width:220px;float:right;margin-left:2rem;"/><h2>${title}</h2><p>${desc}</p>`;
    weaponModal.classList.add('active');
}
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        weaponModal.classList.remove('active');
        compareModal.classList.remove('active');
    });
});
window.addEventListener('click', e => {
    if (e.target === weaponModal) weaponModal.classList.remove('active');
    if (e.target === compareModal) compareModal.classList.remove('active');
});

// --- COMPARISON LOGIC ---
document.querySelectorAll('.compare-checkbox').forEach(cb => {
    cb.addEventListener('change', e => {
        const card = cb.closest('.gallery-item, .gun-card');
        const weapon = card.querySelector('h3').textContent;
        if (cb.checked) {
            if (compareList.length < 2) {
                compareList.push(card);
            } else {
                cb.checked = false;
                showNotification('You can only compare two weapons at a time.');
            }
        } else {
            compareList = compareList.filter(c => c !== card);
        }
        if (compareList.length === 2) showCompareModal();
    });
});
function showCompareModal() {
    comparisonCards.innerHTML = '';
    compareList.forEach(card => {
        const img = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;
        comparisonCards.innerHTML += `<div class="compare-card"><img src="${img}" style="max-width:120px;"/><h3>${title}</h3><p>${desc}</p></div>`;
    });
    compareModal.classList.add('active');
}
document.querySelector('.download-comparison').addEventListener('click', () => {
    // Generate PDF for comparison
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;
    compareList.forEach(card => {
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;
        doc.text(title, 10, y);
        y += 10;
        doc.text(desc, 10, y);
        y += 20;
    });
    doc.save('comparison.pdf');
});

// --- FACT SHEET PDF ---
document.querySelectorAll('.download-fact-sheet').forEach(btn => {
    btn.addEventListener('click', () => {
        const details = modalWeaponDetails.innerText;
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(details, 10, 10);
        doc.save('fact-sheet.pdf');
    });
});

// --- ADD TO COMPARE FROM MODAL ---
document.querySelectorAll('.add-to-compare').forEach(btn => {
    btn.addEventListener('click', () => {
        // Find the weapon in the gallery and check its compare box
        const title = modalWeaponDetails.querySelector('h2').textContent;
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (item.querySelector('h3').textContent === title) {
                const cb = item.querySelector('.compare-checkbox');
                if (!cb.checked) cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
        });
        weaponModal.classList.remove('active');
    });
});

// --- LAZY LOAD ENHANCEMENT ---
if ('IntersectionObserver' in window) {
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src || entry.target.src;
                obs.unobserve(entry.target);
            }
        });
    });
    imgs.forEach(img => observer.observe(img));
}

// FUNCTIONAL PAGINATION FOR GALLERY SECTION

document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.gallery-grid')) return;
    console.log('[Pagination] DOM ready, initializing functional pagination.');

    // --- Config ---
    const PAGE_KEY = 'galleryPage';
    const PAGE_SIZE_KEY = 'galleryPageSize';
    const DEFAULT_PAGE_SIZE = 100; // Show all by default, can be changed for true pagination
    const GALLERY_PAGES = [
        {
            label: 'All',
            filter: () => true
        },
        {
            label: 'Handguns',
            filter: item => item.type === 'handgun'
        }
        // Add more pages/filters here if needed
    ];

    // --- Data Extraction (cache once) ---
    const galleryData = Array.from(document.querySelectorAll('.gallery-item')).map(item => ({
        element: item,
        type: item.getAttribute('data-type'),
    }));

    // --- Filtering ---
    function filterGalleryData(data, filterFn) {
        return data.filter(filterFn);
    }

    // --- Pagination (for true page size, not just 1 page per filter) ---
    function paginateData(data, page, pageSize) {
        const start = (page - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }

    // --- Rendering ---
    function renderGallery(data, fade = true) {
        const galleryGrid = document.querySelector('.gallery-grid');
        // Only update if the set of elements is different
        const currentNodes = Array.from(galleryGrid.children);
        const newNodes = data.map(obj => obj.element);
        let changed =
            currentNodes.length !== newNodes.length ||
            currentNodes.some((node, i) => node !== newNodes[i]);
        if (!changed) return;
        while (galleryGrid.firstChild) galleryGrid.removeChild(galleryGrid.firstChild);
        if (fade) {
            galleryGrid.classList.remove('gallery-fade');
            void galleryGrid.offsetWidth;
            galleryGrid.classList.add('gallery-fade');
        }
        data.forEach(obj => {
            galleryGrid.appendChild(obj.element);
        });
    }

    function renderPagination(currentPage, totalPages) {
        const paginationBar = document.querySelector('.pagination-bar');
        paginationBar.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = GALLERY_PAGES[i-1] ? GALLERY_PAGES[i-1].label : i;
            btn.className = 'pagination-page' + (i === currentPage ? ' active' : '');
            btn.addEventListener('click', () => {
                if (getCurrentPage() !== i) {
                    setCurrentPage(i);
                    updateGallery();
                }
            });
            paginationBar.appendChild(btn);
        }
    }

    // --- State Management ---
    function getPageFromURL() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('page')) || 1;
    }
    function setPageInURL(page) {
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    }
    function getCurrentPage() {
        return getPageFromURL() || parseInt(localStorage.getItem(PAGE_KEY)) || 1;
    }
    function setCurrentPage(page) {
        localStorage.setItem(PAGE_KEY, page);
        setPageInURL(page);
    }
    // (Optional) Page size for true pagination
    function getCurrentPageSize() {
        return parseInt(localStorage.getItem(PAGE_SIZE_KEY)) || DEFAULT_PAGE_SIZE;
    }
    function setCurrentPageSize(size) {
        localStorage.setItem(PAGE_SIZE_KEY, size);
    }

    // --- Main Update Function ---
    function updateGallery() {
        const page = getCurrentPage();
        const pageSize = getCurrentPageSize();
        const filterFn = GALLERY_PAGES[page-1] ? GALLERY_PAGES[page-1].filter : (() => true);
        const filtered = filterGalleryData(galleryData, filterFn);
        // For true pagination, use paginateData(filtered, 1, pageSize)
        renderGallery(filtered, true);
        renderPagination(page, GALLERY_PAGES.length);
    }

    // --- Init ---
    if (!getPageFromURL() && !localStorage.getItem(PAGE_KEY)) setCurrentPage(1);
    updateGallery();
    window.addEventListener('popstate', updateGallery);
});

