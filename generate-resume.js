const fs = require('fs');
const path = require('path');

// Read the resume data
const resumeData = JSON.parse(fs.readFileSync(path.join(__dirname, 'resume-data.json'), 'utf8'));

// CSS Reset and Custom Styles
const styles = `
        <style>
            /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

            html,
            body,
            div,
            span,
            applet,
            object,
            iframe,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            blockquote,
            pre,
            a,
            abbr,
            acronym,
            address,
            big,
            cite,
            code,
            del,
            dfn,
            em,
            img,
            ins,
            kbd,
            q,
            s,
            samp,
            small,
            strike,
            strong,
            sub,
            sup,
            tt,
            var,
            b,
            u,
            i,
            center,
            dl,
            dt,
            dd,
            ol,
            ul,
            li,
            fieldset,
            form,
            label,
            legend,
            table,
            caption,
            tbody,
            tfoot,
            thead,
            tr,
            th,
            td,
            article,
            aside,
            canvas,
            details,
            embed,
            figure,
            figcaption,
            footer,
            header,
            hgroup,
            menu,
            nav,
            output,
            ruby,
            section,
            summary,
            time,
            mark,
            audio,
            video {
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                font: inherit;
                vertical-align: baseline;
            }
            /* HTML5 display-role reset for older browsers */
            article,
            aside,
            details,
            figcaption,
            figure,
            footer,
            header,
            hgroup,
            menu,
            nav,
            section {
                display: block;
            }
            body {
                line-height: 1;
            }
            ol,
            ul {
                list-style: none;
            }
            blockquote,
            q {
                quotes: none;
            }
            blockquote:before,
            blockquote:after,
            q:before,
            q:after {
                content: "";
                content: none;
            }
            table {
                border-collapse: collapse;
                border-spacing: 0;
            }
        </style>
        <style>
            .Styles-nameText {
                color: #008;
                font-size: 28;
            }

            .Styles-roleText {
                font-size: 14;
                font-style: italic;
                font-weight: bold;
            }

            .Styles-greyText {
                color: #888;
                font-size: 12;
            }

            .Styles-rightGreyText {
                color: #888;
                flex-grow: 1;
                font-size: 12;
                text-align: right;
            }

            .Styles-listBlock {
                margin-bottom: 15px;
            }

            .Styles-para {
                font-size: 14;
                margin-bottom: 4px;
                margin-top: 4px;
                text-align: justify;
            }

            .Styles-listItem {
                font-size: 14;
                list-style: disc;
                margin-bottom: 4px;
                margin-top: 4px;
                text-align: justify;
            }

            .Styles-sectionHeading {
                color: #008;
                margin-bottom: 5px;
                margin-right: 5px;
            }
        </style>
`;

// Generate work experience HTML
function generateWorkExperience(work) {
    return work.map(job => {
        let html = `
                    <div class="Styles-listBlock">
                        <div style="display: flex; flex-direction: row">
                            <h2 class="Styles-sectionHeading">${job.company}</h2>
                            <div class="Styles-rightGreyText">${job.location}</div>
                        </div>`;

        // Iterate through all positions at this company
        job.positions.forEach((position, index) => {
            html += `
                        <div style="display: flex; flex-direction: row; ${index > 0 ? 'margin-top: 10px;' : ''}">
                            <h3 class="Styles-roleText">${position.role}</h3>
                            <div class="Styles-rightGreyText">${position.period}</div>
                        </div>
                        <div style="height: 4px"></div>`;

            if (position.description) {
                html += `
                        <div class="Styles-para">
                            ${position.description}
                        </div>`;
            }

            if (position.responsibilities && position.responsibilities.length > 0) {
                html += `
                        <ul class="Styles-listBlock">`;
                position.responsibilities.forEach(resp => {
                    html += `
                            <li class="Styles-listItem">
                                ${resp}
                            </li>`;
                });
                html += `
                        </ul>`;
            }

            if (position.accomplishmentsTitle) {
                html += `
                        <div class="Styles-para">
                            ${position.accomplishmentsTitle}
                        </div>`;
            }

            if (position.accomplishments && position.accomplishments.length > 0) {
                html += `
                        <ul class="Styles-listBlock">`;
                position.accomplishments.forEach(acc => {
                    html += `
                            <li class="Styles-listItem">
                                ${acc}
                            </li>`;
                });
                html += `
                        </ul>`;
            }
        });

        html += `
                    </div>`;

        return html;
    }).join('\n');
}

