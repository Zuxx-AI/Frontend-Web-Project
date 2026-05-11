Below is your **full agent instruction document (production-grade prompt)**. You can give this directly to an AI agent or developer to build the entire system exactly as you designed.

---

````markdown
# 🧠 SOPHIA PATH — FULL AGENT BUILD INSTRUCTIONS (v1.0)

## 📌 PROJECT TYPE
Build a **state-driven interactive philosophy learning web application** using:
- HTML (structure)
- CSS (UI/UX design)
- JavaScript (logic + state management)

No backend required.

---

# 🎯 CORE IDEA

The system is a **guided philosophy learning platform** that:

1. Starts with a story-based entry:
   📖 :contentReference[oaicite:0]{index=0}  
2. Uses a quiz to detect user thinking style
3. Generates a personalized philosophy roadmap
4. Allows structured reading of philosophers step-by-step
5. Tracks learning progress in browser storage

---

# 🧠 GLOBAL SYSTEM DESIGN PRINCIPLE

This is NOT a multi-page blog.

This is a:

> 🔁 STATE-DRIVEN SINGLE LEARNING SYSTEM

All navigation is controlled by JavaScript state, not independent static pages.

---

# ⚙️ GLOBAL STATE MODEL (CRITICAL)

```javascript
let appState = {
  mode: "landing",          // landing | novel | quiz | roadmap | reader | philosopher
  selectedPath: null,       // stoicism, aristotle, etc.
  currentBook: null,
  roadmapHistory: [],
  progress: {},
  userProfile: null
};
````

---

# 🏠 1. LANDING PAGE (ENTRY POINT)

## 🎯 Purpose:

* Hook the user
* Introduce philosophy system
* Provide entry points into learning

---

## 🧱 SECTIONS:

### 🌌 HERO SECTION

* Dark philosophical background
* Animated 3D floating book:

📖 Sophie's World

### TEXT:

* Title: “Enter the Philosophy Learning Journey”
* Subtitle: “From story → thinking → understanding”

### CTA BUTTON:

* “Start Journey” → opens novel reader mode

---

## 👤 PHILOSOPHERS PREVIEW SECTION

Display philosopher cards:

* Socrates
* Plato
* Aristotle
* Friedrich Nietzsche
* Yuval Noah Harari

Each card includes:

* Name
* 1-line philosophy
* “Details” button

---

## 🔘 DETAILS BUTTON BEHAVIOR:

On click:

```plaintext
Opens philosopher detail page OR dynamic view
```

---

# 📖 2. NOVEL READER PAGE

## 🎯 Purpose:

Entry experience before quiz

Displays:

📖 Sophie's World

### FEATURES:

* Clean reading UI
* Chapter scroll
* “Finish Reading” button

---

# ❓ 3. QUIZ SYSTEM (PERSONALITY ENGINE)

## 🎯 Purpose:

Classify user thinking style

---

## QUESTIONS:

### 1. Interest Area:

* Life meaning
* Society
* Mind/emotions
* Power/success
* History

### 2. Learning Style:

* Story-based
* Logical
* Deep academic
* Practical philosophy

### 3. Difficulty:

* Beginner
* Intermediate
* Advanced

---

## OUTPUT:

Generates:

```javascript
userProfile = "Stoic Thinker";
selectedPath = "stoicism";
```

---

# 🧭 4. ROADMAP DASHBOARD (CORE SYSTEM)

## 🎯 Purpose:

Main learning engine

---

## STRUCTURE:

### HEADER:

* User profile
* Active path
* Progress bar

---

## ROADMAP CONTENT:

Example: Stoicism Path

Epictetus
→ Enchiridion

Seneca
→ Letters from a Stoic

Marcus Aurelius
→ Meditations

---

## READING SYSTEM:

* Clicking book opens reader inside same page
* No navigation away from roadmap
* Progress saved automatically

---

## SWITCHING RULE:

If user selects new path:

* Ask confirmation:

  * Save progress?
  * Switch anyway?

---

# 👤 5. PHILOSOPHER DETAIL PAGE

Opened from “Details” button.

Example:

Aristotle

---

## HERO SECTION:

* Image
* Name
* Philosophy summary

---

## BOOK ROADMAP:

Ordered books:

1. Nicomachean Ethics
2. Politics
3. Organon
4. Metaphysics

---

## ACTIONS:

* Add to roadmap
* Start learning path

---

# 📚 6. BOOK READING SYSTEM

## RULES:

* Books are NOT separate pages
* Book opens inside roadmap system
* Supports:

  * next/previous navigation
  * completion tracking

---

# 🧠 7. PHILOSOPHER DATA STRUCTURE

```javascript
const philosophers = {
  aristotle: {
    name: "Aristotle",
    books: [
      { title: "Nicomachean Ethics", level: 1 },
      { title: "Politics", level: 2 },
      { title: "Organon", level: 3 },
      { title: "Metaphysics", level: 4 }
    ]
  }
};
```

---

# 🔁 8. SYSTEM FLOW

```plaintext
Landing Page
   ↓
Sophie's World Reader
   ↓
Quiz System
   ↓
Profile Generated
   ↓
Roadmap Dashboard (MAIN SYSTEM)
   ↓
Book Reader (inside roadmap)
   ↓
Progress saved
   ↓
User switches paths anytime
```

---

# 🔒 9. CONSTRAINT SYSTEM

## RULE 1:

Only one active roadmap at a time

## RULE 2:

Books must follow order unless unlocked

## RULE 3:

Switching roadmap requires confirmation

## RULE 4:

Progress saved in localStorage

---

# 🎨 10. UI DESIGN SYSTEM

## STYLE:

* Dark philosophy theme
* Gold accent highlights
* Glassmorphism cards
* Smooth transitions

## FONT:

* Serif fonts (philosophical tone)

---

# ⚙️ 11. TECH REQUIREMENTS

* HTML → structure
* CSS → design system
* JS → logic engine
* localStorage → persistence

---

# 🧠 12. CORE PRODUCT PRINCIPLE

This is NOT a content website.

It is:

> A guided philosophical learning engine that adapts to user thinking style and builds a structured intellectual journey.

---

# 🚀 FINAL OUTPUT EXPECTATION

The agent must build:

* Landing page (hero + philosophers preview)
* Novel reader system
* Quiz engine
* Roadmap dashboard (core system)
* Philosopher detail pages
* Book reader system
* State management logic

---

# 📌 END OF SPECIFICATION

```

---

If you want next step, I can now:
- :contentReference[oaicite:12]{index=12}
- OR :contentReference[oaicite:13]{index=13}
- OR :contentReference[oaicite:14]{index=14}

Just tell me 👍
```
