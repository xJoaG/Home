import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles with enhanced colors
    const particleCount = 100; // Increased particle count for a denser network
    const particles: Particle[] = [];
    // Using a palette that contrasts well with dark backgrounds
    const colors = ['#818cf8', '#c084fc', '#f472b6', '#22d3ee', '#34d399', '#fbbf24']; // Brighter, more vibrant colors

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, // Slightly faster movement
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 1.5, // Slightly larger particles
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.4, // Increased base opacity for particles
      });
    }
    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 140) {
          const force = (140 - distance) / 140;
          particle.vx += dx * force * 0.0001;
          particle.vy += dy * force * 0.0001;
        }

        // Enhanced particle glow
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 4
        );
        glowGradient.addColorStop(0, particle.color + '80'); // More opaque center
        glowGradient.addColorStop(0.5, particle.color + '40');
        glowGradient.addColorStop(1, 'transparent');

        // Draw outer glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.globalAlpha = particle.opacity * 0.5; // Increased glow opacity
        ctx.fill();

        // Draw main particle with gradient
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius
        );
        particleGradient.addColorStop(0, particle.color);
        particleGradient.addColorStop(1, particle.color + '80');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections with enhanced gradients
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            const opacity = (120 - distance) / 120 * 0.6; // Increased connection opacity
            const connectionGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              other.x, other.y
            );
            connectionGradient.addColorStop(0, particle.color + '80');
            connectionGradient.addColorStop(1, other.color + '80');
            ctx.strokeStyle = connectionGradient;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1.5; // Slightly thicker lines
            ctx.stroke();
          }
        }

        // Enhanced mouse connections
        const mouseDistance = Math.sqrt(
          (mouseRef.current.x - particle.x) ** 2 + 
          (mouseRef.current.y - particle.y) ** 2
        );
        
        if (mouseDistance < 180) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          const opacity = (180 - mouseDistance) / 180 * 0.8; // Increased mouse connection opacity
          const mouseGradient = ctx.createLinearGradient(
            particle.x, particle.y,
            mouseRef.current.x, mouseRef.current.y
          );
          mouseGradient.addColorStop(0, particle.color);
          mouseGradient.addColorStop(1, '#818cf8'); // Consistent with new palette
          ctx.strokeStyle = mouseGradient;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 2.5; // Thicker mouse connection lines
          ctx.stroke();
        }

        // Reset global alpha for next particle/drawing operations
        ctx.globalAlpha = 1;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]" // Stays behind everything with z-index 1
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleNetwork;