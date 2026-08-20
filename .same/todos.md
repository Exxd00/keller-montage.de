# Möbelmontage Nürnberg - Todos

## Done: Fix email delivery + thank-you protection
- [x] API `/api/contact`: stop returning fake success; report real email failure reason
- [x] API: detailed, honest error reasons from Resend (not configured / domain / API key / network)
- [x] API: accurate notificationsSent reporting (sheets/email)
- [x] Form: show failure reason on the site (prominent alert + phone/WhatsApp fallback)
- [x] Form: only redirect to thank-you on real success; fire tracking only after success
- [x] Thank-you page: one-time sessionStorage flag only; removed ?success=true bypass
- [x] Created .env.local template with setup instructions
- [ ] USER ACTION: add real RESEND_API_KEY + RECIPIENT_EMAIL to .env.local so emails arrive

## Completed
- [x] Import repository from GitHub into Same
- [x] Install dependencies with bun
- [x] Start dev server (all routes verified 200/redirect)
- [x] Fix contact form API (handles email failures gracefully)
- [x] Single form implementation:
  - Only main page (/) has the actual form
  - Created FormCTA component for other pages
  - /kontakt redirects to /#kontakt-form
  - City pages use FormCTA (links to main form)
  - Service pages use FormCTA (links to main form)
  - CTA buttons on /leistungen, /staedte, /arbeiten link to main form

## Current Architecture
```
/ (main page)
└── QuickContactForm (THE ONLY FORM)

/kontakt → redirect to /#kontakt-form
/[citySlug] → FormCTA (button to main form)
/[citySlug]/[serviceSlug] → FormCTA (button to main form)
/service/[serviceSlug] → FormCTA (button to main form)
/leistungen → Link to /#kontakt-form
/staedte → Link to /#kontakt-form
/arbeiten → Link to /#kontakt-form
```

## FormCTA Features
- Dynamic title based on city/service context
- Benefits grid (Festpreise, 24h Antwort, etc.)
- Prominent CTA button to main form
- Phone and WhatsApp contact options
- Availability indicator

## Optional Environment Variables (for full functionality)
The site runs fine without these. Add a `.env.local` to enable extra features:
- [ ] `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RECIPIENT_EMAIL` - contact form email notifications
- [ ] `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_BUCKET_NAME` - file uploads & admin asset storage
- [ ] `NEXT_PUBLIC_IMGBB_API_KEY` - ImgBB image uploads
- [ ] `SHEETS_WEBHOOK_URL` - Google Sheets lead logging

## Optional Improvements
- [ ] Verify Resend domain for email notifications
- [ ] Add more cities/services
