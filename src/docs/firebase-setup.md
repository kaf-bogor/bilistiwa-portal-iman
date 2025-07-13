# Firebase Integration Setup Guide

This project now includes Firebase integration for CRUD operations. Here's how to set it up and use it.

## 1. Firebase Configuration

### Update Firebase Config
Edit `src/lib/firebase.ts` and replace the placeholder values with your actual Firebase project configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### Get Firebase Config Values
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Click "Add app" and select Web
6. Copy the configuration object

## 2. Firebase Services

### Available Services
The project includes pre-configured services for different collections:

- `waqfAssetsService` - Wakaf assets management
- `scholarshipsService` - Scholarship management
- `taawunDonationsService` - Ta'awun donations
- `productiveWaqfService` - Productive waqf units
- `teacherWelfareService` - Teacher welfare
- `documentsService` - Document management
- `eventsService` - Events and calendar
- `usersService` - User management

### Basic CRUD Operations

```typescript
import { usersService } from '@/lib/firebaseService';

// Create a new user
const userId = await usersService.create({
  username: "john_doe",
  fullName: "John Doe",
  email: "john@example.com",
  role: "Staff",
  department: "IT",
  status: "Active",
  // ... other fields
});

// Get all users
const users = await usersService.getAll();

// Get user by ID
const user = await usersService.getById(userId);

// Update user
await usersService.update(userId, {
  status: "Inactive"
});

// Delete user
await usersService.delete(userId);
```

## 3. React Hooks

### useFirebaseCollection Hook
Use this hook for managing collections in React components:

```typescript
import { useFirebaseCollection } from '@/hooks/useFirebase';
import { usersService } from '@/lib/firebaseService';

function UserList() {
  const {
    documents: users,
    loading,
    error,
    createDocument,
    updateDocument,
    deleteDocument,
    refetch
  } = useFirebaseCollection(usersService, {
    orderByField: 'fullName',
    orderDirection: 'asc'
  });

  const handleCreateUser = async (userData) => {
    try {
      await createDocument(userData);
      // User list will automatically update
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.fullName}</div>
      ))}
    </div>
  );
}
```

## 4. Advanced Queries

### Filtering Data
```typescript
const activeUsers = await usersService.getAll({
  whereConditions: [
    { field: 'status', operator: '==', value: 'Active' }
  ]
});
```

### Pagination
```typescript
const firstPage = await usersService.getAll({
  limitCount: 10,
  orderByField: 'createdAt',
  orderDirection: 'desc'
});

// Get next page
const nextPage = await usersService.getAll({
  limitCount: 10,
  orderByField: 'createdAt',
  orderDirection: 'desc',
  startAfterDoc: firstPage[firstPage.length - 1]
});
```

### Search
```typescript
const searchResults = await usersService.search('fullName', 'John');
```

## 5. Real-time Updates

### Listen to Collection Changes
```typescript
const unsubscribe = usersService.onSnapshot((users) => {
  console.log('Users updated:', users);
});

// Don't forget to unsubscribe
unsubscribe();
```

### Listen to Document Changes
```typescript
const unsubscribe = usersService.onDocumentSnapshot(userId, (user) => {
  console.log('User updated:', user);
});
```

## 6. Error Handling

All Firebase operations include proper error handling. Errors are logged to the console and can be caught in your components:

```typescript
try {
  await usersService.create(userData);
} catch (error) {
  console.error('Failed to create user:', error);
  // Handle error (show toast, etc.)
}
```

## 7. Security Rules

Make sure to set up proper Firestore security rules in your Firebase console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Example: Only authenticated users can read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 8. Example Implementation

See `src/pages/UserManagement.tsx` for a complete example of how to integrate Firebase CRUD operations with a React component using the provided hooks and services.

## 9. TypeScript Support

All Firebase services and hooks are fully typed. Define your data interfaces and use them with the services:

```typescript
interface User {
  id?: string;
  username: string;
  fullName: string;
  email: string;
  // ... other fields
}

// The hook will automatically type the documents
const { documents: users } = useFirebaseCollection(usersService);
// users is typed as FirebaseDocument[], cast to your interface as needed
const typedUsers = users as unknown as User[];
```

This setup provides a robust, type-safe way to interact with Firebase Firestore in your React application.
