(function() {
        'use strict';

        // 1. TYPING EFFECT
        const roles = ['Data Analyst','Data Scientist','Analytics Consultant','BI Developer'];
        let roleIndex = 0, charIndex = 0, isDeleting = false;
        const typingEl = document.getElementById('typingText');

        function typeEffect() {
            const cur = roles[roleIndex];
            if (!isDeleting) {
                typingEl.textContent = cur.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === cur.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 2200);
                    return;
                }
                setTimeout(typeEffect, 110);
            } else {
                typingEl.textContent = cur.substring(0, charIndex);
                charIndex--;
                if (charIndex < 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeEffect, 350);
                    return;
                }
                setTimeout(typeEffect, 55);
            }
        }
        typeEffect();

        // 2. NAVBAR SCROLL
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });

        // 3. MOBILE MENU
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });

        // 4. ACTIVE NAV LINK
        const sections = document.querySelectorAll('section[id]');
        const navAnchors = document.querySelectorAll('.nav-links a');

        function updateActiveLink() {
            let current = '';
            sections.forEach(function(s) {
                if (s.getBoundingClientRect().top <= 150) current = s.id;
            });
            navAnchors.forEach(function(a) {
                const isHireBtn = a.classList.contains('nav-hire-btn');
                a.classList.remove('active');
                if (!isHireBtn && a.getAttribute('href') === '#' + current) a.classList.add('active');
            });
        }
        window.addEventListener('scroll', updateActiveLink);

        // 5. SCROLL REVEAL
        const revealEls = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach(function(el) { revealObserver.observe(el); });

        // 6. SKILL BAR ANIMATION
        const skillFills = document.querySelectorAll('.skill-bar .fill');
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.getAttribute('data-width') + '%';
                }
            });
        }, { threshold: 0.4 });
        skillFills.forEach(function(f) { skillObserver.observe(f); });

        // 7. STAT COUNTER
        const statNumbers = document.querySelectorAll('.stat-item .number');
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    let current = 0;
                    const increment = Math.ceil(target / 60);
                    const timer = setInterval(function() {
                        current += increment;
                        if (current >= target) { el.textContent = target; clearInterval(timer); }
                        else { el.textContent = current; }
                    }, 25);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(function(n) { counterObserver.observe(n); });

        // 8. TOAST
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMsg');
        function showToast(msg, isError) {
            toastMsg.textContent = msg;
            toast.style.borderColor = isError ? 'rgba(239,68,68,0.3)' : 'rgba(16,229,160,0.3)';
            toast.querySelector('i').style.color = isError ? '#ef4444' : 'var(--success)';
            toast.querySelector('i').className = isError ? 'fas fa-times-circle' : 'fas fa-check-circle';
            toast.classList.add('show');
            setTimeout(function() { toast.classList.remove('show'); }, 3500);
        }

        // 9. CONTACT FORM
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!name || !email || !message) { showToast('Please fill in all required fields.', true); return; }

            const btn = contactForm.querySelector('.btn');
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(function() {
                btn.innerHTML = orig;
                btn.disabled = false;
                contactForm.reset();
                showToast('Message sent! I\'ll get back to you soon.');
            }, 1800);
        });

        // 10. DOWNLOAD CV
        document.getElementById('downloadCV').addEventListener('click', function(e) {
            e.preventDefault();
            showToast('CV download will be available soon!', false);
        });

        // 11. SMOOTH SCROLL
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
                }
            });
        });

    })();