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

// Handgun Gallery Data

function renderHandgunGallery() {
    const grid = document.querySelector('.handgun-gallery-grid');
    grid.innerHTML = '';
    handguns.forEach(handgun => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <div class="gallery-item-inner">
                <img src="${handgun.img}" alt="${handgun.name}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${handgun.name}</h3>
                    <p>${handgun.desc}</p>
                    <a href="${handgun.link}" class="view-details" target="_blank" rel="noopener">Product Link</a>
                </div>
            </div>
        `;
        grid.appendChild(item);
    });
}

// Gallery Pagination Logic
const riflesGrid = document.querySelector('.gallery-grid');
const handgunGrid = document.querySelector('.handgun-gallery-grid');
const pageNumbers = document.querySelectorAll('.page-number');

function setGalleryPage(page) {
    // Hide all grids
    riflesGrid.style.display = 'none';
    handgunGrid.style.display = 'none';

    // Remove active class from all page numbers
    pageNumbers.forEach(btn => btn.classList.remove('active'));
    pageNumbers[page - 1].classList.add('active');

    // Show the correct grid
    if (page === 1) {
        riflesGrid.style.display = '';
    } else if (page === 2) {
        handgunGrid.style.display = '';
        renderHandgunGallery();
    } else {
        // For other pages, you can add more logic here
    }
}

// Add event listeners to page number buttons
pageNumbers.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        setGalleryPage(idx + 1);
    });
});

// Show rifles grid by default
setGalleryPage(1); 