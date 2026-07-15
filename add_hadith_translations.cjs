const fs = require('fs');

const ar = JSON.parse(fs.readFileSync('src/i18n/locales/ar.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));

ar.features.hadith = { title: "الحديث الشريف", desc: "قراءة الأحاديث النبوية" };
en.features.hadith = { title: "Hadith", desc: "Prophetic traditions" };

fs.writeFileSync('src/i18n/locales/ar.json', JSON.stringify(ar, null, 2));
fs.writeFileSync('src/i18n/locales/en.json', JSON.stringify(en, null, 2));
