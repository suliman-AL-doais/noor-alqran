const fs = require('fs');

const ar = JSON.parse(fs.readFileSync('src/i18n/locales/ar.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));

ar.home = {
  title: "نُورُ القُرْآنِ",
  greeting: "السلام عليكم",
  welcome: "مرحباً بك في تطبيق قرآن واذكار",
  lastRead: "آخر قراءة",
  surahAlKahf: "سورة الكهف",
  ayah10: "الآية 10 • الجزء 15",
  continueReading: "متابعة القراءة",
  services: "الخدمات"
};

en.home = {
  title: "Noor Al Quran",
  greeting: "Assalamu Alaikum",
  welcome: "Welcome to Quran and Azkar app",
  lastRead: "Last Read",
  surahAlKahf: "Surah Al-Kahf",
  ayah10: "Ayah 10 • Juz 15",
  continueReading: "Continue Reading",
  services: "Services"
};

ar.features = {
  eveningAzkar: { title: "أذكار المساء", desc: "أذكار المساء" },
  morningAzkar: { title: "أذكار الصباح", desc: "أذكار الصباح" },
  quran: { title: "القرآن الكريم", desc: "قراءة واستماع" },
  azkar: { title: "الذكر", desc: "أذكار متنوعة" },
  khatma: { title: "ختمة القرآن", desc: "متابعة الختمة" },
  prayer: { title: "مواقيت الصلاة", desc: "أوقات الصلاة" },
  tasbeeh: { title: "السبحة", desc: "تسبيح وعداد" },
  dua: { title: "دعاء المسلم", desc: "أدعية متنوعة" }
};

en.features = {
  eveningAzkar: { title: "Evening Azkar", desc: "Evening remembrances" },
  morningAzkar: { title: "Morning Azkar", desc: "Morning remembrances" },
  quran: { title: "Holy Quran", desc: "Read and listen" },
  azkar: { title: "Azkar", desc: "Various remembrances" },
  khatma: { title: "Khatma", desc: "Track completion" },
  prayer: { title: "Prayer Times", desc: "Prayer schedule" },
  tasbeeh: { title: "Tasbeeh", desc: "Digital counter" },
  dua: { title: "Muslim Dua", desc: "Various supplications" }
};

fs.writeFileSync('src/i18n/locales/ar.json', JSON.stringify(ar, null, 2));
fs.writeFileSync('src/i18n/locales/en.json', JSON.stringify(en, null, 2));
