import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5 // 5 requests per minute per IP

function getRateLimitKey(ip: string): string {
  return `waitlist:${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  record.count++
  return false
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function sanitizeInput(input: string | undefined): string {
  if (!input) return ''
  return input.trim().slice(0, 255) // Limit length and trim
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)
    
    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, email, role, source } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Email is required' 
        },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Please provide a valid email address' 
        },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email).toLowerCase()
    const sanitizedName = sanitizeInput(name)
    const sanitizedRole = sanitizeInput(role)
    const sanitizedSource = sanitizeInput(source)

    // Get referrer from request headers
    const referrer = request.headers.get('referer') || 'direct'

    // Prepare metadata
    const meta = {
      userAgent: request.headers.get('user-agent') || '',
      ip: clientIP,
      timestamp: new Date().toISOString()
    }

    // Check if email already exists
    const { data: existingEntry } = await supabase
      .from('waitlist')
      .select('id, email')
      .eq('email', sanitizedEmail)
      .single()

    if (existingEntry) {
      // Return success for existing email (idempotent behavior)
      return NextResponse.json({
        ok: true,
        message: 'You are already on the waitlist! We will notify you when VistaForge is ready.',
        id: existingEntry.id,
        alreadyExists: true
      })
    }

    // Insert new waitlist entry
    const { data, error } = await supabase
      .from('waitlist')
      .insert({
        name: sanitizedName || null,
        email: sanitizedEmail,
        role: sanitizedRole || null,
        source: sanitizedSource || 'landing_page',
        referrer: referrer,
        meta: meta
      })
      .select('id')
      .single()

    if (error) {
      console.error('Waitlist signup error:', error)
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Failed to join waitlist. Please try again.' 
        },
        { status: 500 }
      )
    }

    // Optional: Send confirmation email (if configured)
    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      try {
        // Here you would integrate with your email provider
        // For now, we'll just log it
        console.log(`Confirmation email would be sent to: ${sanitizedEmail}`)
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError)
        // Don't fail the request if email sending fails
      }
    }

    return NextResponse.json({
      ok: true,
      message: 'Thanks — you are on the waitlist! We will notify you when VistaForge is ready.',
      id: data.id
    })

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { 
        ok: false, 
        error: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
