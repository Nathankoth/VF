/**
 * Secure Waitlist Admin Handler
 * 
 * This serverless function handles waitlist operations that require
 * the service role key. It should NEVER be exposed to client code.
 * 
 * Environment Variables Required:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Service role key (Vercel secret)
 */

import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
}

/**
 * Create Supabase client with service role key (server-side only)
 */
function createAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing required Supabase configuration')
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

/**
 * Export waitlist data as CSV
 */
async function exportWaitlistData(supabase) {
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Database error: ${error.message}`)
  }

  // Convert to CSV
  const headers = ['id', 'name', 'email', 'role', 'source', 'referrer', 'created_at', 'opt_out', 'email_verified']
  const csvRows = [headers.join(',')]
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header] || ''
      // Escape CSV values
      return `"${String(value).replace(/"/g, '""')}"`
    })
    csvRows.push(values.join(','))
  })

  return csvRows.join('\n')
}

/**
 * Get waitlist statistics
 */
async function getWaitlistStats(supabase) {
  const { data, error } = await supabase
    .from('waitlist')
    .select('role, created_at, opt_out, email_verified')

  if (error) {
    throw new Error(`Database error: ${error.message}`)
  }

  const stats = {
    total: data.length,
    byRole: {},
    byMonth: {},
    optOuts: data.filter(row => row.opt_out).length,
    verified: data.filter(row => row.email_verified).length
  }

  // Group by role
  data.forEach(row => {
    const role = row.role || 'unknown'
    stats.byRole[role] = (stats.byRole[role] || 0) + 1
  })

  // Group by month
  data.forEach(row => {
    const month = new Date(row.created_at).toISOString().substring(0, 7)
    stats.byMonth[month] = (stats.byMonth[month] || 0) + 1
  })

  return stats
}

/**
 * Main handler function
 */
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200, 
      headers: corsHeaders 
    })
  }

  // Only allow GET requests for now
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ 
        error: 'Method not allowed' 
      }),
      { 
        status: 405, 
        headers: corsHeaders 
      }
    )
  }

  try {
    // Create admin client (uses service role key)
    const supabase = createAdminClient()
    
    const { format } = req.query
    
    if (format === 'csv') {
      // Export as CSV
      const csvData = await exportWaitlistData(supabase)
      
      return new Response(csvData, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="waitlist-export.csv"'
        }
      })
    } else {
      // Return statistics
      const stats = await getWaitlistStats(supabase)
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: stats 
        }),
        { 
          status: 200, 
          headers: corsHeaders 
        }
      )
    }

  } catch (error) {
    console.error('Waitlist admin error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      }),
      { 
        status: 500, 
        headers: corsHeaders 
      }
    )
  }
}
