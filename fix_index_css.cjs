const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

code = "@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap');\n" + code;

code = code.replace(
  '--font-cairo: "Cairo", sans-serif;',
  '--font-cairo: "Cairo", sans-serif;\n  --font-inter: "Inter", sans-serif;\n  --font-urdu: "Noto Nastaliq Urdu", serif;'
);

fs.writeFileSync('src/index.css', code);
