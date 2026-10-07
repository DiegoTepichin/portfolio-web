// Monthly ISR tariff 2026 for wages and salaries (Art. 96 LISR).
// Source: Anexo 8 of the Resolución Miscelánea Fiscal 2026 (DOF 2025-12-28), SAT.
// Copied from data/isr-2026.ts in github.com/DiegoTepichin/calculadoras-mx, which is the
// reviewed source of truth; update both together.
export const TARIFA_ISR_MENSUAL_2026 = [
  { limiteInferior: 0.01, limiteSuperior: 844.59, cuotaFija: 0.0, porcentajeExcedente: 0.0192 },
  { limiteInferior: 844.6, limiteSuperior: 7168.51, cuotaFija: 16.22, porcentajeExcedente: 0.064 },
  {
    limiteInferior: 7168.52,
    limiteSuperior: 12598.02,
    cuotaFija: 420.95,
    porcentajeExcedente: 0.1088,
  },
  {
    limiteInferior: 12598.03,
    limiteSuperior: 14644.64,
    cuotaFija: 1011.68,
    porcentajeExcedente: 0.16,
  },
  {
    limiteInferior: 14644.65,
    limiteSuperior: 17533.64,
    cuotaFija: 1339.14,
    porcentajeExcedente: 0.1792,
  },
  {
    limiteInferior: 17533.65,
    limiteSuperior: 35362.83,
    cuotaFija: 1856.84,
    porcentajeExcedente: 0.2136,
  },
  {
    limiteInferior: 35362.84,
    limiteSuperior: 55736.68,
    cuotaFija: 5665.16,
    porcentajeExcedente: 0.2352,
  },
  {
    limiteInferior: 55736.69,
    limiteSuperior: 106410.5,
    cuotaFija: 10457.09,
    porcentajeExcedente: 0.3,
  },
  {
    limiteInferior: 106410.51,
    limiteSuperior: 141880.66,
    cuotaFija: 25659.23,
    porcentajeExcedente: 0.32,
  },
  {
    limiteInferior: 141880.67,
    limiteSuperior: 425641.99,
    cuotaFija: 37009.69,
    porcentajeExcedente: 0.34,
  },
  {
    limiteInferior: 425642.0,
    limiteSuperior: Infinity,
    cuotaFija: 133488.54,
    porcentajeExcedente: 0.35,
  },
];

export function isrMensual(ingreso) {
  const renglon =
    TARIFA_ISR_MENSUAL_2026.findLast((r) => ingreso >= r.limiteInferior) ??
    TARIFA_ISR_MENSUAL_2026[0];
  const excedente = Math.max(0, ingreso - renglon.limiteInferior);
  const marginal = excedente * renglon.porcentajeExcedente;
  return { renglon, excedente, marginal, impuesto: renglon.cuotaFija + marginal };
}
