# VerityGuard Dashboard System - Setup & Usage Guide

## Overview

VerityGuard now features three role-specific dashboards, each tailored to different user types:

1. **Super Admin Dashboard** (`/admin/dashboard`) - Full platform control
2. **Contributor Dashboard** (`/contributor/dashboard`) - Content creation and management
3. **Moderator Dashboard** (`/moderator/dashboard`) - Content review and moderation

## Quick Start

### 1. Run the Development Server

```bash
npm start
```

The application will start at `http://localhost:3000`

### 2. Access Role Selection

Navigate to the login page to see all available roles:
- Go to `http://localhost:3000/login`
- Select your desired role
- Create an account or log in

## Role System

### Available Roles

| Role | Key | Access Level | Dashboard Path |
|------|-----|--------------|----------------|
| User | `user` | Basic | `/` (Home) |
| Contributor | `contributor` | Content Creation | `/contributor/dashboard` |
| Moderator | `moderator` | Content Review | `/moderator/dashboard` |
| Super Admin | `super-admin` | Full Control | `/admin/dashboard` |

### Role Hierarchy

```
Super Admin (Highest)
    ↓
Moderator
    ↓
Contributor
    ↓
User (Lowest)
```

Higher roles can access lower-level dashboards, but not vice versa.

## Testing Different Roles

### Create Test Accounts

Since this is a demo using localStorage, you can create up to 10 test accounts with different roles:

#### Create a Super Admin Account
1. Go to `/login`
2. Select "Sign in as Admin" (👑)
3. Click "Sign Up"
4. Fill in details:
   - Name: `Admin User`
   - Email: `admin@verityguard.com`
   - Password: `admin123` (min 6 chars)
5. Click "Create Account"

#### Create a Contributor Account
1. Go to `/login`
2. Select "Sign in as Contributor" (✍️)
3. Click "Sign Up"
4. Fill in details:
   - Name: `Content Creator`
   - Email: `creator@verityguard.com`
   - Password: `creator123`
5. Click "Create Account"

#### Create a Moderator Account
1. Go to `/login`
2. Select "Sign in as Moderator" (🛡️)
3. Click "Sign Up"
4. Fill in details:
   - Name: `Moderator User`
   - Email: `moderator@verityguard.com`
   - Password: `mod123`
5. Click "Create Account"

### Test Account Credentials (Pre-configured)

If you want to use pre-made accounts, you can manually add them to localStorage:

```javascript
// Open browser console and run:
const testUsers = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'super-admin',
    location: null,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Content Creator',
    email: 'contributor@test.com',
    password: 'contributor123',
    role: 'contributor',
    location: null,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Content Moderator',
    email: 'moderator@test.com',
    password: 'moderator123',
    role: 'moderator',
    location: null,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  }
];

localStorage.setItem('verityguard_users', JSON.stringify(testUsers));
console.log('Test accounts created!');
```

Then login with:
- **Admin**: `admin@test.com` / `admin123`
- **Contributor**: `contributor@test.com` / `contributor123`
- **Moderator**: `moderator@test.com` / `moderator123`

## Dashboard Features

### Super Admin Dashboard

**Current Features:**
- System health overview
- User statistics
- Pending reviews count
- System uptime monitoring
- Recent activity feed
- System alerts
- Quick actions panel

**Navigation:**
- Dashboard (Home)
- User Management
- Roles & Permissions
- Content Management
- Analytics
- Audit Logs
- Settings
- Security Center

### Contributor Dashboard

**Current Features:**
- Published articles count
- Total views tracking
- Average trust score
- Active drafts count
- Recent drafts list
- Performance chart (7-day views)
- Top performing articles table

**Navigation:**
- Dashboard (Home)
- Create Content
- Drafts (with badge count)
- Published Articles
- Analytics
- Media Library
- Profile Settings

### Moderator Dashboard

**Current Features:**
- Pending reviews queue
- Reviews completed today
- Flagged content count
- Accuracy rate tracking
- Priority review queue
- Recent moderation decisions
- Flagged content table
- Performance statistics

**Navigation:**
- Dashboard (Home)
- Review Queue (with badge count)
- Flagged Content (with badge count)
- User Reports
- Moderation History
- Analytics
- Moderation Guidelines

## Architecture

### File Structure

```
src/
├── components/
│   ├── DashboardLayout.js      # Shared dashboard layout
│   ├── ProtectedRoute.js       # Route protection component
│   └── ...
├── contexts/
│   └── AuthContext.js          # Enhanced with role-based auth
├── hooks/
│   └── usePermissions.js       # Permission checking hook
├── pages/
│   ├── admin/
│   │   └── AdminDashboard.js
│   ├── contributor/
│   │   └── ContributorDashboard.js
│   ├── moderator/
│   │   └── ModeratorDashboard.js
│   ├── LoginOptions.js         # Role selection page
│   └── Unauthorized.js         # Access denied page
├── utils/
│   └── roles.js                # Role and permission constants
└── App.js                      # Main routing configuration
```

### Key Components

#### ProtectedRoute
Wraps routes that require authentication and specific roles:

