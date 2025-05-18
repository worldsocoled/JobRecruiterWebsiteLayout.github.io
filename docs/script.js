// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on click outside
    document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target) && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Testimonial Carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const testimonials = [
        {
            quote: "TalentSphere Pro helped us build an entire engineering team in record time. Their vetting process saved us hundreds of hiring hours!",
            author: "Michael Chen",
            role: "VP of Technology, FutureTech Innovations",
            result: "45 hires in 3 months"
        },
        {
            quote: "The quality of candidates was exceptional. We filled a critical CTO position we'd been trying to fill for 18 months within 6 weeks.",
            author: "Sarah Williamson",
            role: "CEO, GreenEnergy Solutions",
            result: "C-Level placement in 42 days"
        },
        {
            quote: "Their global recruitment network helped us establish our APAC operations with perfect cultural fits. Truly invaluable partnership.",
            author: "James O'Connor",
            role: "COO, MediHealth International",
            result: "23 international placements"
        },
        {
            quote: "We reduced our time-to-hire by 60% while improving candidate quality. The data-driven approach was a game changer.",
            author: "Lisa Rodriguez",
            role: "HR Director, UrbanBank",
            result: "68% faster hiring cycle"
        }
    ];

    // Populate carousel
    function populateCarousel() {
        testimonialCarousel.innerHTML = testimonials.map((testimonial, index) => `
            <div class="testimonial-item" data-index="${index}">
                <blockquote>
                    ${testimonial.quote}
                    <cite>
                        ${testimonial.author}<br>
                        <small>${testimonial.role}</small>
                        <span class="result-badge">${testimonial.result}</span>
                    </cite>
                </blockquote>
            </div>
        `).join('');
    }
    populateCarousel();

    // Carousel Navigation
    let currentIndex = 0;
    const carouselItems = document.querySelectorAll('.testimonial-item');
    
    function updateCarousel(index) {
        const offset = -index * 100;
        testimonialCarousel.style.transform = `translateX(${offset}%)`;
        currentIndex = index;
    }

    // Auto-advance carousel every 8 seconds
    let autoCarousel = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateCarousel(currentIndex);
    }, 8000);

    // Pause auto-advance on interaction
    testimonialCarousel.addEventListener('mouseenter', () => clearInterval(autoCarousel));
    testimonialCarousel.addEventListener('mouseleave', () => {
        autoCarousel = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateCarousel(currentIndex);
        }, 8000);
    });

    // Form Validation and Submission
    const searchForm = document.querySelector('.search-form');
    const keywordInput = document.querySelector('#keywords');
    const locationInput = document.querySelector('#location');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!keywordInput.value.trim() || !locationInput.value.trim()) {
            showFormError('Please fill in both search fields');
            return;
        }

        // Simulate API call
        showLoadingState(true);
        setTimeout(() => {
            showLoadingState(false);
            showSuccessMessage('Showing results for your search...');
            // Here you would typically fetch and display results
        }, 1500);
    });

    function showLoadingState(show) {
        const submitButton = searchForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = show ? '<div class="spinner"></div>' : 'Search Jobs';
    }

    function showSuccessMessage(message) {
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) existingAlert.remove();

        const alertDiv = document.createElement('div');
        alertDiv.className = 'form-alert success';
        alertDiv.textContent = message;
        searchForm.prepend(alertDiv);

        setTimeout(() => alertDiv.remove(), 3000);
    }

    function showFormError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-alert error';
        errorDiv.textContent = message;
        searchForm.prepend(errorDiv);

        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Smooth Scroll for Navigation Links with Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100; // Account for fixed header height
                const targetTop = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .stat-item').forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });

    // Statistics Counter Animation
    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach((num, index) => {
                    const target = parseInt(num.textContent);
                    let count = 0;
                    const increment = target / 100;
                    
                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            num.textContent = Math.ceil(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            num.textContent = target + '+';
                        }
                    };
                    
                    updateCount();
                });
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);

    // Modal Close with Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals here
        }
    });
});