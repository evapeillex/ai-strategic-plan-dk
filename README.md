# Workshop Slideshow

A simple, professional web-based slideshow for showcasing thoughts during workshops. No build step required—just open `index.html` in a browser.

## Quick Start

1. Open `index.html` in a browser (or use a local server for best results).
2. Use the keyboard or on-screen buttons to navigate.

## Adding Slides

Edit `slides.config.js` to add or modify slides:

```javascript
const SLIDES = [
  { title: "Welcome", content: "Your thought or quote here..." },
  { title: "Key Idea", content: "Another insight..." },
  { title: "Thank You", content: "Questions? Let's discuss.", animation: "scale" },
];
```

### Optional per-slide settings

- **animation**: `"fade"` | `"slide-left"` | `"slide-right"` | `"scale"` — controls the transition style when entering the slide.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Right Arrow / Space | Next slide |
| Left Arrow | Previous slide |
| Home | First slide |
| End | Last slide |
| F | Toggle fullscreen |

## Touch Support

Swipe left or right on touch devices to navigate between slides.

## Running Locally

For the best experience (especially with Google Fonts), serve the folder with a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# Then open http://localhost:8000
```

## File Structure

```
├── index.html       # App shell
├── styles.css       # Layout, typography, transitions, animations
├── app.js           # Slideshow logic
├── slides.config.js # Your slide content (edit this)
└── README.md
```
