export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function sanitizeInput(str: string): string {
  return str.replace(/[<>]/g, '').trim();
}
