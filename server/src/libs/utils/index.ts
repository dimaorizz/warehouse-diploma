export function date2mysqlFormat(date: Date): string {
  function twoDigits(d: number) {
    if (d >= 0 && d < 10) return `0${d.toString()}`;
    if (d > -10 && d < 0) return `-0${(-1 * d).toString()}`;
    return d.toString();
  }

  return `${date.getUTCFullYear()}-${twoDigits(
    1 + date.getUTCMonth()
  )}-${twoDigits(date.getUTCDate())} ${twoDigits(
    date.getUTCHours()
  )}:${twoDigits(date.getUTCMinutes())}:${twoDigits(date.getUTCSeconds())}`;
}
