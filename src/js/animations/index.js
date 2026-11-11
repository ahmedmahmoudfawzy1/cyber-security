import { getGsap, isRTL, state, prefersReducedMotion } from '../modules/dom.js';
import { heroIntro, heroScroll } from './hero.js';
import { initRail } from './rail.js';
import { missionText, reveals, outcomes, meters } from './sections.js';
import { journey } from './journey.js';
import { toolkit, labs, finale } from './practice.js';

/**
 * Motion orchestrator. gsap.matchMedia() gives three independent experiences:
 *   desktop (≥1024px)  — ScrollSmoother, pinned hero flight, horizontal labs, finale
 *   mobile  (<1024px)  — native scroll, lighter reveals, rail as a top strip
 *   reduced motion     — no smoothing/pins/scrambles; navigation states only
 * Everything created inside is reverted automatically when the media changes.
 */
export function initMotion() {
  const g = getGsap();
  if (!g) return null;
  const { gsap, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, ScrambleTextPlugin } = g;
  gsap.registerPlugin(...[ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, ScrambleTextPlugin].filter(Boolean));
  ScrollTrigger.config({ ignoreMobileResize: true });

  const mm = gsap.matchMedia();
  mm.add(
    {
      desktop: '(min-width: 1024px)',
      mobile: '(max-width: 1023.98px)',
      reduce: '(prefers-reduced-motion: reduce)',
      finePointer: '(pointer: fine)',
    },
    (context) => {
      const { desktop, reduce, finePointer } = context.conditions;
      const env = { desktop, mobile: !desktop, reduce, rtl: isRTL() };
      const api = { ...g, env };

      if (desktop && !reduce && finePointer && ScrollSmoother) {
        state.smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.1,
          effects: false,
        });
        document.documentElement.classList.add('has-smoother');
      }

      // Created top-to-bottom so pin spacing is measured in document order.
      const cleanups = [
        heroScroll(api),
        missionText(api),
        outcomes(api),
        journey(api),
        toolkit(api),
        labs(api),
        finale(api),
        reveals(api),
        meters(api),
        initRail(api),
      ];
      ScrollTrigger.sort();

      return () => {
        cleanups.forEach((fn) => typeof fn === 'function' && fn());
        state.smoother?.kill();
        state.smoother = null;
        document.documentElement.classList.remove('has-smoother');
      };
    },
  );

  return { gsap, ScrollTrigger, startIntro: () => heroIntro({ gsap, reduce: prefersReducedMotion() }) };
}
