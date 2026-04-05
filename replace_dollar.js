const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, 'src');

function getFilesWithDollarSign(dir) {
    let files = [];
    try {
        const output = execSync(`grep -rli 'DollarSign' ${dir}`).toString();
        files = output.split('\n').filter(line => line.trim() !== '' && line.endsWith('.jsx') || line.endsWith('.js'));
    } catch(e) {}
    return files;
}

const TAKA_ICON_CODE = `
const TakaIcon = ({ className }) => (
  <span className={\`font-bold leading-none select-none flex items-center justify-center \${className}\`}>৳</span>
);
`;

const files = getFilesWithDollarSign(targetDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes('DollarSign') && !content.includes('TakaIcon')) {
        // Find last import
        const importRegex = /^import\s+.*from\s+['"].*['"];?$/gm;
        let match;
        let lastMatch;
        while ((match = importRegex.exec(content)) !== null) {
            lastMatch = match;
        }

        if (lastMatch) {
            const insertIndex = lastMatch.index + lastMatch[0].length;
            content = content.slice(0, insertIndex) + '\n' + TAKA_ICON_CODE + '\n' + content.slice(insertIndex);
            
            // Replace lucide-react imports
            content = content.replace(/DollarSign,\s*/g, '');
            content = content.replace(/,\s*DollarSign/g, '');
            content = content.replace(/import\s*{\s*DollarSign\s*}\s*from\s+['"]lucide-react['"];?/g, '');
            
            // Replace component usage
            content = content.replace(/<DollarSign\b/g, '<TakaIcon');
            content = content.replace(/icon:\s*DollarSign/g, 'icon: TakaIcon');
            
            changed = true;
        }
    }
    
    // Replace $ in strings and template literals loosely if applicable
    // But since this is global and regex for currency string formatting is complex,
    // let's stick to the icon part for now, as that's the most prominent.

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
