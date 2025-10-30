# Heal in Chandigarh - Production-ready

This is a production-ready Vite + React + Tailwind starter for the Heal in Chandigarh website.

## Contact form (Formspree)
The site supports Formspree for backend-free form handling. Steps:
1. Sign up at https://formspree.io and create a form. Copy the Form ID (looks like `xwkayzdr`). 
2. Open `src/App.jsx` and replace `const FORMSPREE_ID = null;` with your ID as a string, e.g. `const FORMSPREE_ID = 'xwkayzdr';`
3. Commit and push to GitHub. Submissions will be forwarded to the email you configured in Formspree (you can set it to info@healinchandigarh.com).

If you do not set a Formspree ID, the contact form uses a mailto fallback that opens the user's email client addressed to `info@healinchandigarh.com`.

## Run locally
```
npm install
npm run dev
```

## Deploy to Vercel
- Connect this repo to Vercel.
- Build command: `npm run build`
- Output directory: `dist`
