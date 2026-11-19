# 🐾 PAWCARE – Every Paw Deserves Love & Care
Pet care tracker + stray animal welfare community platform. Pure HTML/CSS/JS, no backend, no build step, no paid APIs. Data lives in your browser's `localStorage`; all adoption profiles, stats and sample reports are **demonstration data**.

## Folder structure
```
pawcare/
├── index.html   # all pages (hash-routed sections)
├── style.css    # theme, layout, dark mode, responsive rules
├── app.js       # routing, forms, validation, localStorage, rendering
├── .nojekyll    # tells GitHub Pages to serve files as-is
└── README.md
```

## Run locally
Double-click `index.html`, or for a server: `python -m http.server 8000` then open http://localhost:8000.
(Use the browser's DevTools → Application → Local Storage → clear `pc_*` keys to reset demo data.)

## Publish on GitHub Pages
1. Create a GitHub account and click **New repository** → name it `pawcare` → Public → Create.
2. Upload: on the empty repo page choose **uploading an existing file**, drag in `index.html`, `style.css`, `app.js`, `README.md`, `.nojekyll` (keep them in the repo root) → **Commit changes**.
   Or with Git: `git init && git add . && git commit -m "PAWCARE" && git branch -M main && git remote add origin https://github.com/<you>/pawcare.git && git push -u origin main`
3. Repo **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save.
4. After ~1 minute the site is live at `https://<you>.github.io/pawcare/`.
Refresh and back/forward work because navigation uses URL hashes (`#adopt`) and all paths are relative (works under the `/pawcare/` sub-path).

## Features
- **Home** – hero, pet/stray intro, featured dogs, impact stats, volunteer CTA, testimonials.
- **My Pets** – add/edit/delete profiles with photo; log feeding, vaccination, grooming, vet visits; future dates = reminders, past = history.
- **Help a Stray** – report with animal, help type, urgency, location, description, optional photo; community feed with filter; volunteers mark *being handled* / *resolved*; safety warning shown.
- **Volunteer** – registration form with the four categories and availability.
- **Adoption** – search + age filter, enquiry dialog with application form (demo profiles).
- **Donate** – food / water / medical offer form; clearly no payment processing.
- **Impact** – demo seed numbers plus live counts from your local submissions.
- Cross-cutting: form validation, toast notifications, empty/loading states, dark mode, responsive menu, image fallback if a photo URL fails.

## Viva script (≈2 minutes)
"Good morning. My project is PAWCARE, a web platform with two goals: help owners manage pet health and help communities support stray animals. I used prompt engineering to specify a role (senior full-stack developer and UI/UX designer), clear scope, design rules, constraints (no backend, no fake AI, no payments) and deliverables, then refined the output. It's built with HTML, CSS and JavaScript and stores data in localStorage. I'll demo: adding a pet and a vaccination reminder; reporting a stray and marking it handled; searching adoption listings; submitting a volunteer form with validation; and toggling dark mode. Stats and adoption profiles are labelled demo data, and donations are not processed, which keeps the project honest. It's deployed on GitHub Pages. Future work: a real database, user logins and verified NGO partners. Thank you."
