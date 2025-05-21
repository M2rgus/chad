const PASSWORD = "123";
let noClicks = 0;

const messages = [
  "Do you like cheese?",
  "Are you sure?",
  "Are you really sure?",
  "You might regret this...",
  "Come on now...",
  "No more 'No' for you!"
];

function checkPassword() {
  const input = document.getElementById("password");
  const error = document.getElementById("error-message");

  if (input.value === PASSWORD) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("question-screen").style.display = "flex";
    error.style.display = "none";
    input.classList.remove("shake");
    input.style.border = "";
  } else {
    error.style.display = "block";
    input.classList.add("shake");
    input.style.border = "2px solid red";
    setTimeout(() => input.classList.remove("shake"), 400);
  }
}

function expandYes() {
  noClicks++;
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const title = document.querySelector("#question-screen h1");

  // Scale Yes up more each time
  const yesScale = 1 + noClicks * 0.3;
  yesBtn.style.transform = `scale(${yesScale})`;

  // Shrink No each time
  const noScale = Math.max(1 - noClicks * 0.2, 0);
  noBtn.style.transform = `scale(${noScale})`;

  // Update title
  if (noClicks < messages.length) {
    title.textContent = messages[noClicks];
  }

  // Hide No if too many clicks
  if (noScale <= 0.1 || noClicks >= messages.length - 1) {
    noBtn.style.display = "none";
  }
}

function showMainContent() {
  document.getElementById("light-scene").style.display = "none";
  document.getElementById("tree-scene").style.display = "block";

  const heart = document.getElementById("fallen-heart");
  setTimeout(() => {
    heart.style.display = "none";
  }, 1300);

  startElapsedTime();
  spawnLeaves();

  setTimeout(() => {
    document.getElementById("time-wrapper").classList.add("visible");
  }, 2000);

  // 🐰 Clean way to show Coco
  setTimeout(() => {
    showCocoScene(); // ✅ Let dedicated function handle it
  }, 3000);
}







