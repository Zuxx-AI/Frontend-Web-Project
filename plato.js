(function() {
  "use strict";

  document.getElementById("booksBtn").addEventListener("click", function() {
    document.getElementById("booksSection").scrollIntoView({ behavior: "smooth" });
  });

  // ===================== READER SYSTEM =====================
  var books = {
    republic: {
      title: "The Republic",
      cover: "Assets/the republic cover.jpeg",
      chapters: [
        { title: "Cover", text: "", type: "cover" },
        { title: "Book I: Justice Defined", text: "<p>Socrates engages in a debate about the nature of justice. Thrasymachus argues that justice is merely the advantage of the stronger. Socrates challenges this view through careful questioning.</p><p>The discussion reveals that justice cannot simply be about power. It must involve some notion of the good. Socrates suggests that the just person is happier than the unjust.</p><p>This opening sets the stage for the entire work. The question of what justice truly is will drive every argument that follows.</p>" },
        { title: "Book II: The Ring of Gyges", text: "<p>Glaucon presents the myth of the Ring of Gyges — a ring that makes its wearer invisible. He argues that anyone with such power would act unjustly.</p><p>This challenges Socrates to prove that justice is good in itself, not just for its consequences. Adeimantus adds that people only praise justice for the rewards it brings.</p><p>Socrates proposes building an ideal city in speech to understand justice on a larger scale before examining it in the individual soul.</p>" },
        { title: "Book III: Education of Guardians", text: "<p>Socrates outlines the education system for the guardian class. Music and gymnastics form the foundation. Stories must be carefully selected to shape virtuous character.</p><p>Tales of gods behaving badly must be censored. The guardians must learn courage, temperance, and devotion to the city. Their education shapes their souls.</p><p>Physical training develops the body while musical education develops the spirit. The balance between the two creates harmonious individuals fit to protect the city.</p>" },
        { title: "Book IV: The Tripartite Soul", text: "<p>Socrates identifies three parts of the soul: reason, spirit, and appetite. Justice in the individual mirrors justice in the city. Each part must perform its proper function.</p><p>Reason should rule, spirit should enforce, and appetite should obey. When this harmony exists, the person is just. Injustice is the rebellion of one part against the others.</p><p>The four cardinal virtues — wisdom, courage, temperance, and justice — each correspond to the proper functioning of the soul and the city.</p>" },
        { title: "Book V: The Philosopher-King", text: "<p>Socrates makes his most radical claim: philosophers must become kings, or kings must become philosophers. Only those who love wisdom can rule justly.</p><p>Philosophers are distinguished by their love of truth and their ability to grasp the Forms — the eternal, unchanging realities behind appearances.</p><p>This proposal seems absurd to many, but Socrates argues that only those who understand the Good can create a truly just society.</p>" },
        { title: "Book VI: The Allegory of the Sun", text: "<p>Socrates compares the Form of the Good to the sun. Just as the sun illuminates the visible world, the Good illuminates the intelligible world of Forms.</p><p>The Good is the source of truth and knowledge. Without it, the mind cannot grasp reality. It is the highest object of philosophical inquiry.</p><p>Socrates introduces the Divided Line, distinguishing four levels of knowledge: imagination, belief, thought, and understanding. Each represents a deeper grasp of reality.</p>" },
        { title: "Book VII: The Allegory of the Cave", text: "<p>Prisoners chained in a cave see only shadows on the wall and mistake them for reality. One prisoner is freed and gradually sees the true world outside.</p><p>The journey from darkness to light represents the philosopher's ascent from ignorance to knowledge. The sun outside the cave represents the Form of the Good.</p><p>The freed prisoner must return to the cave to help others. This is the duty of the philosopher-king — to lead others toward truth despite their resistance.</p>" },
        { title: "Book VIII: Decline of States", text: "<p>Socrates describes how the ideal state degenerates through four stages: timocracy, oligarchy, democracy, and tyranny. Each represents a further departure from justice.</p><p>Timocracy values honor over wisdom. Oligarchy values wealth. Democracy values freedom without restraint. Tyranny is the final corruption where one person enslaves all.</p><p>Each political decline corresponds to a decline in the individual soul. The tyrannical person is the most miserable because their appetites rule without limit.</p>" },
        { title: "Book IX: The Allegory of the Beast", text: "<p>Socrates compares the soul to a creature with three parts: a many-headed beast (appetite), a lion (spirit), and a human (reason). Justice means the human controls the others.</p><p>The tyrant is ruled by the beast within. Their life is filled with fear, paranoia, and insatiable desire. They are the least free of all people.</p><p>Socrates proves that the just person is happier than the unjust through three arguments: the argument from the soul's structure, from pleasure, and from truth.</p>" },
        { title: "Book X: The Myth of Er", text: "<p>Socrates concludes with the Myth of Er — a soldier who dies in battle and returns to life with a vision of the afterlife. Souls choose their next lives based on their wisdom.</p><p>Those who lived justly choose well. Those who lived unjustly choose poorly, repeating their mistakes. Philosophy is the key to making wise choices.</p><p>The Republic ends with a call to practice justice and philosophy. The rewards of the just life extend beyond death into eternity.</p>" }
      ]
    },
    symposium: {
      title: "Symposium",
      cover: "Assets/symposium cover.jpeg",
      chapters: [
        { title: "Cover", text: "", type: "cover" },
        { title: "The Setting: A Banquet of Ideas", text: "<p>A group of Athenian intellectuals gather at the home of Agathon to celebrate his victory in a dramatic competition. They decide to take turns giving speeches in praise of Love.</p><p>The setting is intimate and convivial. Wine flows freely, but the guests agree to drink moderately so they can focus on their speeches.</p><p>This framing device allows Plato to present multiple perspectives on love, building toward Socrates' revolutionary understanding.</p>" },
        { title: "Phaedrus: Love as the Oldest God", text: "<p>Phaedrus speaks first, arguing that Love is the oldest of the gods and the greatest benefactor of humanity. Love inspires courage and self-sacrifice.</p><p>A lover would rather die than be seen as a coward by their beloved. Love creates a bond stronger than any army. The Sacred Band of Thebes proves this.</p><p>Phaedrus establishes the theme that love transforms people, making them better than they would be alone.</p>" },
        { title: "Pausanias: Two Types of Love", text: "<p>Pausanias distinguishes between Common Love and Heavenly Love. Common Love is physical and indiscriminate. Heavenly Love is intellectual and directed toward the soul.</p><p>He argues that love between minds is superior to love between bodies. The lover should seek to improve the beloved through education and virtue.</p><p>This speech introduces the idea that love has different qualities depending on its object and intention.</p>" },
        { title: "Eryximachus: Love as Cosmic Harmony", text: "<p>The physician Eryximachus extends love beyond human relationships to all of nature. Love is the principle of harmony that governs medicine, music, and the cosmos.</p><p>Health is the love between opposing elements in the body. Music is the love between different notes. The seasons reflect love's balance in nature.</p><p>This cosmic view of love prepares the ground for Socrates' later argument that love connects the mortal to the divine.</p>" },
        { title: "Aristophanes: The Myth of the Split Souls", text: "<p>Aristophanes tells a comic myth: humans were originally round creatures with four arms, four legs, and two faces. Zeus split them in half as punishment for their pride.</p><p>Since then, each person searches for their other half. When they find them, they feel an overwhelming sense of belonging and completeness.</p><p>This myth captures the feeling of romantic love as a longing for wholeness. It remains one of the most famous accounts of love in Western literature.</p>" },
        { title: "Agathon: Love as Beautiful and Good", text: "<p>Agathon praises Love as the youngest, most beautiful, and most virtuous of the gods. Love is delicate, graceful, and the source of all creativity.</p><p>His speech is eloquent and poetic but lacks philosophical depth. Socrates will gently expose its weaknesses through questioning.</p><p>Agathon's speech represents the popular view of love as something purely positive and beautiful, which Socrates will complicate.</p>" },
        { title: "Socrates and Diotima: The Ladder of Love", text: "<p>Socrates recounts the teachings of Diotima, a wise woman who taught him about love. Love is not a god but a spirit — a mediator between mortal and divine.</p><p>Love is born of Poverty and Resourcefulness. It is always seeking what it lacks. This is why lovers desire beauty and goodness — they do not yet possess them fully.</p><p>Diotima describes the Ladder of Love: from loving one beautiful body, to all beautiful bodies, to beautiful souls, to beautiful ideas, and finally to the Form of Beauty itself.</p>" },
        { title: "The Ascent to Beauty Itself", text: "<p>The highest stage of love is the contemplation of Beauty itself — eternal, unchanging, and absolute. This is not the beauty of any particular person or thing.</p><p>The philosopher who reaches this level gives birth to true virtue and wisdom. They achieve a kind of immortality through their connection to the eternal.</p><p>This vision of love as a philosophical journey toward truth is Plato's most profound contribution to the understanding of human desire.</p>" },
        { title: "Alcibiades: Love in Practice", text: "<p>The drunken Alcibiades crashes the party and delivers a speech praising not Love but Socrates himself. He describes Socrates as ugly on the outside but filled with divine beauty within.</p><p>Alcibiades confesses his frustrated love for Socrates. Despite his beauty and status, he could not seduce the philosopher. Socrates valued wisdom over physical pleasure.</p><p>This speech grounds the abstract discussion in real human experience. Love is not just a theory — it is lived, felt, and often painful.</p>" },
        { title: "The Nature of True Love", text: "<p>The Symposium ends with Socrates still awake at dawn, arguing that the same person should be able to write both comedy and tragedy. Love encompasses all of life's contradictions.</p><p>Plato's message is that love at its highest is the desire for wisdom and goodness. It begins with physical attraction but can ascend to the contemplation of eternal truth.</p><p>The dialogue remains one of the most influential texts on love ever written, shaping how Western civilization understands desire, beauty, and the human heart.</p>" }
      ]
    }
  };

  var currentBook = null, currentPage = 0;

  function openBook(k) { currentBook = books[k]; if (!currentBook) return; currentPage = 0; document.getElementById("readerOverlay").classList.add("active"); document.body.style.overflow = "hidden"; renderPage(); }
  function closeBook() { document.getElementById("readerOverlay").classList.remove("active"); document.body.style.overflow = ""; currentBook = null; }
  function renderPage() {
    if (!currentBook) return;
    var ch = currentBook.chapters[currentPage], ci = document.getElementById("readerCoverImg"), ce = document.getElementById("readerChapter"), ti = document.getElementById("chapterTitle"), te = document.getElementById("chapterText"), ind = document.getElementById("readerIndicator"), rt = document.getElementById("readerTitle"), pb = document.getElementById("readerPrev"), nb = document.getElementById("readerNext");
    if (ch.type === "cover") { ci.style.display="block"; ci.src=currentBook.cover; ce.classList.remove("visible"); rt.textContent=currentBook.title; }
    else { ci.style.display="none"; ce.classList.add("visible"); ti.textContent=ch.title; te.innerHTML=ch.text; rt.textContent=ch.title; ce.scrollTop=0; }
    ind.textContent=(currentPage+1)+" / "+currentBook.chapters.length; pb.disabled=currentPage===0; nb.disabled=currentPage===currentBook.chapters.length-1;
  }

  document.querySelectorAll(".book-read-btn").forEach(function(b){b.addEventListener("click",function(){openBook(b.dataset.book);});});
  document.getElementById("readerBackBtn").addEventListener("click",closeBook);
  document.getElementById("readerPrev").addEventListener("click",function(){if(currentBook&&currentPage>0){currentPage--;renderPage();}});
  document.getElementById("readerNext").addEventListener("click",function(){if(currentBook&&currentPage<currentBook.chapters.length-1){currentPage++;renderPage();}});
  document.addEventListener("keydown",function(e){if(!document.getElementById("readerOverlay").classList.contains("active"))return;if(e.key==="ArrowRight"){if(currentBook&&currentPage<currentBook.chapters.length-1){currentPage++;renderPage();}}else if(e.key==="ArrowLeft"){if(currentBook&&currentPage>0){currentPage--;renderPage();}}else if(e.key==="Escape"){closeBook();}});
  var scrollCD=false;document.getElementById("readerOverlay").addEventListener("wheel",function(e){if(!currentBook||scrollCD)return;var ce=document.getElementById("readerChapter");if(currentPage===0||!ce.classList.contains("visible")){e.preventDefault();scrollCD=true;if(e.deltaY>0&&currentPage<currentBook.chapters.length-1){currentPage++;renderPage();}else if(e.deltaY<0&&currentPage>0){currentPage--;renderPage();}setTimeout(function(){scrollCD=false;},200);return;}var aT=ce.scrollTop<=0,aB=ce.scrollTop+ce.clientHeight>=ce.scrollHeight-5;if(aB&&e.deltaY>0){e.preventDefault();scrollCD=true;if(currentPage<currentBook.chapters.length-1){currentPage++;renderPage();}setTimeout(function(){scrollCD=false;},200);}else if(aT&&e.deltaY<0){e.preventDefault();scrollCD=true;if(currentPage>0){currentPage--;renderPage();}setTimeout(function(){scrollCD=false;},200);}},{passive:false});

  // ===================== 3D MODEL =====================
  var container = document.getElementById("modelContainer");
  var w = container.clientWidth, h = container.clientHeight;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, w/h, 0.01, 100);
  camera.position.set(0, 1, 3);
  var renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping=true; controls.dampingFactor=0.05; controls.autoRotate=true; controls.autoRotateSpeed=2; controls.enableZoom=false; controls.target.set(0,0.8,0);
  scene.add(new THREE.AmbientLight(0xffffff,0.6));
  var dl=new THREE.DirectionalLight(0xffffff,1.5); dl.position.set(2,4,3); scene.add(dl);
  var fl=new THREE.DirectionalLight(0xffeedd,0.5); fl.position.set(-2,2,-1); scene.add(fl);
  scene.add(new THREE.HemisphereLight(0xffeeb1,0x080820,0.3));
  var loader=new THREE.GLTFLoader();
  loader.load("Assets/plato.glb",function(g){var m=g.scene;var b=new THREE.Box3().setFromObject(m);var c=b.getCenter(new THREE.Vector3());var s=b.getSize(new THREE.Vector3());var mx=Math.max(s.x,s.y,s.z);var sc=2/mx;m.scale.setScalar(sc);m.position.sub(c.multiplyScalar(sc));m.position.y+=0.5;scene.add(m);controls.target.set(0,m.position.y+(s.y*sc)/2,0);},undefined,function(e){console.warn("Failed to load model:",e);});
  function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);}animate();
  window.addEventListener("resize",function(){var w2=container.clientWidth,h2=container.clientHeight;camera.aspect=w2/h2;camera.updateProjectionMatrix();renderer.setSize(w2,h2);});
})();
