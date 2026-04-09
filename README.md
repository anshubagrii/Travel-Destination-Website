# 🌿 DestinationFinder

A stunning, fully functional forest tour booking website. Browse breathtaking destinations across five continents, explore our services, and book your next adventure — all in one place.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

- **🏔️ Hero Image Slider** — Auto-playing, keyboard & touch-enabled slider with progress bar
- **🗺️ Destinations Page** — Rich cards with metadata, highlights, pricing, and "Book Now" CTAs  
- **📝 Booking System** — Validated booking form powered by Web3Forms (submissions sent to your email)
- **🛎️ Services Page** — Service showcase, testimonials, FAQ accordion, and "Why Choose Us"
- **📧 Contact Page** — Contact form powered by Web3Forms, info sidebar, embedded Google Map
- **📱 Fully Responsive** — Mobile-first design with hamburger menu (works on all screen sizes)
- **🎨 Premium Dark Theme** — Nature-inspired color palette with smooth animations
- **🔔 Toast Notifications** — Elegant success/error feedback on form submissions
- **🔍 SEO Optimized** — Proper meta tags, semantic HTML, heading hierarchy

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | HTML5, CSS3, JavaScript |
| Styling    | Vanilla CSS (custom)    |
| Icons      | Boxicons                |
| Fonts      | Montserrat (Google)     |
| Forms      | Web3Forms (free)        |
| Hosting    | GitHub Pages (free)     |

---

## 🚀 Deployment (GitHub Pages)

### Step 1 — Get Your Web3Forms Key (free, 1 minute)

1. Go to [web3forms.com](https://web3forms.com/)
2. Enter your email address
3. You'll receive an **access key** in your inbox
4. Replace `YOUR_ACCESS_KEY_HERE` with your key in:
   - `public/booking.html` (line 64)
   - `public/contact.html` (line 63)

### Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — DestinationFinder"
git remote add origin https://github.com/YOUR_USERNAME/DestinationFinder.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Click **"Create your own"** and paste this workflow (or use the one included in `.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: public
      - id: deployment
        uses: actions/deploy-pages@v4
```

5. Commit → your site will be live at `https://YOUR_USERNAME.github.io/DestinationFinder/` 🎉

---

## 📁 Project Structure

```
DestinationFinder/
├── public/                        # All frontend files (deployed to GitHub Pages)
│   ├── index.html                 # Home — hero slider
│   ├── destinations.html          # Destinations — card grid
│   ├── booking.html               # Booking — reservation form
│   ├── services.html              # Services — offerings, testimonials, FAQ
│   ├── contact.html               # Contact — form + info cards + map
│   ├── css/
│   │   └── styles.css             # Complete stylesheet
│   ├── js/
│   │   ├── main.js                # Shared: slider, menu, scroll animations, toasts
│   │   ├── booking.js             # Booking form logic
│   │   └── contact.js             # Contact form logic
│   └── images/
│       ├── china.jpg
│       ├── japan.jpg
│       ├── africa.jpg
│       ├── brazil.jpg
│       └── serbia.jpg
├── server/                        # Optional: Express backend for local dev
│   ├── server.js 
│   ├── routes/
│   │   ├── bookingRoutes.js
│   │   └── contactRoutes.js
│   └── data/
│       ├── bookings.json
│       └── messages.json
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Pages deployment workflow
├── package.json
├── .gitignore
├── .env.example
└── README.md
```

---

## 📸 Pages Overview

| Page | Description |
|------|-------------|
| **Home** | Full-screen hero slider with 5 destinations |
| **Destinations** | Card grid with details, pricing, and book CTAs |
| **Booking** | Reservation form with sidebar info cards |
| **Services** | Service cards, testimonials, FAQ accordion |
| **Contact** | Contact form, info cards, Google Maps embed |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Devanshu**

---

<p align="center">
  Made with 🌲 and ❤️ by Devanshu
</p>
