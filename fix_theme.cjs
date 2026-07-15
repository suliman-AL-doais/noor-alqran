const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.ts', 'utf8');

code = code.replace(
  "theme: 'light' | 'dark' | 'system';",
  "theme: 'light' | 'dark' | 'system' | 'auto';"
);

code = code.replace(
  "setTheme: (theme: 'light' | 'dark' | 'system') => void;",
  "setTheme: (theme: 'light' | 'dark' | 'system' | 'auto') => void;"
);

fs.writeFileSync('src/store/useStore.ts', code);
