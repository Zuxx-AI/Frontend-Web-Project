// ============================================
// ALETHEIA — Landing Page Logic
// ============================================
// This file handles:
// 1. Navbar scroll behavior & mobile menu
// 2. Scroll-triggered fade-in animations
// 3. Button handlers (Begin Journey, Explore cards)
// 4. Sophie's World chapter reader system
// ============================================

// App state (expandable for future features like quiz, roadmap)
let appState = { mode: "landing" };

// ============================================
// INITIALIZATION — runs when DOM is ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();          // Navbar scroll effect + mobile menu
  initScrollAnimations(); // Fade-in animations on scroll
  initButtons();         // Wire up CTA buttons
  initReader();          // Sophie's World reader controls
});

// ============================================
// NAVBAR — scroll background + mobile toggle
// ============================================
function initNavbar() {
  var navbar = document.querySelector('.navbar');
  var mobileBtn = document.getElementById('mobileMenuBtn');
  var navLinks = document.querySelector('.nav-links');

  // Add solid background when scrolled past 60px
  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // Mobile hamburger menu toggle
  if (mobileBtn) mobileBtn.addEventListener('click', function() {
    navLinks.classList.toggle('mobile-open');
    mobileBtn.classList.toggle('open');
  });
}

// ============================================
// SCROLL ANIMATIONS — IntersectionObserver
// Elements fade in from below when they enter viewport
// ============================================
function initScrollAnimations() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Observe all animatable elements
  document.querySelectorAll('.philosopher-card, .step, .section-header').forEach(function(el) {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// ============================================
// BUTTON HANDLERS
// ============================================
function initButtons() {
  // "Begin Journey" button → opens Sophie's World reader
  var navStartBtn = document.getElementById('navStartBtn');
  if (navStartBtn) navStartBtn.addEventListener('click', function() { openReader(); });

  // Philosopher card "Explore" buttons → navigate to individual philosopher pages
  // Each button has data-target="aristotle" etc., navigates to {target}.html
  document.querySelectorAll('.card-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var target = e.currentTarget.dataset.target;
      if (target) window.location.href = target + '.html';
    });
  });
}

// ============================================
// SOPHIE'S WORLD READER SYSTEM
// ============================================
// Structure: Cover → 20 Chapters → Back Cover (22 pages total)
// Each chapter has: title, text (HTML), and optional type ("cover"/"backcover")
// Navigation: arrows, scroll wheel, keyboard (← → Esc)
// ============================================

