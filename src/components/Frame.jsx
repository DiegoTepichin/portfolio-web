import { useEffect, useRef, useState } from 'react';
import { SECTIONS, UI } from '../content';
import { useLang } from '../i18n/LangContext';
import { useMagnetic } from '../hooks/useMagnetic';

const clockFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'America/Mexico_City',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return <time dateTime={now.toISOString()}>{clockFormat.format(now)}</time>;
}

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

function Progress() {
  const ref = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const ratio = max > 0 ? Math.min(1, scrollY / max) : 0;
      if (ref.current) ref.current.textContent = String(Math.round(ratio * 100)).padStart(3, '0');
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span className="frame__progress" aria-hidden="true">
      <span ref={ref}>000</span>%
    </span>
  );
}

function ThemeToggle() {
  const { t } = useLang();
  const ref = useMagnetic(0.35);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Ignore: the choice simply won't persist.
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      className="frame__control"
      onClick={toggle}
      aria-label={t(UI.theme)}
    >
      <span className="frame__theme" aria-hidden="true" />
    </button>
  );
}

function LangToggle() {
  const { lang, setLang, t } = useLang();
  const ref = useMagnetic(0.35);

  return (
    <button
      ref={ref}
      type="button"
      className="frame__control"
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      aria-label={t(UI.language)}
    >
      <span data-on={lang === 'es'}>ES</span>
      <span aria-hidden="true">/</span>
      <span data-on={lang === 'en'}>EN</span>
    </button>
  );
}

// The fixed drawing-sheet frame: title bar, section rail and status bar.
export default function Frame() {
  const { t } = useLang();
  const active = useActiveSection();

  return (
    <>
      <header className="frame frame--top">
        <a className="frame__mark" href="#inicio">
          Diego Tepichin
        </a>
        <span className="frame__dim frame__wide">{t(UI.role)} — 2026</span>
        <span className="frame__spacer" />
        <LangToggle />
        <ThemeToggle />
      </header>

      <nav className="rail" aria-label={t({ es: 'Secciones', en: 'Sections' })}>
        {SECTIONS.map(({ id, no, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="rail__link"
            aria-current={active === id ? 'true' : undefined}
          >
            <span className="rail__no">{no}</span>
            <span className="rail__label">{t(label)}</span>
          </a>
        ))}
      </nav>

      <footer className="frame frame--bottom">
        <span className="frame__status">
          <i aria-hidden="true" />
          {t(UI.available)}
        </span>
        <span className="frame__dim frame__wide">19.25° N · 99.60° W</span>
        <span className="frame__dim">
          Metepec <Clock />
        </span>
        <span className="frame__spacer" />
        <Progress />
      </footer>
      <div className="frame__meter" aria-hidden="true" />
    </>
  );
}
