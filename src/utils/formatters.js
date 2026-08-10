export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  }).format(value);
}

export function formatCategoryName(category) {
  if (!category) {
    return '';
  }

  return category
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
