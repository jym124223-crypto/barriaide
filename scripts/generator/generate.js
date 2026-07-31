const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', '..', 'public', 'products');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Tableau de Bord Bariatrique (Excel)
async function generateBariatricDashboard() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Suivi Quotidien');

    sheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Poids (kg/lbs)', key: 'weight', width: 15 },
        { header: 'Protéines (g)', key: 'protein', width: 15 },
        { header: 'Eau (L/oz)', key: 'water', width: 15 },
        { header: 'Vitamines prises?', key: 'vitamins', width: 18 },
        { header: 'Notes / Humeur', key: 'notes', width: 30 }
    ];

    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF97316' } }; // Orange

    for(let i = 0; i < 30; i++) {
        sheet.addRow({date: '', weight: '', protein: '', water: '', vitamins: '', notes: ''});
    }

    await workbook.xlsx.writeFile(path.join(outputDir, 'Tableau_Bord_Bariatrique.xlsx'));
    console.log('Generated Tableau_Bord_Bariatrique.xlsx');
}

// 2. Journal GLP-1 (Excel)
async function generateGLP1Journal() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Suivi Injections');

    sheet.columns = [
        { header: 'Date Injection', key: 'date', width: 18 },
        { header: 'Dose (mg)', key: 'dose', width: 15 },
        { header: 'Lieu Injection', key: 'site', width: 20 },
        { header: 'Effets Secondaires', key: 'side_effects', width: 30 },
        { header: 'Faim (1-10)', key: 'hunger', width: 15 },
        { header: 'Notes', key: 'notes', width: 30 }
    ];

    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0D9488' } }; // Teal

    for(let i = 0; i < 12; i++) {
        sheet.addRow({date: '', dose: '', site: '', side_effects: '', hunger: '', notes: ''});
    }

    await workbook.xlsx.writeFile(path.join(outputDir, 'Journal_GLP1.xlsx'));
    console.log('Generated Journal_GLP1.xlsx');
}

// Helper for simple PDFs
function createSimplePDF(filename, title, contentLines) {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(path.join(outputDir, filename));
        doc.pipe(stream);

        // Header
        doc.fillColor('#F97316').fontSize(24).text(title, { align: 'center' });
        doc.moveDown(2);

        // Content
        doc.fillColor('#09090B').fontSize(12);
        contentLines.forEach(line => {
            if (line.startsWith('##')) {
                doc.moveDown(1).fontSize(16).fillColor('#0D9488').text(line.replace('##', '').trim());
                doc.fontSize(12).fillColor('#09090B').moveDown(0.5);
            } else if (line.startsWith('-')) {
                doc.text(`• ${line.replace('-', '').trim()}`, { indent: 20 });
            } else {
                doc.text(line).moveDown(0.5);
            }
        });

        // Footer
        doc.moveDown(3).fontSize(10).fillColor('#64748B').text('Créé par BarriAide - Pour usage personnel uniquement.', { align: 'center' });

        doc.end();
        stream.on('finish', () => {
            console.log(`Generated ${filename}`);
            resolve();
        });
    });
}

// 3. Mindset Journal (PDF)
async function generateMindsetJournal() {
    await createSimplePDF('Mindset_Journal.pdf', 'Journal de Bord Psychologique (Mindset)', [
        'Bienvenue dans votre journal psychologique. Utilisez ce document pour explorer vos émotions sans jugement.',
        '',
        '## Prompts Quotidiens',
        '- Comment je me sens physiquement aujourd\'hui (1-10) ?',
        '- Comment je me sens émotionnellement aujourd\'hui ?',
        '- Ai-je ressenti de la "faim émotionnelle" (envie de manger à cause du stress/tristesse/ennui) ?',
        '- Quelle a été ma plus grande victoire aujourd\'hui ? (même petite)',
        '- Qu\'est-ce que j\'ai appris sur mon corps aujourd\'hui ?',
        '',
        '## Exercice de Gratitude',
        '- 3 choses pour lesquelles je suis reconnaissant(e) aujourd\'hui concernant mon corps :'
    ]);
}

// 4. Meal Prep Planner (PDF)
async function generateMealPrep() {
    await createSimplePDF('Planificateur_Repas.pdf', 'Planificateur de Meal Prep', [
        'Organisez vos repas de la semaine pour atteindre vos objectifs de protéines facilement.',
        '',
        '## Étape 1 : Inventaire',
        '- Quelles sources de protéines ai-je dans le frigo/congélateur ?',
        '- Quels légumes frais ou surgelés ai-je ?',
        '',
        '## Étape 2 : Idées de Repas (Batch Cooking)',
        '- Repas 1 (ex: Chili à la dinde) :',
        '- Repas 2 (ex: Poulet effiloché) :',
        '- Repas 3 (ex: Poisson au four) :',
        '',
        '## Étape 3 : Les Collations de secours',
        '- Toujours avoir sous la main : yogourt grec, fromage cottage, edamames, shakes protéinés.'
    ]);
}

// 5. 10 Collations (PDF - Freebie)
async function generateCollations() {
    await createSimplePDF('10_Collations_Proteinees.pdf', '10 Collations Protéinées d\'Urgence', [
        'Voici 10 idées de collations rapides, riches en protéines et faciles à tolérer.',
        '',
        '## La Liste',
        '- 1. Yaourt grec nature (15-20g de protéines) avec un peu de cannelle.',
        '- 2. 1/2 tasse de Fromage cottage (14g) - se mange bien salé ou sucré.',
        '- 3. Edamames cuits à la vapeur (8g) - très doux pour l\'estomac.',
        '- 4. Œuf dur (6g) - un classique portable.',
        '- 5. Trempette aux haricots blancs (Houmous sans pois chiches pour mieux digérer).',
        '- 6. Tranches de dinde roulées avec un bâtonnet de fromage.',
        '- 7. Mini Babybel (5g) - Parfait en déplacement.',
        '- 8. Shake protéiné prêt à boire (Premier Protein, Fairlife - 30g).',
        '- 9. Lait écrémé ou boisson de soya (8g par tasse).',
        '- 10. Thon en conserve dans l\'eau (20g+) mélangé avec un peu de yogourt grec au lieu de la mayo.'
    ]);
}

async function run() {
    await generateBariatricDashboard();
    await generateGLP1Journal();
    await generateMindsetJournal();
    await generateMealPrep();
    await generateCollations();
}

run();
