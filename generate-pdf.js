const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    console.log('🚀 Starting PDF generation...');

    const htmlPath = path.join(__dirname, 'resume.html');

    // Check if HTML file exists
    if (!fs.existsSync(htmlPath)) {
        console.error('❌ Error: resume.html not found!');
        console.log('💡 Run "node generate-resume.js" first to generate the HTML file.');
        process.exit(1);
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Load the HTML file
        await page.goto(`file://${htmlPath}`, {
            waitUntil: 'networkidle0'
        });

        // Inject PDF-specific CSS to center the content
        await page.addStyleTag({
            content: `
                @page {
                    margin: 0.5in;
                }

                html {
                    display: flex;
                    justify-content: center;
                }

                body {
                    margin: 0 auto !important;
                }
            `
        });

        // Generate PDF with high quality settings
        const pdfPath = path.join(__dirname, 'resume.pdf');
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0.5in',
                right: '0.5in',
                bottom: '0.5in',
                left: '0.5in'
            },
            displayHeaderFooter: false
        });

        console.log(`✅ PDF generated successfully at: ${pdfPath}`);

    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

// Run the generator
generatePDF();
