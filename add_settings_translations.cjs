const fs = require('fs');

const ar = JSON.parse(fs.readFileSync('src/i18n/locales/ar.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));

ar.settings.notifications = {
  title: "الإشعارات والتذكير",
  enable: "تفعيل الإشعارات",
  desc: "تذكير بأذكار الصباح والمساء",
  morning: "وقت أذكار الصباح",
  evening: "وقت أذكار المساء"
};
ar.settings.appearance_desc = "الوضع الليلي والنهاري";
ar.settings.quran = {
  title: "إعدادات المصحف",
  fontFamily: "نوع الخط",
  fontSize: "حجم الخط"
};

en.settings.notifications = {
  title: "Notifications & Reminders",
  enable: "Enable Notifications",
  desc: "Reminders for morning and evening Azkar",
  morning: "Morning Azkar Time",
  evening: "Evening Azkar Time"
};
en.settings.appearance_desc = "Day and Night Mode";
en.settings.quran = {
  title: "Quran Settings",
  fontFamily: "Font Family",
  fontSize: "Font Size"
};

fs.writeFileSync('src/i18n/locales/ar.json', JSON.stringify(ar, null, 2));
fs.writeFileSync('src/i18n/locales/en.json', JSON.stringify(en, null, 2));
