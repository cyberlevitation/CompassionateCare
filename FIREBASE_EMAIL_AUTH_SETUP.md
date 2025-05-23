# Setting Up Firebase Email/Password Authentication

To fix the "auth/configuration-not-found" error, you need to properly enable Email/Password authentication in your Firebase project.

## Step 1: Enable Email/Password authentication in Firebase Console

1. Go to the [Firebase Console](https://console.firebase.google.com/) and select your project
2. In the left sidebar, click on "Authentication"
3. Click on the "Sign-in method" tab
4. Find "Email/Password" in the list of providers and click on it
5. Toggle the "Enable" switch to the ON position
6. Click "Save"

## Step 2: Verify your Firebase configuration

Make sure your environment variables match exactly what's shown in your Firebase project settings:

1. In the Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section and find your web app
3. Click on the "</>" icon if you don't see your web app listed
4. Make sure these values match your environment variables:
   - `VITE_FIREBASE_API_KEY` should match the `apiKey` value
   - `VITE_FIREBASE_PROJECT_ID` should match the `projectId` value
   - `VITE_FIREBASE_APP_ID` should match the `appId` value

## Step 3: Additional settings

1. While in the Authentication section, click on the "Settings" tab
2. Add your Replit domain to the "Authorized domains" list
3. Your Replit domain typically looks like: `your-repl-name.username.repl.co`

Once you've completed these steps, try logging in again with email/password authentication. The Firebase error should be resolved.