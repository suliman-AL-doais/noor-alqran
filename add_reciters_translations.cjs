const fs = require('fs');
const ar = JSON.parse(fs.readFileSync('src/i18n/locales/ar.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));

ar.reciters = {
  title: "إدارة القراء",
  desc: "اختر القارئ المفضل وحمّل التلاوات للتشغيل بدون إنترنت",
  downloaded: "تم التحميل",
  downloading: "جاري التحميل",
  download: "تحميل التلاوة",
  remove: "حذف من الجهاز",
  listen: "استماع مباشر",
  search: "ابحث عن قارئ...",
  active: "القارئ الحالي"
};

en.reciters = {
  title: "Manage Reciters",
  desc: "Select your favorite reciter and download recitations for offline use",
  downloaded: "Downloaded",
  downloading: "Downloading",
  download: "Download",
  remove: "Remove",
  listen: "Listen",
  search: "Search for reciter...",
  active: "Active Reciter"
};

fs.writeFileSync('src/i18n/locales/ar.json', JSON.stringify(ar, null, 2));
fs.writeFileSync('src/i18n/locales/en.json', JSON.stringify(en, null, 2));
