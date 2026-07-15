import { useEffect, useState } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { useStore } from '../store/useStore';

export function useAutoTheme() {
  const theme = useStore((state) => state.theme);
  const [autoThemeState, setAutoThemeState] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    if (theme !== 'auto') {
      setAutoThemeState(null);
      return;
    }

    let intervalId: ReturnType<typeof setInterval>;

    const calculateAutoTheme = (lat: number, lng: number) => {
      const coordinates = new Coordinates(lat, lng);
      const params = CalculationMethod.UmmAlQura();
      
      const updateThemeBasedOnTime = () => {
        const date = new Date();
        const times = new PrayerTimes(coordinates, date, params);
        
        const now = date.getTime();
        const sunrise = times.sunrise.getTime();
        const sunset = times.sunset.getTime();

        // Light mode during the day (after sunrise, before sunset)
        // Dark mode during the night (after sunset, before sunrise)
        if (now >= sunrise && now < sunset) {
          setAutoThemeState('light');
        } else {
          setAutoThemeState('dark');
        }
      };

      updateThemeBasedOnTime();
      // Check every 5 minutes in case we cross the threshold
      intervalId = setInterval(updateThemeBasedOnTime, 5 * 60 * 1000);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          calculateAutoTheme(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.warn('Geolocation denied or failed, falling back to Mecca coordinates for auto theme', error);
          // Fallback to Mecca
          calculateAutoTheme(21.4225, 39.8262);
        }
      );
    } else {
      // Fallback to Mecca
      calculateAutoTheme(21.4225, 39.8262);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [theme]);

  return autoThemeState;
}
