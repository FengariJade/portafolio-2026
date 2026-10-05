/**
 * Retorna true si la fecha dada vence en los próximos `days` días.
 */
export function isExpiringSoon(date?: string, days: number = 30): boolean {
  if (!date) return false;

  const expiry = new Date(date);
  const today  = new Date();
  const diff   = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  return diff <= days && diff >= 0;
}