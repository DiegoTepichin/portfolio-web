import { useId, useState } from 'react';
import { DEMOS } from '../../content';
import { useLang } from '../../i18n/LangContext';

const W = 320;
const H = 150;
const MAX_PRICE = 4; // in multiples of unit cost
const STEPS = 64;

// Constant-elasticity demand q = p^e with unit cost 1: profit(p) = (p - 1) * p^e,
// maximised at p* = e / (1 + e) for e < -1.
const profit = (price, elasticity) => (price - 1) * price ** elasticity;

export default function ElasticityDemo() {
  const { t, lang } = useLang();
  const copy = DEMOS.elasticity;
  const id = useId();
  const [elasticity, setElasticity] = useState(-2);

  const best = elasticity / (1 + elasticity);
  const peak = profit(best, elasticity);
  const x = (price) => ((price - 1) / (MAX_PRICE - 1)) * W;
  const y = (value) => H - (value / peak) * (H - 14);

  const path = Array.from({ length: STEPS + 1 }, (_, i) => {
    const price = 1 + (i / STEPS) * (MAX_PRICE - 1);
    return `${i ? 'L' : 'M'}${x(price).toFixed(1)},${y(profit(price, elasticity)).toFixed(1)}`;
  }).join('');

  const number = (value, digits) =>
    value.toLocaleString(lang === 'es' ? 'es-MX' : 'en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });

  return (
    <div className="demo">
      <svg className="curve" viewBox={`0 0 ${W} ${H + 18}`} role="img" aria-label={t(copy.caption)}>
        <line className="curve__axis" x1="0" y1={H} x2={W} y2={H} />
        <path className="curve__path" d={path} />
        <line className="curve__best" x1={x(best)} y1={y(peak)} x2={x(best)} y2={H} />
        <circle className="curve__dot" cx={x(best)} cy={y(peak)} r="4.5" />
        <text className="curve__label" x="0" y="10">
          {t(copy.profit)}
        </text>
        <text className="curve__label" x={W} y={H + 14} textAnchor="end">
          {t(copy.axis)}
        </text>
      </svg>

      <label className="slider" htmlFor={id}>
        <span>{t(copy.slider)}</span>
        <output htmlFor={id}>ε = {number(elasticity, 1)}</output>
        <input
          id={id}
          type="range"
          min="-4"
          max="-1.5"
          step="0.1"
          value={elasticity}
          onChange={(event) => setElasticity(Number(event.target.value))}
        />
      </label>

      <dl className="readout">
        <div>
          <dt>{t(copy.best)}</dt>
          <dd>
            {number(best, 2)}
            <small> {t(copy.cost)}</small>
          </dd>
        </div>
        <div>
          <dt>{t(copy.margin)}</dt>
          <dd>{number((-1 / elasticity) * 100, 0)}%</dd>
        </div>
      </dl>

      <p className="demo__note">{t(copy.note)}</p>
    </div>
  );
}
