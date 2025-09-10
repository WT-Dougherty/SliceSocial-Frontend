export function parseAsUTC(s: string): Date {
  s = s.slice(0, -1);
  const [d, t] = s.split('T');
  const [y, m, day] = d.split('-').map(Number);
  const [hh, mm, ss] = t.split(':').map(Number);
  return new Date(Date.UTC(y, m, day, hh, mm, ss));
}
