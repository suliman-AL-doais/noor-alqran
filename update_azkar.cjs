const fs = require('fs');
let code = fs.readFileSync('src/screens/Azkar.tsx', 'utf8');

if (!code.includes('useLocation')) {
  code = code.replace(
    "import { useState, useMemo } from 'react';",
    "import { useState, useMemo, useEffect } from 'react';\nimport { useLocation, useNavigate } from 'react-router-dom';"
  );
}

code = code.replace(
  "export default function Azkar() {\n  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);",
  "export default function Azkar() {\n  const location = useLocation();\n  const navigate = useNavigate();\n  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);\n\n  useEffect(() => {\n    const params = new URLSearchParams(location.search);\n    const category = params.get('category');\n    if (category) {\n      setSelectedCategoryId(category);\n    }\n  }, [location.search]);\n\n  // When closing the category, we should also clear the URL param so it doesn't reopen if they navigate back\n  const handleCloseCategory = () => {\n    setSelectedCategoryId(null);\n    navigate('/azkar', { replace: true });\n  };\n"
);

// Now update the close button
code = code.replace(
  "onClick={() => setSelectedCategoryId(null)}",
  "onClick={handleCloseCategory}"
);

fs.writeFileSync('src/screens/Azkar.tsx', code);
