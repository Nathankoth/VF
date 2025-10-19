import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Simple authentication check (in production, use proper auth)
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.WAITLIST_EXPORT_TOKEN
  
  if (!expectedToken) {
    console.warn('WAITLIST_EXPORT_TOKEN not configured')
    return false
  }
  
  return authHeader === `Bearer ${expectedToken}`
}

export async function GET(request: NextRequest) {
  try {
    // Check authorization
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'csv'
    const limit = parseInt(searchParams.get('limit') || '1000')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Fetch waitlist data
    const { data: waitlistEntries, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching waitlist data:', error)
      return NextResponse.json(
        { error: 'Failed to fetch waitlist data' },
        { status: 500 }
      )
    }

    if (format === 'json') {
      return NextResponse.json({
        ok: true,
        data: waitlistEntries,
        count: waitlistEntries?.length || 0,
        offset,
        limit
      })
    }

    // Generate CSV
    if (!waitlistEntries || waitlistEntries.length === 0) {
      const emptyCSV = 'id,created_at,name,email,role,source,referrer,user_agent,ip\n'
      return new NextResponse(emptyCSV, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="waitlist.csv"'
        }
      })
    }

    // Convert to CSV
    const headers = [
      'id',
      'created_at',
      'name',
      'email',
      'role',
      'source',
      'referrer',
      'user_agent',
      'ip'
    ]

    const csvRows = [
      headers.join(','),
      ...waitlistEntries.map(entry => [
        entry.id,
        entry.created_at,
        entry.name || '',
        entry.email,
        entry.role || '',
        entry.source || '',
        entry.referrer || '',
        entry.meta?.userAgent || '',
        entry.meta?.ip || ''
      ].map(field => {
        // Escape CSV fields that contain commas or quotes
        const stringField = String(field || '')
        if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
          return `"${stringField.replace(/"/g, '""')}"`
        }
        return stringField
      }).join(','))
    ]

    const csv = csvRows.join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="waitlist.csv"'
      }
    })

  } catch (error) {
    console.error('Waitlist export error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization',
    },
  })
}
