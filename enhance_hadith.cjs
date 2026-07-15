const fs = require('fs');
let code = fs.readFileSync('src/screens/Hadith/HadithList.tsx', 'utf8');

const dailyFeature = `
        {/* Categories */}
`;

const newFeature = `
        {/* Hadith of the Day / Random */}
        {!search && !selectedCategory && (
          <div className="mb-6">
            <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:scale-[1.01] transition-transform">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-primary-400">
                <Quote size={20} className="text-primary-500" />
                <h2 className="font-bold text-lg">حديث عشوائي</h2>
              </div>
              <Link to={\`/hadith/\${hadithsData[Math.floor(Math.random() * hadithsData.length)].id}\`} className="block">
                <p className="text-slate-700 dark:text-slate-200 font-amiri leading-loose line-clamp-3 mb-4">
                  اضغط هنا لقراءة حديث عشوائي من السنة النبوية المطهرة.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400">
                  قراءة الحديث
                  <BookOpen size={16} />
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Categories */}
`;

code = code.replace("        {/* Categories */}", newFeature);

fs.writeFileSync('src/screens/Hadith/HadithList.tsx', code);
