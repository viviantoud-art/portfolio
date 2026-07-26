/* ---------- Theme toggle ---------- */
const toggle = document.getElementById("theme-toggle");
const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>';
const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>';

function setIcon() {
  if (!toggle) return;
  toggle.innerHTML = document.body.classList.contains("dark-mode") ? sunIcon : moonIcon;
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
setIcon();

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    setIcon();
  });
}

/* ---------- Terminal typing effect (home page) ---------- */
function typeLines(container) {
  if (!container) return;
  const lines = Array.from(container.querySelectorAll("[data-type]"));
  let i = 0;
  function next() {
    if (i >= lines.length) return;
    const el = lines[i];
    const full = el.getAttribute("data-type");
    el.textContent = "";
    el.style.visibility = "visible";
    let c = 0;
    const speed = 22;
    const timer = setInterval(() => {
      el.textContent = full.slice(0, c + 1);
      c++;
      if (c >= full.length) {
        clearInterval(timer);
        i++;
        setTimeout(next, 220);
      }
    }, speed);
  }
  next();
}
document.addEventListener("DOMContentLoaded", () => {
  typeLines(document.querySelector(".terminal .body"));
});

/* ---------- Skill bars fill on view ---------- */
const fills = document.querySelectorAll(".fill");
if (fills.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.level + "%";
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach((f) => io.observe(f));
}

/* ---------- Network graph canvas (hero decoration) ---------- */
const netCanvas = document.getElementById("netgraph");
if (netCanvas) {
  const ctx = netCanvas.getContext("2d");
  let W, H;
  function resize() {
    W = netCanvas.clientWidth;
    H = netCanvas.clientHeight;
    netCanvas.width = W * devicePixelRatio;
    netCanvas.height = H * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  const styles = getComputedStyle(document.body);
  const nodeCount = 34;
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
  }));

  function color(varName) {
    return getComputedStyle(document.body).getPropertyValue(varName).trim();
  }

  function draw() {
    if (!W) resize();
    ctx.clearRect(0, 0, W, H);
    const accent = color("--accent");
    const line = color("--line");
    nodes.forEach((n) => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const dx = nodes[a].x - nodes[b].x;
        const dy = nodes[a].y - nodes[b].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 95) {
          ctx.strokeStyle = line;
          ctx.globalAlpha = 1 - d / 95;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    nodes.forEach((n) => {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ---------- EmailJS contact form ---------- */
if (window.emailjs) {
  emailjs.init("Ky0M7ofshpbCixndo");
}
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const original = btn.textContent;
      btn.textContent = "Envoi...";
      emailjs.sendForm("service_pqkl9t5", "template_acng4qh", this).then(
        function () {
          btn.textContent = "Message envoyé";
          form.reset();
          setTimeout(() => (btn.textContent = original), 2500);
        },
        function (error) {
          console.log("Erreur :", error);
          btn.textContent = "Erreur, réessaie";
          setTimeout(() => (btn.textContent = original), 2500);
        }
      );
    });
  }
});
