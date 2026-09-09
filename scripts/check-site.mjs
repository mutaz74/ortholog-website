import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const support = readFileSync(new URL('../dist/support/index.html', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

const required = [
  'A logbook designed around your residency.',
  'Routine cases in seconds',
  'Fully offline. No third-party cloud.',
  'Record the details worth keeping.',
  'How logging works.',
  'Attach pre-op, intra-op and post-op images, each with a note about what happened.',
  'Review and export.',
  'Free on the App Store.',
  'Download on the App Store',
  'src="/assets/screen-05.png"',
  'loading="lazy"',
  'class="feature-index"',
  'class="app-screen-crop"',
];

const forbidden = [
  'Log the case before the next one starts.',
  'Export the record you need.',
  'OrthoLog is free on the App Store.',
  'View on the App Store',
  'Free · iPhone · iOS 17+',
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
];

for (const value of required) {
  assert.ok(home.includes(value), `Missing required homepage content: ${value}`);
}

for (const value of forbidden) {
  assert.ok(!home.includes(value), `Forbidden homepage content remains: ${value}`);
}

assert.ok(home.indexOf('privacy-section') < home.indexOf('intro section-shell'), 'Privacy must appear directly after the hero.');
assert.ok(!support.includes('built and maintained by an orthopedic surgery resident'), 'Incorrect developer description remains on support page.');
assert.ok(!support.includes('View on the App Store'), 'Old App Store action remains on support page.');

for (const value of ['.app-screen-crop', '.feature-index', '.feature-item']) {
  assert.ok(styles.includes(value), `Missing required style: ${value}`);
}

for (const value of ['.section-label', '.figure-label', '.feature-number', '.eyebrow', '.orbit-one', '.orbit-two', '.floating-note', '.feature-card:hover']) {
  assert.ok(!styles.includes(value), `Obsolete homepage style remains: ${value}`);
}

console.log('Homepage content contract passed.');
