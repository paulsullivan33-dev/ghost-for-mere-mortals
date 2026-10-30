# Your First Run

**Outcome: Ghost is running, its
database exists, and the empty site
answers the web.** The checks:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:2368/
# 200
curl -s http://localhost:2368/ | grep -o "<title>[^<]*</title>"
# <title>Ghost</title>
```

A 200 and the plain title `Ghost`
mean a fresh, un-set-up publication
is alive. Chapter 5 gives it a name.

## The config file

Ghost reads `config.<environment>.json`
from its folder. This lab runs the
development environment, so it wrote
`config.development.json`
(transcript t02):

```json
{
    "url": "http://localhost:2368",
    "server": { "host": "127.0.0.1", "port": 2368 },
    "database": {
        "client": "better-sqlite3",
        "connection": { "filename": ".../content/data/ghost-dev.db" }
    },
    "mail": { "transport": "Direct" },
    "logging": { "level": "info", "transports": ["stdout"] },
    "process": "local"
}
```

Four lines earn their keep:

- `server.host` is `127.0.0.1` —
  localhost only. This Ghost is a
  lab bench, not a public site, and
  the binding is the whole fence.
- `database.client` is
  `better-sqlite3` — development
  mode's own default, named here so
  the file says what it does.
- `mail.transport` is `Direct`:
  hand mail to the local machine
  and ask no questions. The lab
  sends nothing; chapter 10 covers
  what a real site needs instead.
- `logging` to stdout, so the boot
  writes its diary where you can
  watch it. You are about to want
  that diary.

In development mode Ghost has sane
defaults for most of this (its own
shipped defaults name the same
database file and port), so a
smaller file also works — but a
guide's lab spells it out, and a
reader following along gets the
same behaviour on purpose.

## The first boot

```bash
NODE_ENV=development node index.js
```

A healthy first boot takes about
thirty seconds and ends with two
lines worth memorising:

```text
Database is in a ready state.
Ghost booted in 30.207s
```

In between, the log shows the
database being built — some ninety
`Creating table:` lines — because
there was no database when it
started. Later boots skip all of
that (chapter 7 times one at under
six seconds). While the build runs,
the site answers every request with
a holding page — "We'll be right
back", HTTP 503. That page is
normal *during* a boot. As a
permanent condition it is chapter
14's first entry, because the lab's
first attempt never got past it:
an outside picture lookup, made
while the starter data is written,
hung on this network, and the boot
waited on it indefinitely with the
log's last line reading `Creating
view: members_resolved_subscription`.
If your first boot sits there, that
entry is written for you.

## Meeting the empty site

Boot finished, the front page
(transcript t05) is a complete,
styled publication with nothing
in it:

- The title is `Ghost` — a
  placeholder, replaced in
  chapter 5.
- It offers two starter pieces
  Ghost seeds every new site with:
  **Coming soon**, the holding
  post, and **About this site**, a
  starter page explaining what
  the site will be. Both are
  ordinary posts in the database
  (chapter 11 reads them out of a
  copied database file), yours to
  edit or delete like anything
  you write later.
- The admin lives at
  `http://localhost:2368/ghost/`
  and, having no owner yet, it is
  all setup screen — which is
  where the next chapter starts.

One more check proves the state of
things better than any screenshot.
Ghost exposes its setup status as
an API call, and before chapter 5
it answers:

```bash
curl -s http://localhost:2368/ghost/api/admin/authentication/setup/
# {"setup":[{"status":false}]}
```

`false` means: nobody owns this
site yet. It is the before picture
for the next chapter's after.
