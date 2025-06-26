# Supabase Integration Setup

This document explains how to set up Supabase integration for the Aqua Blue Group website forms.

## Prerequisites

- Supabase account and project
- Node.js and npm installed

## Setup Steps

### 1. Environment Variables

The `.env` file has been created with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://qokymsacupivqylsoaxc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFva3ltc2FjdXBpdnF5bHNvYXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODE3MTgsImV4cCI6MjA2NTU1NzcxOH0.AMVDSTFCxCP_YstKkjE_Y2ILqygBa6RyYzFdHj7Sf-Q
```

### 2. Database Setup

Run the SQL script `supabase-setup.sql` in your Supabase SQL editor to create the required tables:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Execute the script

This will create:
- `join_us` table for Join Us form submissions
- `contact_us` table for Contact Us form submissions  
- `tenant_down` table for Tenant Down form submissions

### 3. Dependencies

The Supabase client has been installed:

```bash
npm install @supabase/supabase-js
```

### 4. Files Created/Modified

#### New Files:
- `src/lib/supabase.ts` - Supabase client configuration
- `src/types/forms.ts` - TypeScript types for form data
- `src/services/formService.ts` - Service layer for form submissions
- `supabase-setup.sql` - Database setup script
- `.env` - Environment variables

#### Modified Files:
- `src/pages/JoinUs.tsx` - Added Supabase integration
- `src/pages/Contact.tsx` - Added Supabase integration

## Features

### Form Integration

All three forms now save data to Supabase:

1. **Join Us Form** - Saves user applications with:
   - Full name, phone, email
   - State, district, area
   - Timestamp

2. **Contact Us Form** - Saves general inquiries with:
   - Question, email, description
   - Timestamp

3. **Tenant Down Form** - Saves emergency requests with:
   - Name, email, tenant URL, description
   - Timestamp

### User Experience

- **Loading States**: Buttons show "Submitting..." during form submission
- **Success Messages**: Users see confirmation when forms are submitted successfully
- **Error Handling**: Clear error messages if submission fails
- **Form Reset**: Forms clear automatically after successful submission

### Security

- Row Level Security (RLS) enabled on all tables
- Anonymous users can only insert data (submit forms)
- Authenticated users can read all data
- Environment variables for secure credential management

## Testing

To test the integration:

1. Start the development server: `npm run dev`
2. Navigate to the Join Us or Contact pages
3. Fill out and submit the forms
4. Check your Supabase dashboard to see the submitted data

## Database Schema

### join_us table
```sql
- id (UUID, Primary Key)
- full_name (TEXT, Required)
- phone (TEXT, Required)
- email (TEXT, Optional)
- state (TEXT, Required)
- district (TEXT, Required)
- area (TEXT, Required)
- created_at (TIMESTAMP)
```

### contact_us table
```sql
- id (UUID, Primary Key)
- question (TEXT, Required)
- email (TEXT, Required)
- description (TEXT, Required)
- created_at (TIMESTAMP)
```

### tenant_down table
```sql
- id (UUID, Primary Key)
- name (TEXT, Required)
- email (TEXT, Required)
- tenant_url (TEXT, Required)
- description (TEXT, Optional)
- created_at (TIMESTAMP)
```

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure the `.env` file is in the root directory
   - Restart the development server after adding environment variables

2. **Database Connection Errors**
   - Verify your Supabase URL and anon key are correct
   - Check that the database tables have been created
   - Ensure RLS policies are properly configured

3. **Form Submission Fails**
   - Check browser console for error messages
   - Verify network connectivity
   - Check Supabase dashboard for any service issues

### Support

If you encounter any issues, check:
- Supabase dashboard for service status
- Browser console for error messages
- Network tab for failed requests 