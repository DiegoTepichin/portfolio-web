import { useLang } from '../i18n/LangContext';

export default function SectionHead({ section, note }) {
  const { t } = useLang();

  return (
    <header className="head">
      <span className="head__no">§ {section.no}</span>
      <h2 className="head__title">{t(section.label)}</h2>
      {note && <p className="head__note">{note}</p>}
    </header>
  );
}
