/* ══════════════════════════════════════════════════════════
   BrightSmile Dental Care Template — main.js
   Include this at the bottom of index.html before </body>
════════════════════════════════════════════════════════════ */

/* ── Appointment Information Map ───────────────────────────────────
   Keys: 0 = Sunday … 6 = Saturday (matches Date.getDay())
──────────────────────────────────────────────────────────── */
const TIMINGS = {
  0: { label: 'Sunday',    hours: 'Set your availability', hourId: null },
  1: { label: 'Monday',    hours: 'Set your availability', hourId: null },
  2: { label: 'Tuesday',   hours: 'Set your availability', hourId: null },
  3: { label: 'Wednesday', hours: 'Set your availability', hourId: null },
  4: { label: 'Thursday',  hours: 'Set your availability', hourId: null },
  5: { label: 'Friday',    hours: 'Set your availability', hourId: null },
  6: { label: 'Saturday',  hours: 'Set your availability', hourId: null },
};

/* ── Show Appointment Information ─────────────────────────────────
   Updates the announcement bar text and highlights today's
   row in the footer hours table.
──────────────────────────────────────────────────────────── */
function setAppointmentInfo() {
  const day = new Date().getDay();
  const today = TIMINGS[day];

  // Announcement bar
  const timingEl = document.getElementById('timing-text');
  if (timingEl) {
    timingEl.textContent = 'Appointments: ' + today.hours;
  }

  // Footer row highlight
  const rowEl = today.hourId ? document.getElementById(today.hourId) : null;
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
  setAppointmentInfo();
  initMobileNav();
  initServiceCards();
  initScrollAnimations();
});
