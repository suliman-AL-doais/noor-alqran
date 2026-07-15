const fs = require('fs');
let code = fs.readFileSync('src/screens/Home.tsx', 'utf8');

if (!code.includes('gregorianDate')) {
  code = code.replace(
    "const [hijriDate, setHijriDate] = useState('جاري الحساب...');",
    "const [hijriDate, setHijriDate] = useState('جاري الحساب...');\n  const [gregorianDate, setGregorianDate] = useState('');"
  );
  
  code = code.replace(
    "setHijriDate(new Intl.DateTimeFormat('ar-SA-u-ca-islamic', options).format(date));",
    "setHijriDate(new Intl.DateTimeFormat('ar-SA-u-ca-islamic', options).format(date));\n      setGregorianDate(new Intl.DateTimeFormat('ar-SA', options).format(date));"
  );
  
  code = code.replace(
    "<p className=\"text-sm font-bold text-[#ca8a04] dark:text-[#d4af37]\">{hijriDate}</p>\n            <p className=\"text-xs text-primary-700 dark:text-[#a0c4b3]\">{locationName}</p>",
    "<p className=\"text-sm font-bold text-[#ca8a04] dark:text-[#d4af37]\">{hijriDate}</p>\n            {gregorianDate && <p className=\"text-xs text-slate-600 dark:text-[#a0c4b3] mb-0.5\">{gregorianDate}</p>}\n            <p className=\"text-xs text-primary-700 dark:text-[#a0c4b3]/80\">{locationName}</p>"
  );
}

fs.writeFileSync('src/screens/Home.tsx', code);
