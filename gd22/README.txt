Hotel Reception Practice App

Files
- index.html
- styles.css
- app.js
- words.json

Before use
1. Put all files in the same folder.
2. If you want Google Form auto-submit:
   - Open app.js
   - Find GOOGLE_FORM
   - Paste your form POST URL into actionUrl
   - Put your 4 entry IDs into:
     name
     group
     topic
     payload
3. Keep words.json external. The app loads it with fetch('./words.json').

Important
- For words.json to load, run from a web server or GitHub Pages.
- Opening index.html directly as file:// may block fetch in some browsers.
- Progress is autosaved inside the active session, but security rules intentionally reset the task set after tab leave, minimize, or refresh.

Payload format
The form receives:
- student name
- group
- topic
- final JSON payload with summary only
  (score, percent, total time, per-item result + time)
No question text or answer text is submitted.


Locked-result update:
- completed students now reopen directly to the saved result screen
- no New set / retry button
- result survives from saved cache and cookie data
