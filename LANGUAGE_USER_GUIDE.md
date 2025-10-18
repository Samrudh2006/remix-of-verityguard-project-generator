# Language Selector - User Guide

## How to Change Language

### On Desktop/Laptop 💻

1. **Find the Language Button**
   - Located in the top-right corner of the header
   - Shows a globe icon 🌐 with your current language name
   - Example: "English", "हिंदी", "Español"

2. **Open the Dropdown**
   - Click the language button
   - A menu will appear with all 9 available languages

3. **Select Your Language**
   - Each option shows:
     - Native name (e.g., "Español")
     - English name (e.g., "Spanish")
   - Current language has a checkmark ✓
   - Click any language to switch

4. **Instant Translation**
   - The entire interface translates immediately
   - No page reload needed
   - Your choice is automatically saved

### On Mobile/Tablet 📱

1. **Open the Menu**
   - Tap the hamburger icon (☰) in the top-right

2. **Scroll to Language Section**
   - At the bottom of the mobile menu
   - Label: "Language / भाषा"

3. **Select from Dropdown**
   - Tap the dropdown menu
   - Scroll through 9 languages
   - Each shows: "Native Name (English Name)"
   - Example: "Español (Spanish)"

4. **Apply Selection**
   - Tap your preferred language
   - Interface translates instantly
   - Choice is saved automatically

## Available Languages

| Native Name | English Name | Code | Direction |
|------------|--------------|------|-----------|
| English | English | en | Left-to-Right |
| हिंदी | Hindi | hi | Left-to-Right |
| Español | Spanish | es | Left-to-Right |
| Français | French | fr | Left-to-Right |
| Deutsch | German | de | Left-to-Right |
| العربية | Arabic | ar | Right-to-Left |
| বাংলা | Bengali | bn | Left-to-Right |
| தமிழ் | Tamil | ta | Left-to-Right |
| తెలుగు | Telugu | te | Left-to-Right |

## What Gets Translated?

✅ **Navigation Menu**
- Home, Articles, Leaderboard, Badges, Outline

✅ **Hero Section**
- Title, subtitle, description, button labels
- Statistics labels (Articles Verified, Accuracy Rate, etc.)

✅ **Articles Feed**
- Section titles, filter labels, tab names
- Trust score labels, article status
- Login/location prompts

✅ **Authentication**
- Login/signup forms
- Field labels (Name, Email, Password)
- Button text, error messages
- Demo notes and instructions

✅ **Location Picker**
- Modal title and description
- Permission prompt text
- State/city dropdown labels
- Auto-detect button, confirm button
- Location display text

✅ **Modal Content**
- Share/analyze buttons
- Close buttons and actions

✅ **All Buttons & Labels**
- Every interactive element
- All placeholder text
- All help text and tooltips

## Special Features

### 📌 Persistence
- Your language choice is **saved automatically**
- Returns to your preferred language on next visit
- Uses browser's localStorage (no account needed)

### 🔄 RTL Support (Arabic)
- Text flows right-to-left
- Layout mirrors automatically
- Proper bidirectional text handling
- Example: العربية interface is fully RTL

### 🚫 Zero English Mixing
- **100% translation coverage**
- No English text in other languages
- Complete localization of every string
- Professional language experience

## Tips & Tricks

### 💡 Quick Language Test
1. Select Spanish → See "Inicio" instead of "Home"
2. Select Hindi → See "लॉगिन" instead of "Login"
3. Select Arabic → Notice entire layout flips to RTL

### 💡 Troubleshooting
**Language not changing?**
- Clear browser cache
- Check if JavaScript is enabled
- Try refreshing the page

**Text looks mixed?**
- Report this - it's a bug! We aim for 100% translation
- Take a screenshot and share feedback

### 💡 Best Practices
- Choose language **before** logging in for best experience
- Mobile users: rotate device for better dropdown visibility
- Arabic users: Ensure RTL is properly displayed

## Developer Info

### Adding a New Translation
```javascript
// In src/translations.js
'new.key': { 
  en: 'English text', 
  hi: 'हिंदी पाठ',
  es: 'Texto en español',
  // ... other languages
}
```

### Using in Components
```javascript
import { useI18n } from '../i18n';

function MyComponent() {
  const { t } = useI18n();
  return <h1>{t('new.key')}</h1>;
}
```

### Language Change Listener
```javascript
const { lang, setLang } = useI18n();

useEffect(() => {
  console.log('Language changed to:', lang);
  // Custom logic here
}, [lang]);
```

## Accessibility

✓ **Screen Readers**: Language changes are announced
✓ **Keyboard Navigation**: Dropdown fully keyboard-accessible
✓ **Focus Indicators**: Clear visual focus states
✓ **Touch Targets**: Mobile selector has large tap area (44×44 px min)
✓ **Color Contrast**: WCAG AA compliant text contrast

## Feedback

Found a translation error? Missing a language?
- Open an issue on GitHub
- Suggest improvements via email
- Contribute translations via pull request

---

**Remember**: When you select a language, EVERYTHING changes. This isn't partial translation - it's complete localization! 🌍
