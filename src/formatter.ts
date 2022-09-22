export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