// Live counter since May 21, 2024
function startElapsedTime() {
  const start = new Date("2024-05-21T00:00:00");
  const container = document.getElementById("elapsed-time");

  function update() {
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();
    let seconds = now.getSeconds() - start.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      // Use previous month to get correct days
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    container.innerText = `${years}y ${months}mo ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}


// Staggered heart-leaf growth
function spawnLeaves() {
  const container = document.getElementById("leaf-container");
  const colors = ['#ff5e78', '#ff9a76', '#ffc54d', '#ff66a6', '#e75480', '#fbb'];

  const totalLeaves = 400;
  const outlineCount = Math.floor(totalLeaves * 0.05); // 5%
  const fillCount = totalLeaves - outlineCount; // 95%

  // --- Outline Leaves (evenly spaced around heart shape) ---
  for (let i = 0; i < outlineCount; i++) {
    const t = (i / outlineCount) * Math.PI * 2;
    const xHeart = 16 * Math.pow(Math.sin(t), 3);
    const yHeart = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    const x = 50 + xHeart * 3.2;
    const y = 50 - yHeart * 3.2;

    const leaf = document.createElement("div");
    leaf.classList.add("leaf");
    leaf.textContent = "❤";
    leaf.style.color = colors[Math.floor(Math.random() * colors.length)];
    leaf.style.left = `${x}%`;
    leaf.style.top = `${y}%`;
    leaf.style.animationDelay = `${3 + Math.random() * 2}s`;
    container.appendChild(leaf);
  }

  // --- Inner Leaves (randomly fill heart interior) ---
  for (let i = 0; i < fillCount; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = Math.random(); // shrink radius toward center

    const xHeart = 16 * Math.pow(Math.sin(t), 3) * r;
    const yHeart = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;

    const x = 50 + xHeart * 3.2;
    const y = 50 - yHeart * 3.2;

    const leaf = document.createElement("div");
    leaf.classList.add("leaf");
    leaf.textContent = "❤";
    leaf.style.color = colors[Math.floor(Math.random() * colors.length)];
    leaf.style.left = `${x}%`;
    leaf.style.top = `${y}%`;
    leaf.style.animationDelay = `${3 + Math.random() * 2}s`;
    container.appendChild(leaf);
  }
}



const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".month-section").forEach((section) => {
  section.classList.add("hidden");
  observer.observe(section);
});

function startLightScene() {
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("light-scene").style.display = "flex";

  const string = document.getElementById("string");
  string.addEventListener("click", turnOnLight, { once: true });
}


function turnOnLight() {
  const lightScene = document.getElementById("light-scene");
  const bulb = document.querySelector(".bulb");
  const title = document.getElementById("light-title");
  const instruction = document.getElementById("light-instruction");
  const arrow = document.querySelector(".arrow");
  const heartContainer = document.getElementById("heart-container");

  // Turn on bulb
  bulb.classList.add("on");
  lightScene.style.background = "#fff5f8";

  // Hide text and arrow
  title.style.display = "none";
  instruction.style.display = "none";
  arrow.style.display = "none";

  // Show heart
  setTimeout(() => {
    heartContainer.style.display = "flex";
  }, 1000);
}

function showCocoScene() {
  const cocoContainer = document.getElementById("coco-container");
  const instruction   = document.getElementById("coco-instruction");

  // 1) Reveal & slide in the container
  cocoContainer.style.display = "flex";
  cocoContainer.style.left    = "-150px";
  void cocoContainer.offsetHeight; // force reflow
  setTimeout(() => {
    cocoContainer.style.left = "calc(55% - 40px)";
  }, 50);

  // 2) Once it’s in place, fade in the “Click Coco” text
  setTimeout(() => {
    instruction.style.opacity    = 1;
    instruction.style.visibility = "visible";

    // 3) Bind a one-time click on the whole container
    cocoContainer.addEventListener("click", () => {
      // hide instruction and run Coco off to the right
      instruction.style.display = "none";
      cocoContainer.style.left  = "120%";

      // after the 2s slide, swap to your feed scene
      setTimeout(() => {
        document.getElementById("tree-scene").style.display = "none";
        showFeedScene();
      }, 1000);
    }, { once: true });
  }, 2050);
}


function showFeedScene() {
  const scene   = document.getElementById("feed-scene");
  const wrapper = document.getElementById("coco2-container");
  const pack    = document.getElementById("food-pack");
  const feedTxt = document.getElementById("feed-text");

  scene.style.display   = "block";
  feedTxt.style.display = "block";

  // reset Coco off-screen (assumes CSS has .entered → translateX(0))
  wrapper.classList.remove("entered");
  void wrapper.offsetWidth;

  // position “Feed Coco” above the pack
  positionAbove(pack, feedTxt, 8 /* px gap */);

  // bind feeding action
  pack.addEventListener("click", () => {
    feedCoco();
    feedTxt.style.display = "none";    // hide the prompt too
  }, { once: true });

  // slide Coco in after a tick
  setTimeout(() => wrapper.classList.add("entered"), 50);
}

function feedCoco() {
  const pack    = document.getElementById("food-pack");
  const bowl    = document.getElementById("food-bowl");
  const coco2   = document.getElementById("coco2");
  const scene   = document.getElementById("feed-scene");
  const wrapper = document.getElementById("coco2-container");
  const thankEl = document.getElementById("thank-you");

  // 1) Hide pack & fill bowl
  pack.style.display = "none";
  bowl.src = "media/filled-bowl.png";

  // 2) Spawn noms one at a time
  let nomIndex   = 0;
  const totalNoms = 3;
  const lifespan  = 1200; // ms each appears
  const gapX      = 20;   // px spacing

  function spawnNom() {
    // position above Coco2
    const r  = coco2.getBoundingClientRect();
    const sr = scene.getBoundingClientRect();
    const baseX = r.left - sr.left + r.width/2;
    const baseY = r.top  - sr.top  - 20;
    const offsetX = (nomIndex - (totalNoms-1)/2)*gapX;

    // create & show
    const nom = document.createElement("div");
    nom.className   = "nom";
    nom.textContent = "nom".repeat(nomIndex+1);
    nom.style.fontWeight = 'bold';
    nom.style.position  = "absolute";
    nom.style.left      = `${baseX+offsetX}px`;
    nom.style.top       = `${baseY}px`;
    nom.style.transform = "translateX(-50%)";
    scene.appendChild(nom);

    // after lifespan, remove & either next or finish
    setTimeout(() => {
      nom.remove();
      nomIndex++;
      if (nomIndex < totalNoms) {
        spawnNom();
      } else {
        // 3) All noms done → show “Thank you!”
        positionAbove(coco2, thankEl, 8);
        thankEl.style.display = "block";

        // 4) After a brief pause, hide it & run Coco2 off-screen
        setTimeout(() => {
          thankEl.style.display = "none";
          wrapper.classList.add("run-off");
        }, 1000);

        // 5) When the slide ends, swap scenes
        wrapper.addEventListener("transitionend", () => {
          scene.style.display   = "none";
          document.getElementById("content").style.display = "block";
        }, { once: true });
      }
    }, lifespan);
  }

  // kick off
  setTimeout(spawnNom, 800);
}


function finishFeeding() {
  const wrapper = document.getElementById("coco2-container");
  const coco2   = document.getElementById("coco2");
  const thank   = document.getElementById("thank-you");
  const feed    = document.getElementById("feed-scene");
  const content = document.getElementById("content");

  // 1) Position & show “Thank you!” above Coco2
  positionAbove(coco2, thank, 8); 
  thank.style.display = "block";

  // 2) After a short pause, hide the label and slide Coco2 off-screen
  setTimeout(() => {
    thank.style.display = "none";
    wrapper.classList.add("run-off");
  }, 800);

  // 3) When the slide transition ends, swap to main content
  wrapper.addEventListener("transitionend", () => {
    feed.style.display    = "none";
    content.style.display = "block";
  }, { once: true });
}





// helper: position `labelEl` just above `targetEl` with `gap` px
function positionAbove(targetEl, labelEl, gap) {
  const tRect = targetEl.getBoundingClientRect();
  const sRect = document.getElementById("feed-scene").getBoundingClientRect();

  const x = tRect.left - sRect.left + tRect.width / 2;
  const y = tRect.top  - sRect.top  - gap - labelEl.offsetHeight;

  labelEl.style.left      = `${x}px`;
  labelEl.style.top       = `${y}px`;
  labelEl.style.transform = "translateX(-50%)";
}


function runCocoAway() {
  const coco = document.getElementById("coco");
  coco.style.left = "110%";
  document.getElementById("click-coco-text").style.display = "none";

  setTimeout(showFeedScene, 2000);
}








