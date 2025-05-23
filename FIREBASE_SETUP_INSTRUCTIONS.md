# Firebase Authentication Setup Instructions

To fix the "auth/configuration-not-found" error, you need to properly configure Firebase Authentication in the Firebase Console:

## Step 1: Configure Google as a sign-in provider

1. Go to the [Firebase Console](https://console.firebase.google.com/) and select your project
2. In the left sidebar, click on "Authentication"
3. Select the "Sign-in method" tab
4. Click on "Google" in the list of providers
5. Toggle the "Enable" switch to the ON position
6. Enter a Project support email (typically your email)
7. Click "Save"

## Step 2: Add your domain to the authorized domains list

1. While still in the Authentication section, click on the "Settings" tab
2. Scroll down to the "Authorized domains" section
3. Click "Add domain"
4. Add your Replit domain: `[your-repl-name].replit.app`
5. Click "Add"

## Step 3: Set up the OAuth consent screen (if not already done)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to "APIs & Services" > "OAuth consent screen"
4. Choose "External" user type (unless you have a Google Workspace account)
5. Fill in the required information:
   - App name
   - User support email
   - Developer contact information
6. Click "Save and Continue"
7. Under "Scopes," you can add the default scopes (email, profile, openid)
8. Click "Save and Continue"
9. Under "Test users," you can add your own email to test
10. Click "Save and Continue"

## Step 4: Add Web App Configuration

If you haven't already added a Web App to your Firebase project:

1. Go to the Firebase Console Project Overview
2. Click on the "</>" (Web) icon to add a web app
3. Give your app a nickname
4. Check "Also set up Firebase Hosting" if you want to use Firebase Hosting
5. Click "Register app"
6. Copy the provided Firebase configuration (should match what's in your environment variables)
7. Click "Continue to console"

Once you've completed these steps, try logging in again. The Firebase authentication should work properly.