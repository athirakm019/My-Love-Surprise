import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angleSpeed: number;
  color: string;
  opacity: number;
}

const PETAL_COLORS = [
  '#FF69A6', // Rose pink
  '#FFB6D5', // Soft pink
  '#E84383', // Deep romantic pink
  '#FF80AB', // Bright pink
  '#FFD6E7', // Baby pink
];

export const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalCount = window.innerWidth < 768 ? 20 : 38;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 9 + 8,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 1.5 - 0.75,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        opacity: Math.random() * 0.4 + 0.5,
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      // Realistic rose petal path
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size, p.size * 1.2, -p.size / 3, 0, p.size);
      ctx.bezierCurveTo(-p.size * 1.2, -p.size / 3, -p.size / 2, -p.size, 0, 0);
      ctx.fill();

      // Delicate petal vein highlight
      ctx.strokeStyle = '#FFFFFF';
      ctx.globalAlpha = p.opacity * 0.3;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.4);
      ctx.lineTo(0, p.size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.8 + p.speedX;
        p.angle += p.angleSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.85 }}
    />
  );
};
