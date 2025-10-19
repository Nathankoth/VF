# VistaForge Waitlist Integration

This document describes the non-intrusive waitlist system implemented for VistaForge. The system captures user signups without changing the site's visual design or layout.

## Overview

The waitlist system consists of:
- **Backend API**: `POST /api/waitlist` for signups and `GET /api/waitlist/export` for data export
- **Database**: Supabase table for storing waitlist entries
- **Frontend Integration**: Non-intrusive JavaScript that attaches to existing UI elements
- **Accessibility**: Screen reader support and ARIA live regions

## Features

✅ **Non-intrusive**: No visual changes to existing UI  
✅ **Accessible**: Screen reader friendly with ARIA live regions  
✅ **Mobile-friendly**: Works on all device sizes  
✅ **Rate limiting**: Prevents spam (5 requests per minute per IP)  
✅ **Duplicate prevention**: Idempotent behavior for existing emails  
✅ **Data export**: CSV export functionality for admins  
✅ **Analytics integration**: Tracks waitlist signups  
✅ **Privacy compliant**: Minimal data collection with opt-out options  

## Quick Start

The waitlist integration is already included in the main layout and will automatically attach to existing signup buttons and forms.

### Automatic Integration

The system automatically detects and attaches to:
- Buttons containing: "Get Started", "Sign Up", "Start Free Trial", "Start 14-day trial", "Contact Sales"
- Email input fields in forms
- Elements with `data-waitlist-cta` or `data-waitlist-email` attributes

### Manual Integration

For custom implementations, you can use the global API:

```javascript
// Submit to waitlist manually
window.VistaForgeWaitlist.submit('user@example.com', {
  name: 'John Doe',
  role: 'agent',
  source: 'custom_form'
});

// Show custom message
window.VistaForgeWaitlist.showMessage('Custom success message');
```

## API Endpoints

### POST /api/waitlist

Submit a new waitlist entry.

**Request Body:**
```json
{
  "name": "John Doe",           // Optional
  "email": "user@example.com",  // Required
  "role": "agent",              // Optional: 'agent', 'buyer', 'developer', 'other'
  "source": "landing_page"      // Optional: tracking source
}
```

**Success Response (200):**
```json
{
  "ok": true,
  "message": "Thanks — you are on the waitlist! We will notify you when VistaForge is ready.",
  "id": "uuid-string"
}
```

**Error Response (400/429/500):**
```json
{
  "ok": false,
  "error": "Error message"
}
```

### GET /api/waitlist/export

Export waitlist data as CSV or JSON.

**Headers:**
```
Authorization: Bearer YOUR_EXPORT_TOKEN
```

**Query Parameters:**
- `format`: `csv` (default) or `json`
- `limit`: Number of records (default: 1000)
- `offset`: Starting offset (default: 0)

**Example:**
```
GET /api/waitlist/export?format=csv&limit=100
```

## Database Schema

The waitlist data is stored in the `waitlist` table:

```sql
CREATE TABLE waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    name TEXT,
    email TEXT NOT NULL UNIQUE,
    role TEXT,
    source TEXT,
    referrer TEXT,
    meta JSONB  -- Contains user agent, IP, etc.
);
```

## Configuration

### Environment Variables

Add these to your `.env.local`:

```bash
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Email confirmation
SEND_CONFIRMATION_EMAIL=false

# Optional: Export token for admin access
WAITLIST_EXPORT_TOKEN=your_secure_token_here
```

### Client-side Configuration

The integration script can be configured via the script tag:

```html
<script 
  src="/waitlist-integration.js" 
  async
  data-waitlist-config='{
    "debug": false,
    "showMessages": true,
    "autoDetectEmail": true
  }'
/>
```

## Customization

### Adding Custom Selectors

To attach the waitlist to additional elements, modify the selectors in the configuration:

```javascript
// In waitlist-integration.js, update CONFIG.selectors
selectors: {
  ctaButtons: [
    // Add your custom selectors here
    '.my-custom-signup-button',
    '[data-custom-cta]'
  ],
  emailInputs: [
    // Add custom email input selectors
    '.my-email-field'
  ]
}
```

### Custom Messages

Override default messages:

```javascript
window.VistaForgeWaitlist.config.messages = {
  success: 'Welcome to the VistaForge waitlist!',
  error: 'Something went wrong. Please try again.',
  // ... other messages
};
```

### Styling Toast Messages

The success/error messages use the class `.vf-waitlist-toast`. You can style them:

```css
.vf-waitlist-toast {
  /* Your custom styles */
  background: #your-brand-color !important;
  border-radius: 12px !important;
}
```

## Testing

### Manual Testing

1. **Test signup flow:**
   - Click any "Get Started" or "Sign Up" button
   - Verify success message appears
   - Check browser console for debug logs (if debug enabled)

2. **Test form integration:**
   - Fill out the signup form at `/auth/signup`
   - Submit the form
   - Verify waitlist signup occurs alongside form submission

3. **Test duplicate prevention:**
   - Submit the same email twice
   - Verify second submission shows "already on waitlist" message

4. **Test rate limiting:**
   - Submit multiple requests quickly
   - Verify rate limiting kicks in after 5 requests

### Database Verification

Check the waitlist table in Supabase:

```sql
SELECT * FROM waitlist ORDER BY created_at DESC LIMIT 10;
```

### Export Testing

Test the export endpoint:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     "https://your-domain.com/api/waitlist/export?format=csv"
```

## Deployment

### 1. Database Setup

Run the migration to create the waitlist table:

```bash
# If using Supabase CLI
supabase db push

# Or manually run the SQL in supabase/migrations/001_create_waitlist_table.sql
```

### 2. Environment Variables

Set the required environment variables in your deployment platform (Vercel, etc.):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
WAITLIST_EXPORT_TOKEN=your_secure_token
```

### 3. Verify Integration

After deployment:
1. Visit your site
2. Open browser dev tools
3. Look for `[VistaForge Waitlist]` logs in console
4. Test a signup flow

## Privacy & Compliance

### Data Collection

The system collects minimal data:
- Email (required)
- Name (optional)
- Role/interest (optional)
- Source/referrer (for analytics)
- User agent and IP (for security)

### Data Retention

- Waitlist emails are kept until product launch + 12 months
- Users can request deletion by contacting support
- IP addresses are hashed for privacy

### GDPR Compliance

- Users can opt-out of marketing emails
- Data is stored securely in Supabase (EU-compliant)
- Clear privacy notice provided

## Troubleshooting

### Common Issues

1. **Script not loading:**
   - Check that `/waitlist-integration.js` is accessible
   - Verify script tag is in the HTML head/body

2. **No signup detection:**
   - Enable debug mode: `data-waitlist-config='{"debug": true}'`
   - Check console for selector matching logs

3. **API errors:**
   - Verify Supabase environment variables
   - Check API endpoint is accessible
   - Review server logs for errors

4. **Rate limiting issues:**
   - Rate limit is 5 requests per minute per IP
   - Clear browser cache or wait 1 minute to reset

### Debug Mode

Enable debug mode to see detailed logs:

```html
<script 
  src="/waitlist-integration.js" 
  data-waitlist-config='{"debug": true}'
/>
```

This will log:
- Selector matching
- Form/button detection
- API requests and responses
- Error details

## Support

For issues or questions:
1. Check this documentation
2. Enable debug mode and check console logs
3. Review server logs for API errors
4. Contact the development team

## Changelog

### v1.0.0 (Initial Release)
- Non-intrusive waitlist integration
- Automatic CTA button detection
- Form submission interception
- Rate limiting and spam prevention
- CSV export functionality
- Accessibility support
- Mobile-friendly design
