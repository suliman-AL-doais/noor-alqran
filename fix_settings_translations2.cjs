const fs = require('fs');

const ar = JSON.parse(fs.readFileSync('src/i18n/locales/ar.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));

ar.settings.audio = "الصوت والتلاوة";
ar.settings.general = "عام";
ar.settings.haptic = "الاهتزاز (Haptic Feedback)";
ar.settings.haptic_desc = "تفعيل أو تعطيل الاهتزاز عند التفاعل مع التطبيق";

en.settings.audio = "Audio & Recitation";
en.settings.general = "General";
en.settings.haptic = "Haptic Feedback";
en.settings.haptic_desc = "Enable or disable haptic feedback on interactions";

fs.writeFileSync('src/i18n/locales/ar.json', JSON.stringify(ar, null, 2));
fs.writeFileSync('src/i18n/locales/en.json', JSON.stringify(en, null, 2));
