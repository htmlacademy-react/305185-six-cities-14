export function capitalizeFirstLetter(string: string): string {
  return string[0].toUpperCase() + string.slice(1);
}

export function pluralize(count: number, word: string): string {
  return count === 1 ? word : `${word}s`;
}
