const fs = require('fs');
let code = fs.readFileSync('src/screens/Prayer.tsx', 'utf8');

// The geolocation and reverse geocoding is inside this useEffect, so we shouldn't run it on every language change,
// or actually, maybe we should, so that the location name translates if supported.
// Let's just update the dependencies.
code = code.replace(
  'calculateTimes(21.4225, 39.8262);\n    }\n  }, []);',
  'calculateTimes(21.4225, 39.8262);\n    }\n  }, [i18n.language, i18n.resolvedLanguage, t]);'
);

fs.writeFileSync('src/screens/Prayer.tsx', code);
