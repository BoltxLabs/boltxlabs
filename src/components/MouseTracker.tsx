import React, { useEffect, useRef } from 'react';

const MouseTracker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as percentage
      const xPercent = (clientX / innerWidth) * 100;
      const yPercent = (clientY / innerHeight) * 100;
      
      // Apply subtle parallax effect to floating elements
      const floatingElements = document.querySelectorAll('.mouse-track');
      floatingElements.forEach((element, index) => {
        const speed = 0.02 + (index * 0.01); // Different speeds for depth
        const x = (xPercent - 50) * speed;
        const y = (yPercent - 50) * speed;
        
        (element as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
      
      // Add glow effect that follows mouse
      const glowElements = document.querySelectorAll('.interactive-glow');
      glowElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(clientX - elementCenterX, 2) + Math.pow(clientY - elementCenterY, 2)
        );
        
        const maxDistance = 200;
        const intensity = Math.max(0, 1 - distance / maxDistance);
        
        (element as HTMLElement).style.setProperty(
          '--glow-intensity', 
          intensity.toString()
        );
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={containerRef} className="pointer-events-none" />;
};

export default MouseTracker;