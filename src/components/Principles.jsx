import portrait from '../assets/diego-600.jpg';
import { PRINCIPLES, SECTIONS } from '../content';
import { useLang } from '../i18n/LangContext';
import SectionHead from './SectionHead';

export default function Principles() {
  const { t, lang } = useLang();
  const words = t(PRINCIPLES.statement).split(' ');

  return (
    <section id="principios" className="section principles">
      <SectionHead section={SECTIONS[1]} note={t(PRINCIPLES.note)} />

      <div className="principles__lead">
        {/* Words ink in one by one as the paragraph crosses the viewport. */}
        <p className="statement" key={lang} aria-label={t(PRINCIPLES.statement)}>
          {words.map((word, i) => (
            <span key={i} aria-hidden="true" style={{ '--i': i, '--n': words.length }}>
              {word}{' '}
            </span>
          ))}
        </p>
        <figure className="portrait">
          <img
            src={portrait}
            alt="Diego Tepichin"
            width="589"
            height="600"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Fig. 01 — Diego Tepichin, Metepec</figcaption>
        </figure>
      </div>

      <ol className="rules">
        {PRINCIPLES.items.map((item, i) => (
          <li key={i} className="rule reveal" style={{ '--i': i }}>
            <span className="rule__no">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="rule__title">{t(item.title)}</h3>
            <p className="rule__body">{t(item.body)}</p>
            <a className="rule__proof" href={item.href} target="_blank" rel="noreferrer">
              {item.proof} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
