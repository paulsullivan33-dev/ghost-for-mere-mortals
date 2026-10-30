# Setting Up the Site

**Outcome: the site has an owner
and a name, and both are visible
from outside.** The checks
(transcript t06):

```bash
curl -s http://localhost:2368/ghost/api/admin/authentication/setup/
# {"setup":[{"status":true}]}
curl -s http://localhost:2368/ | grep -o "<title>[^<]*</title>"
# <title>The Shed Notebook</title>
```

Setup has flipped to `true`, and
the front page's title is the
publication's name instead of the
placeholder.

## What setup is

Setup is a one-time ceremony that
happens exactly once in a site's
life: the first person through the
door becomes the **Owner**, and the
publication gets its name. After
it, the endpoint above refuses to
run again — ownership can be
transferred later from inside, but
it is never again up for grabs,
which is why a fresh Ghost should
be set up before it is exposed to
any network you do not control.

A human does this on the setup
screen at `/ghost/`, which asks
for four things:

- the publication's title,
- your name,
- your email address,
- a password (at least ten
  characters).

## What the lab did

The lab has no browser, so it did
what the screen does: the screen
is a client of the Admin API, and
its first act is one call with
those four values. The lab made
the same call with an invented
publication and a throwaway
password (transcript t06):

```bash
curl -X POST http://localhost:2368/ghost/api/admin/authentication/setup/ \
  -H 'Content-Type: application/json' \
  -d '{"setup":[{
        "name": "Jamie Rowan",
        "email": "jamie@example.com",
        "password": "Shed-Lab-2026!",
        "blogTitle": "The Shed Notebook"
      }]}'
```

and Ghost answered with the created
user — name, email, the slug
`jamie`, status `active`. The
publication, *The Shed Notebook*,
is a fiction invented for this
guide, its owner likewise, and the
password is a lab value printed
here because the site it guards
exists only on a lab machine. On
any real install, every one of
these is yours and none of them
belongs in a guide.

Two things happened at once in
that response, and it is worth
seeing them separately. The *user*
was created — an account that can
sign in. And the *setting* changed
— the site's title, one of the 129
settings rows chapter 11 later
counts in the database. Setup is
the first demonstration of the
guide's recurring pattern: a name
on a screen is a row in a table,
and you can check it from either
side.

## Signing in, the same way

The sign-in screen is likewise a
call — `POST /ghost/api/admin/session`
with the email and password —
which answers 201 and sets a
session cookie. Transcript t07
uses exactly that to sign in
before creating an API integration,
which is the bridge to chapter 8:
everything the screens do with
your session, your scripts can do
with a key.

## After setup

Sign in at `/ghost/` and the
publication is yours: the editor,
the starter posts waiting to be
replaced, and settings for
everything chapters 9 and 10 tour.
The checks at the top of this
chapter are the ones to rerun —
a title can be changed later in
Settings, and when it is, the
front page's `<title>` is where
the change proves it landed.
