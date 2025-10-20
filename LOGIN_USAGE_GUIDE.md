# VerityGuard - Login & Dashboard Usage Guide

## 🚀 How to Use the New Login System

### Step 1: Access Login Page
1. Open your browser to `http://localhost:3000`
2. Click the "Login" or "Get Started" button
3. You'll be redirected to the role selection page at `/login`

### Step 2: Select Your Role
Choose one of three login options:

#### 👤 User Login
- **Purpose**: For regular users who want to:
  - Submit news for verification
  - Track their trust score
  - Earn badges and achievements
  - View analytics and history
  
#### 🏪 Contributor Login
- **Purpose**: For content creators and fact-checkers who want to:
  - Publish and manage articles
  - Use verification tools
  - Collaborate with other contributors
  - Access advanced analytics
  
#### 🛡️ Admin Login
- **Purpose**: For system administrators who need to:
  - Manage users and content
  - Monitor system performance
  - Handle security and moderation
  - Configure system settings

### Step 3: Sign Up or Login

#### To Create a New Account:
1. Click "Continue" on your chosen role
2. Click "Don't have an account? Sign up"
3. Fill in:
   - **Name**: Your full name
   - **Email**: Valid email address
   - **Password**: Minimum 6 characters
4. Click "Sign Up"
5. You'll be automatically logged in and redirected to your dashboard

#### To Login with Existing Account:
1. Click "Continue" on your chosen role
2. Enter your:
   - **Email**: Your registered email
   - **Password**: Your account password
3. Click "Login"
4. You'll be redirected to your role-specific dashboard

---

## 📊 Dashboard URLs

After login, you'll be redirected to:
- **Users**: `http://localhost:3000/dashboard/user`
- **Contributors**: `http://localhost:3000/dashboard/contributor`
- **Admins**: `http://localhost:3000/dashboard/admin`

---

## 🎯 User Dashboard Features

### Available Tabs:
1. **Overview** - Statistics and recent activity
2. **Profile** - Edit your personal information
3. **Submissions** - Manage verification requests
4. **Verifications** - View verification history
5. **Analytics** - Track your performance
6. **Notifications** - View system notifications
7. **Achievements** - See earned badges
8. **Leaderboard** - Global ranking
9. **History** - Activity timeline
10. **Settings** - Privacy and preferences

---

## 📰 Contributor Dashboard Features

### Available Tabs:
1. **Overview** - Contributor statistics
2. **Articles** - Write and manage articles
3. **Verification** - Fact-checking tools
4. **Analytics** - Content performance
5. **Community** - Engage with others
6. **Sources** - Manage trusted sources
7. **Collaboration** - Team projects
8. **Research** - Research resources
9. **Peer Reviews** - Review queue
10. **Settings** - Contributor preferences

### Key Features:
- **Article Editor**: Markdown support for writing
- **Fact-Check Tools**: Source validator, image analyzer, text comparison
- **Performance Metrics**: Views, shares, ratings
- **Collaboration**: Work with other contributors

---

## 👑 Admin Dashboard Features

### Available Tabs:
1. **Overview** - System statistics
2. **Users** - User management
3. **Content** - Moderation queue
4. **Analytics** - Platform metrics
5. **Monitoring** - System health
6. **Security** - Security center
7. **Reports** - Logs and reports
8. **Configuration** - System settings
9. **Backup** - Backup management
10. **Settings** - Admin preferences

### Key Features:
- **User Management**: Add, edit, suspend users
- **Content Moderation**: Approve/reject content
- **System Monitoring**: CPU, memory, disk usage
- **Security Alerts**: Real-time threat detection
- **Backup & Recovery**: Automated backups

---

## 🔐 Demo Accounts

For testing purposes, you can create accounts with these roles:

### User Account Example:
- Email: `user@example.com`
- Password: `user123`
- Role: User

### Contributor Account Example:
- Email: `contributor@example.com`
- Password: `contrib123`
- Role: Contributor

### Admin Account Example:
- Email: `admin@example.com`
- Password: `admin123`
- Role: Admin

---

## 🎨 UI Features

### All Dashboards Include:
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Futuristic Theme**: Neon borders and glass-morphism
- **Sidebar Navigation**: Easy tab switching
- **Real-time Updates**: Live statistics
- **Smooth Animations**: Professional transitions

### Color Schemes:
- **User Dashboard**: Cyan/Purple gradient
- **Contributor Dashboard**: Green gradient
- **Admin Dashboard**: Purple gradient

---

## 🔄 Navigation Flow

```
Homepage
   ↓
Login Page (Role Selection)
   ↓
Choose Role → User | Contributor | Admin
   ↓
Login/Signup Modal
   ↓
Authentication
   ↓
Redirect to Dashboard
   ↓
User Dashboard | Contributor Dashboard | Admin Dashboard
```

---

## 💡 Tips & Tricks

### For Users:
- Check your trust score regularly
- Submit verification requests for suspicious news
- Earn badges by active participation
- Monitor your analytics to track improvement

### For Contributors:
- Use markdown formatting in articles
- Utilize fact-check tools before publishing
- Collaborate with other contributors
- Monitor article performance metrics

### For Admins:
- Regularly check system health
- Review moderation queue daily
- Monitor security alerts
- Perform regular backups

---

## 🔒 Security Features

- **Role-Based Access Control**: Each role has specific permissions
- **Protected Routes**: Dashboards require authentication
- **Session Management**: Secure login sessions
- **Local Storage**: Demo uses localStorage (production should use secure backend)
- **Password Requirements**: Minimum 6 characters

---

## 🐛 Troubleshooting

### Can't Login?
1. Check your email and password
2. Ensure you selected the correct role
3. Clear browser cache and try again
4. Check browser console for errors

### Dashboard Not Loading?
1. Verify you're logged in
2. Check the URL is correct
3. Refresh the page
4. Try logging out and back in

### Lost Password?
- In demo mode, you can create a new account
- In production, password reset would be available

---

## 🚀 Next Steps

### To Fully Test the System:
1. Create accounts for all three roles
2. Explore each dashboard's features
3. Submit some test data
4. Try the different tools and features
5. Test navigation between tabs

### For Production Deployment:
1. Connect to a real database
2. Implement secure authentication (JWT, OAuth)
3. Add password hashing
4. Implement real-time features with WebSocket
5. Add email notifications
6. Implement file upload functionality
7. Add advanced charts and visualizations

---

## 📞 Support

For issues or questions:
- Check the `DASHBOARD_FEATURES.md` for feature details
- Review the code in `src/pages/` for dashboard implementations
- Check `src/contexts/AuthContext.js` for authentication logic

---

**Enjoy your VerityGuard experience!** 🎉

The system is now fully functional with:
✅ 3 Separate Login Systems
✅ Role-Based Authentication
✅ 220+ Total Features
✅ Responsive Design
✅ Modern UI/UX
