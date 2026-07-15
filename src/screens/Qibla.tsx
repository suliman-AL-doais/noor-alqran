import { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { Coordinates, Qibla as AdhanQibla } from 'adhan';

export default function Qibla() {
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Get Qibla Direction based on location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coordinates = new Coordinates(latitude, longitude);
          const qibla = AdhanQibla(coordinates);
          setQiblaDirection(qibla);
        },
        () => setError('يرجى تفعيل خدمات الموقع لحساب اتجاه القبلة.')
      );
    } else {
      setError('جهازك لا يدعم تحديد الموقع.');
    }

    // 2. Get Device Compass Heading
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // iOS specific webkitCompassHeading
      let compass = (event as any).webkitCompassHeading;
      
      // Android alpha handling
      if (!compass && event.alpha !== null) {
        compass = 360 - event.alpha;
      }
      
      if (compass !== null) {
        setHeading(compass);
      }
    };

    if (window.DeviceOrientationEvent) {
      // Request permission for iOS 13+ devices
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation, true);
            } else {
              setError('تم رفض إذن الوصول إلى البوصلة.');
            }
          })
          .catch((err) => console.warn('Compass permission error:', err));
      } else {
        // Non-iOS 13+ devices
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    } else {
      setError('جهازك لا يدعم البوصلة.');
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Calculate rotation to align the Kaaba image with Qibla
  // The compass heading tells us where the phone is pointing (0 is North)
  // The Qibla direction is the angle from North to the Kaaba
  // So the rotation of the compass dial should be: qiblaDirection - heading
  let compassRotation = 0;
  let isAligned = false;

  if (heading !== null && qiblaDirection !== null) {
    compassRotation = qiblaDirection - heading;
    // Normalize to 0-360
    if (compassRotation < 0) compassRotation += 360;
    
    // Check if aligned (within 5 degrees)
    isAligned = Math.abs(compassRotation) < 5 || Math.abs(compassRotation - 360) < 5;
  }

  return (
    <div className="p-4 md:p-8 max-w-md mx-auto h-[80vh] flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">اتجاه القبلة</h1>
        <p className="text-slate-500">ضع هاتفك على سطح مستوٍ</p>
      </div>

      {error ? (
        <div className="glass p-6 rounded-2xl text-center text-rose-500 max-w-sm">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-bold"
          >
            تحديث
          </button>
        </div>
      ) : heading === null || qiblaDirection === null ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500">جاري معايرة البوصلة...</p>
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          
          {/* Alignment Indicator */}
          <div className={`mb-12 px-6 py-2 rounded-full font-bold transition-colors ${
            isAligned 
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400' 
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
          }`}>
            {isAligned ? 'أنت في الاتجاه الصحيح!' : 'قم بتدوير الهاتف'}
          </div>

          {/* Compass Dial */}
          <div className="relative w-72 h-72 rounded-full border-[12px] border-slate-100 dark:border-slate-800 shadow-2xl flex items-center justify-center">
            
            {/* North Indicator Fixed */}
            <div className="absolute top-2 text-rose-500 font-bold z-10">N</div>
            
            {/* The Rotating Arrow pointing to Qibla */}
            <div 
              className="absolute inset-0 transition-transform duration-300 ease-out flex items-start justify-center pt-8"
              style={{ transform: `rotate(${compassRotation}deg)` }}
            >
              <div className="w-2 h-32 bg-primary-500 rounded-full relative shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <Compass size={20} className="text-slate-800 dark:text-white" />
                </div>
              </div>
            </div>

            {/* Center Dot */}
            <div className="w-6 h-6 bg-slate-800 dark:bg-slate-200 rounded-full z-20 shadow-inner"></div>
          </div>
          
          <div className="mt-12 text-center text-slate-500" dir="ltr">
            <p>Heading: {Math.round(heading)}°</p>
            <p>Qibla: {Math.round(qiblaDirection)}°</p>
          </div>
        </div>
      )}
    </div>
  );
}
