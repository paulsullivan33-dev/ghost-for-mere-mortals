# The Moving Parts

**Outcome: you can name the six
parts of a running Ghost, say which
ones hold your words, and predict
what breaks when each is missing.**
The check: after reading, cover the
page and list them — server,
database, content folder, theme,
admin, APIs. If you can attach one
job to each, the chapter landed.

## The server

Ghost is one Node.js program.
Started, it builds its database if
there is none, then listens on a
port — 2368 by default, a number
chosen to be out of everything
else's way — and answers two kinds
of traffic: the public site and
the admin screens, from the same
process. There is no separate web
server in front of it in this
guide's setup; in production there
usually is (chapter 13), but it is
a doorman, not a second Ghost.

## The database

Everything the publication *is* —
posts, pages, members, settings,
users, tags — lives in a database.
Ghost 6 works with exactly two:

- **MySQL 8**, the production
  database. This is what real sites
  are expected to run.
- **SQLite**, in a single file,
  used by the development mode this
  lab ran. The file is the whole
  database: chapter 11 copies it
  aside with `cp` and reads the
  posts out of the copy with the
  ordinary `sqlite3` tool.

Ghost talks to the database through
a library called knex, and in
Ghost 6 the SQLite driver underneath
is `better-sqlite3` — the older
`sqlite3` module is gone, a small
fact that matters if you read older
guides (this lab's first probe for
the old module failed, and the
transcript keeps it).

## The content folder

Beside the database sits a folder
called `content/`, holding what a
database is bad at: uploaded images,
the installed themes, routing and
redirect files, logs, and — in
SQLite mode — the database file
itself, at `content/data/`. "Back
up the database and the content
folder" is very nearly "back up
the site", and chapter 11 turns
that into a recipe.

## The theme

The theme is a set of templates —
Handlebars files — that Ghost fills
with posts and settings to make
each page. A fresh Ghost 6 arrives
with a default theme (called
Source) already active, which is
why the empty site in chapter 4
looks finished rather than broken.
Themes live in `content/themes/`;
design choices made in the admin
screens are stored as settings in
the database, not in the theme's
files.

## The admin

The screens at `/ghost/` — sign-in,
the editor, settings, members — are
a web application the same server
serves. The important fact for this
guide: the admin is a *client*. It
does its work by calling Ghost's
Admin API with your session, which
means anything the screens can do,
a script can do — chapter 5 sets
the site up through the setup
endpoint the first screen calls,
and chapter 8 publishes through
the same API the editor saves to.

## The two APIs

Ghost has two public APIs, with
two different keys and two
different ideas of trust.

- The **Content API** is read-only
  and reader-shaped: posts, pages,
  tags, authors, settings, for
  themes and other programs to
  display. It asks for a *content
  key*, a low-power key that is not
  a secret worth stealing — chapter
  7 shows it refused without one
  and answering with one.
- The **Admin API** can do
  everything: publish, delete,
  invite members, change settings.
  It does not take a password or a
  bare key. It takes a short-lived
  signed token (a **JWT**, chapter
  8) made from an *Admin API key*
  belonging to an **integration** —
  a named connection you create
  for a program, and can revoke
  without changing your own
  password.

## Mail

The last part is not in the box:
email. Ghost sends newsletters,
sign-in links and password resets
through a mail service you
configure (`mail` in the config
file; the lab set it to "Direct",
the hand-it-to-the-local-machine
mode, and sent nothing). A Ghost
without working mail can publish
to the web perfectly well, but
its members cannot join, because
joining is an emailed link. The
lab's honesty about this is in
chapter 10: membership is
described there, not demonstrated.
