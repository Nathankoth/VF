/**
 * VistaForge Waitlist Integration Script (Standalone)
 * 
 * This is a standalone version that can be included directly in HTML
 * without requiring a build process.
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    endpoint: '/api/waitlist',
    selectors: {
      ctaButtons: [
        'button:contains("Get Started")',
        'button:contains("Sign Up")',
        'button:contains("Start Free Trial")',
        'button:contains("Start 14-day trial")',
        'button:contains("Contact Sales")',
        '[data-waitlist-cta]',
        '.cta-signup',
        '.signup-button'
      ],
      emailInputs: [
        'input[type="email"]',
        'input[name="email"]',
        'input[placeholder*="email" i]',
        '[data-waitlist-email]'
      ],
      forms: [
        'form[data-waitlist]',
        '.waitlist-form',
        '.signup-form'
      ]
    },
    options: {
      showMessages: true,
      autoDetectEmail: true,
      debug: false
    },
    messages: {
      success: 'Thanks — you are on the waitlist! We will notify you when VistaForge is ready.',
      alreadyExists: 'You are already on the waitlist! We will notify you when VistaForge is ready.',
      error: 'Failed to join waitlist. Please try again.',
      invalidEmail: 'Please provide a valid email address.'
    }
  };

  // Utility functions
  function log(...args) {
    if (CONFIG.options.debug) {
      console.log('[VistaForge Waitlist]', ...args);
    }
  }

  function findElementsByText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter(el => el.textContent && el.textContent.includes(text));
  }

  function createAriaRegion() {
    let ariaRegion = document.querySelector('.vf-waitlist-aria');
    if (!ariaRegion) {
      ariaRegion = document.createElement('div');
      ariaRegion.className = 'vf-waitlist-aria';
      ariaRegion.setAttribute('aria-live', 'polite');
      ariaRegion.setAttribute('aria-atomic', 'true');
      ariaRegion.style.cssText = `
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `;
      document.body.appendChild(ariaRegion);
    }
    return ariaRegion;
  }

  function showMessage(message, type = 'success') {
    log('Showing message (' + type + '):', message);

    // Update ARIA region
    const ariaRegion = createAriaRegion();
    ariaRegion.textContent = message;

    // Show visual message if enabled
    if (CONFIG.options.showMessages) {
      showVisualMessage(message, type);
    }
  }

  function showVisualMessage(message, type) {
    const container = document.createElement('div');
    container.className = 'vf-waitlist-toast';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-size: 14px;
      max-width: 300px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;
    
    container.textContent = message;
    document.body.appendChild(container);

    // Animate in
    setTimeout(() => {
      container.style.opacity = '1';
      container.style.transform = 'translateX(0)';
    }, 10);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      container.style.opacity = '0';
      container.style.transform = 'translateX(100%)';
      setTimeout(() => {
        container.remove();
      }, 300);
    }, 5000);
  }

  function findNearbyEmail(button) {
    // Check if button is inside a form
    const form = button.closest('form');
    if (form) {
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value && emailInput.value.trim()) {
        return emailInput.value.trim();
      }
    }

    // Check parent containers for email inputs
    let current = button.parentElement;
    while (current && current !== document.body) {
      const emailInput = current.querySelector('input[type="email"]');
      if (emailInput && emailInput.value && emailInput.value.trim()) {
        return emailInput.value.trim();
      }
      current = current.parentElement;
    }

    // Check siblings
    const siblings = Array.from(button.parentElement ? button.parentElement.children : []);
    for (const sibling of siblings) {
      const emailInput = sibling.querySelector('input[type="email"]');
      if (emailInput && emailInput.value && emailInput.value.trim()) {
        return emailInput.value.trim();
      }
    }

    return null;
  }

  async function submitToWaitlist(data) {
    try {
      log('Submitting to waitlist:', data);

      const response = await fetch(CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      log('Waitlist response:', result);

      if (result.ok) {
        showMessage(result.message || CONFIG.messages.success);
        
        // Track analytics event if available
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'waitlist_signup', {
            event_category: 'engagement',
            event_label: data.source
          });
        }
      } else {
        showMessage(result.error || CONFIG.messages.error, 'error');
      }
    } catch (error) {
      log('Waitlist submission error:', error);
      showMessage(CONFIG.messages.error, 'error');
    }
  }

  function handleFormSubmit(event) {
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    
    if (!emailInput || !emailInput.value || !emailInput.value.trim()) {
      log('No email found in form, skipping waitlist signup');
      return;
    }

    // Let the original form validation run first
    setTimeout(async () => {
      if (emailInput.checkValidity()) {
        await submitToWaitlist({
          email: emailInput.value.trim(),
          source: 'form_submission',
          referrer: document.referrer || window.location.pathname
        });
      }
    }, 100);
  }

  function handleCTAClick(event) {
    const button = event.target;
    const email = findNearbyEmail(button);
    
    if (!email && CONFIG.options.autoDetectEmail) {
      log('No email found near CTA button, skipping waitlist signup');
      return;
    }

    // If we have an email, submit to waitlist
    if (email) {
      event.preventDefault();
      submitToWaitlist({
        email: email,
        source: 'cta_click',
        referrer: document.referrer || window.location.pathname
      });
    }
  }

  function setupIntegration() {
    log('Setting up VistaForge waitlist integration...');

    // Setup form interceptors
    CONFIG.selectors.forms.forEach(selector => {
      const forms = document.querySelectorAll(selector);
      forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        log('Attached form interceptor to: ' + selector);
      });
    });

    // Setup CTA button interceptors
    CONFIG.selectors.ctaButtons.forEach(selector => {
      if (selector.includes(':contains(')) {
        // Handle CSS selector with :contains() pseudo-class
        const textMatch = selector.match(/:contains\("([^"]+)"\)/);
        if (textMatch) {
          const text = textMatch[1];
          const baseSelector = selector.replace(/:contains\("[^"]+"\)/, '');
          const buttons = findElementsByText(baseSelector, text);
          
          buttons.forEach(button => {
            button.addEventListener('click', handleCTAClick);
            log('Attached CTA interceptor to button with text: ' + text);
          });
        }
      } else {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(button => {
          button.addEventListener('click', handleCTAClick);
          log('Attached CTA interceptor to: ' + selector);
        });
      }
    });

    log('Waitlist integration setup complete');
  }

  // Initialize when DOM is ready
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupIntegration);
    } else {
      setupIntegration();
    }
  }

  // Expose global API
  window.VistaForgeWaitlist = {
    submit: submitToWaitlist,
    showMessage: showMessage,
    config: CONFIG
  };

  // Auto-initialize
  init();

})();
