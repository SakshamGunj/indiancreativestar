const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const fixNextLinks = (filePath) => {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Fix <Link to= to <Link href=
    if (content.includes('<Link to=')) {
        content = content.replace(/<Link\s+to=/g, `<Link href=`);
    }

    // Ensure import Link from 'next/link' exists if <Link is used
    if (content.includes('<Link ') && !content.includes("from 'next/link'") && !content.includes('from "next/link"')) {
        // Insert after "use client" or at the top
        if (content.includes('"use client";')) {
            content = content.replace('"use client";', `"use client";\nimport Link from 'next/link';`);
        } else {
            content = `import Link from 'next/link';\n` + content;
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Fixed Links in', filePath);
    }
};

walkDir(path.join(__dirname, '../src'), fixNextLinks);
