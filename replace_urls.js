const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const oldUrl = 'https://tile-backend-6xtp.onrender.com';
const newUrl = 'http://localhost:5000';

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes(oldUrl)) {
                console.log(`Updating ${fullPath}`);
                const updatedContent = content.replace(new RegExp(oldUrl, 'g'), newUrl);
                fs.writeFileSync(fullPath, updatedContent, 'utf8');
            }
        }
    });
}

walkDir(srcDir);
console.log('Done!');
