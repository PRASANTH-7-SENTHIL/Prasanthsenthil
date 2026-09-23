const fs = require('fs');
const path = require('path');

const mapping = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../cloudinary_all_images_mapping.json'), 'utf8'));

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.css')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles(path.resolve(__dirname, '../src'));
// Also check index.html
files.push(path.resolve(__dirname, '../index.html'));

console.log(`Scanning ${files.length} code files for image references...`);

// Sort keys by length descending so longer paths match first (e.g. /symposium/img-10.jpeg before /symposium/img-1.jpeg)
const keys = Object.keys(mapping).sort((a, b) => b.length - a.length);

let totalReplacements = 0;
const modifiedFiles = [];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  let originalContent = content;
  let fileReplacements = 0;

  for (const key of keys) {
    const cloudUrl = mapping[key];
    const keyWithoutSlash = key.startsWith('/') ? key.slice(1) : key;

    // Matches "/path/to/img.jpg"
    if (content.includes(`"${key}"`)) {
      content = content.split(`"${key}"`).join(`"${cloudUrl}"`);
      fileReplacements++;
    }
    // Matches '/path/to/img.jpg'
    if (content.includes(`'${key}'`)) {
      content = content.split(`'${key}'`).join(`'${cloudUrl}'`);
      fileReplacements++;
    }
    // Matches `"/path/to/img.jpg"` or `'/path/to/img.jpg'` inside templates
    if (content.includes(`\`${key}\``)) {
      content = content.split(`\`${key}\``).join(`\`${cloudUrl}\``);
      fileReplacements++;
    }
    // Matches "path/to/img.jpg" without leading slash
    if (content.includes(`"${keyWithoutSlash}"`)) {
      content = content.split(`"${keyWithoutSlash}"`).join(`"${cloudUrl}"`);
      fileReplacements++;
    }
    if (content.includes(`'${keyWithoutSlash}'`)) {
      content = content.split(`'${keyWithoutSlash}'`).join(`'${cloudUrl}'`);
      fileReplacements++;
    }
  }

  // Also check dynamic array patterns in PortfolioPage.jsx or App.jsx:
  // e.g.: Array.from({length: 23}, (_, i) => `/symposium/img-${i+1}.jpeg`)
  // and Array.from({length: 11}, (_, i) => `/symposium/sympo-${i+1}.jpg`)
  if (content.includes("`/symposium/img-${i+1}.jpeg`") || content.includes("`/symposium/sympo-${i+1}.jpg`")) {
    console.log(`Found dynamic symposium pattern in ${f}`);
    // Generate explicit arrays using mapping
    const symposiumImages = Array.from({ length: 23 }, (_, i) => mapping[`/symposium/img-${i + 1}.jpeg`]).filter(Boolean)
      .concat(Array.from({ length: 11 }, (_, i) => mapping[`/symposium/sympo-${i + 1}.jpg`]).filter(Boolean));
    
    content = content.replace(
      /Array\.from\(\{length:\s*23\},\s*\(_,\s*i\)\s*=>\s*`\/symposium\/img-\$\{i\+1\}\.jpeg`\)\.concat\(Array\.from\(\{length:\s*11\},\s*\(_,\s*i\)\s*=>\s*`\/symposium\/sympo-\$\{i\+1\}\.jpg`\)\)/g,
      JSON.stringify(symposiumImages)
    );
    fileReplacements++;
  }

  if (content !== originalContent) {
    fs.writeFileSync(f, content, 'utf8');
    modifiedFiles.push({ file: f, count: fileReplacements });
    totalReplacements += fileReplacements;
  }
}

console.log(`\nReplacement summary:`);
modifiedFiles.forEach(m => {
  console.log(`✓ Modified ${path.relative(path.resolve(__dirname, '..'), m.file)}: ${m.count} replacements`);
});
console.log(`Total replacements made: ${totalReplacements}`);
