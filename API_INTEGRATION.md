# Frontend-Backend API Integration

## Overview

The mobile app has been fully integrated with the VidMuse backend API. All screens now communicate with the backend server.

## API Base URL Configuration

The API base URL is configured in `src/services/api.ts`:

- **Development (Android Emulator)**: `http://10.0.2.2:5000/api`
- **Development (iOS Simulator)**: `http://localhost:5000/api`
- **Physical Device**: Update to your computer's IP address (e.g., `http://192.168.1.100:5000/api`)

To change the API URL, edit the `API_BASE_URL` constant in `src/services/api.ts`.

## Authentication

### Token Storage

The app uses in-memory token storage by default. For persistent token storage across app restarts, install AsyncStorage:

```bash
npm install @react-native-async-storage/async-storage
```

The API service will automatically use AsyncStorage if available, otherwise it falls back to in-memory storage.

### Authentication Flow

1. **Sign Up**: `POST /api/auth/signup`
   - Creates new user account
   - Returns JWT token
   - Token is stored automatically

2. **Sign In**: `POST /api/auth/signin`
   - Authenticates user
   - Returns JWT token
   - Token is stored automatically

3. **Sign Out**: Clears stored token

All authenticated requests automatically include the token in the `Authorization` header.

## Updated Screens

### 1. SignIn Screen (`src/screens/SignIn.tsx`)
- ✅ Integrated with `/api/auth/signin`
- ✅ Validates input
- ✅ Shows loading state
- ✅ Handles errors
- ✅ Navigates to MainTabs on success

### 2. SignUp Screen (`src/screens/SignUpScreen.tsx`)
- ✅ Integrated with `/api/auth/signup`
- ✅ Validates passwords match
- ✅ Shows loading state
- ✅ Handles errors
- ✅ Navigates to MainTabs on success

### 3. CreateScreen (`src/screens/CreateScreen.tsx`)
- ✅ Integrated with `/api/projects/create`
- ✅ Creates new project
- ✅ Navigates to Scenes screen with projectId

### 4. ScenesScreen (`src/screens/ScenesScreen.tsx`)
- ✅ Integrated with `/api/story/generate`
- ✅ Generates scenes from prompt
- ✅ Integrated with `/api/story/regenerate/:sceneId`
- ✅ Regenerates individual scenes
- ✅ Handles errors gracefully

### 5. ExportScreen (`src/screens/ExportScreen.tsx`)
- ✅ Integrated with `/api/video/export`
- ✅ Starts video rendering
- ✅ Shows loading state
- ✅ Handles errors

### 6. ProfileScreen (`src/screens/ProfileScreen.tsx`)
- ✅ Integrated with `/api/user/profile`
- ✅ Fetches user data on load
- ✅ Displays real user stats
- ✅ Integrated with `/api/auth/signout`
- ✅ Handles logout

## API Service Structure

The API service (`src/services/api.ts`) provides:

```typescript
// Authentication
api.auth.signUp(email, password, name?)
api.auth.signIn(email, password)
api.auth.signOut()
api.auth.getCurrentUser()

// Projects
api.projects.create(prompt, style?, duration?)
api.projects.getAll()
api.projects.getById(projectId)

// Story/Scenes
api.story.generate(projectId, prompt)
api.story.regenerateScene(sceneId, prompt?)

// Video
api.video.export(projectId)
api.video.getStatus(videoId)
api.video.getAll()

// User
api.user.getProfile()
api.user.updateProfile(name?, avatar?)
```

## Error Handling

All API calls include error handling:
- Network errors are caught and displayed
- User-friendly error messages
- Loading states for async operations
- Graceful fallbacks where appropriate

## Testing

1. **Start Backend Server**:
   ```bash
   cd Backend
   npm start
   ```

2. **Start Mobile App**:
   ```bash
   cd Mobile-App/VidMuse
   npm start
   ```

3. **Test Flow**:
   - Sign up with a new account
   - Sign in with credentials
   - Create a project
   - Generate scenes
   - Export video
   - View profile

## Notes

- All API requests include proper error handling
- Loading states are shown during async operations
- User feedback via alerts for errors and success
- Token is automatically included in authenticated requests
- The app gracefully handles API failures

## Next Steps

1. Install AsyncStorage for persistent token storage:
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

2. Update API_BASE_URL for physical devices (use your computer's IP)

3. Test all flows end-to-end

4. Add error boundaries for better error handling

5. Implement refresh token logic (if needed)

