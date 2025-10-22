/**
 * VistaForge Waitlist Handler - Secure Serverless Function
 * 
 * This function handles waitlist form submissions with proper security:
 * - Uses service role key ONLY on server-side
 * - Validates input data
 * - Inserts into Supabase database
 * - Sends notifications to Mailchimp and Slack
 * 
 * Environment Variables Required:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Service role key (server-side only)
 * - MAILCHIMP_API_KEY: Mailchimp API key (optional)
 * - MAILCHIMP_LIST_ID: Mailchimp list ID (optional)
 * - SLACK_WEBHOOK: Slack webhook URL (optional)
 */

import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_ROLES = [
  'real_estate_agent',
  'property_developer', 
  'architect',
  'interior_designer',
  'property_manager',
  'investor',
  'other'
]

function validateInput(data) {
  const errors = []
  
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.push('Valid email is required')
  }
  
  if (!data.role || !VALID_ROLES.includes(data.role)) {
    errors.push('Valid role is required')
  }
  
  if (data.monthly_listings && (isNaN(data.monthly_listings) || data.monthly_listings < 0)) {
    errors.push('Monthly listings must be a positive number')
  }
  
  return errors
}

async function insertToDatabase(supabase, data) {
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([
      {
        email: data.email,
        role: data.role,
        company: data.company || null,
        monthly_listings: data.monthly_listings || null,
        how_heard: data.how_heard || null,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single()

  if (error) {
    throw new Error(`Database error: ${error.message}`)
  }
  
  return result
}

async function subscribeToMailchimp(data) {
  // Only run if Mailchimp is configured
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_LIST_ID) {
    console.log('Mailchimp not configured, skipping subscription')
    return
  }

  try {
    const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: data.email,
        status: 'subscribed',
        merge_fields: {
          ROLE: data.role,
          COMPANY: data.company || '',
          MONTHLY_LISTINGS: data.monthly_listings || 0,
          HOW_HEARD: data.how_heard || ''
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Mailchimp error: ${response.statusText}`)
    }
    
    console.log('Successfully subscribed to Mailchimp')
  } catch (error) {
    console.error('Mailchimp subscription failed:', error.message)
    // Don't throw - this is not critical for the main flow
  }
}

async function notifySlack(data) {
  // Only run if Slack webhook is configured
  if (!process.env.SLACK_WEBHOOK) {
    console.log('Slack webhook not configured, skipping notification')
    return
  }

  try {
    const message = {
      text: `🎉 New waitlist signup!`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*New VistaForge Waitlist Signup*\n\n*Email:* ${data.email}\n*Role:* ${data.role}\n*Company:* ${data.company || 'Not provided'}\n*Monthly Listings:* ${data.monthly_listings || 'Not provided'}\n*How they heard:* ${data.how_heard || 'Not provided'}`
          }
        }
      ]
    }

    const response = await fetch(process.env.SLACK_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    })

    if (!response.ok) {
      throw new Error(`Slack error: ${response.statusText}`)
    }
    
    console.log('Successfully notified Slack')
  } catch (error) {
    console.error('Slack notification failed:', error.message)
    // Don't throw - this is not critical for the main flow
  }
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const data = await req.json()
    
    // Validate input
    const validationErrors = validateInput(data)
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed', 
          details: validationErrors 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get environment variables
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing')
    }

    // Create Supabase client with service role key (server-side only)
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Insert into database
    const dbResult = await insertToDatabase(supabase, data)
    
    // Send notifications (non-blocking)
    subscribeToMailchimp(data).catch(err => 
      console.error('Mailchimp subscription failed:', err)
    )
    notifySlack(data).catch(err => 
      console.error('Slack notification failed:', err)
    )

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: dbResult.id, 
        message: 'Successfully joined the waitlist' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Waitlist handler error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}