var chapters = [
  { title: "Cover", text: "", type: "cover" },
  { title: "Chapter 1: The Garden of Eden", text: "<p>Fourteen-year-old Sophie Amundsen receives a mysterious letter asking, \u201CWho are you?\u201D The question disturbs her normal life and makes her question her identity. She starts feeling that her existence is not as simple as she thought.</p><p>More letters begin to arrive, each more confusing than the last. These messages feel like they are coming from an unknown philosopher. Sophie becomes deeply curious about the sender and the purpose.</p><p>Her ordinary life slowly turns into a philosophical mystery. She begins to reflect on existence and self-awareness.</p>" },
  { title: "Chapter 2: The Top Hat", text: "<p>Sophie receives more lessons introducing early philosophical thinking. The letters explain how humans tried to understand reality in ancient times. She learns about pre-Socratic philosophers and their ideas.</p><p>These thinkers used reason instead of myths to explain nature. Sophie becomes fascinated by the origins of human thought. Each lesson opens a new layer of understanding for her.</p><p>She begins to question what reality truly is. Her curiosity about philosophy grows stronger.</p>" },
  { title: "Chapter 3: The Myths", text: "<p>Sophie meets Alberto Knox, who becomes her philosophy teacher. He guides her through ancient myths and their meanings. They explore how early civilizations explained life through stories.</p><p>Myths were used to understand nature and human existence. Sophie learns the difference between mythological and logical thinking. Alberto shows how philosophy replaced myth over time.</p><p>She begins to see patterns in human belief systems. Her understanding of knowledge starts to deepen.</p>" },
  { title: "Chapter 4: The Natural Philosophers", text: "<p>Sophie studies Greek philosophers like Thales and Anaximander. They tried to explain the universe using natural elements. Thales believed everything came from water. Anaximander suggested an unknown substance as the origin of everything.</p><p>Heraclitus believed everything is constantly changing. Sophie finds these ideas both strange and interesting. She begins to see philosophy as the search for truth.</p><p>Her understanding of nature becomes more logical.</p>" },
  { title: "Chapter 5: Democritus", text: "<p>Sophie learns about Democritus and his atomic theory. He believed everything is made of tiny, indivisible particles. This idea challenges Sophie\u2019s imagination of reality. She struggles to accept unseen structures in matter.</p><p>Alberto explains how modern science supports this idea. Sophie starts connecting philosophy with science. She becomes curious about the invisible world.</p><p>Her thinking becomes more analytical.</p>" },
  { title: "Chapter 6: Socrates", text: "<p>Sophie is introduced to Socrates and his questioning method. He believed in asking questions instead of giving answers. Socrates focused on ethics and human behavior. Alberto teaches Sophie through Socratic dialogue.</p><p>She realizes she knows less than she thought. This method encourages critical thinking. Sophie begins questioning her own beliefs.</p><p>Her understanding of knowledge becomes deeper.</p>" },
  { title: "Chapter 7: Athens", text: "<p>Sophie studies Plato and Aristotle in ancient Athens. Plato introduces the theory of perfect forms. Aristotle focuses on observation and logic. Sophie compares their different approaches to knowledge.</p><p>She learns about the concept of balance in life. These ideas shape her understanding of philosophy. She becomes more thoughtful and analytical.</p><p>Her intellectual growth becomes stronger.</p>" },
  { title: "Chapter 8: The Renaissance", text: "<p>Sophie enters the Renaissance period of thought. She meets thinkers like Galileo, Copernicus, and Kepler. They challenge old beliefs about the universe. Scientific discovery begins to replace traditional ideas.</p><p>Sophie learns Earth is not the center of the universe. This shocks her understanding of reality. She sees how science changes human knowledge.</p><p>Her worldview expands significantly.</p>" },
  { title: "Chapter 9: The Baroque", text: "<p>Sophie explores Baroque philosophy and its complexity. She meets Descartes and his famous idea of existence. \u201CI think, therefore I am\u201D becomes a key concept. Spinoza introduces unity between God and nature.</p><p>Sophie struggles with abstract philosophical ideas. She begins understanding doubt as a tool for learning. Her thinking becomes more reflective.</p><p>She questions reality more deeply.</p>" },
  { title: "Chapter 10: Locke", text: "<p>Sophie studies John Locke and empiricism. He believes knowledge comes from experience. Locke also discusses human rights and society. Sophie learns how society is built on agreements.</p><p>She connects experience with understanding. Her perspective becomes more practical. She begins trusting observation.</p><p>Her knowledge becomes more grounded.</p>" },
  { title: "Chapter 11: Hume", text: "<p>Sophie learns David Hume\u2019s skeptical philosophy. He questions cause and effect relationships. Hume believes knowledge is based on experience only. Sophie finds his ideas challenging and confusing.</p><p>She begins questioning certainty in knowledge. This weakens her assumptions about reality. She becomes more cautious in thinking.</p><p>Her skepticism increases.</p>" },
  { title: "Chapter 12: Berkeley", text: "<p>Sophie explores George Berkeley\u2019s idealism. He believes reality exists only in perception. If nothing is perceived, it does not exist. Sophie struggles with this strange idea.</p><p>Alberto helps her understand philosophical perception. She begins questioning physical reality. Her imagination expands further.</p><p>Her thinking becomes more abstract.</p>" },
  { title: "Chapter 13: Rousseau", text: "<p>Sophie studies Jean-Jacques Rousseau\u2019s philosophy. He believes humans are naturally good. Society corrupts human nature over time. Sophie reflects on human behavior and society.</p><p>She learns about the \u201Cnoble savage\u201D idea. This changes her view of civilization. She begins questioning social systems.</p><p>Her understanding of humanity deepens.</p>" },
  { title: "Chapter 14: Kant", text: "<p>Sophie learns Immanuel Kant\u2019s critical philosophy. He combines rationalism and empiricism. Kant introduces the categorical imperative. He explains how mind shapes reality.</p><p>Sophie finds his ideas complex but powerful. She begins understanding perception and reason. Her thinking becomes more structured.</p><p>She sees limits of human knowledge.</p>" },
  { title: "Chapter 15: Romanticism", text: "<p>Sophie explores Romantic philosophy. Thinkers like Kierkegaard focus on emotions and existence. Schopenhauer emphasizes suffering in life. Sophie struggles with existential questions.</p><p>She begins thinking about meaning and purpose. Emotions become part of philosophical thought. Her worldview becomes more personal.</p><p>She questions life deeply.</p>" },
  { title: "Chapter 16: Hegel", text: "<p>Sophie studies Hegel\u2019s dialectical philosophy. History is seen as a process of development. Ideas evolve through conflict and resolution. Sophie finds his system complex.</p><p>She begins understanding historical change. Philosophy becomes dynamic for her. She sees progress in human thought.</p><p>Her understanding becomes more advanced.</p>" },
  { title: "Chapter 17: Marx", text: "<p>Sophie learns Karl Marx\u2019s social theory. He critiques capitalism and class struggle. History is shaped by economic systems. Sophie understands social inequality better.</p><p>She sees how society is structured. Philosophy connects to real-world systems. Her awareness of politics increases.</p><p>She thinks critically about society.</p>" },
  { title: "Chapter 18: Darwin", text: "<p>Sophie studies Charles Darwin\u2019s evolution theory. Life evolves through natural selection. This challenges traditional human beliefs. Sophie reflects on human origins.</p><p>She connects biology with philosophy. Her understanding of life expands. She questions humanity\u2019s place in nature.</p><p>Her worldview becomes scientific.</p>" },
  { title: "Chapter 19: Freud", text: "<p>Sophie learns Sigmund Freud\u2019s psychology. He introduces the unconscious mind. Dreams reveal hidden thoughts and desires. Sophie becomes curious about human behavior.</p><p>She sees mind as complex and layered. Psychology becomes part of philosophy. Her self-awareness increases.</p><p>She reflects deeply on human nature.</p>" },
  { title: "Chapter 20: Our Own Time", text: "<p>Sophie and Alberto gather all philosophical ideas. They reflect on the journey of human thought. Philosophy is shown as a continuous process. Sophie understands her own existence better.</p><p>The story questions reality and identity. Everything begins to feel interconnected. She realizes philosophy helps understand life.</p><p>The journey ends with deeper awareness.</p>" },
  { title: "Back Cover", text: "", type: "backcover" }
];

