import { useEffect, useRef } from 'react';
import { HERO } from '../content';
import { useLang } from '../i18n/LangContext';
import { useFitText } from '../hooks/useFitText';

const LINES = ['Diego', 'Tepichin'];
const REACH = 280; // px around the pointer in which letters lose weight
const HEAVY = 900;
const LIGHT = 240;

// Letters thin out as the pointer approaches, like ink pulled away from the page.
function usePointerWeight(ref) {
  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      !matchMedia('(hover: hover) and (pointer: fine)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const letters = [...root.querySelectorAll('[data-letter]')];
    let frame = 0;
    let pointer = null;

    const paint = () => {
      frame = 0;
      for (const letter of letters) {
        if (!pointer) {
          letter.style.fontWeight = '';
          continue;
        }
        const rect = letter.getBoundingClientRect();
        const distance = Math.hypot(
          pointer.x - (rect.left + rect.width / 2),
          pointer.y - (rect.top + rect.height / 2),
        );
        const pull = Math.max(0, 1 - distance / REACH);
        letter.style.fontWeight = Math.round(HEAVY - (HEAVY - LIGHT) * pull);
      }
    };
    const move = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      frame ||= requestAnimationFrame(paint);
    };
    const leave = () => {
      pointer = null;
      frame ||= requestAnimationFrame(paint);
    };

    root.addEventListener('pointermove', move, { passive: true });
    root.addEventListener('pointerleave', leave);
    return () => {
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}

// Each line also measures its own fit: small screens set the two lines at different sizes
// so both span the full width, like a justified poster.
function Line({ text, offset }) {
  const ref = useFitText();

  return (
    <span className="hero__line" aria-hidden="true" ref={ref}>
      {[...text].map((letter, column) => (
        <span key={column} data-letter style={{ '--i': offset + column }}>
          {letter}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const sectionRef = useRef(null);
  const fitRef = useFitText();
  usePointerWeight(sectionRef);

  return (
    <section id="inicio" className="hero" ref={sectionRef}>
      <p className="hero__lede" key={lang}>
        {t(HERO.lede).map((part, i) =>
          Array.isArray(part) ? <em key={i}>{part[0]}</em> : <span key={i}>{part}</span>,
        )}
      </p>

      <div className="hero__poster">
        <dl className="hero__facts">
          {HERO.facts.map((fact) => (
            <div key={t(fact.k)}>
              <dt>{t(fact.k)}</dt>
              <dd>{t(fact.v)}</dd>
            </div>
          ))}
        </dl>

        {/* Font size comes from the fitted last line, so both lines share one cap height. */}
        <h1 className="hero__name" aria-label="Diego Tepichin" ref={fitRef}>
          {LINES.map((line, row) => (
            <Line key={line} text={line} offset={row * LINES[0].length} />
          ))}
        </h1>
      </div>

      <a className="hero__scroll" href="#principios">
        {t(HERO.scroll)} <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
