# Sikkim Creative Star - User Registration System

## Overview
The Sikkim Creative Star feature provides a complete user registration and authentication system with profile management, image uploads, and a personalized dashboard.

## Features Implemented

### 🔐 Authentication System
- **Firebase Authentication**: Secure user registration and login
- **Email/Password**: Standard authentication method
- **Profile Management**: User profiles with personal information
- **Session Management**: Automatic login state management

### 📝 Registration Process
- **Complete Form**: Name, email, phone, address, password
- **Image Upload**: Profile picture with Cloudinary integration
- **Validation**: Form validation with Zod schema
- **File Restrictions**: 10MB limit, image formats only
- **One Account Per Device**: Prevents duplicate registrations

### 🖼️ Image Upload System
- **Cloudinary Integration**: Secure cloud image storage
- **File Validation**: Size and format checking
- **Preview**: Real-time image preview before upload
- **Progress Tracking**: Upload progress indicator

### 🎨 Beautiful UI/UX
- **Responsive Design**: Works on all devices
- **Modern Theme**: Follows existing site design
- **Glassmorphism**: Beautiful glass-like effects
- **Animations**: Smooth transitions and loading states
- **Accessibility**: Proper form labels and error handling

### 📊 User Dashboard
- **Profile Display**: User information and profile picture
- **Status Tracking**: Registration and review status
- **Certificate/ID Card**: Placeholder for future downloads
- **Quick Actions**: Navigation and support links

## Routes Added

### `/sikkimcreativestar`
- **Purpose**: User registration page
- **Features**: 
  - Complete registration form
  - Image upload with Cloudinary
  - Firebase account creation
  - Firestore data storage

### `/login`
- **Purpose**: User login page
- **Features**:
  - Email/password authentication
  - Error handling
  - Redirect to dashboard on success

### `/dashboard`
- **Purpose**: User dashboard
- **Features**:
  - Profile information display
  - Certificate/ID card status
  - Account management
  - Sign out functionality

## Database Structure

### Firebase Collections

#### `participantdetailspersonal`
```typescript
{
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string; // Cloudinary URL
  registrationDate: Date;
  status: 'active' | 'pending' | 'suspended';
  userId: string; // Firebase Auth UID
}
```

## Technical Implementation

### Dependencies Added
- **Firebase Auth**: User authentication
- **Cloudinary**: Image upload and storage
- **Zod**: Form validation
- **React Hook Form**: Form management

### Key Components

#### `SikkimCreativeStar.tsx`
- Main registration page
- Image upload handling
- Firebase account creation
- Form validation

#### `Login.tsx`
- User authentication
- Error handling
- Redirect logic

#### `Dashboard.tsx`
- User profile display
- Status tracking
- Account management

#### `AuthContext.tsx`
- Global authentication state
- User session management

### Configuration Files

#### `src/lib/cloudinary.ts`
- Cloudinary API configuration
- Upload functions
- Error handling

#### `src/lib/firebase.ts`
- Firebase configuration
- Authentication setup
- Firestore integration

## Setup Instructions

### 1. Firebase Configuration
Ensure Firebase is properly configured in `src/lib/firebase.ts`:
- Authentication enabled
- Firestore database created
- Security rules configured

### 2. Cloudinary Setup
Follow the `CLOUDINARY_SETUP.md` guide to:
- Create upload preset
- Configure cloud name
- Set up folder structure

### 3. Environment Variables
Add to your `.env` file:
```env
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=sikkim_creative_star
```

## Security Features

### 🔒 Authentication Security
- Firebase Authentication with email/password
- Secure session management
- Protected routes

### 🛡️ Data Security
- Firestore security rules
- Input validation
- File type and size restrictions

### ☁️ Cloudinary Security
- Unsigned uploads for client-side
- File format validation
- Size limits enforced

## User Flow

### Registration Flow
1. User visits `/sikkimcreativestar`
2. Fills out registration form
3. Uploads profile image
4. Creates Firebase account
5. Data saved to Firestore
6. Redirected to success page
7. Admin reviews account

### Login Flow
1. User visits `/login`
2. Enters email/password
3. Firebase authenticates
4. Checks Firestore for profile
5. Redirects to dashboard

### Dashboard Flow
1. User views profile information
2. Checks registration status
3. Views certificate/ID card status
4. Can sign out or navigate

## Future Enhancements

### 🎯 Planned Features
- **Certificate Generation**: PDF certificate creation
- **ID Card Generation**: Digital ID card system
- **Email Notifications**: Welcome and status emails
- **Admin Panel**: User management interface
- **Profile Editing**: Update user information
- **Password Reset**: Forgot password functionality

### 🔧 Technical Improvements
- **Image Optimization**: Automatic resizing and compression
- **Offline Support**: Service worker for offline access
- **Push Notifications**: Status updates
- **Analytics**: User engagement tracking

## Troubleshooting

### Common Issues

#### Registration Fails
- Check Firebase configuration
- Verify Cloudinary setup
- Check network connectivity
- Review browser console for errors

#### Image Upload Issues
- Verify Cloudinary cloud name
- Check upload preset configuration
- Ensure file size under 10MB
- Confirm image format (jpg, png, jpeg)

#### Login Problems
- Check Firebase Auth configuration
- Verify user exists in Firestore
- Check email/password format
- Review authentication rules

### Debug Steps
1. Check browser console for errors
2. Verify Firebase configuration
3. Test Cloudinary upload separately
4. Check Firestore security rules
5. Validate form data

## Support

For technical support:
- **Email**: daamievent@gmail.com
- **Documentation**: Check Firebase and Cloudinary docs
- **Issues**: Review browser console and network tab

## Contributing

When adding features:
1. Follow existing code patterns
2. Add proper TypeScript types
3. Include error handling
4. Test on mobile devices
5. Update documentation

---

**Note**: This system is designed to be scalable and maintainable. All components follow React best practices and include proper error handling and user feedback.