// ============================================
// READER — Open / Close / Render
// ============================================

var readerCurrentPage = 0;

// Open reader: hide landing, show reader overlay, render first page
function openReader() {
  readerCurrentPage = 0;
  document.getElementById('landing').classList.remove('active');
  document.getElementById('reader').classList.add('active');
  renderReaderPage();
  document.body.style.overflow = 'hidden'; // Prevent body scroll
}

// Close reader: hide overlay, show landing page
function closeReader() {
  document.getElementById('reader').classList.remove('active');
  document.getElementById('landing').classList.add('active');
  document.body.style.overflow = '';
}

// Render current page — shows cover image or chapter text
function renderReaderPage() {
  var coverImg = document.getElementById('readerCoverImg');
  var chapterEl = document.getElementById('readerChapter');
  var titleEl = document.getElementById('chapterTitle');
  var textEl = document.getElementById('chapterText');
  var indicator = document.getElementById('readerPageIndicator');
  var readerTitle = document.getElementById('readerTitle');
  var prevBtn = document.getElementById('readerPrev');
  var nextBtn = document.getElementById('readerNext');
  var ch = chapters[readerCurrentPage];

  if (ch.type === "cover") {
    // Show Sophie's World front cover image
    coverImg.style.display = 'block';
    coverImg.src = "Assets/Sophies_world_cover.jpeg";
    chapterEl.classList.remove('visible');
    readerTitle.textContent = "Sophie's World";
  } else if (ch.type === "backcover") {
    // Show Sophie's World back cover image
    coverImg.style.display = 'block';
    coverImg.src = "Assets/Sophies_world_back.jpeg";
    chapterEl.classList.remove('visible');
    readerTitle.textContent = "Sophie's World";
  } else {
    // Show chapter text on parchment background
    coverImg.style.display = 'none';
    chapterEl.classList.add('visible');
    titleEl.textContent = ch.title;
    textEl.innerHTML = ch.text;
    readerTitle.textContent = ch.title;
    chapterEl.scrollTop = 0; // Reset scroll to top
  }

  // Update page indicator and button states
  indicator.textContent = (readerCurrentPage + 1) + ' / ' + chapters.length;
  prevBtn.disabled = readerCurrentPage === 0;
  nextBtn.disabled = readerCurrentPage === chapters.length - 1;
}

