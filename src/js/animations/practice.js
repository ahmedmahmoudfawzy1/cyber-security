import { $, $$, isRTL, flightTo } from '../modules/dom.js';

/** Toolkit terminal: the command "types", the tool name decrypts, the description rises. */
export function toolkit({ gsap, env }) {
  const kit = $('[data-toolkit]');
  if (!kit || env.reduce) return;

  const onChange = ({ detail: { panel } }) => {
    const cmd = $('[data-type-cmd]', panel);
    const name = $('.tool-panel__name', panel);
    const desc = $('[data-type-out]', panel);
    const glyph = $('.tool-panel__glyph', panel);
    cmd.dataset.text ||= cmd.textContent;
    name.dataset.text ||= name.textContent;

    gsap
      .timeline({ defaults: { overwrite: true } })
      .fromTo(cmd, { scrambleText: { text: '' } }, { duration: 0.45, scrambleText: { text: cmd.dataset.text, chars: '_', speed: 1 } })
      .to(name, { duration: 0.7, scrambleText: { text: name.dataset.text, chars: 'upperCase', speed: 0.6 } }, 0.1)
      .fromTo(desc, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }, 0.25)
      .fromTo(glyph, { xPercent: isRTL() ? -12 : 12, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' }, 0.1);
  };
  kit.addEventListener('tabs:change', onChange);
  return () => kit.removeEventListener('tabs:change', onChange);
}

/**
 * Labs: desktop pins the section and scrolls the 16 project tickets
 * horizontally (direction-aware for RTL). Mobile keeps native swipe with
 * scroll-snap; both drive the same progress counter + bar.
 */
export function labs({ gsap, env }) {
  const section = $('[data-labs]');
  if (!section) return;
  const pin = $('[data-labs-pin]', section);
  const viewport = $('[data-labs-viewport]', section);
  const track = $('[data-labs-track]', section);
  const tickets = $$('[data-ticket]', section);
  const countEl = $('[data-labs-count]', section);
  const bar = $('[data-labs-bar]', section);
  const total = tickets.length;

  const update = (p) => {
    const n = Math.min(total, Math.floor(p * total) + 1);
    countEl.textContent = String(n).padStart(2, '0');
    bar.style.transform = `scaleX(${Math.max(1 / total, p)})`;
  };

  if (env.desktop && !env.reduce) {
    section.classList.add('labs--h');
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    gsap.to(track, {
      x: () => (isRTL() ? 1 : -1) * distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress),
      },
    });
    gsap.from(tickets.slice(0, 5), {
      y: 70,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: pin, start: 'top 80%', once: true },
    });
    update(0);
    return () => {
      section.classList.remove('labs--h');
      gsap.set(track, { clearProps: 'transform' });
    };
  }

  const onScroll = () => {
    const max = viewport.scrollWidth - viewport.clientWidth;
    update(max > 0 ? Math.abs(viewport.scrollLeft) / max : 0);
  };
  viewport.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return () => viewport.removeEventListener('scroll', onScroll);
}

/**
 * Finale: the SECURITY letters leave the rail and re-join "Eraa" — the word is
 * complete, the journey ends at the Contact CTA.
 */
export function finale({ gsap, env }) {
  const section = $('[data-finale]');
  if (!section || env.reduce) return;
  const chars = $$('[data-finale-char]', section);
  const eraa = chars.filter((c) => c.dataset.finaleChar === 'eraa');
  const sec = chars.filter((c) => c.dataset.finaleChar === 'sec');
  const body = $('[data-finale-body]', section);
  const railLetters = $$('[data-rail-letter]');

  if (!env.desktop) {
    gsap.from(chars, {
      yPercent: 110,
      autoAlpha: 0,
      stagger: 0.04,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 72%', once: true },
    });
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: { id: 'finale', trigger: section, start: 'top top', end: '+=110%', pin: true, scrub: 1, invalidateOnRefresh: true },
  });
  sec.forEach((el, i) => {
    tl.from(
      el,
      {
        x: () => flightTo(el, section, railLetters[i]).x,
        y: () => flightTo(el, section, railLetters[i]).y,
        scale: () => flightTo(el, section, railLetters[i]).scale,
        color: '#e6c238',
        duration: 0.6,
        ease: 'power3.inOut',
      },
      i * 0.04,
    );
  });
  tl.from(eraa, { yPercent: -150, rotationX: 80, transformPerspective: 800, autoAlpha: 0, stagger: 0.05, duration: 0.45, ease: 'power3.out' }, 0.35)
    .from(body, { y: 70, autoAlpha: 0, duration: 0.4, ease: 'power2.out' }, 0.55)
    .to({}, { duration: 0.15 });
}
