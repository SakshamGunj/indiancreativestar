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

const replaceReactRouterDom = (filePath) => {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    if (content.includes('react-router-dom')) {
        // Fix Link imports
        content = content.replace(/import\s+\{\s*Link\s*\}\s+from\s+['"]react-router-dom['"];/g, `import Link from 'next/link';`);
        content = content.replace(/import\s+\{\s*Link\s*as\s+RouterLink\s*\}\s+from\s+['"]react-router-dom['"];/g, `import Link from 'next/link';`);
        
        // Link component usages (to -> href)
        content = content.replace(/<Link\s+to=/g, `<Link href=`);
        content = content.replace(/<RouterLink\s+to=/g, `<Link href=`);
        content = content.replace(/<\/RouterLink>/g, `</Link>`);

        // Router hooks
        content = content.replace(/import\s+\{\s*([^}]*)useNavigate([^}]*)\s*\}\s+from\s+['"]react-router-dom['"];/g, (match, before, after) => {
            const others = [before, after].map(s => s.trim()).filter(Boolean).join(', ');
            return others ? `import { useRouter } from 'next/navigation';\nimport { ${others} } from 'react-router-dom';` : `import { useRouter } from 'next/navigation';`;
        });

        content = content.replace(/import\s+\{\s*([^}]*)useLocation([^}]*)\s*\}\s+from\s+['"]react-router-dom['"];/g, (match, before, after) => {
            const others = [before, after].map(s => s.trim()).filter(Boolean).join(', ');
            return others ? `import { usePathname } from 'next/navigation';\nimport { ${others} } from 'react-router-dom';` : `import { usePathname } from 'next/navigation';`;
        });

        content = content.replace(/import\s+\{\s*([^}]*)useParams([^}]*)\s*\}\s+from\s+['"]react-router-dom['"];/g, (match, before, after) => {
            const others = [before, after].map(s => s.trim()).filter(Boolean).join(', ');
            return others ? `import { useParams } from 'next/navigation';\nimport { ${others} } from 'react-router-dom';` : `import { useParams } from 'next/navigation';`;
        });
        
        // Finally, catch-all if there's any remaining empty or raw react-router-dom imports
        content = content.replace(/import\s*\{\s*\}\s*from\s+['"]react-router-dom['"];/g, '');
        content = content.replace(/from 'react-router-dom';\nfrom/g, 'from');
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Purged react-router-dom from', filePath);
    }
};

walkDir(path.join(__dirname, '../src'), replaceReactRouterDom);
