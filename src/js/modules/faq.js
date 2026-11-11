import { $$, prefersReducedMotion, requestRefresh } from './dom.js';

/** Smooth open/close for native <details> (falls back to native behaviour without GSAP). */
export function initFaq() {
  $$('[data-faq]').forEach((details) => {
    const summary = details.querySelector('summary');
    const body = details.querySelector('[data-faq-body]');
    let animating = false;

    summary.addEventListener('click', (event) => {
      const gsap = window.gsap;
      if (!gsap || prefersReducedMotion()) {
        requestRefresh();
        return;
      }
      event.preventDefault();
      if (animating) return;
      animating = true;

      if (!details.open) {
        details.open = true;
        gsap.fromTo(
          body,
          { height: 0, autoAlpha: 0 },
          {
            height: 'auto',
            autoAlpha: 1,
            duration: 0.45,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(body, { clearProps: 'height,opacity,visibility' });
              animating = false;
              requestRefresh();
            },
          },
        );
      } else {
        gsap.to(body, {
          height: 0,
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            details.open = false;
            gsap.set(body, { clearProps: 'height,opacity,visibility' });
            animating = false;
            requestRefresh();
          },
        });
      }
    });
  });
}
