# OrthoLog website targeted design and copy revision

## Objective

Remove the recognizable AI-generated landing-page qualities from the OrthoLog website without replacing its identity or rebuilding its information architecture.

The revision should continue to feel warm, modern and recognizably OrthoLog. The existing paper background, teal brand colour, real app screenshots, major section order and App Store focus remain. Clinical Index is used as a restrained editing layer rather than a new visual identity.

## Voice

The hero headline remains exactly:

> Log the case before the next one starts.

The rest of the site uses the plain, factual voice represented by the approved Product-direct option. Copy should name real actions, fields and outputs instead of relying on broad marketing language.

Writing rules:

- Prefer concrete nouns and verbs: procedure, approach, technique, involvement, history, spreadsheet and case book.
- Use verifiable product facts such as no account, offline operation, private iCloud sync and a roughly ten-second routine entry.
- Avoid generic phrases such as “built for your workflow,” “designed to get out of the way,” “when it matters,” “seamless,” “powerful” and “effortless.”
- Do not place a promotional slogan or eyebrow above every section heading. Small labels should be functional metadata or section numbers.
- Use one strong idea per section. Avoid repeated contrast formulas and stacked rhetorical claims.
- Keep sentences short enough to scan, but do not make every line a slogan.

## Approved homepage copy direction

### Hero

- Label: `Surgical case log / iPhone`
- Headline: `Log the case before the next one starts.`
- Body: `Log procedures and operative details on your iPhone. Search your history and export a spreadsheet or case book when you need it.`
- Primary action: `View on the App Store`
- Supporting facts: `About 10 seconds for a routine case` · `No account` · `Works offline`

### Product details

- Heading: `Record the details worth keeping.`
- Body: `Start with the procedure. Add your role, approach, technique, graft, components or other fields that apply to the operation.`
- Item 1: `Find the procedure` — `Search the catalog, use the body map or start from a recent case.`
- Item 2: `Add the operative detail` — `Record your involvement and the procedure-specific fields you want to keep.`
- Item 3: `Review and export` — `Filter your history, then export a spreadsheet or a case book with images.`

### Logging workflow

- Heading: `How logging works.`
- Step 1: `Choose a procedure` — `Search the orthopedic catalog or tap an anatomic region.`
- Step 2: `Add the fields that apply` — `Record your involvement and the operative details specific to that procedure.`
- Step 3: `Save the case` — `The case stays searchable by date, rotation, site, surgeon and subspecialty.`

### Review and export

- Heading: `Export the record you need.`
- Body: `Filter your history by date, rotation, subspecialty, operation, procedure, involvement or attending. Export a spreadsheet for review, or a case book with the images you chose to attach.`
- Supporting point: `Searchable history` — `Return to the case behind any count.`
- Supporting point: `Photos remain private` — `Attached images stay on your devices and in exports you deliberately create.`

### Privacy

- Heading: `No OrthoLog account. No OrthoLog server.`
- Body: `Cases are stored on your iPhone and can sync through your private iCloud account. OrthoLog works without a sign-in, advertising or tracking.`
- Facts remain explicit: no account, works offline and on-device voice processing.

### Final action

- Heading: `OrthoLog is free on the App Store.`
- Body: `Available for iPhone on iOS 17 or later.`
- Actions: `Download OrthoLog` and `Get support`

The wording may receive minor grammatical or responsive-length adjustments during implementation, but no new marketing claims should be introduced.

## Visual changes

The current page structure remains: header, hero, product details, workflow, review/export, privacy, final action and footer.

Targeted changes:

- Remove the hero orbits, background glow and floating “Quick log” note.
- Retain the two-column hero and real app screenshot, presented on a flat pale-teal field with a small functional figure label.
- Replace repeated promotional eyebrow treatments with section numbers or simple functional labels where a label is genuinely useful.
- Replace the three separate rounded feature cards with one bordered feature index containing three clearly divided entries.
- Reduce oversized corner radii and soft drop shadows on website containers. The rounded geometry inside the real iPhone screenshots remains untouched.
- Use thin rules, square or lightly rounded containers and restrained monospace metadata from Clinical Index.
- Keep the existing warm paper, dark ink and OrthoLog teal palette. Do not add gradients, glass effects, neon glows or decorative blobs.
- Remove universal fade-up staging. If motion remains, it should be subtle and limited to the product image rather than applied to every section.

## Scope and implementation constraints

- Continue using the current static HTML, CSS and small JavaScript file. No new framework or package is required.
- Reuse the current app icon and deidentified screenshots.
- Preserve the privacy and support routes and all existing legal statements.
- Preserve accessibility features, keyboard focus styles, responsive behavior and reduced-motion support.
- Test the built site at desktop and mobile widths before publication.
- Do not add testimonials, fabricated metrics, institutional endorsements or unsupported claims.

## Acceptance criteria

- The hero headline is unchanged and its body uses the approved Product-direct wording.
- The page reads as one factual explanation rather than a sequence of marketing slogans.
- The main page order and recognizable OrthoLog visual identity remain intact.
- Decorative AI-template motifs and the repeated rounded-card pattern are removed.
- The site builds successfully, all local and external links work, and screenshots render correctly at desktop and mobile sizes.
