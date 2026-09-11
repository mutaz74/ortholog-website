import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const support = readFileSync(new URL('../dist/support/index.html', import.meta.url), 'utf8');
const privacy = readFileSync(new URL('../dist/privacy/index.html', import.meta.url), 'utf8');
const robots = readFileSync(new URL('../dist/robots.txt', import.meta.url), 'utf8');
const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

const required = [
  'A logbook designed around your residency.',
  'Fast, smart logging',
  'Fully private — no account or login',
  'Offline — no cloud required',
  'Fully offline. No third-party cloud.',
  'Your case log is stored on your iPhone and syncs through your private iCloud account.',
  'How logging works.',
  'Record your involvement, approach, technique, graft, components',
  'Attach pre-op, intra-op and post-op images, each with a note about what happened.',
  'Export when you need it',
  'Bring your existing casebook.',
  'If your current casebook is a spreadsheet, import it into OrthoLog.',
  'Review before import',
  'Free on the App Store.',
  'Download on the App Store',
  'loading="lazy"',
  'name="robots" content="index, follow"',
  'href="/styles.css?v=20260910d"',
  'class="iphone13-screen"',
  'src="/assets/iphone13-home.png"',
  'src="/assets/iphone13-procedure.png"',
  'src="/assets/iphone13-photos.png"',
  'width="1170" height="2532"',
  '© 2026 Mutaz M. Tageldein. OrthoLog is not a diagnostic or treatment tool.',
];

const forbidden = [
  'Log the case before the next one starts.',
  'Routine cases in seconds',
  'Record the details worth keeping.',
  'Export the record you need.',
  'Review and export.',
  'Get support',
  'OrthoLog is free on the App Store.',
  'View on the App Store',
  'Free · iPhone · iOS 17+',
  'class="intro',
  'class="feature-index"',
  'class="privacy-mark"',
  'class="privacy-facts"',
  'class="section-label"',
  'class="figure-label"',
  'class="feature-number"',
  'class="eyebrow"',
  'On-device voice',
  'class="floating-note"',
  'class="orbit ',
  'Made for the rhythm of residency',
  'Fast when it should be. Detailed when it needs to be.',
  'Built to get out of the way',
  '© 2026 Mutaz Mohamed.',
  'src="/assets/screen-10.png"',
  'class="detail-strip',
  'class="detail-visual',
  'class="detail-copy',
  'class="detail-points',
  'class="phone phone-export',
  'class="export-card',
  'src="/assets/screen-01.png"',
  'src="/assets/screen-02.png"',
  'src="/assets/screen-05.png"',
  'class="app-screen-crop"',
];

for (const value of required) {
  assert.ok(home.includes(value), `Missing required homepage content: ${value}`);
}

for (const value of forbidden) {
  assert.ok(!home.includes(value), `Forbidden homepage content remains: ${value}`);
}

assert.ok(home.indexOf('privacy-section') < home.indexOf('showcase section-shell'), 'Privacy must appear directly after the hero.');
assert.ok(home.includes('class="showcase section-shell" id="features"'), 'Features navigation must lead to the logging workflow.');
assert.ok(!support.includes('built and maintained by an orthopedic surgery resident'), 'Incorrect developer description remains on support page.');
assert.ok(!support.includes('View on the App Store'), 'Old App Store action remains on support page.');
assert.ok(!support.includes('support@ortholog.ca'), 'Support page must use the configured hello@ortholog.ca address.');
assert.ok(support.includes('mailto:hello@ortholog.ca?subject=OrthoLog%20support'), 'Support email link is missing.');
assert.ok(support.includes('© 2026 Mutaz M. Tageldein. OrthoLog is not a diagnostic or treatment tool.'), 'Support footer is out of date.');
assert.ok(privacy.includes('© 2026 Mutaz M. Tageldein. OrthoLog is not a diagnostic or treatment tool.'), 'Privacy footer is out of date.');

for (const value of ['.iphone13-screen', '.phone-screen::after', '.privacy-copy', '.workflow-list', '.import-copy', '.import-review', '.final-cta']) {
  assert.ok(styles.includes(value), `Missing required style: ${value}`);
}

for (const value of ['.intro', '.section-heading', '.feature-index', '.feature-item', '.privacy-mark', '.privacy-facts', '.section-label', '.figure-label', '.feature-number', '.eyebrow', '.orbit-one', '.orbit-two', '.floating-note', '.feature-card:hover', '.detail-strip', '.detail-visual', '.detail-copy', '.detail-points', '.phone-export', '.export-card', '.phone::after', '.phone-small::after', '.app-screen-crop']) {
  assert.ok(!styles.includes(value), `Obsolete homepage style remains: ${value}`);
}

assert.equal((home.match(/class="iphone13-screen"/g) ?? []).length, 3, 'Homepage must use exactly three iPhone 13 screenshots.');

assert.ok(robots.includes('User-agent: *\nAllow: /'), 'robots.txt must allow crawling.');
assert.ok(robots.includes('Sitemap: https://ortholog.ca/sitemap.xml'), 'robots.txt must point to the sitemap.');
for (const url of ['https://ortholog.ca/', 'https://ortholog.ca/privacy/', 'https://ortholog.ca/support/']) {
  assert.ok(sitemap.includes(`<loc>${url}</loc>`), `Missing sitemap URL: ${url}`);
}

console.log('Homepage content contract passed.');
