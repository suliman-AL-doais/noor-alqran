import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useAzkarNotifications() {
  const { notificationsEnabled, morningAzkarTime, eveningAzkarTime } = useStore();

  useEffect(() => {
    if (!notificationsEnabled || !('Notification' in window)) return;

    if (Notification.permission !== 'granted') return;

    let lastMorningNotificationDate = localStorage.getItem('lastMorningNotificationDate');
    let lastEveningNotificationDate = localStorage.getItem('lastEveningNotificationDate');

    const checkTime = () => {
      const now = new Date();
      const currentDate = now.toDateString();
      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${currentHours}:${currentMinutes}`;

      if (currentTime === morningAzkarTime && lastMorningNotificationDate !== currentDate) {
        new Notification('أذكار الصباح', {
          body: 'حان الآن وقت قراءة أذكار الصباح',
          icon: '/icon.png'
        });
        localStorage.setItem('lastMorningNotificationDate', currentDate);
        lastMorningNotificationDate = currentDate;
      }

      if (currentTime === eveningAzkarTime && lastEveningNotificationDate !== currentDate) {
        new Notification('أذكار المساء', {
          body: 'حان الآن وقت قراءة أذكار المساء',
          icon: '/icon.png'
        });
        localStorage.setItem('lastEveningNotificationDate', currentDate);
        lastEveningNotificationDate = currentDate;
      }
    };

    // Check immediately and then every minute
    checkTime();
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, [notificationsEnabled, morningAzkarTime, eveningAzkarTime]);
}
