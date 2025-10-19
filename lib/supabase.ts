import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vhugicmqspbuytqqimnx.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodWdpY21xc3BidXl0cXFpbW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MTAxNDUsImV4cCI6MjA3MzM4NjE0NX0.DXnRmusOZqKDd6K458MMQFzGkN5cmkN4v2V18s3FDZM'

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using default values.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types for VistaForge
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          user_id?: string
        }
      }
      properties: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          price: number
          location: string
          property_type: string
          bedrooms: number | null
          bathrooms: number | null
          sqft: number | null
          images: string[] | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          price: number
          location: string
          property_type: string
          bedrooms?: number | null
          bathrooms?: number | null
          sqft?: number | null
          images?: string[] | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          price?: number
          location?: string
          property_type?: string
          bedrooms?: number | null
          bathrooms?: number | null
          sqft?: number | null
          images?: string[] | null
          user_id?: string
        }
      }
      visualizations: {
        Row: {
          id: string
          created_at: string
          property_id: string
          type: '2d' | '3d'
          style: string
          image_url: string
          metadata: any
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          property_id: string
          type: '2d' | '3d'
          style: string
          image_url: string
          metadata?: any
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          property_id?: string
          type?: '2d' | '3d'
          style?: string
          image_url?: string
          metadata?: any
          user_id?: string
        }
      }
      roi_analyses: {
        Row: {
          id: string
          created_at: string
          property_id: string
          analysis_data: any
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          property_id: string
          analysis_data: any
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          property_id?: string
          analysis_data?: any
          user_id?: string
        }
      }
      waitlist: {
        Row: {
          id: string
          created_at: string
          name: string | null
          email: string
          role: string | null
          source: string | null
          referrer: string | null
          meta: any | null
        }
        Insert: {
          id?: string
          created_at?: string
          name?: string | null
          email: string
          role?: string | null
          source?: string | null
          referrer?: string | null
          meta?: any | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string | null
          email?: string
          role?: string | null
          source?: string | null
          referrer?: string | null
          meta?: any | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}