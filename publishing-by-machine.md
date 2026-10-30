# Publishing by Machine

**Outcome: a program of yours can
publish to Ghost — no screen, no
session — and you understand the
token it uses well enough to fix
the error everyone makes first.**
The checks: the API call at the
end answers `201`, and the post it
made passes chapter 7's checks.
Transcripts t07 and t08 are the
evidence; `ghost-lab/publish-post.mjs`
is the working script.

## Integrations: a door with a name

Programs do not sign in as you.
In the admin (Settings →
Integrations) you create an
**integration** — a named
connection, "Lab publisher" in
this guide — and Ghost issues it
two keys:

- a **Content key** (26 hex
  characters), for the read-only
  Content API of chapter 7;
- an **Admin API key**, for
  everything else.

The lab created its integration
the way the screens do, through
the API with a signed-in session
(transcript t07). Revoking an
integration kills its keys without
touching your password — the
reason programs get their own door
instead of borrowing yours.

## The Admin key has a colon in it

Ghost shows the Admin API key as
one string:

```text
6ae467dd...2037:6ae467dd...<64 hex characters>
```

That is **two values wearing one
coat**: the key's *id* (24 hex
characters) and its *secret* (64
hex characters), joined by a colon.
Ghost's own client libraries take
the whole string and split it for
you. If you sign a token by hand —
the rest of this chapter — you
must split it yourself. The lab
didn't, the first time, and got
the error this chapter exists to
save you from:

```text
POST /ghost/api/admin/posts/?source=html -> HTTP 401
"Invalid token: invalid signature"  (code: INVALID_JWT)
```

The API stores only the hex
secret; the verification decodes
it from hex (the lab read that
code to be sure). Sign with the
whole string and the signature is
made with the wrong bytes — valid
shape, wrong key, refused. Keys
shown in this guide are throwaway
lab values for a localhost-only
site; yours are credentials and
get the usual care.

## The token

The Admin API takes no bare key.
Each request carries a **JWT** — a
small signed token — in the header
`Authorization: Ghost <token>`,
with these properties:

- signed **HS256** with the secret,
  decoded from hex to bytes;
- the key **id** in the token's
  `kid` header, so Ghost knows
  which key to verify against;
- **audience** `/admin/`;
- a life of **five minutes**,
  maximum. Tokens are struck per
  job, never kept.

In Node, with the `jsonwebtoken`
library (the same one Ghost uses),
that is the whole mint:

```js
const [id, secret] = key.split(':');
const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/'
});
```

Five minutes sounds fiddly until
you see it as the design it is:
the long-lived secret never leaves
your machine; only a token that
expires before lunch crosses the
wire.

## Publishing with it

A post goes in as JSON. Sending
HTML is the practical route — the
`?source=html` tells Ghost to
convert it into its internal
format:

```http
POST /ghost/api/admin/posts/?source=html
Authorization: Ghost <token>

{"posts": [{
    "title": "First entry — why this notebook exists",
    "html": "<p>Every workshop keeps two sets of tools...</p>",
    "status": "published",
    "tags": [{"name": "Notebook"}]
}]}
```

and the answer is `201` with the
post as stored — slug made from
the title (`first-entry-why-this-notebook-exists`),
its public URL, its publish time.
The lab then did it again with
`"status": "draft"` to stock
chapter 7's invisibility test.
Everything after that is reader
traffic: the post is in the
database, the front page is just
one of its readers, and chapter 7
has already been there to check.
