// Enhanced Cosmic Energy Background
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

// Configuration
const config = {
  particleCount: 120,
  baseSpeed: 0.04,
  pulseInterval: 5000,
  connectionDistance: 180,
  colors: ['hsla(180, 100%, 70%, 0.4)', 'hsla(240, 100%, 70%, 0.4)', 'hsla(300, 100%, 70%, 0.4)']
};

// State
let w, h, t = 0, particles = [];
let lastPulse = 0, pulseRadius = 0, pulseAlpha = 0;

function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  particles = [];
  
  // Create particles with different properties
  for (let i = 0; i < config.particleCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.5,
      speed: (Math.random() * 0.02 + 0.01) * config.baseSpeed,
      angle: Math.random() * Math.PI * 2,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      orbitRadius: Math.random() * Math.min(w, h) * 0.3 + 50,
      angleOffset: Math.random() * Math.PI * 2
    });
  }
}

window.addEventListener("resize", init);
init();

function createPulse() {
  pulseRadius = 0;
  pulseAlpha = 0.6;
  lastPulse = t;
}

function draw() {
  // Clear with subtle fade effect
  ctx.fillStyle = 'rgba(5, 5, 15, 0.1)';
  ctx.fillRect(0, 0, w, h);
  
  t += 0.01;
  const centerX = w / 2;
  const centerY = h / 2;
  
  // Draw energy pulse if active
  if (pulseAlpha > 0) {
    pulseRadius += 3;
    pulseAlpha -= 0.008;
    
    const gradient = ctx.createRadialGradient(
      centerX, centerY, pulseRadius * 0.3,
      centerX, centerY, pulseRadius
    );
    gradient.addColorStop(0, `hsla(200, 100%, 70%, ${pulseAlpha})`);
    gradient.addColorStop(1, `hsla(200, 100%, 70%, 0)`);
    
    ctx.fillStyle = gradient;
    ctx.globalAlpha = pulseAlpha * 0.7;
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Create occasional pulses
  if (t - lastPulse > config.pulseInterval / 1000) {
    createPulse();
  }
  
  // Draw particles and connections
  particles.forEach((p, i) => {
    // Update position with smooth orbiting
    p.angle = (p.angle + p.speed) % (Math.PI * 2);
    p.x = centerX + Math.cos(p.angle + p.angleOffset) * p.orbitRadius;
    p.y = centerY + Math.sin(p.angle * 1.5 + p.angleOffset) * (p.orbitRadius * 0.8);
    
    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.6;
    ctx.fill();
    
    // Connect nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < config.connectionDistance) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = 0.2 * (1 - distance/config.connectionDistance);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  });
  
  // Add subtle center glow
  const glowGradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, Math.min(w, h) * 0.4
  );
  glowGradient.addColorStop(0, 'hsla(200, 100%, 70%, 0.1)');
  glowGradient.addColorStop(1, 'hsla(200, 100%, 50%, 0)');
  ctx.fillStyle = glowGradient;
  ctx.globalAlpha = 0.3;
  ctx.fillRect(0, 0, w, h);
  
  requestAnimationFrame(draw);
}

draw();

// Random pulses for dynamic effect
setInterval(() => {
  if (Math.random() > 0.7) createPulse();
}, 8000);s