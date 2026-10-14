# Standards Explorer: Discover the Learning Connections

An interactive discovery and reference tool for high school science teachers exploring the **2026 New Jersey Student Learning Standards for Science (NJSLS-S)**. Choose a course, open any performance expectation (PE), and follow its connections: what it really asks, where students met the ideas before (K–8), related high school standards, the three dimensions, and phenomena worth exploring.

It is **not** a game, a quiz, a curriculum builder, or a required PD module. There are no stages, scores, or required answers.

---

## Run it

**Option 1: double-click.** Open `index.html` in Chrome, Edge, or Firefox. No installation, build step, internet connection, or account is needed. Everything runs in the browser from local files.

**Option 2: local web server** (useful for running the tests):

```bash
powershell -ExecutionPolicy Bypass -File tools\serve.ps1
```

Then open <http://localhost:8080/> for the app, <http://localhost:8080/tests/> for the tests, and <http://localhost:8080/tools/validate.html> for the data report. Press Ctrl+C to stop. The script uses only built-in Windows PowerShell. On a Mac or Chromebook (Linux), any static server works, for example `python3 -m http.server 8080`.

### Deep links

The app uses hash routes, so you can link straight to a view from a Google Site or district page:

| Link | Opens |
|---|---|
| `…/index.html#/course/physics` | Physics starting points |
| `…/index.html#/explore/HS-PS2-1` | The HS-PS2-1 exploration workspace |
| `…/index.html#/topics/kinematics` | The "I Teach This Topic" page for kinematics |

---

## Deploy (static hosting)

The whole folder is a static website. There is no backend, database, API key, login, or paid AI service.

1. **GitHub Pages (recommended, free):** create a repository, upload the contents of this folder, then go to *Settings → Pages → Deploy from branch → main / root*. Your URL will look like `https://<account>.github.io/<repo>/`.
2. **Google Sites:** in the Sites editor choose *Insert → Embed → By URL* and paste the GitHub Pages URL (embed the whole page and make the embed tall, about 900 px). Alternatively add a button or link that opens the tool in a new tab, which gives teachers more room on Chromebooks.
3. **District web server:** copy the folder to any web directory.

When you publish an update, raise the `?v=` number on the asset links in `index.html` (currently `?v=8`) so browsers fetch the new files instead of cached copies.

Saved explorations live in each teacher's browser (`localStorage`, key `standards-explorer-v1`) on that device. Teachers can export a JSON file to move between devices, and print or save a PDF summary.

---

## What's inside

```
index.html                     app entry point (loads the scripts below in order)
css/app.css                    all styles: layout, map, panels, print, responsive, reduced motion
sources/NJSLS-Science-2026-Reference-Pack.md   source of truth for official standards data
data/
  generated/standards.js       ← GENERATED: all 208 PEs (verbatim text), HS foundations, model placement
  generated/dci-progressions.js← GENERATED: K–12 progression table by DCI component (compiled)
  generated/model-curriculum.js← GENERATED: NJDOE HS model scope and sequence
  vocab.js                     courses and starting points, SEP/CCC descriptions, practice-language patterns
  interpretations.js           curated "What is this standard really asking?" content
  prior-learning.js            curated K–12 progressions (prior-learning steps and narratives)
  relationships.js             curated relationships between standards (with category, status, evidence)
  phenomena.js                 curated phenomena
  reflections.js               "Something to Think About" prompts
  topics.js                    "I Teach This Topic" mappings
js/core/                       logic with no UI: store, practices, engine, search, state, validate
js/ui/                         interface: icons, graph (SVG network), panels, views, exploration, app
tests/                         in-browser test runner, unit tests, end-to-end tests
tools/build-standards.ps1      regenerates data/generated/ from the reference pack (with cross-checks)
tools/validate.html            data validation and curation-coverage report
tools/serve.ps1                tiny local web server
```

The architecture is deliberately **no-build** (plain JavaScript files on a `window.SE` namespace). Anyone can edit a data file in a text editor, refresh the browser, and see the change. Nothing needs to be compiled or installed.

---

## Accuracy model: three kinds of information

Every item in the interface carries one of these labels:

| Label | Meaning | Examples |
|---|---|---|
| **Official** | Verbatim NJDOE 2026 wording, or NGSS foundation-box categories | PE text, DCI/SEP/CCC of HS PEs |
| **Documented** | Supported by an official structure | NJDOE K–12 progression table (compiled), shared NGSS foundation DCI, NJDOE model unit co-placement, official PE or clarification wording |
| **Suggested** | Professional instructional suggestions written for this app | interpretations, progression narratives, many relationships, phenomena, reflections, topic mappings |

Rules the engine enforces:

- A prior-learning step is **documented** only if the earlier PE appears in the progression table under one of the HS PE's DCI components. Otherwise it is shown as **suggested**, even if a curator wrote it.
- A shared DCI is shown as a documented *disciplinary* link, **never** as a prerequisite. Computed links say so explicitly.
- NJDOE model-unit co-placement is described as "one example sequence," never as a required order.
- Earlier-grade PEs use "students were expected to…" language and never claim mastery.
- PEs without curated content show only official metadata and computed, labeled links. Nothing is invented to look complete.

### Known limitations of the source data

