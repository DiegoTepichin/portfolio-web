import { useState } from 'react';
import { UI } from '../../content';
import { useLang } from '../../i18n/LangContext';

// Each gate lights up in order; pressing run sends another change down the line.
export default function FlowDemo({ steps }) {
  const { t } = useLang();
  const [run, setRun] = useState(0);

  return (
    <div className="demo">
      <ol className="flow" key={run} style={{ '--n': steps.length }}>
        {steps.map((step, i) => (
          <li key={i} style={{ '--i': i }}>
            <span className="flow__no">{String(i + 1).padStart(2, '0')}</span>
            <b>{t(step.name)}</b>
            <small>{t(step.note)}</small>
            <i aria-hidden="true">✓</i>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="copy"
        onClick={() => setRun(run + 1)}
        data-cursor={t(UI.run)}
      >
        ▶ {t(UI.run)}
      </button>
    </div>
  );
}
