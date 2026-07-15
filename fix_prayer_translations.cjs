const fs = require('fs');

const ar = JSON.parse(fs.readFileSync('src/i18n/locales/ar.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));

ar.prayer = {
  title: "مواقيت الصلاة",
  calculating: "جاري تحديد الموقع...",
  current_location: "موقعك الحالي",
  default_location: "مكة المكرمة",
  next_prayer: "الصلاة القادمة",
  time_remaining: "يتبقى على الأذان",
  hijri_date: "التاريخ الهجري",
  qibla: "اتجاه القبلة",
  qibla_desc: "حدد اتجاه الكعبة المشرفة",
  fajr: "الفجر",
  sunrise: "الشروق",
  dhuhr: "الظهر",
  asr: "العصر",
  maghrib: "المغرب",
  isha: "العشاء",
  status_next: "الصلاة القادمة",
  status_past: "انتهت الصلاة",
  status_upcoming: "لم يحن وقتها"
};

en.prayer = {
  title: "Prayer Times",
  calculating: "Locating...",
  current_location: "Current Location",
  default_location: "Mecca",
  next_prayer: "Next Prayer",
  time_remaining: "Time Remaining",
  hijri_date: "Hijri Date",
  qibla: "Qibla Direction",
  qibla_desc: "Find the direction of Kaaba",
  fajr: "Fajr",
  sunrise: "Sunrise",
  dhuhr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha",
  status_next: "Next Prayer",
  status_past: "Passed",
  status_upcoming: "Upcoming"
};

fs.writeFileSync('src/i18n/locales/ar.json', JSON.stringify(ar, null, 2));
fs.writeFileSync('src/i18n/locales/en.json', JSON.stringify(en, null, 2));
