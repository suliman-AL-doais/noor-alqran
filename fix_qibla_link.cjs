const fs = require('fs');
let code = fs.readFileSync('src/screens/Prayer.tsx', 'utf8');

if (!code.includes('import { Link }')) {
  code = code.replace(
    "import { useStore } from '../store/useStore';",
    "import { useStore } from '../store/useStore';\nimport { Link } from 'react-router-dom';"
  );
}

code = code.replace(
  '<div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#ca8a04]/90 to-[#a16207]/90 dark:from-[#115e3b] dark:to-[#064e3b] p-6 text-white shadow-lg border border-white/20">',
  '<Link to="/qibla" className="block relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#ca8a04]/90 to-[#a16207]/90 dark:from-[#115e3b] dark:to-[#064e3b] p-6 text-white shadow-lg border border-white/20 transition-transform active:scale-95">'
);
code = code.replace(
  '        </div>\n      </div>\n\n    </div>',
  '        </Link>\n      </div>\n\n    </div>'
);

fs.writeFileSync('src/screens/Prayer.tsx', code);
