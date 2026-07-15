const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('/tmp/azkar.json', 'utf8'));

// Format: [category, text, description, count, reference, search_key]
// Some counts might be null or empty string.

const categoriesMap = new Map();

raw.rows.forEach(row => {
  let category = row[0] ? row[0].trim() : "غير مصنف";
  let text = row[1] ? row[1].trim() : "";
  let description = row[2] ? row[2].trim() : ""; 
  let count = row[3];
  let reference = row[4] ? row[4].trim() : "";
  
  if (!text) return;
  
  let parsedCount = 1;
  if (typeof count === 'number') {
    parsedCount = count;
  } else if (typeof count === 'string') {
    let parsed = parseInt(count.trim(), 10);
    if (!isNaN(parsed)) parsedCount = Math.max(1, parsed);
  }
  
  if (!categoriesMap.has(category)) {
    categoriesMap.set(category, {
      id: category.replace(/\s+/g, '-'),
      title: category,
      azkar: []
    });
  }
  
  // Clean text from \n
  text = text.replace(/\\n/g, '\n');
  
  categoriesMap.get(category).azkar.push({
    id: Math.random().toString(36).substring(2, 9), // unique id
    text: text,
    title: description || category,
    count: parsedCount,
    source: reference
  });
});

const result = Array.from(categoriesMap.values());
fs.writeFileSync('src/data/azkar.json', JSON.stringify(result, null, 2));
console.log('Parsed', result.length, 'categories');
