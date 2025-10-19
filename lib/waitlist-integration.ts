/**
 * VistaForge Waitlist Integration Script
 * 
 * This script provides non-intrusive waitlist functionality that can be attached
 * to existing signup buttons and forms without changing the visual design.
 */

interface WaitlistConfig {
  // API endpoint
  endpoint: string
  
  // Selectors for different UI elements
  selectors: {
    // Primary CTA buttons to intercept
    ctaButtons: string[]
    // Email input fields to capture
    emailInputs: string[]
    // Forms to intercept
    forms: string[]
    // Success message container (optional)
    messageContainer?: string
  }
  
  // Behavior options
  options: {
    // Show success messages (if false, only console logs)
    showMessages: boolean
    // Auto-detect email from nearby inputs
    autoDetectEmail: boolean
    // Collect additional fields (name, role) via modal
    collectAdditionalFields: boolean
    // Debug mode
    debug: boolean
  }
  
  // Custom messages
  messages: {
    success: string
    alreadyExists: string
    error: string
    invalidEmail: string
  }
}

// Default configuration
const DEFAULT_CONFIG: WaitlistConfig = {
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
    ],
    messageContainer: '.vf-waitlist-messages'
  },
  options: {
    showMessages: true,
    autoDetectEmail: true,
    collectAdditionalFields: false,
    debug: false
  },
  messages: {
    success: 'Thanks — you are on the waitlist! We will notify you when VistaForge is ready.',
    alreadyExists: 'You are already on the waitlist! We will notify you when VistaForge is ready.',
    error: 'Failed to join waitlist. Please try again.',
    invalidEmail: 'Please provide a valid email address.'
  }
}

class WaitlistIntegration {
  private config: WaitlistConfig
  private isInitialized = false
  private ariaRegion: HTMLElement | null = null

  constructor(config: Partial<WaitlistConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  /**
   * Initialize the waitlist integration
   */
  init(): void {
    if (this.isInitialized) {
      this.log('Waitlist integration already initialized')
      return
    }

    this.log('Initializing VistaForge waitlist integration...')

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupIntegration())
    } else {
      this.setupIntegration()
    }

