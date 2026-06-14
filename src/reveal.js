// Global scroll-reveal safety net.
//
// The site uses a `.reveal` -> `.is-visible` pattern: elements start hidden
// (once `body[data-mounted]` is set) and settle into place when revealed.
// Individual components wire their own IntersectionObservers, but those don't
// reliably cover every `.reveal` node (e.g. staggered child spans). This module
// guarantees EVERY `.reveal` element gets `is-visible` when it enters the
// viewport — independent of per-component logic — so content can never be
// trapped at opacity:0. Adding the class is idempotent, so it composes safely
// with any existing per-file observers.
export function initReveal() {
  if (typeof window === 'undefined') return;

  // Marks the page as JS-hydrated; the hidden base state is scoped under this.
  document.body.dataset.mounted = 'true';

  const reveal = (el) => el.classList.add('is-visible');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // No-IO / reduced-motion: just show everything (and keep catching new nodes).
  if (reduceMotion || !('IntersectionObserver' in window)) {
    const showAll = () =>
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(reveal);
    showAll();
    new MutationObserver(showAll).observe(document.body, {
      childList: true,
      subtree: true,
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          reveal(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
  );

  const observed = new WeakSet();
  const scan = () => {
    document.querySelectorAll('.reveal').forEach((el) => {
      if (!observed.has(el) && !el.classList.contains('is-visible')) {
        observed.add(el);
        io.observe(el);
      }
    });
  };

  scan();
  // Re-scan when React adds nodes (route changes, lazy content).
  new MutationObserver(scan).observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Failsafe: nothing at/near the first viewport should ever stay hidden.
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 1.2) reveal(el);
    });
  }, 1400);
}
