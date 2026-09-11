import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const inline = (value) => {
  let html = escapeHtml(value);
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
  return html;
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const renderMarkdown = (markdown) => {
  const lines = markdown.replaceAll('\r\n', '\n').split('\n');
  const output = [];
  const sections = [];
  let paragraph = [];
  let listType = null;
  let listItem = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    output.push(`<p>${inline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!listType) return;
    if (listItem.length) output.push(`<li>${inline(listItem.join(' '))}</li>`);
    output.push(`</${listType}>`);
    listType = null;
    listItem = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      const text = heading[2];
      const id = slugify(text);
      if (level === 2) sections.push({ id, text: text.replace(/\*\*/g, '') });
      output.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      continue;
    }

    if (trimmed.startsWith('|') && lines[index + 1]?.trim().match(/^\|?[\s:|-]+\|$/)) {
      flushParagraph();
      closeList();
      const tableLines = [trimmed];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      index -= 1;
      const rows = tableLines.map((row) => row.slice(1, row.endsWith('|') ? -1 : undefined).split('|').map((cell) => cell.trim()));
      const [headers, ...body] = rows;
      output.push('<table><thead><tr>');
      headers.forEach((cell) => output.push(`<th>${inline(cell)}</th>`));
      output.push('</tr></thead><tbody>');
      body.forEach((row) => {
        output.push('<tr>');
        row.forEach((cell) => output.push(`<td>${inline(cell)}</td>`));
        output.push('</tr>');
      });
      output.push('</tbody></table>');
      continue;
    }

    const unordered = trimmed.match(/^-\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const nextType = unordered ? 'ul' : 'ol';
      if (listType !== nextType) {
        closeList();
        listType = nextType;
        output.push(`<${listType}>`);
      } else if (listItem.length) {
        output.push(`<li>${inline(listItem.join(' '))}</li>`);
      }
      listItem = [(unordered ?? ordered)[1]];
      continue;
    }

    if (trimmed.startsWith('> ')) {
      flushParagraph();
      closeList();
      output.push(`<blockquote>${inline(trimmed.slice(2))}</blockquote>`);
      continue;
    }

    if (listType && listItem.length) {
      listItem.push(trimmed);
      continue;
    }

    closeList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();
  return { html: output.join('\n'), sections };
};

const privacyTemplate = (content, sections) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Privacy Policy — OrthoLog</title>
    <meta name="description" content="OrthoLog's privacy policy, written in plain language." />
    <meta name="theme-color" content="#f4f1ea" />
    <link rel="canonical" href="https://ortholog.ca/privacy/" />
    <link rel="icon" href="/assets/app-icon.png" />
    <link rel="stylesheet" href="/styles.css?v=20260910d" />
    <script src="/site.js" defer></script>
  </head>
  <body class="interior-page">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>
      <a class="brand" href="/" aria-label="OrthoLog home"><img src="/assets/app-icon.png" alt="" width="44" height="44" /><span>OrthoLog</span></a>
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-button><span></span><span></span><span></span><span class="sr-only">Open navigation</span></button>
      <nav class="site-nav" id="site-nav" aria-label="Primary navigation" data-menu>
        <a href="/#features">Features</a><a aria-current="page" href="/privacy/">Privacy</a><a href="/support/">Support</a><a class="button button-teal button-small" href="https://apps.apple.com/app/ortholog/id6792134663">Download on the App Store</a>
      </nav>
    </header>
    <main class="interior-main" id="main">
      <section class="interior-hero section-shell"><h1>Plain language. No fine-print surprises.</h1><p>This is the complete policy for what OrthoLog stores, what can be sent, and what always stays under your control.</p></section>
      <section class="legal-shell section-shell">
        <aside class="legal-index" aria-label="Privacy policy sections"><strong>On this page</strong>${sections.map(({ id, text }) => `<a href="#${id}">${inline(text)}</a>`).join('')}</aside>
        <article class="legal">${content}<div class="legal-contact"><strong>Questions?</strong><p>Email <a href="mailto:privacy@ortholog.ca">privacy@ortholog.ca</a>.</p></div></article>
      </section>
    </main>
    <footer class="site-footer section-shell"><div class="brand footer-brand"><img src="/assets/app-icon.png" alt="" width="40" height="40" /><span>OrthoLog</span></div><div class="footer-links"><a href="/">Home</a><a href="/support/">Support</a><a href="mailto:hello@ortholog.ca">hello@ortholog.ca</a></div><p>© 2026 Mutaz M. Tageldein. OrthoLog is not a diagnostic or treatment tool.</p></footer>
  </body>
</html>`;

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'support'), { recursive: true });
await mkdir(path.join(dist, 'privacy'), { recursive: true });
await cp(path.join(root, 'public'), dist, { recursive: true });
await cp(path.join(root, 'src', 'index.html'), path.join(dist, 'index.html'));
await cp(path.join(root, 'src', 'support.html'), path.join(dist, 'support', 'index.html'));
await cp(path.join(root, 'src', 'styles.css'), path.join(dist, 'styles.css'));
await cp(path.join(root, 'src', 'site.js'), path.join(dist, 'site.js'));

const policy = await readFile(path.join(root, 'content', 'privacy.md'), 'utf8');
const renderedPolicy = renderMarkdown(policy);
await writeFile(path.join(dist, 'privacy', 'index.html'), privacyTemplate(renderedPolicy.html, renderedPolicy.sections));
await writeFile(path.join(dist, '404.html'), '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found — OrthoLog</title><link rel="stylesheet" href="/styles.css?v=20260910d"><main class="interior-hero section-shell"><h1>That page is not here.</h1><p><a class="button button-dark" href="/">Return to OrthoLog</a></p></main>');

console.log('Built OrthoLog website in dist/');
