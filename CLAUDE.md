# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a resume generator system that converts structured JSON data into HTML and PDF formats. The system maintains resume content in `resume-data.json` and uses Node.js scripts to generate output files.

## Core Architecture

### Data Flow
```
resume-data.json → generate-resume.js → resume.html → generate-pdf.js → resume.pdf
```

The architecture follows a pipeline approach:
1. **Data Source**: `resume-data.json` contains all resume content in structured format
2. **HTML Generation**: `generate-resume.js` transforms JSON to styled HTML
3. **PDF Generation**: `generate-pdf.js` uses Puppeteer to render HTML to PDF

### Key Design Principles
- **Single Source of Truth**: All resume content lives in `resume-data.json`
- **Separation of Concerns**: Data (JSON) is separate from presentation (HTML generator)
- **Template-Free**: HTML generation uses programmatic string building rather than template engines
- **Inline Styling**: All CSS is embedded in the HTML output for portability

## Common Commands

### Build Commands
```bash
# Generate HTML only
npm run generate
# or
node generate-resume.js

# Generate PDF only (requires HTML to exist first)
npm run generate-pdf
# or
node generate-pdf.js

# Generate both HTML and PDF
npm run build
```

### Development Setup
```bash
# Initial setup (install Puppeteer for PDF generation)
npm install
```

## JSON Data Schema

### Work Experience Structure
The `work` array supports multiple positions at the same company through a nested `positions` array:
```json
{
  "company": "Company Name",
  "location": "City, Country",
  "positions": [
    {
      "role": "Role Title",
      "period": "Date Range",
      "description": "Optional intro paragraph",
      "responsibilities": ["List items"],
      "accomplishmentsTitle": "Optional section header",
      "accomplishments": ["List items"]
    }
  ]
}
```

### Skills Structure
Skills can have duplicate categories in the JSON (e.g., multiple "CI/CD" entries at resume-data.json:100 and resume-data.json:104). Both will be rendered in the output.

## Important Editing Rules

### When Updating Resume Content
1. **ALWAYS edit `resume-data.json`** - Never manually edit `resume.html`
2. **Run the generator** after editing JSON: `node generate-resume.js`
3. **Regenerate PDF** if needed: `node generate-pdf.js` or use `npm run build`

### Generator Script Modifications
When modifying `generate-resume.js`:
- Section generators are in separate functions: `generateWorkExperience()`, `generateEducation()`, `generateSkills()`
- The main layout is in `generateHTML()` which uses a table-based structure for section alignment
- CSS styles are defined in the `styles` constant (lines 8-189)
- The layout uses a two-column table: left column (15%) for section headings, right column (85%) for content

## PDF Generation Details

The PDF generator (`generate-pdf.js`):
- Requires the HTML file to exist first (checks at line 11)
- Uses Puppeteer's headless Chrome
- Injects additional CSS at runtime to center content on the page (lines 31-45)
- Exports to A4 format with 0.5 inch margins
- HTML and PDF versions have slight layout differences (HTML is left-aligned, PDF is centered)

## Deployment

GitHub Actions workflow automatically deploys to GitHub Pages on push to `main` branch (see `.github/workflows/deploy.yml`). The workflow publishes all repository files, making `resume.html` accessible via GitHub Pages.

## Dependencies

- **puppeteer** (^24.29.1): Used exclusively for PDF generation via headless Chrome
