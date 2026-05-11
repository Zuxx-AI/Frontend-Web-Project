(function() {
  "use strict";

  document.getElementById("booksBtn").addEventListener("click", function() {
    document.getElementById("booksSection").scrollIntoView({ behavior: "smooth" });
  });

  // ===================== READER SYSTEM =====================
  var books = {
    meditations: {
      title: "Meditations",
      cover: "Assets/Meditationsm cover.jpeg",
      chapters: [
        { title: "Cover", text: "", type: "cover" },
        { title: "Chapter 1: Debts and Lessons", text: "<p>Marcus Aurelius opens the Meditations by listing the people who shaped his character and the lessons he learned from each. From his grandfather Verus, he learned good morals and the government of his temper. From his mother, he learned piety, generosity, and simplicity of living.</p><p>From his tutor Diognetus, he learned to avoid trivial pursuits and to be skeptical of wonder-workers and magicians. From Rusticus, he learned that his character needed improvement and discipline, and to avoid rhetorical display in writing.</p><p>This opening book is a profound exercise in gratitude. The most powerful man in the world begins his private journal not with boasts but with thanks. He recognizes that everything good in him came from others — teachers, family, friends, and even the gods.</p>" },
        { title: "Chapter 2: The Morning Meditation", text: "<p>Marcus writes one of his most famous passages: when you wake in the morning, tell yourself that the people you will deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot tell good from evil.</p><p>But you have seen the beauty of good and the ugliness of evil. You know that the wrongdoer is your brother — not in blood, but in sharing the same rational nature. No one can hurt you unless you let them. No one can implicate you in ugliness unless you consent.</p><p>This is not cynicism but preparation. By anticipating the worst in others, Marcus frees himself from surprise and anger. He can meet rudeness with patience and hostility with understanding, because he has already accepted that this is how people sometimes behave.</p>" },
        { title: "Chapter 3: The Impermanence of All Things", text: "<p>Marcus returns again and again to the theme of impermanence. The great emperors before him — Augustus, Hadrian, Trajan — are all dust. Their courts, their armies, their triumphs are forgotten. The same fate awaits Marcus and everything he knows.</p><p>This is not a cause for despair but for perspective. If everything is temporary, then our troubles are temporary too. The insult that stings today will be forgotten tomorrow. The crisis that seems overwhelming will pass like all crises before it.</p><p>Marcus uses this awareness of impermanence to focus on what matters: virtue, duty, and the present moment. If this day is all we have, then we must use it well. There is no time for pettiness, grudges, or self-pity.</p>" },
        { title: "Chapter 4: The Inner Citadel", text: "<p>Marcus develops the concept of the inner citadel — a fortress within the mind that cannot be breached by external events. No matter what happens in the world, you can retreat to this inner sanctuary and find peace.</p><p>People seek retreats in the countryside, at the seashore, or in the mountains. But the most accessible retreat is within your own mind. Nowhere can you find a quieter or more untroubled retreat than in your own soul.</p><p>This inner retreat is always available. You do not need to travel or wait for vacation. At any moment, you can withdraw into yourself, examine your principles, and restore your tranquility. The wise person carries their peace with them wherever they go.</p>" },
        { title: "Chapter 5: On Duty and Service", text: "<p>Marcus reminds himself constantly of his duty. As emperor, he bears responsibility for millions of people. He cannot afford to be lazy, distracted, or self-indulgent. Every hour wasted is an hour stolen from those who depend on him.</p><p>At dawn, when he is tempted to stay in bed, he tells himself: I was born to do the work of a human being. What have I to complain of, if I am going to do what I was born for — the things which I was brought into the world to do?</p><p>Duty is not a burden but an expression of our nature. The bee does not complain about making honey. The vine does not complain about bearing grapes. A human being should not complain about doing human work — serving others, exercising reason, and contributing to the common good.</p>" },
        { title: "Chapter 6: On Other People", text: "<p>Marcus struggles with the behavior of others throughout the Meditations. He is surrounded by flatterers, schemers, and incompetents. Yet he consistently reminds himself to respond with patience and understanding.</p><p>When someone wrongs you, consider what conception of good and evil led them to do it. When you understand their perspective, you will feel pity rather than anger. They are harming themselves more than they are harming you.</p><p>We were born to work together, like feet, like hands, like eyelids, like the rows of upper and lower teeth. To act against one another is contrary to nature. To feel anger at someone, to turn your back on them — these are acts against nature.</p>" },
        { title: "Chapter 7: The Discipline of Perception", text: "<p>Marcus practices the Stoic discipline of stripping things down to their bare reality. Purple robes are just sheep's wool dyed with shellfish blood. Sexual intercourse is just friction and a spasm. Fame is just noise made by people who will soon be dead.</p><p>This exercise is not meant to make life joyless but to free us from false values. When we see things as they truly are, we stop being enslaved by appearances. We can enjoy a fine meal without being controlled by gluttony.</p><p>The discipline of perception is the foundation of Stoic freedom. If we can control how we see things, we can control how we respond to them. And if we can control our responses, nothing in the external world can disturb our peace.</p>" },
        { title: "Chapter 8: On Nature and the Cosmos", text: "<p>Marcus sees himself as a small part of a vast, rational cosmos. Everything that happens is part of nature's plan. The universe is either a chaos of atoms or a providential order — and Marcus chooses to believe in providence.</p><p>If the universe is governed by reason, then everything that happens to us serves a purpose. Our task is not to resist nature but to cooperate with it. The branch that bends with the wind survives; the branch that resists breaks.</p><p>This cosmic perspective helps Marcus endure the burdens of empire. His personal troubles are insignificant compared to the vastness of time and space. In a thousand years, nothing he worries about today will matter. But how he responds to his challenges — with virtue or vice — matters eternally.</p>" },
        { title: "Chapter 9: On Death and Legacy", text: "<p>Marcus meditates on death more than any other topic. He is not morbid — he is realistic. Death is natural, inevitable, and nothing to fear. It is simply the dissolution of the elements that compose us.</p><p>Alexander the Great and his mule driver were both reduced to the same thing after death. The longest life and the shortest life lose the same thing — the present moment, which is all anyone truly possesses.</p><p>Marcus does not seek immortality through fame. He knows that even the memory of the greatest emperors fades. What matters is not being remembered but living well. A single day of virtue is worth more than an eternity of fame.</p>" },
        { title: "Chapter 10: The Final Reflections", text: "<p>In his final meditations, Marcus returns to his core themes with renewed urgency. Time is short. Every moment spent in anger, worry, or distraction is a moment lost forever. Focus on what matters: virtue, duty, and the present.</p><p>Do not waste what remains of your life in speculating about your neighbors. Do not be distracted by what others think, say, or do. Concentrate on making your own actions just, your own thoughts pure, and your own character worthy.</p><p>The Meditations end as they began — with a man alone with his thoughts, trying to be better. Marcus Aurelius, the most powerful person in the world, spent his private hours not in self-congratulation but in self-examination. His journal remains one of the most honest and moving documents in the history of philosophy.</p>" }
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
  loader.load("Assets/Marcus Aurelius.glb",function(g){var m=g.scene;var b=new THREE.Box3().setFromObject(m);var c=b.getCenter(new THREE.Vector3());var s=b.getSize(new THREE.Vector3());var mx=Math.max(s.x,s.y,s.z);var sc=2/mx;m.scale.setScalar(sc);m.position.sub(c.multiplyScalar(sc));m.position.y+=0.5;scene.add(m);controls.target.set(0,m.position.y+(s.y*sc)/2,0);},undefined,function(e){console.warn("Failed to load model:",e);});
  function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);}animate();
  window.addEventListener("resize",function(){var w2=container.clientWidth,h2=container.clientHeight;camera.aspect=w2/h2;camera.updateProjectionMatrix();renderer.setSize(w2,h2);});
})();
