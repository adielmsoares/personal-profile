/** Junta classes condicionalmente, ignorando valores falsos. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
