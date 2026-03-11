"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseColor: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // settings
    const connectionDistance = 150;
    const mouseConnectionDistance = 200;
    
    const mouse = {
      x: -1000,
      y: -1000,
    };
    
    // Premium color palette (Tailwind colors roughly: Emerald-400, Blue-500, Purple-500, White)
    const colors = ["#34d399", "#3b82f6", "#a855f7", "#ffffff", "#60a5fa"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const density = Math.floor((canvas.width * canvas.height) / 10000); // dynamic count based on screen area
      const count = Math.min(Math.max(density, 40), 120); // limits

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2 + 1,
          baseColor: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    resize();

    // animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // update position
        p.x += p.vx;
        p.y += p.vy;
        
        // bounce off edges smoothly
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // keep strictly inside
        if (p.x < 0) p.x = 0;
        if (p.x > canvas.width) p.x = canvas.width;
        if (p.y < 0) p.y = 0;
        if (p.y > canvas.height) p.y = canvas.height;

        // Interaction with mouse
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < mouseConnectionDistance) {
          // repulsion or attraction (we use a subtle repulsion with connection lines)
          const force = (mouseConnectionDistance - distMouse) / mouseConnectionDistance;
          p.x -= dxMouse * force * 0.03; // slight repel
          p.y -= dyMouse * force * 0.03; // slight repel
          
          // draw line to mouse
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${force * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor;
        ctx.fill();

        // check connections with other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // gradient line between particles
            const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, p.baseColor.replace(')', `, ${opacity * 0.4})`).replace('rgb', 'rgba')); 
            // the above won't work on hex... let's just use global alpha or basic stroke style.
            
            ctx.strokeStyle = `rgba(150, 150, 255, ${opacity * 0.25})`; 
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
