import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touchCheck = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchCheck || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('.interactive-target'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    let animId;
    const followCursor = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22
      }));
      animId = requestAnimationFrame(followCursor);
    };

    animId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animId);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Inner warm sunset dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 -translate-x-1/2 -translate-y-1/2 shadow-warm-glow transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovering ? 0.6 : 1})`
        }}
      />

      {/* Trailing warm sakura / amber aura ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
          isHovering
            ? 'w-12 h-12 bg-orange-500/15 border-orange-400 shadow-warm-glow scale-125'
            : 'w-7 h-7 bg-transparent border-sakura-400/50'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`
        }}
      />
    </div>
  );
}
