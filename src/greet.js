export function greet(name) {
  if (!name || typeof name !== 'string') {
    return 'Hello, stranger!';
  }

  return `Hello, ${name}!`;
}

export function greetFormal(name) {
  if (!name || typeof name !== 'string') {
    return 'Good day, esteemed guest.';
  }

  return `Good day, ${name}.`;
}

export function greetCasual(name) {
  if (!name || typeof name !== 'string') {
    return 'Hey there!';
  }

  return `Hey ${name}!`;
}
