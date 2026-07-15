const fs = require('fs');
let code = fs.readFileSync('src/screens/Prayer.tsx', 'utf8');

code = code.replace(
  />مواقيت الصلاة</g,
  ">{t('prayer.title')}<"
);
code = code.replace(
  /'جاري تحديد الموقع...'/g,
  "t('prayer.calculating')"
);
code = code.replace(
  /'موقعك الحالي'/g,
  "t('prayer.current_location')"
);
code = code.replace(
  /'مكة المكرمة'/g,
  "t('prayer.default_location')"
);
code = code.replace(
  />الصلاة القادمة</g,
  ">{t('prayer.next_prayer')}<"
);
code = code.replace(
  />يتبقى على الأذان</g,
  ">{t('prayer.time_remaining')}<"
);
code = code.replace(
  />التاريخ الهجري</g,
  ">{t('prayer.hijri_date')}<"
);
code = code.replace(
  />اتجاه القبلة</g,
  ">{t('prayer.qibla')}<"
);
code = code.replace(
  />حدد اتجاه الكعبة المشرفة</g,
  ">{t('prayer.qibla_desc')}<"
);
code = code.replace(
  /{ name: 'الفجر',/g,
  "{ name: t('prayer.fajr'),"
);
code = code.replace(
  /{ name: 'الشروق',/g,
  "{ name: t('prayer.sunrise'),"
);
code = code.replace(
  /{ name: 'الظهر',/g,
  "{ name: t('prayer.dhuhr'),"
);
code = code.replace(
  /{ name: 'العصر',/g,
  "{ name: t('prayer.asr'),"
);
code = code.replace(
  /{ name: 'المغرب',/g,
  "{ name: t('prayer.maghrib'),"
);
code = code.replace(
  /{ name: 'العشاء',/g,
  "{ name: t('prayer.isha'),"
);
code = code.replace(
  /{isNext \? 'الصلاة القادمة' : isPast \? 'انتهت الصلاة' : 'لم يحن وقتها'}/g,
  "{isNext ? t('prayer.status_next') : isPast ? t('prayer.status_past') : t('prayer.status_upcoming')}"
);

fs.writeFileSync('src/screens/Prayer.tsx', code);
