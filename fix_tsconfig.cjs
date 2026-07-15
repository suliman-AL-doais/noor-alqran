const fs = require('fs');
let config = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
if (!config.include) config.include = ["src"];
fs.writeFileSync('tsconfig.json', JSON.stringify(config, null, 2));
