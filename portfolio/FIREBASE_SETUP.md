# Firebase Setup Guide

This portfolio uses **Cloud Firestore** to sync views and appreciation counts across all users globally.

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter a project name (e.g., "aun-shahid-portfolio")
4. Disable Google Analytics (optional for a simple project)
5. Click **Create project** and wait for it to initialize

### 2. Create Cloud Firestore

✅ **You've already done this!** You have Firestore set up.

If you need to create it again:
1. In the Firebase Console, go to **Build → Firestore Database**
2. Click **Create database**
3. Select your region (choose the one closest to you or your users)
4. Start in **Test mode** (we'll fix security rules next)
5. Click **Enable**

### 3. Get Your Firebase Config

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. If you haven't added a web app yet:
   - Click **`</>`** (Web) icon
   - Register your app (name it something like "portfolio")
   - Copy the Firebase config object

Your config will look like:
```javascript
{
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234..."
}
```

### 4. Create `.env.local` File

1. In the portfolio root directory, create a file named `.env.local`
2. Add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Update Firestore Security Rules (Important!)

1. In Firestore, go to the **Rules** tab
2. Replace the default rules with:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false;
    }
    
    match /portfolio/stats {
      allow read: if true;
      allow update: if request.resource.data.views == resource.data.views + 1;
    }
    
    match /portfolio/stats/appreciations/{fingerprintId} {
      allow read: if true;
      allow create: if resource == null && 
        request.resource.data.keys().hasAll(['name', 'fingerprint', 'timestamp']) &&
        request.resource.data.fingerprint == fingerprintId;
      allow update, delete: if false;
    }
  }
}
```

This allows:
- Anyone to read all data (public)
- Views counter can only increment by 1 each time
- Appreciations can only be created once per fingerprint (prevents duplicates)
Copy Security Rules to Firestore

1. Go back to Firestore **Rules** tab
2. Click **Edit Rules**
3. Copy and paste the security rules from step 5 above
4. Click **Publish**

### 7. Test Locally

1. Run `npm run dev` 
2. Open the portfolio
3. You should see the views and appreciation counts updating in real-time
4. Open the Firebase Console → Firestore to see the data being stored at: `portfolio → stats`

### 8. Deploy

When deploying to GitHub Pages:
1. Create a `.env.local` file in your project root with the Firebase credentials
2. For CI/CD deployment (GitHub Actions), add the environment variables as repository secrets

---

## Troubleshooting

**"Failed to connect to Firebase"**
- Check that `.env.local` has correct Firebase credentials (no `VITE_` prefix needed in `.env.local`)
- Verify Firestore is created and accessible
- Check Firestore security rules allow read access (should have `allow read: if true;`)

**Counters not updating**
- Ensure both local and deployed versions use the same Firebase project
- Check browser console for errors
- Verify Firestore security rules are published correctly

**"Missing or insufficient permissions"**
- Make sure security rules are updated in Firestore console
- Check that the rules allow the operation you're trying to perform

**Too many appreciations from one browser**
- This shouldn't happen - the fingerprint system prevents duplicates
- Clear browser localStorage and try agains duplicates
- Check browser fingerprint is being generated correctly
