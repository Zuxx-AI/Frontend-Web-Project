# Aletheia (Φ) — Philosophy Learning Platform

A visually immersive web experience that guides users through the world of philosophy — from ancient Greek thinkers to modern intellectuals.

![Status](https://img.shields.io/badge/status-active-brightgreen)

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)

![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

![Three.js](https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white)

---

## About

**Aletheia** (Greek: ἀλήθεια — "truth" or "disclosure") is an interactive philosophy learning journey designed with a Roman museum-inspired luxury aesthetic. Users can explore 10 philosophers, read summaries of their key works, and follow a guided reading roadmap.

---

## Features

- **3D Interactive Book** — A Three.js-powered 3D book on the landing page with orbit controls and page animations
- **10 Philosopher Profiles** — Dedicated pages for each thinker with 3D models (.glb), biographies, and book recommendations
- **Sophie's World Reader** — A built-in chapter reader with 20 chapters, keyboard/scroll/button navigation, and cover art
- **Guided Roadmap** — A step-by-step learning path from beginner to advanced philosophical reading
- **Scroll Animations** — Smooth fade-in effects triggered by IntersectionObserver
- **Responsive Design** — Mobile-friendly with hamburger navigation and adaptive layouts
- **Luxury Aesthetic** — Gold accents, serif typography (Cinzel, Playfair Display, Cormorant Garamond), and dark museum-style backgrounds

---

## Philosophers Featured

| Philosopher | Era | Key Works |
|---|---|---|
| Socrates | Classical Greek | Apology, Crito, Phaedo |
| Plato | Classical Greek | The Republic, Symposium |
| Aristotle | Classical Greek | Nicomachean Ethics, Politics |
| Epictetus | Stoic | Enchiridion, Discourses |
| Seneca | Stoic | Letters from a Stoic, On the Shortness of Life |
| Marcus Aurelius | Stoic | Meditations |
| Friedrich Nietzsche | Existentialist | Thus Spoke Zarathustra, Beyond Good and Evil |
| Fyodor Dostoevsky | Existentialist | Crime and Punishment, The Brothers Karamazov |
| Franz Kafka | Absurdist | The Metamorphosis, The Trial, The Castle |
| Yuval Noah Harari | Modern | Sapiens, Homo Deus, 21 Lessons for the 21st Century |

---

## Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, animations, responsive grid layouts
- **Vanilla JavaScript** — No frameworks, pure DOM manipulation
- **Three.js** — 3D rendering for book and philosopher models
- **GLB Models** — 3D philosopher busts and interactive book
- **Google Fonts** — Cinzel, Playfair Display, Cormorant Garamond

---

## Project Structure

```
Aletheia/
├── index.html              # Main landing page
├── app.js                  # Landing page logic & Sophie's World reader
├── styles.css              # Landing page styles
├── book/
│   ├── book.html           # 3D book iframe
│   ├── book.css            # Book styles
│   └── book.js             # Three.js book logic
├── aristotle.html/css/js   # Philosopher pages (one set per philosopher)
├── plato.html/css/js
├── socrates.html/css/js
├── epictetus.html/css/js
├── seneca.html/css/js
├── marcus.html/css/js
├── nietzsche.html/css/js
├── dostoevsky.html/css/js
├── kafka.html/css/js
├── harari.html/css/js
└── Assets/                 # Images, 3D models (.glb), SVGs
```

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/AhtishamManzoor/aletheia.git
   ```
2. Open `index.html` in your browser — no build tools or server required.

> **Note:** For 3D models to load correctly via local file, use a local server:
> ```bash
> npx serve .
> ```

---

## Screenshots

<img width="1893" height="975" alt="image" src="https://github.com/user-attachments/assets/cf823527-3e18-4508-a3f1-3bb0f166d16b" />
<img width="951" height="598" alt="image" src="https://github.com/user-attachments/assets/994ba380-2763-4d78-8b0c-ba52f6447930" />
<img width="1100" height="902" alt="image" src="https://github.com/user-attachments/assets/3dcec5a6-b1d6-4587-b74e-affb3d599409" />
<img width="1874" height="954" alt="image" src="https://github.com/user-attachments/assets/fefea6b1-b248-4693-b118-96cdb4686529" />
<img width="1047" height="981" alt="image" src="https://github.com/user-attachments/assets/f4197040-5c31-43b1-83f4-149120fcb90a" />
<img width="1910" height="983" alt="image" src="https://github.com/user-attachments/assets/d7b3a41a-2d47-43a4-bc2d-859eae687883" />




---

## Author

**Ahtisham Manzoor**

---

## License

This project is open source and available under the [MIT License](LICENSE).
