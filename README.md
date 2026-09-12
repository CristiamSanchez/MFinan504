# MFin504 Financial Hub

A responsive microfinance website for Honduran entrepreneurs and small businesses. Visitors can explore financial services, submit a loan request, and automatically receive an email confirmation.

**Live site:** https://cristiamsanchez.github.io/MFinan504/

## Features

- Responsive Home, Services, Loan Request, and Contact pages
- Loan application form with client-side and server-side validation
- Automatic registration in Google Sheets
- Email confirmation for the applicant and notification for staff
- Unique request IDs and Honduras-local timestamps
- Static deployment through GitHub Pages and GitHub Actions

## Architecture

```text
GitHub Pages (React frontend)
        ↓ HTTPS POST
Google Apps Script (validation and automation)
        ├── Google Sheets (request records)
        └── Gmail / MailApp (email notifications)
```

## Technology Stack

- React 19, TypeScript and TanStack Router
- Vite and Tailwind CSS
- Google Apps Script
- Google Sheets and MailApp
- GitHub Actions and GitHub Pages

## Local Development

Requirements: Node.js 24 and npm.

```bash
git clone https://github.com/CristiamSanchez/MFinan504.git
cd MFinan504
npm install
npm run dev
```

Create `.env.local` for local form submissions:

```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Do not commit `.env.local`. Production uses the GitHub Actions secret `VITE_APPS_SCRIPT_URL`.

## Deployment

Every push to `main` builds the static site and deploys `.output/public` through GitHub Actions.

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

## Data and Privacy

Loan submissions contain personal and financial information. Restrict the spreadsheet and Apps Script project to authorized staff. Never store credentials or applicant data in this repository.

## License

This repository is intended as a portfolio and demonstration project. Add an explicit license before allowing third-party reuse.
