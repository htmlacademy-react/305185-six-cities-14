export function getRatingInPercent(rating: number): string {
  return `${Math.round(rating * 20)}%`;
}
