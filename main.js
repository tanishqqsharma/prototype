/* ══════════════════════════════════════════════════════════
   Dr. Neel's Dental Clinic — main.js
   Include this at the bottom of index.html before </body>
════════════════════════════════════════════════════════════ */

/* ── Clinic Timings Map ───────────────────────────────────
   Keys: 0 = Sunday … 6 = Saturday (matches Date.getDay())
──────────────────────────────────────────────────────────── */
const TIMINGS = {
  0: { label: 'Sunday',    hours: '10:00 AM – 1:00 PM', hourId: 'hour-sun' },
  1: { label: 'Monday',    hours: '10:00 AM – 9:00 PM', hourId: 'hour-mon' },
  2: { label: 'Tuesday',   hours: '10:00 AM – 9:00 PM', hourId: 'hour-tue' },
  3: { label: 'Wednesday', hours: '5:00 PM – 9:00 PM',  hourId: 'hour-wed' },
  4: { label: 'Thursday',  hours: '10:00 AM – 9:00 PM', hourId: 'hour-thu' },
  5: { label: 'Friday',    hours: '10:00 AM – 9:00 PM', hourId: 'hour-fri' },
  6: { label: 'Saturday',  hours: '10:00 AM – 9:00 PM', hourId: 'hour-sat' },
};

/* ── Show Today's Timings ─────────────────────────────────
   Updates the announcement bar text and highlights today's
   row in the footer hours table.
──────────────────────────────────────────────────────────── */
function setTodayTimings() {
  const day = new Date().getDay();
  const today = TIMINGS[day];

  // Announcement bar
  const timingEl = document.getElementById('timing-text');
  if (timingEl) {
    timingEl.textContent = 'Today (' + today.label + '): ' + today.hours;
  }

  // Footer row highlight
  const rowEl = document.getElementById(today.hourId);
  if (rowEl) rowEl.classList.add('today');
}

/* ── Mobile Navigation Toggle ─────────────────────────────
   Hamburger button opens/closes the mobile menu.
   Clicking any nav link also closes it.
──────────────────────────────────────────────────────────── */
function initMobileNav() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

/* ── Service Card Active State ────────────────────────────
   Clicking a service card highlights it; clicking another
   removes the previous highlight.
──────────────────────────────────────────────────────────── */
function initServiceCards() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* ── Scroll-Triggered Fade-Up Animations ─────────────────
   Uses IntersectionObserver to add .visible when an element
   with .fade-up scrolls into the viewport.
──────────────────────────────────────────────────────────── */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ── Bootstrap ────────────────────────────────────────────
   Run everything after DOM is ready.
──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setTodayTimings();
  initMobileNav();
  initServiceCards();
  initScrollAnimations();
});
