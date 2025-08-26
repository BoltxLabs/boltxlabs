import { useEffect, useState } from 'react';
import { X, Bell, MessageCircle, Users, FileText } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
  icon?: 'bell' | 'message' | 'users' | 'blog';
}

interface DynamicIslandProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onClearAll: () => void;
}

export const DynamicIsland = ({ notifications, onDismiss, onClearAll }: DynamicIslandProps) => {
  const [expanded, setExpanded] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notifications.length > 0 && !expanded) {
      setCurrentNotification(notifications[0]);
      // Auto-expand when new notification arrives
      setExpanded(true);
      // Auto-collapse after 5 seconds
      const timer = setTimeout(() => {
        setExpanded(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications, expanded]);

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'message': return <MessageCircle className="w-4 h-4" />;
      case 'users': return <Users className="w-4 h-4" />;
      case 'blog': return <FileText className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500/20 border-green-500/30 text-green-100';
      case 'warning': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-100';
      case 'error': return 'bg-red-500/20 border-red-500/30 text-red-100';
      default: return 'bg-blue-500/20 border-blue-500/30 text-blue-100';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`
          relative transition-all duration-500 ease-in-out
          bg-black/80 backdrop-blur-xl border border-white/10
          rounded-full shadow-2xl
          ${expanded 
            ? 'w-80 h-auto p-4 rounded-2xl' 
            : 'w-48 h-12 px-4 py-2 cursor-pointer hover:scale-105'
          }
        `}
        onClick={() => !expanded && setExpanded(true)}
      >
        {/* Glassmorphism glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl opacity-50" />
        
        {!expanded && currentNotification ? (
          // Compact view
          <div className="relative flex items-center justify-between h-full">
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded-full ${getTypeColor(currentNotification.type)}`}>
                {getIcon(currentNotification.icon)}
              </div>
              <span className="text-white text-sm font-medium truncate">
                {currentNotification.title}
              </span>
            </div>
            <div className="text-white/60 text-xs">
              {notifications.length > 1 && `+${notifications.length - 1}`}
            </div>
          </div>
        ) : (
          // Expanded view
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">Notifications</h3>
              <div className="flex gap-2">
                {notifications.length > 1 && (
                  <button
                    onClick={onClearAll}
                    className="text-white/60 hover:text-white text-xs px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setExpanded(false)}
                  className="text-white/60 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    p-3 rounded-xl border backdrop-blur-sm
                    ${getTypeColor(notification.type)}
                    hover:bg-white/5 transition-colors
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1">
                      {getIcon(notification.icon)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-xs opacity-80 mt-1">{notification.message}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onDismiss(notification.id)}
                      className="text-white/60 hover:text-white p-1 ml-2"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {notifications.length > 5 && (
              <div className="text-center mt-2">
                <span className="text-white/60 text-xs">
                  +{notifications.length - 5} more notifications
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};