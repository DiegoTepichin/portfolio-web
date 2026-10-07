import { FIGURES, SECTIONS, TOOLBOX } from '../content';
import github from '../data/github.json';
import { useLang } from '../i18n/LangContext';
import SectionHead from './SectionHead';

const MAJOR_LANGUAGES = 4;

export default function Figures() {
  const { t, lang } = useLang();

  const figures = [
    { value: String(github.totals.commits), label: t(FIGURES.commits), source: 'GitHub API' },
    { value: String(github.totals.repos), label: t(FIGURES.repos), source: 'GitHub API' },
    ...FIGURES.curated.map((figure) => ({ ...figure, label: t(figure.label) })),
  ];

  const bytes = Object.entries(github.totals.languageBytes);
  const total = bytes.reduce((sum, [, size]) => sum + size, 0);
  const languages = bytes
    .slice(0, MAJOR_LANGUAGES)
    .map(([name, size]) => ({ name, share: size / total }));

  const synced = new Date(github.syncedAt).toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section id="cifras" className="section figures">
      <SectionHead section={SECTIONS[3]} note={t(FIGURES.note)} />

      <ul className="numbers">
        {figures.map((figure, i) => (
          <li key={i} className="number reveal" style={{ '--i': i }}>
            <b>{figure.value}</b>
            <span>{figure.label}</span>
            <small>{figure.source}</small>
          </li>
        ))}
      </ul>

      <div className="split">
        <div>
          <h3 className="label">{t(FIGURES.languages)}</h3>
          <ul className="langs">
            {languages.map(({ name, share }) => (
              <li key={name} style={{ '--share': share }}>
                <span>{name}</span>
                <i aria-hidden="true" />
                <b>{Math.round(share * 100)}%</b>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label">{t(FIGURES.toolbox)}</h3>
          <dl className="toolbox">
            {TOOLBOX.map((group) => (
              <div key={t(group.group)}>
                <dt>{t(group.group)}</dt>
                <dd>{group.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className="footnote">
        {t(FIGURES.synced)} {synced}.
      </p>
    </section>
  );
}