- **Clarification statements and assessment boundaries** are paraphrases of NGSS (NJDOE's 2026 pages do not print them). Source links point to the official wording.
- The **K–12 progression table** was compiled from the NJDOE Science Disciplinary Progressions PDF plus NGSS foundation tags. Verify rows against STAMP before high-stakes use.
- **K–8 foundation boxes** (SEP/DCI/CCC elements) are not in the dataset. For K–8 PEs, DCI components come from the progression table, and practice families are read from the PE wording, labeled "from wording."
- SEP/CCC entries are category names, not detailed element text. The K–12 practice progressions are **paraphrased** from NGSS Appendix F.
- **Curated coverage:** 26 HS PEs have full curated interpretations and progression narratives (10 Physics-pathway, 8 Chemistry, 8 Biology), plus 71 curated relationships, 32 phenomena, and 28 topics. All 71 HS PEs (and all 208 PEs) are searchable and explorable with their official information. `tools/validate.html` shows exactly which PEs have curated content.

Curated content was drafted with AI assistance during development and checked against the official wording, foundations, and clarification paraphrases. It should still get a teacher or coordinator review before district-level use.

---

## Maintaining the data

### Official standards (generated)

Do **not** edit `data/generated/*.js` by hand. To correct or update official information:

1. Edit `sources/NJSLS-Science-2026-Reference-Pack.md`.
2. Rebuild:

   ```bash
   powershell -ExecutionPolicy Bypass -File tools\build-standards.ps1
   ```

   The script stops with a list of problems if: the PE count isn't 208 or the HS count isn't 71; any code is duplicated; the section 6 and section 7 wording differ; a DCI, SEP, or CCC is unknown; a progression-table code is missing or in the wrong band; a model unit lists an unknown code; or HS-ESS3-2 lacks the revised 2026 wording.
3. Open `tools/validate.html` and the tests.

### Curated content

Each curated file documents its schema in the comment at the top. Common tasks:

- **Add an interpretation:** add an entry to `data/interpretations.js` keyed by PE code. Clickable `phrases` must match the PE wording **exactly**; the validator checks this.
- **Add a progression:** add an entry to `data/prior-learning.js`. Set `expect` to `'documented'` or `'suggested'` for each step. The validator fails if your expectation disagrees with the progression table, which catches over-claiming.
- **Add a relationship:** add an entry to `data/relationships.js`. A `documented` relationship needs non-`reasoning` evidence (`shared-dci`, `model-unit`, `wording`, or `clarification`). The validator confirms that shared-DCI and model-unit claims are true and that every named unit really contains both PEs.
- **Add a phenomenon:** add an entry to `data/phenomena.js` with an `alignment` (direct, application, or extension) for each listed PE. An `extension` must explain its `caveats`.
- **Add a starting point:** edit `courses.<course>.starters` in `data/vocab.js`.

After any change, open `tools/validate.html` (must show **No errors**) and `tests/` (must show **ALL PASSED**).

---

## Tests

Open `tests/index.html` through the local server (`http://localhost:8080/tests/`). The suite has 67 tests:

- **Unit:** standards lookup and counts, revised wording, practice highlighting, search (codes, ideas, topics, practices), prior-learning classification (documented vs. suggested), relationship classification (no shared-DCI prerequisite claims), network model, 3D, phenomena ordering, reflections, Surprise Me ranking, state save/restore, trail, export/import round-trip, import validation (rejects foreign files, drops invented codes), and printable summary labels.
- **End-to-end** (the real app mounted with in-memory storage): selecting a course; searching and opening HS-PS2-1; map nodes, previews, and "why connected" lines; phrase explanations; following a prior-learning connection to MS-PS2-2; returning through the trail; exploring HS-PS2-3 and its collision-safety phenomenon; Surprise Me; bookmarking two standards and a phenomenon; saving a note and a reflection question; exporting, resetting, and importing (API and file picker); printing; the list view; collapsing and expanding branches; the Biology (HS-LS1-7) and Chemistry (HS-PS1-7) pathways; an uncurated PE; a middle school PE; and the topic bridge.

The page title shows `PASS n/n` or `FAIL`, and `window.TEST_RESULTS` holds the results for automation.

---

## Accessibility and devices

- Every graph node and branch is keyboard-focusable (Tab, Enter). In the map, `+` and `-` zoom, `0` resets, and the arrow keys pan.
- The **List** view presents every connection as readable text. Phones start in List view.
- Color is never the only signal: connection types also differ by line style (solid, dotted, dashed) and by text labels and chips.
- Supports `prefers-reduced-motion`; tested at 1366×680 (Chromebook) and 375×812 (phone).
- On narrower desktops the sidebar steps aside while you explore so the map has room. The ☰ button brings it back.

## Sources

- NJDOE 2026 NJSLS-Science: <https://nj.gov/education/standards/science/2026/>
- NJDOE Science Disciplinary Progressions: <https://www.nj.gov/education/standards/stamp/docs/Science_Disciplinary_Progressions.pdf>
- Revisions in the 2026 NJSLS-S: <https://www.nj.gov/education/standards/stamp/docs/Revisions_2026_NJSLS_S.docx>
- NJDOE HS Model Scope and Sequence: <https://nj.gov/education/standards/science/accessible_9to12scope.shtml>
- NGSS DCI arrangements (foundation boxes, clarification statements): <https://www.nextgenscience.org/dci-arrangement/>
- NGSS Appendix F (practice progressions): <https://www.nationalacademies.org/read/18290/chapter/12>
