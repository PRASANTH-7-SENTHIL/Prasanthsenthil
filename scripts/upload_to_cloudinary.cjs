const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'oaktnbdl',
  api_key: process.env.CLOUDINARY_API_KEY || '956186724728438',
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const publicDir = path.resolve(__dirname, '../public');
const mappingFile = path.resolve(__dirname, '../cloudinary_all_images_mapping.json');

// Load existing mapping if present for resumability
let mapping = {};
if (fs.existsSync(mappingFile)) {
  try {
    mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
  } catch (e) {
    mapping = {};
  }
}

function getAllFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, baseDir));
    } else {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push({ relPath, fullPath });
    }
  }
  return results;
}

const allFiles = getAllFiles(publicDir);
// Skip SVG files like icons.svg and keep images (.jpg, .jpeg, .png, .webp, .gif)
const imgExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const imageFiles = allFiles.filter(f => {
  const ext = path.extname(f.relPath).toLowerCase();
  return imgExtensions.includes(ext);
});

console.log(`Found ${imageFiles.length} raster image files in public/`);

async function uploadFile(fileObj, index, total) {
  const key = '/' + fileObj.relPath;
  if (mapping[key]) {
    console.log(`[${index + 1}/${total}] Already uploaded: ${key}`);
    return mapping[key];
  }

  const dirName = path.dirname(fileObj.relPath);
  const baseName = path.basename(fileObj.relPath, path.extname(fileObj.relPath));
  const safeBaseName = baseName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const folder = dirName === '.' ? 'portfolio/root' : `portfolio/${dirName}`;
  const public_id = safeBaseName;

  console.log(`[${index + 1}/${total}] Uploading ${key}...`);
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await cloudinary.uploader.upload(fileObj.fullPath, {
        folder,
        public_id,
        resource_type: 'image',
        overwrite: true
      });
      mapping[key] = res.secure_url;
      console.log(`✓ [${index + 1}/${total}] Uploaded ${key} -> ${res.secure_url}`);
      fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
      return res.secure_url;
    } catch (err) {
      console.error(`✗ Attempt ${attempt} failed for ${key}:`, err.message);
      if (attempt === 3) {
        console.error(`Giving up on ${key}`);
      } else {
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }
}

async function run() {
  console.log('Starting Cloudinary uploads...');
  for (let i = 0; i < imageFiles.length; i++) {
    await uploadFile(imageFiles[i], i, imageFiles.length);
    await new Promise(r => setTimeout(r, 100));
  }
  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
  console.log(`\n🎉 ALL DONE! Total images in mapping: ${Object.keys(mapping).length}`);
}

run().catch(err => {
  console.error('Fatal error during upload:', err);
  process.exit(1);
});
