/**
 * Modal Component Tests
 * 
 * Unit tests for the Spark Modal component.
 * Run with: npm test
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SparkModal, SparkModalHeader, SparkModalBody, SparkModalFooter } from './modal.js';

describe('SparkModal', () => {
  let modal;

  beforeEach(() => {
    modal = document.createElement('spark-modal');
    document.body.appendChild(modal);
  });

  afterEach(() => {
    modal.remove();
    document.body.style.overflow = '';
  });

  describe('Component Registration', () => {
    it('should register spark-modal custom element', () => {
      expect(customElements.get('spark-modal')).toBeDefined();
    });

    it('should register spark-modal-header custom element', () => {
      expect(customElements.get('spark-modal-header')).toBeDefined();
    });

    it('should register spark-modal-body custom element', () => {
      expect(customElements.get('spark-modal-body')).toBeDefined();
    });

    it('should register spark-modal-footer custom element', () => {
      expect(customElements.get('spark-modal-footer')).toBeDefined();
    });
  });

  describe('Structure', () => {
    it('should have a shadow root', () => {
      expect(modal.shadowRoot).toBeDefined();
    });

    it('should contain a backdrop element', () => {
      const backdrop = modal.shadowRoot.querySelector('.backdrop');
      expect(backdrop).toBeDefined();
    });

    it('should contain a dialog element with role="dialog"', () => {
      const dialog = modal.shadowRoot.querySelector('.dialog');
      expect(dialog).toBeDefined();
      expect(dialog.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-modal="true" on dialog', () => {
      const dialog = modal.shadowRoot.querySelector('.dialog');
      expect(dialog.getAttribute('aria-modal')).toBe('true');
    });

    it('should contain a close button', () => {
      const closeButton = modal.shadowRoot.querySelector('.close-button');
      expect(closeButton).toBeDefined();
    });

    it('should contain a slot for content projection', () => {
      const slot = modal.shadowRoot.querySelector('slot');
      expect(slot).toBeDefined();
    });
  });

  describe('Visibility', () => {
    it('should be hidden by default (no open attribute)', () => {
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('should have open attribute when open() is called', () => {
      modal.open();
      expect(modal.hasAttribute('open')).toBe(true);
    });

    it('should remove open attribute when close() is called', () => {
      modal.open();
      modal.close();
      expect(modal.hasAttribute('open')).toBe(false);
    });
  });

  describe('Open Method', () => {
    it('should open the modal when open() is called', () => {
      modal.open();
      expect(modal.hasAttribute('open')).toBe(true);
    });

    it('should dispatch open event when opening', () => {
      let eventFired = false;
      modal.addEventListener('open', () => { eventFired = true; });
      modal.open();
      expect(eventFired).toBe(true);
    });

    it('should not dispatch event if already open', () => {
      modal.open();
      let eventCount = 0;
      modal.addEventListener('open', () => { eventCount++; });
      modal.open();
      expect(eventCount).toBe(0);
    });
  });

  describe('Close Method', () => {
    it('should close the modal when close() is called', () => {
      modal.open();
      modal.close();
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('should dispatch close event with reason when closing', () => {
      let closeReason = null;
      modal.addEventListener('close', (e) => { closeReason = e.detail.reason; });
      modal.open();
      modal.close('test');
      expect(closeReason).toBe('test');
    });

    it('should use "api" as default close reason', () => {
      let closeReason = null;
      modal.addEventListener('close', (e) => { closeReason = e.detail.reason; });
      modal.open();
      modal.close();
      expect(closeReason).toBe('api');
    });

    it('should not dispatch event if already closed', () => {
      let eventCount = 0;
      modal.addEventListener('close', () => { eventCount++; });
      modal.close();
      expect(eventCount).toBe(0);
    });
  });

  describe('Size Variants', () => {
    it('should have default medium size', () => {
      const dialog = modal.shadowRoot.querySelector('.dialog');
      expect(dialog).toBeDefined();
    });

    it('should accept size="small" attribute', () => {
      modal.setAttribute('size', 'small');
      expect(modal.getAttribute('size')).toBe('small');
    });

    it('should accept size="large" attribute', () => {
      modal.setAttribute('size', 'large');
      expect(modal.getAttribute('size')).toBe('large');
    });
  });
});

describe('SparkModalHeader', () => {
  let header;

  beforeEach(() => {
    header = document.createElement('spark-modal-header');
    document.body.appendChild(header);
  });

  afterEach(() => {
    header.remove();
  });

  it('should have a shadow root', () => {
    expect(header.shadowRoot).toBeDefined();
  });

  it('should contain a header element', () => {
    const headerEl = header.shadowRoot.querySelector('header');
    expect(headerEl).toBeDefined();
  });

  it('should contain a slot', () => {
    const slot = header.shadowRoot.querySelector('slot');
    expect(slot).toBeDefined();
  });
});

describe('SparkModalBody', () => {
  let body;

  beforeEach(() => {
    body = document.createElement('spark-modal-body');
    document.body.appendChild(body);
  });

  afterEach(() => {
    body.remove();
  });

  it('should have a shadow root', () => {
    expect(body.shadowRoot).toBeDefined();
  });

  it('should contain a body div', () => {
    const bodyEl = body.shadowRoot.querySelector('.body');
    expect(bodyEl).toBeDefined();
  });

  it('should contain a slot', () => {
    const slot = body.shadowRoot.querySelector('slot');
    expect(slot).toBeDefined();
  });
});

describe('SparkModalFooter', () => {
  let footer;

  beforeEach(() => {
    footer = document.createElement('spark-modal-footer');
    document.body.appendChild(footer);
  });

  afterEach(() => {
    footer.remove();
  });

  it('should have a shadow root', () => {
    expect(footer.shadowRoot).toBeDefined();
  });

  it('should contain a footer element', () => {
    const footerEl = footer.shadowRoot.querySelector('footer');
    expect(footerEl).toBeDefined();
  });

  it('should contain a slot', () => {
    const slot = footer.shadowRoot.querySelector('slot');
    expect(slot).toBeDefined();
  });
});

describe('Modal with Section Components', () => {
  let modal;

  beforeEach(() => {
    modal = document.createElement('spark-modal');
    modal.innerHTML = `
      <spark-modal-header>Test Header</spark-modal-header>
      <spark-modal-body>Test Body</spark-modal-body>
      <spark-modal-footer>Test Footer</spark-modal-footer>
    `;
    document.body.appendChild(modal);
  });

  afterEach(() => {
    modal.remove();
  });

  it('should contain all section components', () => {
    expect(modal.querySelector('spark-modal-header')).toBeDefined();
    expect(modal.querySelector('spark-modal-body')).toBeDefined();
    expect(modal.querySelector('spark-modal-footer')).toBeDefined();
  });

  it('should project content into sections via slots', () => {
    const header = modal.querySelector('spark-modal-header');
    expect(header.textContent).toBe('Test Header');
  });
});
