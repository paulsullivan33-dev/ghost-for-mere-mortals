// Publish one post through Ghost's Admin API.
//
// Usage:
//   GHOST_ADMIN_API_KEY="<key id>:<hex secret>" node publish-post.mjs
//
// The key comes from Ghost Admin: Settings -> Integrations -> your
// integration -> Admin API Key. Ghost shows it as one string in the
// form id:secret. The JWT is signed with the secret half only — the
// part after the colon — decoded from hex. (Transcript t08 shows what
// happens if you sign with the whole string: 401, invalid signature.)
//
// Expects jsonwebtoken to be importable: run this from a directory
// where `npm install jsonwebtoken` has been done, or adjust the path.

import jwt from 'jsonwebtoken';

const key = process.env.GHOST_ADMIN_API_KEY;
if (!key || !key.includes(':')) {
    console.error('Set GHOST_ADMIN_API_KEY to the "id:secret" string from your integration.');
    process.exit(1);
}
const [id, secret] = key.split(':');

const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/'
});

const post = {
    title: 'First entry — why this notebook exists',
    html: '<p>Every workshop keeps two sets of tools. The first set lives on the bench. The second set lives in somebody\'s head: which saw blade suits which timber, why the blue tin is the one with the good screws, what that rattle in the drill press turned out to be.</p><p>This notebook is where the second set gets written down. One short entry at a time, dated, so that future me can find out what past me was thinking.</p><p>Rule one: if it is not written down, it did not happen. Rule two: short beats perfect.</p>',
    status: 'published',
    tags: [{name: 'Notebook'}]
};

const res = await fetch('http://localhost:2368/ghost/api/admin/posts/?source=html', {
    method: 'POST',
    headers: {
        'Authorization': `Ghost ${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({posts: [post]})
});
const body = await res.json();
console.log('POST /ghost/api/admin/posts/?source=html -> HTTP', res.status);
if (body.posts) {
    const p = body.posts[0];
    console.log(JSON.stringify({title: p.title, slug: p.slug, status: p.status, url: p.url, published_at: p.published_at}, null, 1));
} else {
    console.log(JSON.stringify(body, null, 1));
}
