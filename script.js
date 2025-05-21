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
    const instruction = document.getElementById("coco-instruction");
    const coco = document.getElementById("coco");
  
    cocoContainer.style.display = "flex"; // ✅ Ensure visible
    cocoContainer.style.left = "-150px";  // reset left in case reused
  
    // Animate to near the tree
    setTimeout(() => {
      cocoContainer.style.left = "calc(55% - 40px)"; // or adjust for better stop point
    }, 50);
  
    // After arriving, show instruction
    setTimeout(() => {
      instruction.style.opacity = 1;
      instruction.style.visibility = "visible";
    }, 2050);
  
    // Click triggers Coco to run off screen and switch to next scene
    coco.onclick = () => {
      instruction.style.display = "none";
      cocoContainer.style.left = "120%";
  
      setTimeout(() => {
        document.getElementById("tree-scene").style.display = "none";
        document.getElementById("feed-scene").style.display = "block";
      }, 2000);
    };
  }
  

  
  function runCocoAway() {
    const coco = document.getElementById("coco");
    coco.style.left = "110%";
    document.getElementById("click-coco-text").style.display = "none";
  
    setTimeout(showFeedScene, 2000);
  }
  
  // Show feed scene and animate Coco's entrance
  function showFeedScene() {
    const feedScene = document.getElementById("feed-scene");
    const coco2Container = document.getElementById("coco2-container");
  
    // First, make sure the feed scene is visible
    feedScene.style.display = "block";
  
    // Force a reflow to ensure transition kicks in
    coco2Container.style.display = "flex";
    coco2Container.style.left = "-150px"; // reset offscreen
    coco2Container.offsetHeight; // ← force reflow
  
    // Now animate in
    setTimeout(() => {
      coco2Container.style.left = "650px"; // slide to stop position
    }, 50); // slight delay to let reflow apply
  }
  
  
  
  

  
  function feedCoco() {
    const food = document.getElementById("food-pack");
    const bowl = document.getElementById("food-bowl");
    const feedText = document.getElementById("feed-text");
  
    food.style.display = "none";
    bowl.classList.add("filled");
    feedText.style.display = "none";
  
    const coco = document.getElementById("coco2");
    coco.style.left = "50%";
  
    let nomIndex = 0;
    function spawnNom() {
      const nom = document.createElement("div");
      nom.className = "nom";
      nom.textContent = "nom";
      nom.style.left = "50%";
      nom.style.top = "40%";
      document.getElementById("feed-scene").appendChild(nom);
  
      setTimeout(() => nom.remove(), 1000);
      nomIndex++;
  
      if (nomIndex < 3) {
        setTimeout(spawnNom, 700);
      } else {
        finishFeeding();
      }
    }
  
    setTimeout(spawnNom, 800);
  }
  
  function finishFeeding() {
    const bowl = document.getElementById("food-bowl");
    bowl.classList.remove("filled");
  
    document.getElementById("thank-you").style.display = "block";
    document.getElementById("rope-area").style.display = "block";
  
    document.getElementById("rope").addEventListener("click", () => {
      alert("🎉 Pull transition! Next screen can load here.");
    });
  }
  
  
  
  
