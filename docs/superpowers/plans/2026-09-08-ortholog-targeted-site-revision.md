# OrthoLog Targeted Site Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the obvious AI-generated landing-page signatures from the OrthoLog homepage while preserving its identity, structure and strongest headline.

**Architecture:** Keep the existing static HTML/CSS/JavaScript site and its current build process. Revise homepage semantics and copy in `src/index.html`, then replace only the affected styling rules in `src/styles.css`; support and privacy content remain intact. Add a small dependency-free Node check so approved and forbidden copy/structures can be verified after every build.

**Tech Stack:** Semantic HTML, CSS, vanilla JavaScript, Node.js 22, existing static build script.

## Global Constraints

- Keep the existing paper background, teal brand colour, real app screenshots, major section order and App Store focus.
- Keep the hero headline exactly `Log the case before the next one starts.`
- Use the approved Product-direct voice for the rest of the page.
- Do not add a framework, runtime dependency, testimonial, fabricated metric, endorsement or unsupported claim.
- Preserve privacy and support routes, legal statements, keyboard focus, responsive behavior and reduced-motion support.
- Remove gradients, glass effects, decorative blobs, universal fade-up staging and the repeated rounded-feature-card pattern from the homepage.

---

### Task 1: Add the content contract and revise homepage markup

**Files:**
- Create: `scripts/check-site.mjs`
- Modify: `package.json`
- Modify: `src/index.html:6-192`

**Interfaces:**
- Consumes: `scripts/build.mjs` output at `dist/index.html`.
- Produces: `npm run check`, revised semantic classes `.section-label`, `.figure-label`, `.feature-index` and `.feature-item` for Task 2.

- [ ] **Step 1: Add a failing content check**

Create `scripts/check-site.mjs` with dependency-free assertions:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

const required = [
  'Log the case before the next one starts.',
  'Log procedures and operative details on your iPhone.',
  'Record the details worth keeping.',
  'How logging works.',
  'Export the record you need.',
  'No OrthoLog account. No OrthoLog server.',
  'OrthoLog is free on the App Store.',
  'class="feature-index"',
  'class="figure-label"',
];

const forbidden = [
  'class="floating-note"',
  'class="orbit ',
  'Made for the rhythm of residency',
  'Fast when it should be. Detailed when it needs to be.',
  'Built to get out of the way',
];

for (const value of required) {
  assert.ok(home.includes(value), `Missing required homepage content: ${value}`);
}

for (const value of forbidden) {
  assert.ok(!home.includes(value), `Forbidden homepage content remains: ${value}`);
}

console.log('Homepage content contract passed.');
```

Add this script to `package.json`:

```json
"check": "npm run build && node scripts/check-site.mjs"
```

- [ ] **Step 2: Run the check to verify it fails**

Run: `npm run check`

Expected: FAIL with `Missing required homepage content: Log procedures and operative details on your iPhone.`

- [ ] **Step 3: Revise the homepage markup and copy**

In `src/index.html`:

- Replace the description meta content with `Log procedures and operative details on your iPhone. Search your history and export a spreadsheet or case book when you need it.`
- Keep the existing page order and IDs.
- Remove all `reveal`, `reveal-delay*`, `orbit*` and `floating-note` homepage markup.
- Use this hero copy and figure treatment:

```html
<p class="section-label">Surgical case log <span aria-hidden="true">/</span> iPhone</p>
<h1>Log the case before the next one starts.</h1>
<p class="hero-lede">
  Log procedures and operative details on your iPhone. Search your history and export a spreadsheet or case book when you need it.
</p>
<div class="device-stage" aria-label="OrthoLog quick log screen">
  <span class="figure-label">Fig. 01 <span aria-hidden="true">/</span> Quick log</span>
  <!-- keep the existing phone and screen-01 image -->
</div>
```

- Preserve the three proof facts while changing `Offline first / built for the hospital` to `Works offline / logging does not require a connection`.
- Replace the three feature cards with one `<div class="feature-index">` containing three `<article class="feature-item">` entries, numbered `01`, `02`, and `03`, with this exact copy:

```html
<h2>Record the details worth keeping.</h2>
<p>Start with the procedure. Add your role, approach, technique, graft, components or other fields that apply to the operation.</p>

<h3>Find the procedure</h3>
<p>Search the catalog, use the body map or start from a recent case.</p>

<h3>Add the operative detail</h3>
<p>Record your involvement and the procedure-specific fields you want to keep.</p>

<h3>Review and export</h3>
<p>Filter your history, then export a spreadsheet or a case book with images.</p>
```

- Revise the workflow heading to `How logging works.` and its three steps to `Choose a procedure`, `Add the fields that apply`, and `Save the case` using the approved design specification text.
- Revise the export heading and body to `Export the record you need.` and the approved filter/export explanation. Change the floating export-card label to functional metadata: `Spreadsheet or case book` with the body `Export structured case data, or create an offline case book containing the images you chose to attach.`
- Revise privacy to `No OrthoLog account. No OrthoLog server.` with the approved factual body.
- Revise the final action to `OrthoLog is free on the App Store.` and `Available for iPhone on iOS 17 or later.`

- [ ] **Step 4: Run the content check**

Run: `npm run check`

Expected: `Homepage content contract passed.`

- [ ] **Step 5: Commit the content revision**

```bash
git add package.json scripts/check-site.mjs src/index.html
git commit -m "Rewrite homepage in a direct product voice"
```

---

### Task 2: Apply the restrained Clinical Index styling layer

**Files:**
- Modify: `scripts/check-site.mjs`
- Modify: `src/styles.css:1-1585`

**Interfaces:**
- Consumes: `.section-label`, `.figure-label`, `.feature-index` and `.feature-item` from Task 1.
- Produces: the finished desktop and responsive Clinical Index presentation without changing interior-page content.

- [ ] **Step 1: Extend the check with a CSS contract**

Read `src/styles.css` and assert the revised system is present and old homepage decoration is absent:

```js
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

