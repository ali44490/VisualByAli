// Scroll animation
const scrollElements = document.querySelectorAll('.animate-on-scroll');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};
const displayScrollElement = (el) => { el.classList.add('animate'); }
const hideScrollElement = (el) => { el.classList.remove('animate'); }
const handleScrollAnimation = () => {
    scrollElements.forEach(el => { elementInView(el, 1.25) ? displayScrollElement(el) : hideScrollElement(el); });
};
window.addEventListener('scroll', handleScrollAnimation);

// Hero Canvas Particle Background
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
class Particle {
    constructor(x, y, r, speedX, speedY) { this.x = x; this.y = y; this.r = r; this.speedX = speedX; this.speedY = speedY; }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,217,217,0.2)'; ctx.fill(); }
    update() { this.x += this.speedX; this.y += this.speedY; if (this.x > canvas.width || this.x < 0) this.speedX *= -1; if (this.y > canvas.height || this.y < 0) this.speedY *= -1; this.draw(); }
}
function initParticles() { particlesArray = []; for (let i = 0; i < 100; i++) { let r = Math.random() * 3 + 1; let x = Math.random() * canvas.width; let y = Math.random() * canvas.height; let speedX = (Math.random() - 0.5) * 0.5; let speedY = (Math.random() - 0.5) * 0.5; particlesArray.push(new Particle(x, y, r, speedX, speedY)); } }
function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => p.update()); requestAnimationFrame(animateParticles); }
initParticles(); animateParticles(); window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); });
