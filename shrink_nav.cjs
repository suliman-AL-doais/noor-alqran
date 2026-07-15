const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

code = code.replace(
  "w-[75px] h-[75px]",
  "w-[60px] md:w-[75px] h-[75px]"
);

code = code.replace(
  "w-[60px] h-[60px]",
  "w-[50px] md:w-[60px] h-[50px] md:h-[60px]"
);

fs.writeFileSync('src/components/Layout.tsx', code);