for (const value of ['.section-label', '.figure-label', '.feature-index', '.feature-item']) {
  assert.ok(styles.includes(value), `Missing required style: ${value}`);
}

for (const value of ['.orbit-one', '.orbit-two', '.floating-note', '.feature-card:hover']) {
  assert.ok(!styles.includes(value), `Obsolete homepage style remains: ${value}`);
}
```

- [ ] **Step 2: Run the check to verify the CSS contract fails**

Run: `npm run check`

Expected: FAIL with `Missing required style: .section-label`

- [ ] **Step 3: Replace the affected homepage styles**

Make these exact system changes in `src/styles.css`:

- Keep the existing colour palette and typography fallback, but set `--radius: 12px`, reduce `--shadow-soft`, and add `--mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace`.
- Remove the dotted body texture.
- Reduce website-control radii: header `12px`, buttons `8px`, small buttons `7px`, menu `8px`. Keep phone-device radii unchanged.
- Remove hero pseudo-element blobs and all orbit/floating-note selectors.
- Give `.device-stage` a flat `var(--teal-soft)` field, `border: 1px solid rgba(7,91,81,.18)`, `border-radius: 12px`, and `overflow: hidden`; keep the actual phone as the visual focus.
- Define `.section-label` and `.figure-label` as small functional monospace metadata with teal text and no decorative leading bar.
- Replace `.feature-grid` and `.feature-card*` with a single `.feature-index` bordered container and three `.feature-item` columns separated by rules. Feature numbers use monospace teal; icons, hover elevation and individual card backgrounds are removed.
- Reduce the showcase radius to `14px`; keep its dark grid because it directly illustrates the step sequence, but remove the gradient mask.
- Reduce `detail-visual`, `privacy-panel` and `final-cta` radii to `12px`; remove the circular `detail-visual::after`, glass/backdrop-filter styling and large soft card shadows.
- Remove the `.reveal*` animation rules and their related responsive selectors. Keep the `prefers-reduced-motion` block for scroll and transition safety.
- Update the 1050px, 820px and 560px breakpoints so the feature index becomes one column with horizontal separators, the flat hero figure remains readable, and no removed selector is referenced.
- Keep interior-page selectors functional; apply the same restrained radius values to support and legal containers only where they share global tokens.

- [ ] **Step 4: Run the full check**

Run: `npm run check`

Expected: `Homepage content contract passed.`

- [ ] **Step 5: Commit the visual revision**

```bash
git add scripts/check-site.mjs src/styles.css
git commit -m "Refine homepage with clinical index styling"
```

---

### Task 3: Build and visually verify the revision

**Files:**
- Verify: `dist/index.html`
- Verify: `dist/styles.css`
- Verify: `dist/support/index.html`
- Verify: `dist/privacy/index.html`

**Interfaces:**
- Consumes: the revised source and `npm run check` from Tasks 1 and 2.
- Produces: a locally verified site ready for the user's visual approval before push/publication.

- [ ] **Step 1: Run the production check from a clean build**

Run: `npm run check`

Expected: build completes and prints `Homepage content contract passed.`

- [ ] **Step 2: Check generated routes and required assets**

Run:

```bash
test -f dist/index.html
test -f dist/styles.css
test -f dist/support/index.html
test -f dist/privacy/index.html
test -f dist/assets/screen-01.png
test -f dist/assets/screen-02.png
test -f dist/assets/screen-07.png
test -f dist/assets/screen-08.png
```

Expected: every command exits successfully.

- [ ] **Step 3: Start the existing local preview server**

Run: `npm run dev`

Expected: the server reports the local preview URL without downloading dependencies.

- [ ] **Step 4: Inspect desktop and mobile layouts**

At desktop width, verify header alignment, readable hero text, phone framing, divided feature index, workflow phones, export composition, privacy facts and final action. At approximately 390px width, verify there is no horizontal overflow, navigation opens and closes, feature entries stack, copy remains readable and all phone images remain clipped correctly.

- [ ] **Step 5: Verify navigation and external actions**

Confirm `/privacy/`, `/support/`, `mailto:hello@ortholog.ca` and every App Store action resolve to the intended targets. Confirm all images return successfully and meaningful image alt text remains present.

- [ ] **Step 6: Review the complete diff**

Run: `git diff 0c05054..HEAD --check`

Expected: no whitespace errors.

Run: `git status --short`

Expected: clean working tree.

- [ ] **Step 7: Present the local preview for approval**

Open the local site for the user and explicitly state that production has not been changed. Do not push until the user approves the completed visual revision.
