import { useId, useState } from 'react';
import { DEMOS } from '../../content';
import { isrMensual } from '../../data/isr-2026';
import { useLang } from '../../i18n/LangContext';

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
const percent = new Intl.NumberFormat('es-MX', { style: 'percent', maximumFractionDigits: 2 });

export default function IsrDemo() {
  const { t } = useLang();
  const copy = DEMOS.isr;
  const id = useId();
  const [income, setIncome] = useState(25000);

  const { renglon, excedente, marginal, impuesto } = isrMensual(income);

  return (
    <div className="demo">
      <label className="slider" htmlFor={id}>
        <span>{t(copy.slider)}</span>
        <output htmlFor={id}>{money.format(income)}</output>
        <input
          id={id}
          type="range"
          min="1000"
          max="150000"
          step="500"
          value={income}
          onChange={(event) => setIncome(Number(event.target.value))}
        />
      </label>

      <dl className="readout">
        <div>
          <dt>{t(copy.result)}</dt>
          <dd>{money.format(impuesto)}</dd>
        </div>
        <div>
          <dt>{t(copy.rate)}</dt>
          <dd>{percent.format(impuesto / income)}</dd>
        </div>
      </dl>

      {/* Same idea as the site's "Ver cómo se calculó": the formula with the numbers in it. */}
      <div className="steps">
        <p className="steps__title">{t(copy.how)}</p>
        <p>
          {money.format(income)} − {money.format(renglon.limiteInferior)} <i>{t(copy.lower)}</i> ={' '}
          {money.format(excedente)} <i>{t(copy.excess)}</i>
        </p>
        <p>
          {money.format(excedente)} × {percent.format(renglon.porcentajeExcedente)} ={' '}
          {money.format(marginal)}
        </p>
        <p>
          {money.format(marginal)} + {money.format(renglon.cuotaFija)} <i>{t(copy.fixed)}</i> ={' '}
          <b>{money.format(impuesto)}</b>
        </p>
      </div>

      <p className="demo__note">{t(copy.note)}</p>
    </div>
  );
}
