// src/string-utils.js
// String manipulation utilities

const isString = (value) => typeof value === 'string';

export function capitalize(input = '') {
  if (!isString(input) || input.length === 0) {
    return '';
  }

  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function reverse(input = '') {
  if (!isString(input)) {
    return '';
  }

  return Array.from(input).reverse().join('');
}

export function truncate(input = '', maxLength) {
  if (!isString(input) || typeof maxLength !== 'number' || Number.isNaN(maxLength) || maxLength < 0) {
    return '';
  }

  if (input.length <= maxLength) {
    return input;
  }

  if (maxLength <= 3) {
    return '.'.repeat(maxLength);
  }

  return input.slice(0, maxLength - 3) + '...';
}
