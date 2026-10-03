// Turns dist-preview/index.html into a body-only page for the hosted claude.ai preview,
// which wraps the published page in its own <!doctype><html><head><body> skeleton.
import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('dist-preview/index.html', 'utf8');
const pick = (re) => [...html.matchAll(re)].map((m) => m[0]);

const title = '<title>Stone &amp; Strings Storefront</title>';
const description = pick(/<meta name="description"[^>]*>/g);
const fonts = pick(/<link rel="preconnect"[^>]*>|<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g);
const styles = pick(/<link rel="stylesheet"[^>]*href="\.\/assets[^>]*>/g);
const scripts = pick(/<script type="module"[^>]*><\/script>/g);
const preloads = pick(/<link rel="modulepreload"[^>]*>/g);

if (!scripts.length) throw new Error('No module script found in dist-preview/index.html');

const page = [title, ...description, ...fonts, ...styles, ...preloads, ...scripts, '<div id="root"></div>', ''].join('\n');
writeFileSync('dist-preview/preview-page.html', page);
console.log('Wrote dist-preview/preview-page.html');
