# Resume Generator

Generate HTML and PDF resumes from structured JSON data.

## Quick Start

```bash
# Install dependencies
npm install

# Generate HTML and PDF
npm run build
```

## Usage

1. Edit `resume-data.json` with your resume content
2. Run `npm run build` to generate both HTML and PDF outputs
3. Open `resume.html` or `resume.pdf`

## Commands

```bash
npm run generate      # Generate HTML only
npm run generate-pdf  # Generate PDF only (requires HTML first)
npm run build         # Generate both HTML and PDF
```

## Files

- `resume-data.json` - Source data (edit this)
- `generate-resume.js` - HTML generator
- `generate-pdf.js` - PDF generator
- `resume.html` - Generated HTML output
- `resume.pdf` - Generated PDF output

See `CLAUDE.md` for detailed architecture and development guidance.
