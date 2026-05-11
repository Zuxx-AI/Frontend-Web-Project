// ============================================
// ALETHEIA — 3D INTERACTIVE BOOK
// ============================================
// This file creates a fully interactive 3D book using Three.js r128.
// 
// ARCHITECTURE:
// - SkinnedMesh with 31-bone chain per page for realistic page curl
// - Canvas-generated textures (parchment pages, leather cover)
// - Warm candlelight lighting (dark academia aesthetic)
// - Floating dust particles for atmosphere
// - Click-to-flip page interaction via invisible proxy planes
// - Smooth bone-driven page turning animation
//
// PAGE STRUCTURE (11 physical pages):
// Page 0:  front = leather cover with gold embossed title
//          back  = Socrates portrait on parchment
// Page 1:  front = Socrates text (name, title, books)
//          back  = Plato portrait
// ...continues for all 10 philosophers...
// Page 10: front = Harari text
//          back  = leather back cover with Socrates quote
//
// WHEN EMBEDDED (in landing page hero via iframe):
// - Zoom is disabled so scroll passes to parent page
// - Nav buttons are hidden via CSS
// - Canvas is transparent so hero background image shows through
// ============================================

(function () {
  "use strict";

  // ============================================
  // IFRAME DETECTION
  // If this book is inside an iframe (embedded in landing page),
  // add 'embedded' class to body → CSS hides nav buttons
  // ============================================
  var isEmbedded = window !== window.top;
  if (isEmbedded) document.body.classList.add("embedded");

  // ============================================
  // CONFIGURATION — Page dimensions & animation parameters
  // These values are ported from the original React Three Fiber version
  // ============================================
  var PAGE_WIDTH = 1.28;       // Width of each page in 3D units
  var PAGE_HEIGHT = 1.71;      // Height of each page
  var PAGE_DEPTH = 0.003;      // Thickness of each page
  var PAGE_SEGMENTS = 30;      // Number of bone segments per page (more = smoother curl)
  var SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS; // Width per bone segment
  var EASING_FACTOR = 0.4;     // How fast pages rotate to target (lower = slower, more elegant)
  var EASING_FACTOR_FOLD = 0.25; // How fast the fold/curl animates
  var INSIDE_CURVE = 0.18;     // Curl strength near the spine (bones 1-7)
  var OUTSIDE_CURVE = 0.05;    // Curl strength at outer edge (bones 8+)
  var TURNING_CURVE = 0.09;    // Extra curl during page flip animation
  var WAVE_AMPLITUDE = 0.08;   // How much the page geometry curves (spine dip)
  var ASSETS = "../Assets/";   // Path to assets folder (relative to book/ directory)

  // ============================================
  // WRITER DATA — 10 philosophers displayed on book pages
  // Each writer has: name, title, portrait image path, description, and book list
  // These are rendered onto canvas textures for the 3D page surfaces
  // ============================================
  var writers = [
    { name: "Socrates", title: "The Questioner", img: "socrates%20svg.png",
      text: "Father of Western philosophy, known for questioning truth and ethics.",
      books: ["Apology", "Crito", "Phaedo"] },
    { name: "Plato", title: "The Architect of Ideas", img: "plato%20svg.png",
      text: "Founder of the Academy, his vision of truth shaped philosophy forever.",
      books: ["The Republic", "Symposium"] },
    { name: "Aristotle", title: "The Master of Logic", img: "aristotle%20svg.png",
      text: "He built the foundation of science, ethics, and Western thought.",
      books: ["Nicomachean Ethics", "Politics"] },
    { name: "Epictetus", title: "The Teacher of Control", img: "Epictetus%20svg.png",
      text: "Born a slave, he taught that freedom comes from mastering the mind.",
      books: ["Enchiridion", "Discourses"] },
    { name: "Seneca", title: "The Voice of Time", img: "senega%20svg.png",
      text: "Roman Stoic who taught how to live wisely and face death bravely.",
      books: ["Letters from a Stoic", "On the Shortness of Life"] },
    { name: "Marcus Aurelius", title: "The Philosopher King", img: "marcus%20surelius%20svg.png",
      text: "Roman Emperor whose private meditations became a guide to virtue.",
      books: ["Meditations"] },
    { name: "Nietzsche", title: "The Challenger", img: "friedrich%20svg.png",
      text: "He questioned morality and urged individuals to create their own path.",
      books: ["Thus Spoke Zarathustra", "Beyond Good and Evil"] },
    { name: "Dostoevsky", title: "The Soul Explorer", img: "divuski%20svg.png",
      text: "His stories dive into guilt, faith, and the depths of the human mind.",
      books: ["Crime and Punishment", "The Brothers Karamazov"] },
    { name: "Kafka", title: "The Voice of Absurdity", img: "KAFKA%20SVG.png",
      text: "He captures isolation and the search for meaning in an absurd world.",
      books: ["The Metamorphosis", "The Trial", "The Castle"] },
    { name: "Harari", title: "The Big Picture Thinker", img: "yuval%20noah%20svg.png",
      text: "He connects humanity\u2019s past with its future through bold ideas.",
      books: ["Sapiens", "Homo Deus", "21 Lessons"] }
  ];

  // ============================================
  // STATE — Tracks current page and animation targets
  // delayedPage creates the sequential page-flip effect (one page at a time)
  // ============================================
  var currentPage = 0;          // Currently selected page (UI state)
  var delayedPage = 0;          // Actual animated page position (lags behind currentPage)
  var targetDelayedPage = 0;    // Where delayedPage is heading
  var delayedPageTimeout = null; // Timer for sequential page stepping

  // ============================================
  // IMAGE PRELOADING
  // All images must be loaded BEFORE building the book,
  // because canvas textures need the image data to draw.
  // We load: 2 cover images + 10 writer portrait SVGs = 12 total
  // Once all loaded → buildBook() is called
  // ============================================
  var coverImg = new Image();
  var backImg = new Image();
  var writerImgs = [];
  for (var w = 0; w < writers.length; w++) writerImgs.push(new Image());
  var imagesLoaded = 0, totalImages = 2 + writers.length;

  function onLoad() { imagesLoaded++; if (imagesLoaded >= totalImages) buildBook(); }
  function onErr() { onLoad(); } // Still build even if an image fails

  coverImg.onload = onLoad; coverImg.onerror = onErr;
  coverImg.src = ASSETS + "Sophies_world_cover.jpeg";
  backImg.onload = onLoad; backImg.onerror = onErr;
  backImg.src = ASSETS + "Sophies_world_back.jpeg";
  for (var w = 0; w < writers.length; w++) {
    writerImgs[w].onload = onLoad; writerImgs[w].onerror = onErr;
    writerImgs[w].src = ASSETS + writers[w].img;
  }

  // ============================================
  // TEXTURE GENERATORS
  // These functions create canvas-based textures for each page face.
  // Canvas textures are synchronous (no loading delay) and allow
  // full control over typography, layout, and visual effects.
  // ============================================

  /**
   * Creates the front cover texture — vintage leather with gold embossed title.
   * Layers: leather gradient → grain noise → gold borders → corner ornaments → title text
   */
  function createCoverTexture() {
    var c = document.createElement("canvas"); c.width = 512; c.height = 682;
    var ctx = c.getContext("2d");
    // Layer 1: Deep brown leather gradient
    var g = ctx.createLinearGradient(0, 0, 0, 682);
    g.addColorStop(0, "#2a1a0f"); g.addColorStop(0.3, "#3b2a1f");
    g.addColorStop(0.5, "#2e1e14"); g.addColorStop(0.7, "#3b2a1f");
    g.addColorStop(1, "#1e1008");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 682);
    // Layer 2: Leather grain noise (random pixel variation)
    var id = ctx.getImageData(0, 0, 512, 682);
    for (var p = 0; p < id.data.length; p += 4) {
      var n = (Math.random() - 0.5) * 18;
      id.data[p] = Math.max(0, Math.min(255, id.data[p] + n));
      id.data[p+1] = Math.max(0, Math.min(255, id.data[p+1] + n));
      id.data[p+2] = Math.max(0, Math.min(255, id.data[p+2] + n));
    }
    ctx.putImageData(id, 0, 0);
    // Layer 3: Gold double border
    ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 2.5;
    ctx.strokeRect(22, 22, 468, 638);
    ctx.strokeStyle = "#8b6914"; ctx.lineWidth = 1;
    ctx.strokeRect(32, 32, 448, 618);
    // Layer 4: Corner ornaments (circles at each corner)
    [[38,38],[474,38],[38,644],[474,644]].forEach(function(p) {
      ctx.beginPath(); ctx.arc(p[0],p[1],8,0,Math.PI*2);
      ctx.strokeStyle="#d4af37"; ctx.lineWidth=1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(p[0],p[1],3,0,Math.PI*2);
      ctx.fillStyle="#d4af37"; ctx.fill();
    });
    // Layer 5: Embossed gold title with glow shadow
    ctx.textAlign = "center";
    ctx.fillStyle = "#d4af37"; ctx.font = "bold 38px Georgia";
    ctx.shadowColor = "rgba(212,175,55,0.4)"; ctx.shadowBlur = 15;
    ctx.fillText("Aletheia", 256, 260);
    ctx.font = "italic 16px Georgia"; ctx.fillStyle = "#a08040";
    ctx.shadowBlur = 8;
    ctx.fillText("A Philosophy Learning Journey", 256, 300);
    ctx.font = "13px Georgia"; ctx.fillStyle = "#7a6030";
    ctx.shadowBlur = 0;
    ctx.fillText("by Ahtisham Manzoor", 256, 340);
    // Decorative divider line
    ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(150, 370); ctx.lineTo(362, 370); ctx.stroke();
    return new THREE.CanvasTexture(c);
  }

  /**
   * Creates the back cover texture — dark leather with Socrates quote
   */
  function createBackCoverTexture() {
    var c = document.createElement("canvas"); c.width = 512; c.height = 682;
    var ctx = c.getContext("2d");
    var g = ctx.createLinearGradient(0, 0, 0, 682);
    g.addColorStop(0, "#1e1008"); g.addColorStop(0.5, "#2a1a0f"); g.addColorStop(1, "#1e1008");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 682);
    var id = ctx.getImageData(0, 0, 512, 682);
    for (var p = 0; p < id.data.length; p += 4) {
      var n = (Math.random() - 0.5) * 12;
      id.data[p] += n; id.data[p+1] += n; id.data[p+2] += n;
    }
    ctx.putImageData(id, 0, 0);
    ctx.strokeStyle = "#8b6914"; ctx.lineWidth = 1.5;
    ctx.strokeRect(22, 22, 468, 638);
    ctx.textAlign = "center";
    ctx.fillStyle = "#d4af37"; ctx.font = "italic 18px Georgia";
    ctx.fillText("\u201CThe unexamined life", 256, 310);
    ctx.fillText("is not worth living.\u201D", 256, 338);
    ctx.font = "14px Georgia"; ctx.fillStyle = "#a08040";
    ctx.fillText("\u2014 Socrates", 256, 375);
    return new THREE.CanvasTexture(c);
  }

  /**
   * Creates a LEFT page — parchment background with philosopher portrait centered.
   * The portrait is drawn with slight transparency for a vintage print effect.
   * @param {number} writerIdx - Index into the writers array
   */
  function createPortraitPage(writerIdx) {
    var c = document.createElement("canvas"); c.width = 512; c.height = 682;
    var ctx = c.getContext("2d");
    drawParchment(ctx, 512, 682); // Base parchment texture
    // Draw writer portrait image centered
    var img = writerImgs[writerIdx];
    if (img.complete && img.naturalWidth > 0) {
      var maxW = 280, maxH = 380;
      var sc = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
      var dw = img.naturalWidth * sc, dh = img.naturalHeight * sc;
      ctx.globalAlpha = 0.85; // Slight fade for vintage look
      ctx.drawImage(img, (512 - dw) / 2, (682 - dh) / 2 - 20, dw, dh);
      ctx.globalAlpha = 1;
    }
    // Writer name at bottom
    ctx.textAlign = "center";
    ctx.fillStyle = "#3a2a10"; ctx.font = "italic 20px Georgia";
    ctx.fillText(writers[writerIdx].name, 256, 620);
    // Subtle gold border
    ctx.strokeStyle = "rgba(139,105,20,0.3)"; ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, 472, 642);
    return new THREE.CanvasTexture(c);
  }

  /**
   * Creates a RIGHT page — parchment background with philosopher info text.
   * Layout: Name → Title → Divider → Description → Book list
   * @param {number} writerIdx - Index into the writers array
   */
  function createTextPage(writerIdx) {
    var c = document.createElement("canvas"); c.width = 512; c.height = 682;
    var ctx = c.getContext("2d");
    drawParchment(ctx, 512, 682); // Base parchment texture
    var wr = writers[writerIdx];
    ctx.textAlign = "center";
    // Philosopher name (large, bold, dark ink)
    ctx.fillStyle = "#2a1a08"; ctx.font = "bold 26px Georgia";
    ctx.fillText(wr.name, 256, 160);
    // Subtitle/title (italic, muted)
    ctx.fillStyle = "#5a4020"; ctx.font = "italic 16px Georgia";
    ctx.fillText(wr.title, 256, 190);
    // Decorative divider line
    ctx.strokeStyle = "rgba(90,64,32,0.4)"; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(150, 210); ctx.lineTo(362, 210); ctx.stroke();
    // Description text (word-wrapped)
    ctx.fillStyle = "#3a2a10"; ctx.font = "15px Georgia";
    wrapText(ctx, wr.text, 256, 245, 380, 22);
    // Books list
    ctx.fillStyle = "#5a4020"; ctx.font = "italic 13px Georgia";
    ctx.fillText("Works:", 256, 340);
    ctx.fillStyle = "#2a1a08"; ctx.font = "14px Georgia";
    for (var i = 0; i < wr.books.length; i++) {
      ctx.fillText("\u2022 " + wr.books[i], 256, 370 + i * 24);
    }
    // Subtle border
    ctx.strokeStyle = "rgba(139,105,20,0.3)"; ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, 472, 642);
    return new THREE.CanvasTexture(c);
  }

  /**
   * Draws an aged parchment background on a canvas context.
   * Layers: radial gradient (warm center, darker edges) → pixel noise → vignette
   */
  function drawParchment(ctx, w, h) {
    // Warm radial gradient — lighter in center, darker at edges
    var g = ctx.createRadialGradient(w/2, h/2, 50, w/2, h/2, w*0.7);
    g.addColorStop(0, "#f4ecd8"); g.addColorStop(0.6, "#e8dcc4");
    g.addColorStop(1, "#d4c4a0");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // Paper grain noise — random pixel variation for texture
    var id = ctx.getImageData(0, 0, w, h);
    for (var p = 0; p < id.data.length; p += 4) {
      var n = (Math.random() - 0.5) * 10;
      id.data[p] = Math.max(0, Math.min(255, id.data[p] + n));
      id.data[p+1] = Math.max(0, Math.min(255, id.data[p+1] + n));
      id.data[p+2] = Math.max(0, Math.min(255, id.data[p+2] + n));
    }
    ctx.putImageData(id, 0, 0);
    // Vignette — darker edges for aged paper look
    var vg = ctx.createRadialGradient(w/2, h/2, w*0.3, w/2, h/2, w*0.7);
    vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(80,50,20,0.15)");
    ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h);
  }

  /**
   * Word wrap helper — draws text centered with automatic line breaks.
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {string} text - Text to render
   * @param {number} x - Center X position
   * @param {number} y - Starting Y position
   * @param {number} maxW - Maximum line width before wrapping
   * @param {number} lineH - Line height (spacing between lines)
   */
  function wrapText(ctx, text, x, y, maxW, lineH) {
    var words = text.split(" "), line = "";
    for (var i = 0; i < words.length; i++) {
      var test = line + (line ? " " : "") + words[i];
      if (ctx.measureText(test).width > maxW) {
        ctx.fillText(line, x, y); y += lineH; line = words[i];
      } else { line = test; }
    }
    if (line) ctx.fillText(line, x, y);
  }

  // ============================================
  // BUILD BOOK — Main construction function
  // Called after all images are preloaded.
  // Creates: geometry, scene, renderer, pages, particles, and starts animation.
  // ============================================
  function buildBook() {

  // ============================================
  // PAGE TEXTURE ASSEMBLY
  // Build 11 physical pages from canvas textures:
  // Page 0: Cover (front) / Socrates portrait (back)
  // Pages 1-9: Previous writer text (front) / Next writer portrait (back)
  // Page 10: Harari text (front) / Back cover (back)
  // ============================================
  var pages = [];
  pages.push({ front: createCoverTexture(), back: createPortraitPage(0) });
  for (var i = 1; i < writers.length; i++) {
    pages.push({ front: createTextPage(i - 1), back: createPortraitPage(i) });
  }
  pages.push({ front: createTextPage(writers.length - 1), back: createBackCoverTexture() });

  // ============================================
  // SHARED PAGE GEOMETRY
  // A single BoxGeometry is shared by all pages (instanced via SkinnedMesh).
  // - Translated so pivot point is at left edge (spine)
  // - Subdivided into 30 segments for bone deformation
  // - Wave curvature baked into vertices (spine dips, edge rises)
  // - Skin weights assign each vertex to its nearest bones
  // ============================================
  var pageGeometry = new THREE.BoxGeometry(
    PAGE_WIDTH, PAGE_HEIGHT, PAGE_DEPTH, PAGE_SEGMENTS, 2, 1
  );
  // Move pivot to left edge (x=0 is the spine, x=PAGE_WIDTH is outer edge)
  pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

  // Apply permanent wave curvature to page geometry
  // This makes pages curve like a real open book (spine dips, edges rise)
  (function applyPageCurve() {
    var p = pageGeometry.attributes.position;
    for (var i = 0; i < p.count; i++) {
      var x = p.getX(i), z = p.getZ(i);
      // Normalize x: 0 at spine, 1 at outer edge
      var t = Math.max(0, Math.min(1, x / PAGE_WIDTH));
      // Sine curve: 0 at spine → 1 at edge, shifted down so spine dips below zero
      p.setZ(i, z + (Math.sin(t * Math.PI * 0.5) - 0.15) * WAVE_AMPLITUDE);
    }
    p.needsUpdate = true;
    pageGeometry.computeVertexNormals(); // Recalculate normals for correct lighting
  })();

  // Assign skin weights — each vertex is influenced by its two nearest bones
  // This allows the SkinnedMesh to deform smoothly when bones rotate
  var pos = pageGeometry.attributes.position;
  var vtx = new THREE.Vector3();
  var skinIdx = [], skinWt = [];
  for (var i = 0; i < pos.count; i++) {
    vtx.fromBufferAttribute(pos, i);
    var x = vtx.x;
    var si = Math.max(0, Math.floor(x / SEGMENT_WIDTH)); // Primary bone index
    var sw = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;        // Blend weight (0-1)
    skinIdx.push(si, si + 1, 0, 0);  // Influenced by bone[si] and bone[si+1]
    skinWt.push(1 - sw, sw, 0, 0);   // Linear blend between the two
  }
  pageGeometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIdx, 4));
  pageGeometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWt, 4));

  // ============================================
  // THREE.JS SCENE SETUP
  // - Transparent background (alpha) so CSS hero image shows through
  // - Perspective camera positioned for a good book viewing angle
  // - OrbitControls for mouse interaction (drag to rotate, zoom disabled when embedded)
  // ============================================
  var scene = new THREE.Scene();
  // No scene.background — canvas is transparent

  var camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 100
  );
  camera.position.set(-0.5, 1, window.innerWidth > 800 ? 4 : 9);

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0); // Fully transparent clear
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = false; // No shadows (performance + aesthetic choice)
  document.body.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;   // Smooth deceleration when dragging
  controls.dampingFactor = 0.05;
  controls.target.set(0, 0, 0);   // Look at center
  controls.minDistance = 2;
  controls.maxDistance = 15;
  if (isEmbedded) controls.enableZoom = false; // Disable zoom in iframe

  // ============================================
  // LIGHTING — Warm Candlelight (Dark Academia)
  // No harsh white lights. Everything is warm amber/golden.
  // Creates a museum-like, intimate reading atmosphere.
  // ============================================
  scene.add(new THREE.AmbientLight(0xf5e6c8, 0.4));  // Soft warm fill everywhere
  scene.add(new THREE.HemisphereLight(0xf5e6c8, 0x0b0b0b, 0.3)); // Golden sky, dark ground
  var warmLight = new THREE.DirectionalLight(0xf0d8a8, 0.8); // Single warm key light
  warmLight.position.set(1, 3, 2);
  scene.add(warmLight);

  // ============================================
  // BOOK GROUP HIERARCHY
  // floatGroup: handles the gentle floating animation + tilt
  // bookGroup: rotated -90° Y so pages open left/right (not front/back)
  // ============================================
  var floatGroup = new THREE.Group();
  scene.add(floatGroup);
  floatGroup.rotation.x = -Math.PI / 4; // Tilt book toward viewer
  var bookGroup = new THREE.Group();
  bookGroup.rotation.y = -Math.PI / 2;  // Rotate so spine faces viewer
  floatGroup.add(bookGroup);

  // ============================================
  // BUILD INDIVIDUAL PAGES
  // Each page is a SkinnedMesh with:
  // - 31 bones in a chain (bone 0 at spine, bone 30 at outer edge)
  // - 6 materials: [right edge, left/spine edge, top, bottom, front face, back face]
  // - An invisible proxy plane for raycasting (SkinnedMesh raycasting is broken in r128)
  // ============================================
  var parchmentCol = new THREE.Color("#f4ecd8"); // Page edge color
  var leatherCol = new THREE.Color("#3b2a1f");   // Cover edge color
  var spineCol = new THREE.Color("#1a1008");     // Spine (left edge) color
  var pageObjects = [];  // Array of all page data for animation
  var hitProxies = [];   // Array of invisible planes for click detection

  for (var idx = 0; idx < pages.length; idx++) {
    var pg = pages[idx];
    var isFirst = idx === 0;
    var isLast = idx === pages.length - 1;

    // Create bone chain: 31 bones, each offset by SEGMENT_WIDTH
    var bones = [];
    for (var b = 0; b <= PAGE_SEGMENTS; b++) {
      var bone = new THREE.Bone();
      bone.position.x = b === 0 ? 0 : SEGMENT_WIDTH;
      bones.push(bone);
      if (b > 0) bones[b - 1].add(bone); // Chain: each bone is child of previous
    }
    var skeleton = new THREE.Skeleton(bones);

    // Materials array: [right, left/spine, top, bottom, front face, back face]
    var edgeCol = (isFirst || isLast) ? leatherCol : parchmentCol;
    var materials = [
      new THREE.MeshStandardMaterial({ color: edgeCol, roughness: 0.7, metalness: 0 }),
      new THREE.MeshStandardMaterial({ color: spineCol, roughness: 0.8, metalness: 0 }),
      new THREE.MeshStandardMaterial({ color: edgeCol, roughness: 0.7, metalness: 0 }),
      new THREE.MeshStandardMaterial({ color: edgeCol, roughness: 0.7, metalness: 0 }),
      new THREE.MeshStandardMaterial({ map: pg.front, roughness: (isFirst ? 0.7 : 0.5), metalness: 0 }),
      new THREE.MeshStandardMaterial({ map: pg.back, roughness: (isLast ? 0.7 : 0.5), metalness: 0 })
    ];

    // Create SkinnedMesh and bind skeleton
    var mesh = new THREE.SkinnedMesh(pageGeometry, materials);
    mesh.frustumCulled = false; // Always render (bones move vertices outside frustum)
    mesh.add(skeleton.bones[0]); // Root bone must be child of mesh
    mesh.bind(skeleton);
    mesh.position.z = -idx * PAGE_DEPTH; // Stack pages with slight Z offset

    // Invisible proxy plane for raycasting (click detection)
    var proxyGeo = new THREE.PlaneGeometry(PAGE_WIDTH, PAGE_HEIGHT);
    proxyGeo.translate(PAGE_WIDTH / 2, 0, 0);
    var proxyMat = new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide });
    var proxy = new THREE.Mesh(proxyGeo, proxyMat);
    proxy.position.z = -idx * PAGE_DEPTH;
    proxy.userData.pageIndex = idx; // Store page index for click handler

    // Group holds both the visible mesh and invisible proxy
    var group = new THREE.Group();
    group.add(mesh);
    group.add(proxy);
    bookGroup.add(group);

    hitProxies.push(proxy);
    pageObjects.push({
      group: group, mesh: mesh, proxy: proxy, bones: bones, number: idx,
      turnedAt: 0, lastOpened: false
    });
  }

  // ============================================
  // DUST PARTICLES — Atmospheric floating specks
  // 60 tiny warm-colored points that drift upward slowly,
  // creating a candlelit library atmosphere.
  // ============================================
  var dustGeo = new THREE.BufferGeometry();
  var dustCount = 60;
  var dustPositions = new Float32Array(dustCount * 3);
  for (var d = 0; d < dustCount; d++) {
    dustPositions[d*3] = (Math.random() - 0.5) * 6;     // Random X spread
    dustPositions[d*3+1] = (Math.random() - 0.5) * 4;   // Random Y spread
    dustPositions[d*3+2] = (Math.random() - 0.5) * 4;   // Random Z spread
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  var dustMat = new THREE.PointsMaterial({
    color: 0xf5e6c8,    // Warm golden color
    size: 0.008,         // Tiny specks
    transparent: true,
    opacity: 0.4         // Semi-transparent
  });
  var dustParticles = new THREE.Points(dustGeo, dustMat);
  scene.add(dustParticles);

  // ============================================
  // ANIMATION HELPERS
  // ============================================

  /**
   * Smoothly interpolates an angle property toward a target value.
   * Uses exponential easing for natural deceleration.
   * Handles angle wrapping (e.g., -π to π transitions).
   * @param {Object} obj - Object containing the property
   * @param {string} prop - Property name (e.g., "y" on rotation)
   * @param {number} target - Target angle in radians
   * @param {number} smoothing - Easing speed (higher = faster)
   * @param {number} dt - Delta time from clock
   */
  function dampAngle(obj, prop, target, smoothing, dt) {
    var cur = obj[prop], diff = target - cur;
    // Normalize angle difference to [-π, π]
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    // Snap if close enough (prevents infinite tiny movements)
    if (Math.abs(diff) < 0.0005) { obj[prop] = target; return; }
    // Exponential easing: fast at start, slow near target
    obj[prop] = cur + diff * (1 - Math.exp(-smoothing * dt * 10));
  }

  function degToRad(d) { return d * (Math.PI / 180); }

  // ============================================
  // PAGE UPDATE — Per-frame bone animation
  // This is the core of the page flip effect.
  // Each page's group rotates ±90° (open left or right).
  // Bones 1-30 add subtle curl on top of the base rotation.
  // ============================================
  function updatePage(po, dt) {
    var group = po.group, mesh = po.mesh, bones = po.bones, number = po.number;

    // Is this page currently "opened" (turned to the left)?
    var opened = delayedPage > number;
    // Is the book fully closed (all pages stacked right)?
    var bookClosed = delayedPage === 0;

    // Track when page state changed (for turning animation timing)
    if (po.lastOpened !== opened) { po.turnedAt = performance.now(); po.lastOpened = opened; }
    // turningTime: 0→1→0 sine pulse during the 400ms flip transition
    var elapsed = Math.min(400, performance.now() - po.turnedAt) / 400;
    var turningTime = Math.sin(elapsed * Math.PI);

    // Target rotation: opened pages go left (-π/2), closed go right (+π/2)
    // Small offset per page number prevents z-fighting when stacked
    var targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) targetRotation += degToRad(number * 0.8);

    // Z-stacking: pages shift forward/back based on current page
    mesh.position.z = -number * PAGE_DEPTH + delayedPage * PAGE_DEPTH;

    // Animate the GROUP rotation (this is the main page flip)
    dampAngle(group.rotation, "y", targetRotation, EASING_FACTOR, dt);

    // Animate individual BONES for curl effect
    var boneCount = bones.length;
    for (var i = 1; i < boneCount; i++) {
      var bone = bones[i];
      if (bookClosed) {
        // When closed: all bones flat (no curl)
        dampAngle(bone.rotation, "y", 0, EASING_FACTOR, dt);
        dampAngle(bone.rotation, "x", 0, EASING_FACTOR_FOLD, dt);
        dampAngle(bone.rotation, "z", 0, EASING_FACTOR, dt);
      } else {
        // CURL FORMULA (from React Three Fiber reference):
        // - insideCurve: bones 1-7 curl inward (near spine)
        // - outsideCurve: bones 8+ curl outward (near edge)
        // - turningCurve: extra curl during flip animation
        var insideC = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
        var outsideC = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
        var turningC = Math.sin(i * Math.PI / boneCount) * turningTime;
        var curlAngle = INSIDE_CURVE * insideC * targetRotation * 0.3
          - OUTSIDE_CURVE * outsideC * targetRotation * 0.3
          + TURNING_CURVE * turningC * targetRotation;
        dampAngle(bone.rotation, "y", curlAngle, EASING_FACTOR, dt);

        // X-axis fold: slight bend during turning (paper fold effect)
        var foldBase = degToRad(Math.sign(targetRotation) * 2);
        var foldI = i > 8 ? Math.sin(i * Math.PI / boneCount - 0.5) * turningTime : 0;
        dampAngle(bone.rotation, "x", foldBase * foldI, EASING_FACTOR_FOLD, dt);

        // Z-axis spine curve: bones near spine lift upward (valley shape)
        var spineCurve = 0;
        if (i <= 10) {
          var t = 1 - (i - 1) / 9; // Strongest at bone 1, fades to 0 at bone 10
          spineCurve = t * t * 0.08 * Math.sign(targetRotation);
        }
        dampAngle(bone.rotation, "z", spineCurve, EASING_FACTOR, dt);
      }
    }
  }

  // ============================================
  // NAVIGATION — Page flipping logic
  // goToPage: sets target, triggers sequential stepping
  // stepDelayed: flips one page at a time with delay between each
  // ============================================
  function goToPage(idx) {
    currentPage = idx;
    targetDelayedPage = idx;
    stepDelayed();
    updateNav();
  }

  function stepDelayed() {
    clearTimeout(delayedPageTimeout);
    if (delayedPage === targetDelayedPage) return;
    // Move one page closer to target
    if (targetDelayedPage > delayedPage) delayedPage++; else delayedPage--;
    // Faster stepping when many pages to flip, slower for single pages
    var delay = Math.abs(targetDelayedPage - delayedPage) > 2 ? 50 : 150;
    delayedPageTimeout = setTimeout(stepDelayed, delay);
  }

  // ============================================
  // UI — Navigation buttons (shown when not embedded)
  // Buttons show philosopher names for easy navigation
  // ============================================
  function buildNav() {
    var nav = document.getElementById("page-nav"); nav.innerHTML = "";
    for (var i = 0; i <= pages.length; i++) {
      var btn = document.createElement("button");
      btn.className = "page-btn" + (i === 0 ? " active" : "");
      if (i === 0) btn.textContent = "Cover";
      else if (i === pages.length) btn.textContent = "Back";
      else btn.textContent = writers[i - 1] ? writers[i - 1].name : "Page " + i;
      (function(idx) { btn.onclick = function() { goToPage(idx); }; })(i);
      nav.appendChild(btn);
    }
  }

  function updateNav() {
    var btns = document.querySelectorAll(".page-btn");
    for (var i = 0; i < btns.length; i++) {
      if (i === currentPage) btns[i].classList.add("active");
      else btns[i].classList.remove("active");
    }
  }
  buildNav();

  // ============================================
  // CLICK HANDLING — Raycasting on proxy planes
  // SkinnedMesh raycasting is broken in Three.js r128,
  // so we use invisible flat PlaneGeometry proxies that rotate with their page group.
  // Click on left side of a page → close it (go back)
  // Click on right side → open it (go forward)
  // ============================================
  var raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2();

  window.addEventListener("pointermove", function(e) {
    // Convert screen coordinates to normalized device coordinates (-1 to +1)
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener("click", function() {
    raycaster.setFromCamera(mouse, camera);
    bookGroup.updateMatrixWorld(true); // Ensure proxy transforms are current
    var hits = raycaster.intersectObjects(hitProxies, false);
    if (hits.length > 0) {
      var idx = hits[0].object.userData.pageIndex;
      // If page is already opened (on left), clicking closes it
      // If page is closed (on right), clicking opens it
      goToPage(delayedPage > idx ? idx : idx + 1);
    }
  });

  // ============================================
  // RESIZE HANDLER — Keep camera aspect ratio correct
  // ============================================
  window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ============================================
  // ANIMATION LOOP — Runs every frame (~60fps)
  // Updates: controls, floating motion, camera drift, dust, page bones, render
  // ============================================
  var clock = new THREE.Clock(), floatTime = 0;
  var camBaseX = camera.position.x, camBaseY = camera.position.y;

  function animate() {
    requestAnimationFrame(animate);
    var dt = Math.min(clock.getDelta(), 0.05); // Cap delta to prevent jumps

    controls.update(); // OrbitControls damping

    // Gentle floating motion (book bobs up/down and tilts slightly)
    floatTime += dt * 1.5;
    floatGroup.position.y = Math.sin(floatTime) * 0.04;
    floatGroup.rotation.z = Math.sin(floatTime * 0.6) * 0.003;

    // Subtle camera drift (tiny oscillation for life-like feel)
    camera.position.x = camBaseX + Math.sin(floatTime * 0.3) * 0.02;
    camera.position.y = camBaseY + Math.cos(floatTime * 0.4) * 0.015;

    // Animate dust particles (slow upward drift, reset when too high)
    var dp = dustParticles.geometry.attributes.position.array;
    for (var d = 0; d < dustCount; d++) {
      dp[d*3+1] += dt * 0.02; // Move up
      if (dp[d*3+1] > 2) dp[d*3+1] = -2; // Reset to bottom
    }
    dustParticles.geometry.attributes.position.needsUpdate = true;

    // Update all page bone animations
    for (var i = 0; i < pageObjects.length; i++) updatePage(pageObjects[i], dt);

    // Render the scene
    renderer.render(scene, camera);
  }
  animate();

  } // end buildBook
})();
