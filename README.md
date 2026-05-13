# Rachael's Portfolio

A responsive, mobile-friendly portfolio website for Rachael Omonzejele - Nurse, AI Creator, and Healthcare Tech Innovator.

## Features

✨ **Responsive Design** - Optimized for desktop, tablet, and mobile devices
📝 **In-Browser Editing** - Edit content directly on your phone or computer with password protection
💾 **Local Storage** - Changes are saved automatically and persist across sessions
🎨 **Modern Design** - Sleek dark theme with gradient accents
⚡ **Fast Loading** - Minimal dependencies, pure HTML/CSS/JavaScript

## Pages

- **Portfolio View** (`portfolio.html`) - Public-facing portfolio
- **Portfolio with Edit Mode** (`portfolio-edit.html`) - Owner version with editing capabilities

## How to Use

### View Portfolio
1. Open `portfolio.html` in your browser
2. Scroll through sections or use navigation menu

### Edit Mode (Owner Only)
1. Open `portfolio.html`
2. Click the ✏️ button in the bottom-right corner
3. Enter password (default: `admin123`)
4. Click any text to edit it
5. Changes auto-save to browser storage
6. Click the button again to exit edit mode

## Customization

All editable content is marked with the `editable` class and `data-key` attribute. To add new editable elements:

```html
<p class="editable" data-key="myNewField">Default text here</p>
```

## Security Notes

- Passwords are stored in browser localStorage
- Change default password: Open developer console and run:
  ```javascript
  localStorage.setItem('portfolioPassword', 'your-new-password');
  ```
- This is a client-side application - no backend required

## Deployment

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Select main branch as source
3. Site will be live at: `https://username.github.io/rachael_portfolio/`

### Netlify
1. Connect repository to Netlify
2. Netlify auto-detects static site
3. No build process needed
4. Get custom domain and auto HTTPS

## Technologies

- HTML5
- CSS3 (with CSS Grid, Flexbox, animations)
- Vanilla JavaScript (no frameworks)
- Local Storage API

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Personal use - © 2026 Rachael Omonzejele
