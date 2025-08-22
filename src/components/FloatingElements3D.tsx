import React from 'react';

const FloatingElements3D: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="floating-3d absolute top-20 left-10 w-16 h-16 bg-gradient-primary rounded-xl opacity-60" 
           style={{ animationDelay: '0s' }} />
      
      <div className="floating-3d absolute top-40 right-20 w-12 h-12 bg-gradient-accent rounded-full opacity-40" 
           style={{ animationDelay: '2s' }} />
      
      <div className="floating-3d absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-primary rounded-lg opacity-50" 
           style={{ animationDelay: '4s' }} />
      
      <div className="floating-3d absolute top-60 right-1/3 w-14 h-14 bg-gradient-accent rounded-xl opacity-45" 
           style={{ animationDelay: '6s' }} />
      
      {/* Rotating 3D cubes */}
      <div className="cube-3d absolute top-1/4 left-1/2 w-8 h-8 bg-primary/30 border border-primary/50" 
           style={{ animationDelay: '1s' }} />
      
      <div className="cube-3d absolute bottom-1/4 right-1/4 w-10 h-10 bg-accent/20 border border-accent/40" 
           style={{ animationDelay: '3s' }} />
      
      {/* Glowing orbs with pulse */}
      <div className="animate-pulse-glow absolute top-1/3 left-20 w-6 h-6 bg-primary rounded-full blur-sm" 
           style={{ animationDelay: '1.5s' }} />
      
      <div className="animate-pulse-glow absolute bottom-1/3 right-16 w-8 h-8 bg-accent rounded-full blur-sm" 
           style={{ animationDelay: '3.5s' }} />
      
      {/* Morphing shapes */}
      <div className="animate-morph absolute top-1/2 right-1/2 w-12 h-12 bg-gradient-primary opacity-30" 
           style={{ animationDelay: '2.5s' }} />
      
      {/* Additional floating elements for depth */}
      <div className="animate-float absolute top-16 right-32 w-4 h-4 bg-primary/40 rounded-full" 
           style={{ animationDelay: '5s' }} />
      
      <div className="animate-float absolute bottom-20 left-1/3 w-6 h-6 bg-accent/30 rounded-lg" 
           style={{ animationDelay: '7s' }} />
    </div>
  );
};

export default FloatingElements3D;