const fs = require('fs');
const path = require('path');

const routeMap = {
    "Index.tsx": "page.tsx",
    "About.tsx": "about/page.tsx",
    "CompetitionSelect.tsx": "competitions/page.tsx",
    "ThankYou.tsx": "thank-you/page.tsx",
    "WinterArtRoyaleWrapped.tsx": "winterartroyale/wrapped/page.tsx",
    "WarHallOfFame.tsx": "winterartroyale/halloffame/page.tsx",
    "HallOfFame.tsx": "hall-of-fame/page.tsx",
    "EventHallOfFame.tsx": "hall-of-fame/[eventId]/page.tsx",
    "RangKalaAward.tsx": "rangkala-award/page.tsx",
    "RangKalaAwardRegister.tsx": "rangkala-award/register/page.tsx",
    "CashfreeTest.tsx": "cashfree-test/page.tsx",
    "PaymentSuccess.tsx": "payment-success/page.tsx",
    "TermsAndConditions.tsx": "terms-and-conditions/page.tsx",
    "RefundAndCancellation.tsx": "refund-and-cancellation/page.tsx",
    "ContactUs.tsx": "contact-us/page.tsx",
    "PrivacyPolicy.tsx": "privacy-policy/page.tsx",
    "CertificateValidation.tsx": "certificate/validation/page.tsx",
    "WeatherDemo.tsx": "weather-demo/page.tsx",
    "Blog.tsx": "blog/page.tsx",
    "BlogPost.tsx": "blog/[slug]/page.tsx",
    "NotFound.tsx": "not-found.tsx"
};

const srcPagesDir = path.join(__dirname, '../legacy-vite/src/pages');
const targetAppDir = path.join(__dirname, '../src/app');

Object.entries(routeMap).forEach(([sourceFile, targetPath]) => {
    const srcPath = path.join(srcPagesDir, sourceFile);
    if (!fs.existsSync(srcPath)) {
        console.warn(`Source file not found: ${srcPath}`);
        return;
    }

    const fullTargetPath = path.join(targetAppDir, targetPath);
    const targetDir = path.dirname(fullTargetPath);
    
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    let content = fs.readFileSync(srcPath, 'utf8');

    // 1. Add "use client" if it has hooks
    if (!content.includes('"use client"')) {
        content = `"use client";\n\n` + content;
    }

    // 2. Replace react-router-dom imports
    content = content.replace(/import\s+\{.*useNavigate.*\}.*from\s+['"]react-router-dom['"];/g, `import { useRouter } from 'next/navigation';`);
    content = content.replace(/import\s+\{.*useParams.*\}.*from\s+['"]react-router-dom['"];/g, `import { useParams } from 'next/navigation';`);
    content = content.replace(/import\s+\{.*useLocation.*\}.*from\s+['"]react-router-dom['"];/g, `import { usePathname } from 'next/navigation';`);

    // 3. Replace hook usages
    content = content.replace(/useNavigate\(\)/g, "useRouter()");
    content = content.replace(/navigate\(/g, "router.push("); // assuming const navigate = useNavigate() -> const router = useRouter()
    
    // Fix the const name from navigate to router if needed
    content = content.replace(/const navigate = useRouter\(\);/g, "const router = useRouter();");

    fs.writeFileSync(fullTargetPath, content);
    console.log(`Ported ${sourceFile} -> app/${targetPath}`);
});
