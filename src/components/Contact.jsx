import { CONTACT, SECTIONS, UI } from '../content';
import { useLang } from '../i18n/LangContext';
import { useFitText } from '../hooks/useFitText';
import { useMagnetic } from '../hooks/useMagnetic';
import CopyButton from './CopyButton';
import SectionHead from './SectionHead';

function Channel({ channel }) {
  const { t } = useLang();
  const ref = useMagnetic(0.18);
  const external = channel.href.startsWith('http');

  return (
    <li className="channel">
      <span className="channel__key">{channel.k}</span>
      <a
        ref={ref}
        className="channel__value"
        href={channel.href}
        data-cursor={t(external ? UI.visit : UI.write)}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {channel.v}
      </a>
      {channel.copy && <CopyButton value={channel.copy} />}
    </li>
  );
}

export default function Contact() {
  const { t, lang } = useLang();
  const fitRef = useFitText([lang]);

  return (
    <section id="contacto" className="section contact">
      <SectionHead section={SECTIONS[4]} note={t(CONTACT.body)} />

      <div className="contact__word" aria-hidden="true">
        <span ref={fitRef}>{t(CONTACT.word)}</span>
      </div>

      <ul className="channels">
        {CONTACT.channels.map((channel) => (
          <Channel key={channel.k} channel={channel} />
        ))}
      </ul>

      <p className="colophon">
        <span>© {new Date().getFullYear()} Diego Tepichin</span>
        <span>{t(CONTACT.colophon)}</span>
      </p>
    </section>
  );
}
