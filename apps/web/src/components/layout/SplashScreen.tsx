import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const LETTERS = ['P','r','o','P','l','u','m','b',' ','U','S','A'];

function getRandomStart() {
  // Start from the right side, randomized
  return {
    x: 800 + Math.random() * 400, // offscreen to the right
    y: (Math.random() - 0.5) * 800, // up or down randomly
    scale: Math.random() * 0.5 + 0.5,
  };
}

const BUBBLE_COUNT = 25;

function FloatingBubble({ delay, size, x, y }: { delay: number; size: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle at 30% 30%, rgba(20,184,166,0.6), rgba(13,148,136,0.2))`,
        border: '1px solid rgba(20,184,166,0.3)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.7, 0.4, 0.8, 0],
        scale: [0, 1, 0.8, 1.2, 0],
        y: [0, -60, -120, -200, -300],
        x: [0, (Math.random() - 0.5) * 100],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const bubbles = Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    size: Math.random() * 40 + 10,
    x: Math.random() * 100,
    y: 100 + Math.random() * 20, // Start lower so they float up
  }));

  useEffect(() => {
    // Sequence: 
    // 0s - 2.5s: Letters fly in from right, bouncing
    // 2.5s: Letters settle
    // 3.0s: Bubble pop effect on letters
    // 3.8s: Start exit transition
    
    if (containerRef.current) {
      const letters = containerRef.current.querySelectorAll('.letter-bubble');
      
      gsap.to(letters, {
        keyframes: [
          { scale: 1.2, opacity: 0.8, duration: 0.1 },
          { scale: 0, opacity: 0, duration: 0.3, stagger: 0.05, ease: "back.in(2)" }
        ],
        delay: 2.8,
      });
      
      const texts = containerRef.current.querySelectorAll('.letter-text');
      gsap.to(texts, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        stagger: 0.05,
        delay: 2.8,
        ease: "back.out(1.5)"
      });
    }

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 700);
    }, 4200);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0C1222 0%, #0F766E 50%, #0C1222 100%)' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Floating background bubbles */}
          {bubbles.map((b) => (
            <FloatingBubble key={b.id} delay={b.delay} size={b.size} x={b.x} y={b.y} />
          ))}

          {/* Radial glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.2) 0%, transparent 70%)' }}
            />
          </motion.div>

          <div ref={containerRef} className="absolute flex flex-col items-center gap-8">
            {/* Letter bubble jump from right side */}
            <div className="flex items-center justify-center gap-1 md:gap-2">
              {LETTERS.map((letter, i) => {
                const start = getRandomStart();
                const isSpace = letter === ' ';
                if (isSpace) return <div key={i} className="w-4 md:w-8" />;
                
                return (
                  <div key={i} className="relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center">
                    {/* The bubble that carries the letter */}
                    <motion.div
                      className="letter-bubble absolute inset-0 rounded-full flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(20,184,166,0.8), rgba(13,148,136,0.4))',
                        border: '2px solid rgba(255,255,255,0.4)',
                        boxShadow: '0 10px 25px rgba(20,184,166,0.5), inset 0 5px 10px rgba(255,255,255,0.4)'
                      }}
                      initial={{ x: start.x, y: start.y, scale: start.scale, opacity: 0 }}
                      animate={{ 
                        x: 0, 
                        y: 0, 
                        scale: 1, 
                        opacity: 1 
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 40 + Math.random() * 30, // Unstructured bouncy spring
                        damping: 5 + Math.random() * 5,
                        mass: 0.8 + Math.random() * 0.5,
                        delay: Math.random() * 0.5, // Random start delays
                      }}
                    >
                      <span className="font-heading font-bold text-2xl md:text-4xl text-white opacity-80">{letter}</span>
                    </motion.div>
                    
                    {/* The final structured text that appears when bubble pops */}
                    <span 
                      className={`letter-text absolute font-heading font-extrabold text-5xl md:text-7xl tracking-tight select-none opacity-0 scale-50 blur-sm ${
                        i < 8 // "ProPlumb"
                        ? 'bg-gradient-to-r from-white to-primary-light bg-clip-text text-transparent'
                        : 'text-accent' // "USA"
                      }`}
                    >
                      {letter}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Tagline fade in */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.6 }}
              className="text-primary-light/80 font-medium text-sm md:text-base tracking-[0.3em] uppercase"
            >
              Professional Plumbing Services
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
