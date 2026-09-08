import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

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

for (const value of ['.section-label', '.figure-label', '.feature-index', '.feature-item']) {
  assert.ok(styles.includes(value), `Missing required style: ${value}`);
}

for (const value of ['.orbit-one', '.orbit-two', '.floating-note', '.feature-card:hover']) {
  assert.ok(!styles.includes(value), `Obsolete homepage style remains: ${value}`);
}

console.log('Homepage content contract passed.');
