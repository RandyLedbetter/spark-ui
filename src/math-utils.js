// src/math-utils.js
// Numeric helper utilities with graceful fallback handling.

const isFiniteNumber = (value) => typeof value === 'number' && Number.isFinite(value);

export function clamp(value, min, max) {
  if (!isFiniteNumber(value) || !isFiniteNumber(min) || !isFiniteNumber(max)) {
    return 0;
  }

  const lowerBound = Math.min(min, max);
  const upperBound = Math.max(min, max);

  if (value < lowerBound) {
    return lowerBound;
  }

  if (value > upperBound) {
    return upperBound;
  }

  return value;
}

export function sum(values) {
  if (!Array.isArray(values)) {
    return 0;
  }

  const numericValues = values.filter(isFiniteNumber);

  if (numericValues.length === 0) {
    return 0;
  }

  return numericValues.reduce((total, current) => total + current, 0);
}

export function average(values) {
  if (!Array.isArray(values)) {
    return 0;
  }

  const numericValues = values.filter(isFiniteNumber);

  if (numericValues.length === 0) {
    return 0;
  }

  const total = sum(numericValues);
  return total / numericValues.length;
}

