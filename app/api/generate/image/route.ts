import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token or user not found' },
        { status: 401 }
      )
    }

    const { prompt, style, property_id } = await request.json()

    if (!prompt || !style || !property_id) {
      return NextResponse.json(
        { error: 'Prompt, style, and property_id are required' },
        { status: 400 }
      )
    }

    // TODO: Integrate with OpenAI Images API
    // For now, return a placeholder response
    const generatedImageUrl = `https://via.placeholder.com/512x512/FFD700/000000?text=${encodeURIComponent(prompt)}`

    // Save visualization to database
    const { data: visualization, error } = await supabase
      .from('visualizations')
      .insert({
        property_id,
        type: '2d',
        style,
        image_url: generatedImageUrl,
        metadata: { prompt, generated_at: new Date().toISOString() },
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      visualization,
      image_url: generatedImageUrl 
    }, { status: 201 })
  } catch (error) {
    console.error('Generate image error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