// Generate education HTML
function generateEducation(education) {
    return education.map(edu => `
                    <div class="Styles-listBlock">
                        <div style="display: flex; flex-direction: row">
                            <h2 class="Styles-sectionHeading">${edu.institution}</h2>
                            <div class="Styles-rightGreyText">${edu.location}</div>
                        </div>
                        <div style="display: flex; flex-direction: row">
                            <h3 class="Styles-roleText">${edu.degree}</h3>
                            <div class="Styles-rightGreyText">${edu.period}</div>
                        </div>
                    </div>`).join('\n');
}

// Generate skills HTML
function generateSkills(skills) {
    return skills.map(skill => `
                        <div style="margin-bottom: 10px;">
                            <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">
                                ${skill.category}
                            </div>
                            <div class="Styles-para">
                                ${skill.items.join(', ')}
                            </div>
                        </div>`).join('\n');
}

// Generate the complete HTML
function generateHTML(data) {
    return `<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
${styles}
    </head>
    <body style="max-width: 900px; box-sizing: border-box; padding: 30px">
        <div style="display: flex; flex-direction: row; width: 100%">
            <div style="width: 50%">
                <h1 class="Styles-nameText">${data.name}</h1>
            </div>
            <div style="display: flex; flex-direction: column; width: 50%">
                <div style="text-align: right" class="Styles-greyText">
                    ${data.contact.email}
                </div>
                <div style="text-align: right" class="Styles-greyText">
                    <a href="${data.contact.linkedinUrl}">${data.contact.linkedin}</a>
                </div>
                <div style="text-align: right" class="Styles-greyText">
                    <a href="${data.contact.githubUrl}">${data.contact.github}</a>
                </div>
            </div>
        </div>
        <hr />
        <table style="width: 100%">
            <tr>
                <td style="width: 15%; vertical-align: top">
                    <h2 class="Styles-sectionHeading">Work</h2>
                </td>
                <td style="width: 85%; vertical-align: top">
${generateWorkExperience(data.work)}
                </td>
            </tr>

            <tr>
                <td style="width: 15%; vertical-align: top">
                    <h2 class="Styles-sectionHeading">Education</h2>
                </td>
                <td style="width: 85%; vertical-align: top">
${generateEducation(data.education)}
                </td>
            </tr>

            <tr>
                <td style="width: 15%; vertical-align: top">
                    <h2 class="Styles-sectionHeading">Skills</h2>
                </td>
                <td style="width: 85%; vertical-align: top">
                    <div class="Styles-listBlock">
${generateSkills(data.skills)}
                    </div>
                </td>
            </tr>

            <tr>
                <td style="width: 15%; vertical-align: top">
                    <h2 class="Styles-sectionHeading">Referral</h2>
                </td>
                <td style="width: 85%; vertical-align: top">
                    <div class="Styles-listBlock">
                        <div class="Styles-para">
                            <strong>${data.referral.name}</strong>, ${data.referral.title}
                        </div>
                        <div class="Styles-para">
                            Contact: ${data.referral.contact}
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </body>
</html>
`;
}

// Generate and save the HTML file
const html = generateHTML(resumeData);
const outputPath = path.join(__dirname, 'farhan-resume.html');
fs.writeFileSync(outputPath, html, 'utf8');

console.log(`✅ Resume generated successfully at: ${outputPath}`);
