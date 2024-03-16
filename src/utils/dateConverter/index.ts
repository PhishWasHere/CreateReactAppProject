

export const toISO = (d: string | Date) => {
  const date = new Date(d);
  const iso = date.toISOString();
  return iso;
}

export const toLocal = (d: string | Date) => {
  const date = new Date(d);
  const local = date.toLocaleString();
  return local;
}