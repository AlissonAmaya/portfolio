# Developer Portfolio Template

Plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no build step. **Every piece of personal content lives in `js/data.js`.** All sample content is labeled "Sample data" on the page.

## Structure
```
index.html        page skeleton (no personal text)
css/styles.css    design tokens + styles (section 1 = colors)
js/data.js        YOUR information (edit this)
js/script.js      rendering logic (no need to edit)
assets/           images/, icons/, documents/
```

## Run locally
Double-click `index.html`, or for a more realistic test run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## Customize (all in `js/data.js` unless noted)
| Task | Edit |
|---|---|
| Name, title, location, email, intro | `personal` |
| Profile picture | Put the file in `assets/images/`, set `personal.profileImage`. If the file is missing, your initials are shown. |
| CV | Put the PDF in `assets/documents/`, set `personal.cv: "assets/documents/cv.pdf"`. Empty = button hidden. |
| Social links | `social`: add any key, e.g. `youtube: "https://..."`. Empty values are hidden. |
| About text | `about.paragraphs` and `about.highlights` |
| Skills | `skills`: add `{ category: "Cloud", items: ["AWS"] }`. Names only, no levels. |
| Projects | `projects`: copy one object. Leave `repo` or `demo` as `""` to hide that button. `image` is optional (`assets/images/shot.png`). Filter buttons appear automatically when there are 2+ categories. Delete `sample: true`. |
| Academic experience | `education`: one object per entry; `current: true` shows "Present". |
| Professional experience | `experience`. If empty (`[]`), `experienceEmptyMessage` is shown. |
| Certifications / achievements | `certifications`: use `type` for Course, Competition, Scholarship, etc. `link` is optional. |
| Colors | `css/styles.css` section 1: `:root` (light) and `[data-theme="dark"]` (dark). |
| Page title / link preview | The title and description update from `data.js`; also edit the `<meta>` tags in `index.html` and add `og:image` for previews. |

Example project:
```js
{ name: "Budget App", category: "Web", status: "Completed", image: "",
  tech: ["JavaScript"], description: "Tracks expenses.",
  repo: "https://github.com/me/budget", demo: "" }
```

## Contact form
It validates the fields, then opens the visitor's email app (`mailto:` to `personal.email`). It does **not** send messages to a server. To receive messages directly, use a form service (e.g. Formspree, Netlify Forms, Web3Forms): in `index.html` set `<form action="SERVICE_URL" method="POST">`, and in `js/script.js` replace the `location.href = mailto...` line with `f.submit()` once validation passes. Follow the service's own setup for field names and spam protection.

## Deploy
Upload the whole folder to GitHub Pages, Netlify (drag and drop) or Cloudflare Pages. `index.html` must stay at the root. Test the live site on your phone afterward.

## Notes
Content is inserted with `textContent` (not `innerHTML`), and only `http(s)`, `mailto:` and `assets/` links are accepted.
