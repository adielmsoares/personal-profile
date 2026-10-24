/** Formata períodos com meses traduzidos (evita divergências de Intl entre servidor e navegador). */
export function formatPeriod(start, end, months, presentLabel) {
  const fmt = ([year, month]) => (month ? `${months[month - 1]} ${year}` : String(year));
  return `${fmt(start)} — ${end ? fmt(end) : presentLabel}`;
}

export function toDateTime([year, month]) {
  return month ? `${year}-${String(month).padStart(2, '0')}` : String(year);
}