// ============================================
// READER — Controls (buttons, scroll, keyboard)
// ============================================
function initReader() {
  var backBtn = document.getElementById('readerBackBtn');
  var prevBtn = document.getElementById('readerPrev');
  var nextBtn = document.getElementById('readerNext');
  var viewport = document.getElementById('reader');

  // Back button → close reader
  if (backBtn) backBtn.addEventListener('click', closeReader);

  // Arrow buttons → prev/next page
  if (prevBtn) prevBtn.addEventListener('click', function() {
    if (readerCurrentPage > 0) { readerCurrentPage--; renderReaderPage(); }
  });
  if (nextBtn) nextBtn.addEventListener('click', function() {
    if (readerCurrentPage < chapters.length - 1) { readerCurrentPage++; renderReaderPage(); }
  });

  // Scroll wheel navigation with cooldown
  // On cover/backcover: scroll navigates pages directly
  // On chapter pages: text scrolls first, then navigates at boundaries
  if (viewport) {
    var cd = false; // Cooldown flag to prevent rapid page flipping
    viewport.addEventListener('wheel', function(e) {
      if (!viewport.classList.contains('active')) return;
      var ch = document.getElementById('readerChapter');

      // Cover pages — scroll directly navigates
      if (readerCurrentPage === 0 || !ch.classList.contains('visible')) {
        e.preventDefault();
        if (!cd) {
          cd = true;
          if (e.deltaY > 0 && readerCurrentPage < chapters.length - 1) { readerCurrentPage++; renderReaderPage(); }
          else if (e.deltaY < 0 && readerCurrentPage > 0) { readerCurrentPage--; renderReaderPage(); }
          setTimeout(function() { cd = false; }, 400);
        }
        return;
      }

      // Chapter pages — navigate only at scroll boundaries
      var atT = ch.scrollTop <= 0;
      var atB = ch.scrollTop + ch.clientHeight >= ch.scrollHeight - 5;
      if (atB && e.deltaY > 0) {
        e.preventDefault();
        if (!cd) { cd = true; if (readerCurrentPage < chapters.length - 1) { readerCurrentPage++; renderReaderPage(); } setTimeout(function() { cd = false; }, 400); }
      } else if (atT && e.deltaY < 0) {
        e.preventDefault();
        if (!cd) { cd = true; if (readerCurrentPage > 0) { readerCurrentPage--; renderReaderPage(); } setTimeout(function() { cd = false; }, 400); }
      }
    }, { passive: false });
  }

  // Keyboard navigation: ← → arrows, Escape to close
  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('reader').classList.contains('active')) return;
    if (e.key === 'ArrowRight') { if (readerCurrentPage < chapters.length - 1) { readerCurrentPage++; renderReaderPage(); } }
    else if (e.key === 'ArrowLeft') { if (readerCurrentPage > 0) { readerCurrentPage--; renderReaderPage(); } }
    else if (e.key === 'Escape') { closeReader(); }
  });
}

// ============================================
// DYNAMIC ANIMATION STYLES
// Injected via JS to keep CSS file clean
// ============================================
var animStyle = document.createElement('style');
animStyle.textContent = [
  // Fade-in animation for scroll-triggered elements
  '.animate-on-scroll{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}',
  '.animate-on-scroll.visible{opacity:1;transform:translateY(0)}',
  // Navbar solid state on scroll
  '.navbar.scrolled{background:rgba(12,8,8,.95);box-shadow:0 2px 20px rgba(0,0,0,.5)}',
  // Mobile menu open state
  '.nav-links.mobile-open{display:flex!important;position:absolute;top:100%;left:0;right:0;flex-direction:column;background:rgba(12,8,8,.98);padding:1.5rem;gap:1rem;border-bottom:1px solid rgba(201,168,76,.12)}',
  // Hamburger animation
  '.mobile-menu-btn.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}',
  '.mobile-menu-btn.open span:nth-child(2){opacity:0}',
  '.mobile-menu-btn.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}'
].join('');
document.head.appendChild(animStyle);
