# oveysdd.github.io

# OVEYS LAB

> **Learn . Build . Research**

Personal website of a Mechanical Engineer, FEA Analyst, Developer & Problem Solver.

🔗 **Live Site:** [oveysdd.github.io](https://oveysdd.github.io)

---

## 🛠 Tech Stack

| Technology | Description |
|------------|-------------|
| **HTML5** | Semantic markup, no frameworks |
| **CSS3** | Custom properties, Grid, Flexbox, animations |
| **Vanilla JS** | Zero dependencies, pure JavaScript |
| **GitHub Pages** | Free hosting, deploy from branch |

---

## ✨ Features

### 🎨 Design & UX
- **Dark / Light Theme** — Toggle with circular reveal animation
- **Custom Scrollbar** — Color adapts to active theme
- **Responsive Layout** — Mobile-first, works on all devices
- **Mobile Menu** — Slide-in panel with overlay
- **Search Overlay** — Keyboard shortcut `Ctrl/Cmd + K`
- **Scroll to Top** — Appears after scrolling 400px
- **Page Transitions** — Smooth fade-in on every page load
- **Scroll Animations** — Elements fade in as you scroll

### 🎯 Interactive Elements
- **Typing Animation** — Hero section cycles through roles
- **Counter Animation** — Stats count up when visible
- **Hover Lift Cards** — Cards lift + shadow on hover
- **Skill Bars** — Animate width on scroll into view
- **Like System** — Per-post likes stored in `localStorage`
- **CAD Grid Background** — Engineering blueprint aesthetic

### 📝 Content
- **Blog Posts** — With placeholder images (replace with real ones)
- **Code Snippets** — Syntax-highlighted cards with language tags
- **About Page** — Profile, skills, experience timeline
- **Comments** — Disqus integration (lazy-loaded)

---

## 📁 Project Structure

```
oveys-lab/
├── index.html          # Home page
├── blog.html           # Blog listing + sample post
├── code.html           # Code snippets gallery
├── about.html          # About me, skills, experience
├── css/
│   └── style.css       # All styles (single file)
├── js/
│   └── main.js         # All scripts (single file)
└── README.md           # This file
```

---

## 🚀 Deployment (GitHub Pages)

1. **Create a new repository** on GitHub named `oveysdd.github.io`
2. **Upload all files** to the repository root
3. **Go to Settings → Pages**
4. **Source:** Deploy from a branch → `main` → `/ (root)`
5. **Save** — Your site will be live at `https://oveysdd.github.io`

---

## 📝 How to Customize

### Add Your Social Links
Edit the `href=""` attributes in all HTML files:

```html
<!-- Footer & About page -->
<a href="https://linkedin.com/in/YOUR_USERNAME">LinkedIn</a>
<a href="https://t.me/YOUR_USERNAME">Telegram</a>
<a href="mailto:your@email.com">Email</a>
<a href="https://github.com/oveysdd">GitHub</a>
```

### Add Real Images to Blog Posts
Replace placeholder divs with actual images:

```html
<!-- Before -->
<div class="card-image-placeholder">...</div>

<!-- After -->
<img src="images/your-post-image.jpg" class="card-image" alt="Description">
```

### Add Images Inside Post Content
The blog post template already supports inline images:

```html
<img src="images/diagram.png" alt="FEA Mesh Example">
```

### Update Disqus Shortname
In `js/main.js`, replace:
```js
s.src = 'https://oveys-lab.disqus.com/embed.js';
```
with your actual Disqus shortname.

### Update Stats Counters
In `index.html`, change `data-target` values:
```html
<div class="counter" data-target="12">0</div>  <!-- Blog Posts -->
<div class="counter" data-target="8">0</div>   <!-- Projects -->
<div class="counter" data-target="5">0</div>   <!-- Years Exp. -->
<div class="counter" data-target="24">0</div>  <!-- Code Snippets -->
```

### Update Skills (About Page)
Edit skill items in `about.html`:
```html
<div class="skill-item">
  <span class="skill-name">Your Skill</span>
  <span class="skill-percent">85%</span>
</div>
<div class="skill-bar">
  <div class="skill-progress" data-width="85"></div>
</div>
```

### Update Experience Timeline
Edit the experience section in `about.html` with your own roles and education.

---

## 🎨 Color Palette

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Accent | `#3b82f6` | `#3b82f6` |
| Background | `#ffffff` | `#0a0a0a` |
| Card | `#ffffff` | `#161616` |
| Footer | `#f0f0f0` | `#1a1a1a` |
| Text Primary | `#1a1a1a` | `#f0f0f0` |
| Text Secondary | `#475569` | `#a1a1aa` |

---

## 📜 License

This project is open source. Feel free to fork and customize for your own use.

---

**Built with passion by OVEYS** ⚙️