```jsx
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute requiredRole={ROLES.SUPER_ADMIN}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

#### DashboardLayout
Shared layout component providing:
- Top navigation bar with user info
- Collapsible sidebar
- Role-specific navigation items
- Logout functionality
- Responsive design

#### usePermissions Hook
Custom hook for checking permissions:

```javascript
const { checkPermission, checkRole, getUserDashboardPath } = usePermissions();

if (checkPermission(PERMISSIONS.MANAGE_USERS)) {
  // Show user management UI
}
```

### Permission System

Permissions are defined in `src/utils/roles.js`:

```javascript
// Check if user has a permission
hasPermission(userRole, PERMISSIONS.CREATE_CONTENT)

// Check if user has any of these permissions
hasAnyPermission(userRole, [PERMISSIONS.APPROVE_CONTENT, PERMISSIONS.REJECT_CONTENT])

// Check if user has all permissions
hasAllPermissions(userRole, [PERMISSIONS.MANAGE_USERS, PERMISSIONS.VIEW_AUDIT_LOGS])
```

## Styling

All dashboards use the existing design system:
- **Background**: Dark theme (`bg-dark`, `bg-dark-light`)
- **Cards**: Glass-morphism effect (`glass-card`)
- **Primary Color**: Cyan/Blue (`bg-primary`, `text-primary`)
- **Borders**: Semi-transparent white (`border-white/10`)
- **Hover States**: Smooth transitions with color shifts

### Custom Classes Used

- `glass-card`: Glass-morphism card effect
- `neon-button`: Primary action button with glow
- `bg-dark`: Main dark background
- `bg-dark-light`: Lighter dark background for cards/panels

## Development Workflow

### Adding New Features to a Dashboard

1. **Create a new component** in the respective dashboard folder:
   ```javascript
   // src/pages/admin/UserManagement.js
   export default function UserManagement() {
     return (
       <DashboardLayout title="User Management" navigation={adminNav}>
         {/* Your content */}
       </DashboardLayout>
     );
   }
   ```

2. **Add a route** in `App.js`:
   ```javascript
   <Route
     path="/admin/users"
     element={
       <ProtectedRoute requiredRole={ROLES.SUPER_ADMIN}>
         <UserManagement />
       </ProtectedRoute>
     }
   />
   ```

3. **Update navigation** in the dashboard page:
   ```javascript
   const navigation = [
     // ... existing items
     { path: '/admin/users', icon: '👥', label: 'Users' },
   ];
   ```

### Adding New Permissions

1. Add to `PERMISSIONS` in `src/utils/roles.js`:
   ```javascript
   export const PERMISSIONS = {
     // ... existing
     NEW_PERMISSION: 'new_permission',
   };
   ```

2. Add to `ROLE_PERMISSIONS`:
   ```javascript
   [ROLES.CONTRIBUTOR]: [
     // ... existing
     PERMISSIONS.NEW_PERMISSION,
   ],
   ```

3. Use in components:
   ```javascript
   const { checkPermission } = usePermissions();
   
   if (checkPermission(PERMISSIONS.NEW_PERMISSION)) {
     // Render feature
   }
   ```

## Troubleshooting

### Issue: Can't access dashboard after login
**Solution**: Check if the role is set correctly. Open browser console:
```javascript
const session = JSON.parse(localStorage.getItem('verityguard_session'));
console.log('Current user role:', session?.role);
```

### Issue: Redirected to Unauthorized page
**Possible causes:**
1. User role doesn't have required permissions
2. User not logged in
3. Route configuration mismatch

**Solution**: Verify role and route:
```javascript
// Check in browser console
const session = JSON.parse(localStorage.getItem('verityguard_session'));
console.log('Role:', session?.role);
console.log('Trying to access:', window.location.pathname);
```

### Issue: Dashboard layout broken
**Solution**: Clear localStorage and refresh:
```javascript
localStorage.clear();
window.location.reload();
```

## Next Steps

See `DASHBOARD_IMPLEMENTATION_ROADMAP.md` for the full feature roadmap and implementation plan.

### Immediate Next Features to Implement:

1. **Super Admin**
   - User Management page (list, edit, delete users)
   - Role Editor (assign/change roles)
   - Audit Logs viewer

2. **Contributor**
   - Rich Text Content Editor
   - Drafts CRUD operations
   - Media Library with upload

3. **Moderator**
   - Review Queue with filtering
   - Approve/Reject workflow
   - Flagged content management

## API Integration (Future)

Currently, all data is stored in localStorage. To integrate with a backend API:

1. Replace localStorage calls in `AuthContext.js` with API calls
2. Add API service layer in `src/services/api.js`
3. Implement JWT token handling
4. Add loading states for async operations

## Testing

### Manual Testing Checklist

- [ ] Can create accounts for all roles
- [ ] Login redirects to correct dashboard
- [ ] Sidebar navigation works
- [ ] User menu dropdown functions
- [ ] Logout works properly
- [ ] Protected routes block unauthorized access
- [ ] Unauthorized page displays correctly
- [ ] Dashboard statistics display
- [ ] Responsive layout on mobile
- [ ] Can switch between dashboards (for admins)

## Contributing

When adding new features:
1. Follow the existing component structure
2. Use the permission system for access control
3. Maintain consistent styling with Tailwind classes
4. Test all roles thoroughly
5. Update documentation

---

**Version**: 1.0.0  
**Last Updated**: October 20, 2025  
**Status**: MVP Implementation Complete ✅
