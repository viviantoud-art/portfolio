const toggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
// PARTICULES IA
const canvas = document.getElementById("particles");
if(canvas){
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update(){
            this.x += this.speedX;
            this.y += this.speedY;
        }

        draw(){
            ctx.fillStyle = "#8b5cf6";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init(){
        for(let i = 0; i < 100; i++){
            particlesArray.push(new Particle());
        }
    }

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();
}
// Initialisation EmailJS
emailjs.init("Ky0M7ofshpbCixndo");

// Gestion du formulaire
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("Contact Us");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_pqkl9t5", "template_acng4qh", this)
        .then(function () {
          alert("Message envoyé ✅");
          form.reset();
        }, function (error) {
          console.log("Erreur :", error);
          alert("Erreur ❌ Vérifie la console");
        });
    });
  }
});