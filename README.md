# Resume Generator

A simple, structured system for generating an HTML resume from JSON data. This allows you to maintain your resume as structured data and generate a clean, styled HTML output.

## Overview

This system consists of:
- `resume-data.json` - Your resume data in structured JSON format
- `generate-resume.js` - Node.js script that transforms JSON → HTML
- `generate-pdf.js` - Node.js script that generates PDF from HTML
- `farhan-resume.html` - Generated HTML output (created when you run the script)
- `farhan-resume.pdf` - Generated PDF output (created when you run the PDF script)

## Quick Start

### Generate HTML resume:
```bash
cd /Users/farhan.darma/Downloads/cv
node generate-resume.js
```

Or using npm:
```bash
npm run generate
```

### Generate PDF resume:
```bash
node generate-pdf.js
```

Or using npm:
```bash
npm run generate-pdf
```

### Generate both HTML and PDF:
```bash
npm run build
```

This will create/update both `farhan-resume.html` and `farhan-resume.pdf` in the same directory.

## File Structure

```
cv/
├── README.md              # This file
├── package.json           # Node.js package configuration
├── resume-data.json       # Your resume data (EDIT THIS)
├── generate-resume.js     # HTML generator script
├── generate-pdf.js        # PDF generator script
├── farhan-resume.html     # Generated HTML output
└── farhan-resume.pdf      # Generated PDF output
```

## How to Update Your Resume

### 1. Edit `resume-data.json`

This file contains all your resume data in a structured format. Simply edit the JSON to update your resume:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "contact": { ... },
  "work": [ ... ],
  "education": [ ... ],
  "skills": [ ... ],
  "referral": { ... }
}
```

### 2. Run the generator

```bash
node generate-resume.js
```

### 3. Open the HTML file

Open `farhan-resume.html` in your browser to view the result.

## Data Structure

### Contact Information
```json
"contact": {
  "email": "your.email@example.com",
  "linkedin": "linkedin.com/in/yourname",
  "linkedinUrl": "https://www.linkedin.com/in/yourname/",
  "github": "github.com/yourname",
  "githubUrl": "https://github.com/yourname"
}
```

### Work Experience
```json
"work": [
  {
    "company": "Company Name",
    "location": "City, Country",
    "role": "Your Role",
    "period": "Start Date - End Date",
    "description": "Optional description paragraph",
    "responsibilities": [
      "Responsibility 1",
      "Responsibility 2"
    ],
    "accomplishmentsTitle": "Optional accomplishments section title",
    "accomplishments": [
      "Accomplishment 1",
      "Accomplishment 2"
    ]
  }
]
```

### Education
```json
"education": [
  {
    "institution": "University Name",
    "location": "City, Country",
    "degree": "Degree Name",
    "period": "Start - End"
  }
]
```

### Skills
```json
"skills": [
  {
    "category": "Category Name",
    "items": ["Skill 1", "Skill 2", "Skill 3"]
  }
]
```

### Referral (Optional)
```json
"referral": {
  "name": "Referee Name",
  "title": "Their Title/Company",
  "contact": "email@example.com"
}
```

## Styling

The HTML output uses inline CSS based on Eric Meyer's CSS Reset with custom styling:
- Blue headings (#008) for section titles and company names
- Grey text (#888) for secondary information
- Clean, professional layout
- Maximum width of 900px
- Print-friendly

## Common Use Cases

### Adding a new job
1. Open `resume-data.json`
2. Add a new object to the `work` array
3. Run `node generate-resume.js`

### Updating skills
1. Open `resume-data.json`
2. Edit the `skills` array
3. Run `node generate-resume.js`

### Creating different resume versions
You can create multiple JSON files (e.g., `resume-data-frontend.json`, `resume-data-fullstack.json`) and modify the generator script to use different input files for different resume versions.

## For LLM/AI Assistants

When helping to update this resume:

1. **Always edit `resume-data.json`** - Never manually edit the HTML output
2. **Run the generator** - After editing JSON, run `node generate-resume.js`
3. **Maintain structure** - Keep the JSON structure consistent with the schema above
4. **Test the output** - Open the generated HTML in a browser to verify

### Common requests and how to handle them:

- **"Add a new job"** → Add object to `work` array in JSON, then regenerate
- **"Update skills"** → Edit `skills` array in JSON, then regenerate
- **"Change contact info"** → Edit `contact` object in JSON, then regenerate
- **"Remove a section"** → Remove from JSON AND update `generate-resume.js` to skip that section

### Modifying the generator

The `generate-resume.js` script contains functions for each section:
- `generateWorkExperience()` - Generates work section HTML
- `generateEducation()` - Generates education section HTML
- `generateSkills()` - Generates skills section HTML

To add new sections or modify the layout, edit these functions.

## Requirements

- Node.js (any recent version)
- Puppeteer (automatically installed via `npm install`)

### First time setup:
```bash
cd /Users/farhan.darma/Downloads/cv
npm install
```

This will install Puppeteer, which is needed for PDF generation.

## PDF Generation Details

The PDF generation process:
1. Reads the generated HTML file (`farhan-resume.html`)
2. Uses Puppeteer (headless Chrome) to render the HTML
3. Injects PDF-specific CSS to center the content on the page
4. Exports to A4 format with 0.5 inch margins
5. Preserves all colors and styling from the HTML

The HTML version remains left-aligned, while the PDF version is centered on the page for better presentation.

## Tips

1. **Version control** - Consider putting this in a git repository to track changes
2. **Backup** - Keep backups of your `resume-data.json`
3. **Multiple versions** - Create different JSON files for different resume variants
4. **Generate both** - Use `npm run build` to generate both HTML and PDF at once
5. **Validation** - Use a JSON validator to check your JSON syntax if you get errors

## Troubleshooting

**Error: Cannot find module**
- Make sure you're in the correct directory: `cd /Users/farhan.darma/Downloads/cv`

**JSON syntax error**
- Validate your JSON at jsonlint.com or use a code editor with JSON validation

**HTML looks wrong**
- Check that your JSON structure matches the examples above
- Make sure all required fields are present

## Future Enhancements

Possible additions:
- React-based preview interface
- Live editing with hot reload
- Multiple theme support
- PDF generation from HTML
- Markdown support for descriptions
- Multiple language support
