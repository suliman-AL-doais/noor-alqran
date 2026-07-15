const fs = require('fs');
let code = fs.readFileSync('src/screens/Settings.tsx', 'utf8');

// Replace strings
code = code.replace(
  />الإشعارات والتذكير</g,
  ">{t('settings.notifications.title')}<"
);
code = code.replace(
  />تفعيل الإشعارات</g,
  ">{t('settings.notifications.enable')}<"
);
code = code.replace(
  />تذكير بأذكار الصباح والمساء</g,
  ">{t('settings.notifications.desc')}<"
);
code = code.replace(
  />وقت أذكار الصباح</g,
  ">{t('settings.notifications.morning')}<"
);
code = code.replace(
  />وقت أذكار المساء</g,
  ">{t('settings.notifications.evening')}<"
);
code = code.replace(
  />الوضع الليلي والنهاري</g,
  ">{t('settings.appearance_desc')}<"
);
code = code.replace(
  />إعدادات المصحف</g,
  ">{t('settings.quran.title')}<"
);
code = code.replace(
  />نوع الخط</g,
  ">{t('settings.quran.fontFamily')}<"
);
code = code.replace(
  />حجم الخط</g,
  ">{t('settings.quran.fontSize')}<"
);

fs.writeFileSync('src/screens/Settings.tsx', code);
