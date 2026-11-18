import confetti from 'canvas-confetti';

// Trigger pink princess heart & sparkle fireworks
export function triggerPinkFireworks() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 70,
    zIndex: 1000,
    colors: ['#FF69A6', '#FFB6D5', '#E84383', '#F5DFA5', '#E6D5FF', '#FFFFFF'],
  };

  const interval: ReturnType<typeof setInterval> = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left explosion
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random() * 0.3 + 0.1, y: Math.random() * 0.4 + 0.3 },
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Right explosion
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random() * 0.3 + 0.6, y: Math.random() * 0.4 + 0.3 },
      shapes: ['circle'],
      scalar: 1.2,
    });
  }, 300);
}

// Trigger romantic explosion when "Unlimited Love" button is clicked
export function triggerHeartExplosion(clientX?: number, clientY?: number) {
  const x = clientX ? clientX / window.innerWidth : 0.5;
  const y = clientY ? clientY / window.innerHeight : 0.5;

  confetti({
    particleCount: 50,
    spread: 80,
    origin: { x, y },
    colors: ['#FF69A6', '#E84383', '#FFB6D5', '#F5DFA5', '#FFFFFF'],
    shapes: ['circle'],
    scalar: 1.3,
  });

  // Second delayed burst
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 60,
      spread: 60,
      origin: { x, y },
      colors: ['#FF69A6', '#E84383', '#E6D5FF'],
      scalar: 1.5,
    });
    confetti({
      particleCount: 35,
      angle: 120,
      spread: 60,
      origin: { x, y },
      colors: ['#FF69A6', '#FFB6D5', '#F5DFA5'],
      scalar: 1.5,
    });
  }, 120);
}
