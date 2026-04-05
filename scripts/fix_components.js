const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function fixFile(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (content.includes('react-router-dom')) {
        changed = true;
        
        // Ensure "use client"; is at the top
        if (!content.includes('"use client"')) {
            content = `"use client";\n\n` + content;
        }

        // Extract router imports to avoid overlap
        // 1. useNavigate -> useRouter
        content = content.replace(/import\s+\{([^}]*)useNavigate([^}]*)\}\s+from\s+['"]react-router-dom['"];/g, (match, prefix, suffix) => {
            return `import { useRouter } from 'next/navigation';\nimport {${prefix}${suffix}} from 'react-router-dom';`.replace(/import\s*\{\s*\}\s*from\s+['"]react-router-dom['"];/g, '');
        });
        
        content = content.replace(/import\s+\{\s*useNavigate\s*\}\s+from\s+['"]react-router-dom['"];/g, `import { useRouter } from 'next/navigation';`);
        
        // 2. useLocation -> usePathname
        content = content.replace(/import\s+\{\s*useLocation\s*\}\s+from\s+['"]react-router-dom['"];/g, `import { usePathname } from 'next/navigation';`);

        // 3. useParams -> useParams
        content = content.replace(/import\s+\{\s*useParams\s*\}\s+from\s+['"]react-router-dom['"];/g, `import { useParams } from 'next/navigation';`);
        
        // Replace Link (if used randomly)
        content = content.replace(/import\s+\{\s*Link\s*\}\s+from\s+['"]react-router-dom['"];/g, `import Link from 'next/link';`);

        // Handle combined imports
        content = content.replace(/import\s+\{(.*)useNavigate(.*)\}\s+from\s+['"]react-router-dom['"];/g, `import { useRouter } from 'next/navigation';\n// TODO: fix manual react-router elements`);

        // Replace hook calls
        content = content.replace(/useNavigate\(\)/g, "useRouter()");
        content = content.replace(/useLocation\(\)/g, "usePathname()");
        content = content.replace(/navigate\(/g, "router.push(");

        // Fix potential bug 'const router = useRouter(); router.push(...) :
        // if original was const navigate = useNavigate(), then we changed to const navigate = useRouter()
        content = content.replace(/const navigate = useRouter\(\);/g, "const router = useRouter();");
        
        // Clean up empty imports
        content = content.replace(/import\s*\{\s*\}\s*from\s+['"]react-router-dom['"];/g, '');
        content = content.replace(/from 'react-router-dom';\n\s*from 'react-router-dom';/g, '');

    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log('Fixed', filePath);
    }
}

// target src/components and src/lib
walkDir(path.join(__dirname, '../src/components'), fixFile);
walkDir(path.join(__dirname, '../src/lib'), fixFile);
