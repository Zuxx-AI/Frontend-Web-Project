(function() {
  "use strict";

  // Books button scroll
  document.getElementById("booksBtn").addEventListener("click", function() {
    document.getElementById("booksSection").scrollIntoView({ behavior: "smooth" });
  });

  // ===================== READER SYSTEM =====================
  var books = {
    ethics: {
      title: "Nicomachean Ethics",
      cover: "Assets/Nicomachean Ethics cover.jpeg",
      chapters: [
        { title: "Cover", text: "", type: "cover" },
        { title: "Book I: The Good for Man", text: "<p>Every art and every inquiry, and similarly every action and pursuit, is thought to aim at some good. Hence it has been said that the good is that at which all things aim. Aristotle begins by asking what the highest good is for human beings.</p><p>He argues that happiness is the highest good because it is desired for its own sake and never for the sake of something else. But what is happiness? It is not mere pleasure, wealth, or honor.</p><p>Happiness is an activity of the soul in accordance with virtue. It requires a complete life and cannot be achieved in isolation. The good life is one lived in community with others.</p>" },
        { title: "Book II: Virtue of Character", text: "<p>Moral virtue comes about as a result of habit. We become just by doing just acts, temperate by doing temperate acts, brave by doing brave acts. None of the moral virtues arises in us by nature.</p><p>Virtue is a state of character concerned with choice, lying in a mean between two extremes. Courage is the mean between cowardice and recklessness. Generosity is the mean between wastefulness and stinginess.</p><p>Finding the mean is not easy. It requires practical wisdom and experience. The virtuous person feels the right emotions at the right times and acts accordingly.</p>" },
        { title: "Book III: Voluntary Action and Choice", text: "<p>Since virtue is concerned with emotions and actions, praise and blame are given only for voluntary actions. Aristotle distinguishes between voluntary, involuntary, and non-voluntary actions.</p><p>Choice is central to moral virtue. We deliberate about things that are in our power and can be done. Choice involves both desire and reasoning about how to achieve what we desire.</p><p>Aristotle examines courage and temperance as examples of virtues that involve choosing the mean in difficult circumstances. The courageous person faces danger for a noble purpose.</p>" },
        { title: "Book IV: Generosity and Magnificence", text: "<p>Generosity is the virtue concerned with giving and taking of wealth. The generous person gives to the right people, the right amounts, at the right time. They do so with pleasure and without pain.</p><p>Magnificence is generosity on a grand scale. The magnificent person spends large sums tastefully on public works, festivals, and gifts that benefit the community.</p><p>Aristotle also discusses pride, good temper, friendliness, truthfulness, and wit as virtues of social life. Each represents a balanced response to common human situations.</p>" },
        { title: "Book V: Justice", text: "<p>Justice is the most important of the virtues because it concerns our relations with others. The just person is lawful and fair. Justice can be general or particular.</p><p>Particular justice involves distribution of goods and rectification of wrongs. Distributive justice gives to each according to merit. Corrective justice restores equality when someone has been wronged.</p><p>Equity is a correction of law where law falls short because of its generality. The equitable person chooses what is truly just even when the law does not require it.</p>" },
        { title: "Book VI: Intellectual Virtue", text: "<p>Aristotle distinguishes between moral virtue and intellectual virtue. The intellectual virtues include scientific knowledge, art, practical wisdom, intuitive reason, and philosophic wisdom.</p><p>Practical wisdom is the most important for ethics. It is the ability to deliberate well about what is good and beneficial for oneself and for living well in general.</p><p>The practically wise person sees what is right in particular situations. This cannot be learned from rules alone but requires experience and good judgment developed over time.</p>" },
        { title: "Book VII: Weakness of Will", text: "<p>Aristotle addresses the puzzle of weakness of will. How can someone know what is right and still do what is wrong? This seems to contradict the idea that knowledge leads to virtue.</p><p>He argues that the weak-willed person has knowledge in a general sense but fails to apply it in the moment. Passion overwhelms their reasoning temporarily.</p><p>Aristotle also discusses pleasure and pain. Not all pleasures are bad. The virtuous person takes pleasure in noble actions. Bodily pleasures become harmful only when pursued to excess.</p>" },
        { title: "Book VIII: Friendship", text: "<p>Friendship is a virtue or involves virtue, and is one of the most necessary things in life. No one would choose to live without friends even if they had all other goods.</p><p>There are three kinds of friendship: friendships of utility, friendships of pleasure, and friendships of virtue. Only the last is perfect and lasting because it is based on mutual admiration of character.</p><p>True friends wish good things for each other for the other's sake. Such friendships are rare because virtuous people are rare. But they are the most stable and rewarding of all human bonds.</p>" },
        { title: "Book IX: Friendship and Self-Love", text: "<p>Aristotle asks whether we should love ourselves or others more. The answer depends on what kind of self-love we mean. The selfish person grasps for money, honor, and pleasure.</p><p>But the truly self-loving person assigns the greatest goods to themselves in the sense that they act nobly and sacrifice for friends. This is the highest form of self-love.</p><p>Friends are necessary for happiness because humans are social beings. The happy person needs friends to exercise virtue toward and to share in the contemplation of the good.</p>" },
        { title: "Book X: Happiness and Contemplation", text: "<p>Aristotle returns to the question of happiness. The highest happiness is found in contemplation because it is the most continuous, pleasant, and self-sufficient activity.</p><p>The life of contemplation is the most divine element in us. But we are not purely intellectual beings. We also need friends, moderate wealth, and political stability to live well.</p><p>The study of ethics leads naturally to politics. The purpose of the state is to promote the good life for its citizens. Education in virtue is the most important task of the lawgiver.</p>" }
      ]
    },
    politics: {
      title: "Politics",
      cover: "Assets/Politics cover.jpeg",
      chapters: [
        { title: "Cover", text: "", type: "cover" },
        { title: "Book I: The Household and the City", text: "<p>Every state is a community of some kind, and every community is established with a view to some good. The state is the highest community and aims at the highest good.</p><p>The household is the basic unit of the state. It includes the relationships of master and slave, husband and wife, parent and child. Aristotle examines each of these relationships.</p><p>Man is by nature a political animal. Anyone who lives outside the city is either a beast or a god. Speech distinguishes humans from other animals and makes political life possible.</p>" },
        { title: "Book II: Critique of Ideal States", text: "<p>Aristotle examines existing constitutions and proposed ideal states. He critiques Plato's Republic for abolishing private property and the family among the guardian class.</p><p>Common ownership leads to neglect because people care most for what is their own. Unity pushed too far destroys the diversity that makes a city function.</p><p>He also examines the constitutions of Sparta, Crete, and Carthage, noting their strengths and weaknesses as practical models of governance.</p>" },
        { title: "Book III: Citizens and Constitutions", text: "<p>A citizen is one who has the right to participate in deliberative or judicial office. The good citizen and the good man are not always the same, except in the ideal state.</p><p>Constitutions are classified by who rules and whether they rule for the common good. Kingship, aristocracy, and polity are correct forms. Tyranny, oligarchy, and democracy are their deviations.</p><p>The best constitution depends on circumstances. A mixed constitution that combines elements of oligarchy and democracy is often the most stable and just.</p>" },
        { title: "Book IV: Types of Democracy and Oligarchy", text: "<p>There are many varieties of democracy and oligarchy. Democracy ranges from moderate forms where property owners vote to extreme forms where the assembly overrides the law.</p><p>Oligarchy ranges from broad-based rule by the wealthy to narrow rule by a few powerful families. Each type has different strengths and vulnerabilities.</p><p>The best practical constitution is a polity that mixes democratic and oligarchic elements. When citizens cannot tell whether a constitution is democratic or oligarchic, it is well mixed.</p>" },
        { title: "Book V: Revolution and Stability", text: "<p>Revolutions occur when one group feels they are not getting their fair share of political power. Democrats revolt when they feel the wealthy have too much. Oligarchs revolt when they feel the masses have too much.</p><p>The causes of revolution include inequality, desire for honor, fear, contempt, and disproportionate growth of one part of the state.</p><p>Stability requires moderation, respect for law, education, and a strong middle class. The statesman must understand what preserves and what destroys each type of constitution.</p>" },
        { title: "Book VI: Organizing Democracy and Oligarchy", text: "<p>Aristotle gives practical advice on how to organize democratic and oligarchic states. The key principle is that each constitution should be organized to preserve itself.</p><p>In democracies, the poor should not be allowed to confiscate the property of the rich. In oligarchies, the wealthy should treat the poor with consideration.</p><p>Good administration requires competent officials, fair courts, and public accountability. The best states combine popular participation with expert leadership.</p>" },
        { title: "Book VII: The Ideal State", text: "<p>The happy life is the life of virtue lived with sufficient external goods. The best state must provide the conditions for such a life for all its citizens.</p><p>The ideal state should be neither too large nor too small. Its territory should be self-sufficient but not so large that citizens cannot know each other.</p><p>Education is the most important function of the state. Citizens should be educated in music, gymnastics, reading, writing, and drawing for the development of character.</p>" },
        { title: "Book VIII: Education of Youth", text: "<p>Since the whole city has one end, education must be one and the same for all citizens. It should be public rather than private, and directed by the state.</p><p>Children should first be trained in gymnastics to develop their bodies, then in music to develop their souls. Music has the power to shape character and emotions.</p><p>The goal of education is not merely useful knowledge but the development of the capacity for noble leisure. The truly educated person knows how to use free time well.</p>" },
        { title: "Book III (continued): Sovereignty and Law", text: "<p>Should sovereignty rest with the many, the wealthy, the virtuous, or one supreme individual? Aristotle argues that the collective wisdom of the many often exceeds that of any single expert.</p><p>Law should be sovereign rather than any individual. Laws are made without passion and represent the accumulated wisdom of the community.</p><p>But law cannot cover every situation. When law falls short, the judgment of virtuous leaders is needed. The best state combines the rule of law with the wisdom of good rulers.</p>" },
        { title: "Book V (continued): Preserving Constitutions", text: "<p>The most important safeguard against revolution is education. Citizens must be educated in the spirit of their constitution so they support it willingly.</p><p>Moderation in all things preserves states. Extreme democracy leads to tyranny. Extreme oligarchy leads to revolution. The middle way is safest.</p><p>A statesman must be vigilant against small changes that accumulate over time. Great revolutions often begin with small departures from established customs and laws.</p>" }
      ]
    }
  };

  var currentBook = null;
  var currentPage = 0;

  function openBook(bookKey) {
    currentBook = books[bookKey];
    if (!currentBook) return;
    currentPage = 0;
    document.getElementById("readerOverlay").classList.add("active");
    document.body.style.overflow = "hidden";
    renderPage();
  }

  function closeBook() {
    document.getElementById("readerOverlay").classList.remove("active");
    document.body.style.overflow = "";
    currentBook = null;
  }

  function renderPage() {
    if (!currentBook) return;
    var ch = currentBook.chapters[currentPage];
    var coverImg = document.getElementById("readerCoverImg");
    var chapterEl = document.getElementById("readerChapter");
    var titleEl = document.getElementById("chapterTitle");
    var textEl = document.getElementById("chapterText");
    var indicator = document.getElementById("readerIndicator");
    var readerTitle = document.getElementById("readerTitle");
    var prevBtn = document.getElementById("readerPrev");
    var nextBtn = document.getElementById("readerNext");

    if (ch.type === "cover") {
      coverImg.style.display = "block";
      coverImg.src = currentBook.cover;
      chapterEl.classList.remove("visible");
      readerTitle.textContent = currentBook.title;
    } else {
      coverImg.style.display = "none";
      chapterEl.classList.add("visible");
      titleEl.textContent = ch.title;
      textEl.innerHTML = ch.text;
      readerTitle.textContent = ch.title;
      chapterEl.scrollTop = 0;
    }
    indicator.textContent = (currentPage + 1) + " / " + currentBook.chapters.length;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === currentBook.chapters.length - 1;
  }

  // Wire up read buttons
  document.querySelectorAll(".book-read-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      openBook(btn.dataset.book);
    });
  });

  // Reader controls
  document.getElementById("readerBackBtn").addEventListener("click", closeBook);
  document.getElementById("readerPrev").addEventListener("click", function() {
    if (currentBook && currentPage > 0) { currentPage--; renderPage(); }
  });
  document.getElementById("readerNext").addEventListener("click", function() {
    if (currentBook && currentPage < currentBook.chapters.length - 1) { currentPage++; renderPage(); }
  });

  // Keyboard
  document.addEventListener("keydown", function(e) {
    if (!document.getElementById("readerOverlay").classList.contains("active")) return;
    if (e.key === "ArrowRight") { if (currentBook && currentPage < currentBook.chapters.length - 1) { currentPage++; renderPage(); } }
    else if (e.key === "ArrowLeft") { if (currentBook && currentPage > 0) { currentPage--; renderPage(); } }
    else if (e.key === "Escape") { closeBook(); }
  });

  // Scroll navigation
  var scrollCD = false;
  document.getElementById("readerOverlay").addEventListener("wheel", function(e) {
    if (!currentBook || scrollCD) return;
    var chapterEl = document.getElementById("readerChapter");
    if (currentPage === 0 || !chapterEl.classList.contains("visible")) {
      e.preventDefault();
      scrollCD = true;
      if (e.deltaY > 0 && currentPage < currentBook.chapters.length - 1) { currentPage++; renderPage(); }
      else if (e.deltaY < 0 && currentPage > 0) { currentPage--; renderPage(); }
      setTimeout(function(){ scrollCD = false; }, 200);
      return;
    }
    var atTop = chapterEl.scrollTop <= 0;
    var atBottom = chapterEl.scrollTop + chapterEl.clientHeight >= chapterEl.scrollHeight - 5;
    if (atBottom && e.deltaY > 0) { e.preventDefault(); scrollCD = true; if (currentPage < currentBook.chapters.length - 1) { currentPage++; renderPage(); } setTimeout(function(){ scrollCD = false; }, 200); }
    else if (atTop && e.deltaY < 0) { e.preventDefault(); scrollCD = true; if (currentPage > 0) { currentPage--; renderPage(); } setTimeout(function(){ scrollCD = false; }, 200); }
  }, { passive: false });

  // ===================== 3D MODEL =====================
  var container = document.getElementById("modelContainer");
  var w = container.clientWidth, h = container.clientHeight;

  var scene = new THREE.Scene();
  // No scene.background — canvas is transparent so CSS background image shows through

  var camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 100);
  camera.position.set(0, 1, 3);

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  controls.enableZoom = false;
  controls.minDistance = 1;
  controls.maxDistance = 8;
  controls.target.set(0, 0.8, 0);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  var dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(2, 4, 3);
  scene.add(dirLight);
  var fillLight = new THREE.DirectionalLight(0xffeedd, 0.5);
  fillLight.position.set(-2, 2, -1);
  scene.add(fillLight);
  scene.add(new THREE.HemisphereLight(0xffeeb1, 0x080820, 0.3));

  // Load Aristotle GLB model
  var loader = new THREE.GLTFLoader();
  loader.load("Assets/Aristotle 3d.glb", function(gltf) {
    var model = gltf.scene;
    var box = new THREE.Box3().setFromObject(model);
    var center = box.getCenter(new THREE.Vector3());
    var size = box.getSize(new THREE.Vector3());
    var maxDim = Math.max(size.x, size.y, size.z);
    var scale = 2 / maxDim;
    model.scale.setScalar(scale);
    model.position.sub(center.multiplyScalar(scale));
    model.position.y += 0.5;
    scene.add(model);
    controls.target.set(0, model.position.y + (size.y * scale) / 2, 0);
  }, undefined, function(err) {
    console.warn("Failed to load Aristotle 3D model:", err);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener("resize", function() {
    var w2 = container.clientWidth, h2 = container.clientHeight;
    camera.aspect = w2 / h2;
    camera.updateProjectionMatrix();
    renderer.setSize(w2, h2);
  });

})();
