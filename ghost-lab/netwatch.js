// netwatch.js — log every outbound http/https request with its URL and JS stack.
// Used in transcript t04 to find which request a first Ghost boot was waiting on.
//
// Run Ghost with it preloaded:
//   node --require ./netwatch.js index.js
const http = require('http');
const https = require('https');
function log(kind, target) {
    const stack = new Error('trace').stack.split('\n').slice(2, 9).join('\n');
    process.stderr.write(`\n[NETWATCH] ${kind}: ${target}\n${stack}\n`);
}
for (const [mod, name] of [[http, 'http'], [https, 'https']]) {
    const orig = mod.request;
    mod.request = function (...args) {
        try {
            const a = args[0];
            const url = typeof a === 'string' ? a : (a && a.href) || `${a && a.protocol}//${a && (a.host || a.hostname)}${a && a.path || ''}`;
            log(name + '.request', url);
        } catch (e) { /* ignore */ }
        return orig.apply(this, args);
    };
}
const origFetch = globalThis.fetch;
if (origFetch) {
    globalThis.fetch = function (url, ...rest) {
        log('fetch', typeof url === 'string' ? url : url && url.url);
        return origFetch.call(this, url, ...rest);
    };
}
