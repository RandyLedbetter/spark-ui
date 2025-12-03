import { describe, it, expect, beforeEach } from 'vitest';
import { SparkButton, defineSparkButton } from './button.js';

describe('SparkButton', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element once', () => {
    defineSparkButton();
    expect(customElements.get('spark-button')).toBe(SparkButton);
  });

  it('renders shadow DOM with slot content', async () => {
    const element = document.createElement('spark-button');
    element.textContent = 'Click me';
    document.body.appendChild(element);

    const slot = element.shadowRoot.querySelector('slot');
    expect(slot).toBeTruthy();

    await Promise.resolve();

    const assignedNodes = slot.assignedNodes({ flatten: true });
    expect(assignedNodes[0].textContent).toBe('Click me');
  });

  it('normalizes invalid attributes back to defaults', () => {
    const element = document.createElement('spark-button');
    element.setAttribute('variant', 'unknown');
    element.setAttribute('size', 'huge');
    document.body.appendChild(element);

    const internalButton = element.shadowRoot.querySelector('button');
    expect(internalButton.dataset.variant).toBe('primary');
    expect(internalButton.dataset.size).toBe('medium');
  });

  it('shows spinner only when loading without disabled', () => {
    const element = document.createElement('spark-button');
    document.body.appendChild(element);

    element.setAttribute('loading', '');
    const internalButton = element.shadowRoot.querySelector('button');
    const spinner = element.shadowRoot.querySelector('.spark-button__spinner');

    expect(internalButton.disabled).toBe(true);
    expect(spinner.hidden).toBe(false);

    element.setAttribute('disabled', '');
    expect(spinner.hidden).toBe(true);
  });
});
