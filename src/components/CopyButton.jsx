import { useEffect, useState } from 'react';
import { UI } from '../content';
import { useLang } from '../i18n/LangContext';

export default function CopyButton({ value, className = '' }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access denied: the text is still selectable on the page.
    }
  };

  return (
    <button type="button" className={`copy ${className}`} onClick={copy} data-cursor={t(UI.copy)}>
      <span aria-live="polite">{t(copied ? UI.copied : UI.copy)}</span>
    </button>
  );
}
