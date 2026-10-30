# Glossary

The terms this guide uses, in one
place. Each entry says what the
thing is and, where it helps,
where the guide proves it.

**Admin API.** Ghost's full-power
API — publish, delete, invite,
configure. Reached with a
short-lived signed token made from
an integration's Admin API key.
Chapter 8.

**Admin API key.** An integration's
long-lived credential, shown as one
string in the form `id:secret`.
The id names the key; the secret,
hex-decoded, signs tokens. Signing
with the whole string is chapter
14's second entry.

**Content API.** The read-only,
reader-shaped API themes and apps
use. Takes a content key; without
one it refuses — chapter 7 watched
it refuse.

**Content key.** The read side's
lesser key, issued with every
integration. Not a password; safe
to appear in a theme, which is
where it normally lives.

**Content folder.** The `content/`
directory beside the program:
images, themes, routing files,
logs, and — in SQLite mode — the
database file itself. Chapter 2.

**Draft.** A post that exists only
in the admin. No public address, no
API presence. Chapter 7 proved the
invisibility; chapter 6 defines
the states.

**Ghost(Pro).** The foundation's
hosted Ghost — the same software
on their machines, for a
subscription. Chapter 12 weighs it
against running your own.

**Ghost-CLI.** The project's
official installer and manager
(`ghost install`, `ghost start`).
The route the documentation
teaches and production uses;
this lab installed the release
archive directly instead, and
says so in chapter 3.

**Gravatar.** A public
avatar-by-email service. Appears
in this guide for one reason:
Ghost asks it for a picture during
first-run setup, and a network
that hangs the request hangs the
install. Chapters 4 and 14.

**Integration.** A named connection
for a program, created in Settings
→ Integrations, holding its own
keys and revocable on its own.
Chapter 8.

**JWT (JSON Web Token).** The
signed token the Admin API takes:
claims about who and until when,
plus a signature made with a key.
Ghost's live five minutes at most,
audience `/admin/`, presented as
`Authorization: Ghost <token>`.

**Member.** A reader with an
account, free or paying, signed in
by emailed link rather than
password. Chapter 10 —
documented-only in this guide.

**Owner.** The first and highest
user, created by the one-time
setup. Chapter 5.

**Post / page.** Ghost's two faces
of one entry: a post joins the
dated stream; a page stands still
at its address. One table, one
flag — chapter 11 saw both in a
copied database.

**Slug.** The address-shaped form
of a title —
`first-entry-why-this-notebook-exists` —
which becomes the post's public
URL. Made on publish; think before
changing it afterwards.

**Source.** The default theme
bundled and activated with Ghost
6: the finished design on a fresh
site's front page. Chapter 9.

**SQLite / MySQL.** The two
databases Ghost 6 speaks: SQLite,
one file, development's default
and this lab's database; MySQL 8,
production's expectation.
Chapters 2 and 13.

**Theme.** The templates and
styles that render posts into
pages, stored in `content/themes/`,
kept separate from the words
themselves. Chapter 9.
