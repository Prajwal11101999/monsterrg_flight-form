# Firebase Hosting Deployment Guide

## Prerequisites

1. **Firebase CLI installed globally**
   ```bash
   npm install -g firebase-tools
   ```

2. **Firebase project already configured** ✅
   - Project ID: `flight-info-challenge-62d1b`
   - Firebase Auth enabled
   - Firestore enabled

## One-Time Setup

### 1. Login to Firebase

```bash
firebase login
```

This will open a browser window for Google authentication.

### 2. Verify Project Configuration

```bash
firebase projects:list
```

You should see `flight-info-challenge-62d1b` in the list.

## Deployment Steps

### 1. Build for Production

```bash
npm run build:prod
```

This creates optimized files in `dist/flight-info-app/browser/`

### 2. Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

### 3. Get Your Live URL

After deployment succeeds, you'll see:

```
✔  Deploy complete!

Hosting URL: https://flight-info-challenge-62d1b.web.app
```

## Quick Deploy (All-in-One)

```bash
npm run deploy
```

This runs build + deployment in one command.

## Verify Deployment

1. **Visit your live URL**: https://flight-info-challenge-62d1b.web.app
2. **Test authentication** - Register/login
3. **Test Google OAuth** - Login with Google
4. **Submit flight form** - Verify end-to-end flow

## Testing Credentials for Matthew

**Option 1: Email/Password**
- Create a test account during your testing
- Email: `test@monsterrg.com`
- Password: `test123456`
- Include these credentials in your email to Matthew

**Option 2: Google OAuth**
- Matthew can use his own Google account
- No credentials needed

## Troubleshooting

### Build Fails

```bash
# Clean and rebuild
rm -rf dist
npm run build:prod
```

### Deployment Permission Error

```bash
# Re-authenticate
firebase logout
firebase login
```

### Wrong Project

```bash
# Switch to correct project
firebase use flight-info-challenge-62d1b
```

### 404 Errors After Deployment

Check `firebase.json` has the rewrite rule:
```json
"rewrites": [
  {
    "source": "**",
    "destination": "/index.html"
  }
]
```

## Post-Deployment Checklist

- [ ] Live URL is accessible
- [ ] Registration works
- [ ] Login works (email + Google)
- [ ] Auth guard protects `/flight-form`
- [ ] Flight form submission succeeds
- [ ] Success message displays
- [ ] Duplicate submission prevention works
- [ ] Logout works

## Sharing with Matthew

**Email Template:**

```
Hi Matthew,

I've completed the flight information web app challenge. 

Live URL: https://flight-info-challenge-62d1b.web.app
GitHub Repo: https://github.com/Prajwal11101999/monsterrg_flight-form

Test Credentials (Email/Password):
- Email: test@monsterrg.com
- Password: test123456

Or use Google OAuth with any Google account.

The app includes:
- Firebase Authentication (Email/Password + Google OAuth)
- Protected routes with auth guard
- Flight information form with validation
- API integration with the CRM SDK endpoint
- Duplicate submission prevention
- Session timeout (1 hour)

Looking forward to discussing the implementation!

Best regards,
Prajwal Borawake
```

## Firebase Hosting Features (FREE Tier)

- ✅ SSL certificate (automatic HTTPS)
- ✅ Global CDN
- ✅ 10 GB storage (your app is ~2-5 MB)
- ✅ 360 MB/day bandwidth
- ✅ Version history (rollback capability)
- ✅ Preview channels (for testing before production)

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm run build:prod` | Build optimized production bundle |
| `npm run deploy` | Build + deploy in one command |
| `firebase deploy --only hosting` | Deploy to Firebase Hosting |
| `firebase hosting:channel:deploy preview` | Deploy to preview channel |
| `firebase open hosting` | Open Hosting dashboard in browser |

## Next Steps

1. **Deploy the app** - Run `npm run deploy`
2. **Create test account** - Register with test@monsterrg.com
3. **Test end-to-end** - Complete full user journey
4. **Email Matthew** - Share live URL and credentials