    this.isInitialized = true
  }

  /**
   * Setup the integration by attaching event listeners
   */
  private setupIntegration(): void {
    // Create ARIA live region for screen readers
    this.createAriaRegion()

    // Setup form interceptors
    this.setupFormInterceptors()

    // Setup CTA button interceptors
    this.setupCTAInterceptors()

    this.log('Waitlist integration setup complete')
  }

  /**
   * Create ARIA live region for accessibility
   */
  private createAriaRegion(): void {
    if (this.ariaRegion) return

    this.ariaRegion = document.createElement('div')
    this.ariaRegion.className = 'vf-waitlist-aria'
    this.ariaRegion.setAttribute('aria-live', 'polite')
    this.ariaRegion.setAttribute('aria-atomic', 'true')
    this.ariaRegion.style.position = 'absolute'
    this.ariaRegion.style.left = '-9999px'
    this.ariaRegion.style.width = '1px'
    this.ariaRegion.style.height = '1px'
    this.ariaRegion.style.overflow = 'hidden'
    document.body.appendChild(this.ariaRegion)
  }

  /**
   * Setup form interceptors
   */
  private setupFormInterceptors(): void {
    this.config.selectors.forms.forEach(selector => {
      const forms = document.querySelectorAll(selector)
      forms.forEach(form => {
        form.addEventListener('submit', (e) => this.handleFormSubmit(e as Event))
        this.log(`Attached form interceptor to: ${selector}`)
      })
    })
  }

  /**
   * Setup CTA button interceptors
   */
  private setupCTAInterceptors(): void {
    this.config.selectors.ctaButtons.forEach(selector => {
      // Handle CSS selector with :contains() pseudo-class
      if (selector.includes(':contains(')) {
        const textMatch = selector.match(/:contains\("([^"]+)"\)/)
        if (textMatch) {
          const text = textMatch[1]
          const baseSelector = selector.replace(/:contains\("[^"]+"\)/, '')
          const buttons = document.querySelectorAll(baseSelector)
          
          buttons.forEach(button => {
            if (button.textContent?.includes(text)) {
              button.addEventListener('click', (e) => this.handleCTAClick(e as Event))
              this.log(`Attached CTA interceptor to button with text: ${text}`)
            }
          })
        }
      } else {
        const buttons = document.querySelectorAll(selector)
        buttons.forEach(button => {
          button.addEventListener('click', (e) => this.handleCTAClick(e as Event))
          this.log(`Attached CTA interceptor to: ${selector}`)
        })
      }
    })
  }

  /**
   * Handle form submission
   */
  private async handleFormSubmit(event: Event): Promise<void> {
    const form = event.target as HTMLFormElement
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement
    
    if (!emailInput || !emailInput.value.trim()) {
      this.log('No email found in form, skipping waitlist signup')
      return
    }

    // Let the original form validation run first
    setTimeout(async () => {
      if (emailInput.checkValidity()) {
        await this.submitToWaitlist({
          email: emailInput.value.trim(),
          source: 'form_submission',
          referrer: document.referrer || window.location.pathname
        })
      }
    }, 100)
  }

  /**
   * Handle CTA button clicks
   */
  private async handleCTAClick(event: Event): Promise<void> {
    const button = event.target as HTMLElement
    
    // Find nearby email input
    const email = this.findNearbyEmail(button)
    
    if (!email && this.config.options.autoDetectEmail) {
      this.log('No email found near CTA button, skipping waitlist signup')
      return
    }

    // If we have an email, submit to waitlist
    if (email) {
      event.preventDefault()
      await this.submitToWaitlist({
        email: email,
        source: 'cta_click',
        referrer: document.referrer || window.location.pathname
      })
    }
  }

  /**
   * Find email input near a button
   */
  private findNearbyEmail(button: HTMLElement): string | null {
    // Check if button is inside a form
    const form = button.closest('form')
    if (form) {
      const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement
      if (emailInput && emailInput.value.trim()) {
        return emailInput.value.trim()
      }
    }

    // Check parent containers for email inputs
    let current = button.parentElement
    while (current && current !== document.body) {
      const emailInput = current.querySelector('input[type="email"]') as HTMLInputElement
      if (emailInput && emailInput.value.trim()) {
        return emailInput.value.trim()
      }
      current = current.parentElement
    }

    // Check siblings
    const siblings = Array.from(button.parentElement?.children || [])
    for (const sibling of siblings) {
      const emailInput = sibling.querySelector('input[type="email"]') as HTMLInputElement
      if (emailInput && emailInput.value.trim()) {
        return emailInput.value.trim()
      }
    }

    return null
  }

  /**
   * Submit data to waitlist API
   */
  private async submitToWaitlist(data: {
    email: string
    name?: string
    role?: string
    source: string
    referrer: string
  }): Promise<void> {
    try {
      this.log('Submitting to waitlist:', data)

      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      this.log('Waitlist response:', result)

      if (result.ok) {
        this.showMessage(result.message || this.config.messages.success)
        
        // Track analytics event if available
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'waitlist_signup', {
            event_category: 'engagement',
            event_label: data.source
          })
        }
      } else {
        this.showMessage(result.error || this.config.messages.error, 'error')
      }
    } catch (error) {
      this.log('Waitlist submission error:', error)
      this.showMessage(this.config.messages.error, 'error')
    }
  }

  /**
   * Show message to user
   */
  private showMessage(message: string, type: 'success' | 'error' = 'success'): void {
    this.log(`Showing message (${type}):`, message)

    // Update ARIA region for screen readers
    if (this.ariaRegion) {
      this.ariaRegion.textContent = message
    }

    // Show visual message if enabled
    if (this.config.options.showMessages) {
      this.showVisualMessage(message, type)
    }
  }

  /**
   * Show visual message
   */
  private showVisualMessage(message: string, type: 'success' | 'error'): void {
    // Try to find existing message container
    let container = document.querySelector(this.config.selectors.messageContainer || '')
    
    if (!container) {
      // Create a temporary toast-like message
      container = document.createElement('div')
      container.className = 'vf-waitlist-toast'
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
      `
      document.body.appendChild(container)
    }

    container.textContent = message
    container.style.opacity = '1'
    container.style.transform = 'translateX(0)'

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (container && container.classList.contains('vf-waitlist-toast')) {
        container.style.opacity = '0'
        container.style.transform = 'translateX(100%)'
        setTimeout(() => {
          container?.remove()
        }, 300)
      }
    }, 5000)
  }

  /**
   * Log message if debug mode is enabled
   */
  private log(...args: any[]): void {
    if (this.config.options.debug) {
      console.log('[VistaForge Waitlist]', ...args)
    }
  }

  /**
   * Manually submit to waitlist (for custom implementations)
   */
  async submit(email: string, options: {
    name?: string
    role?: string
    source?: string
  } = {}): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          ...options,
          source: options.source || 'manual',
          referrer: document.referrer || window.location.pathname
        })
      })

      const result = await response.json()
      return {
        success: result.ok,
        message: result.message || result.error || 'Unknown response'
      }
    } catch (error) {
      return {
        success: false,
        message: this.config.messages.error
      }
    }
  }
}

// Auto-initialize if script is loaded directly
if (typeof window !== 'undefined') {
  // Create global instance
  const waitlist = new WaitlistIntegration()
  
  // Auto-initialize
  waitlist.init()
  
  // Expose globally for manual control
  ;(window as any).VistaForgeWaitlist = waitlist
}

export default WaitlistIntegration
