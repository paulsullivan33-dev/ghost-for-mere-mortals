# Proving It Worked

**Outcome: the publication round
trip is verified from the reader's
side, four independent ways.** No
trust is required in anything the
admin says: every check below is
one a visitor — or a visitor's
program — could make. The full
evidence is transcripts t09
to t13.

## 1. The front page

```bash
curl -s http://localhost:2368/ | grep -c "First entry"
# 1
```

The published post's title is on
the front page. The same command
for the draft's title returns
`0`. One command, both halves of
chapter 6's claim.

## 2. Its own address

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  http://localhost:2368/first-entry-why-this-notebook-exists/
# 200
```

and the page's `<title>` is the
post's title, and its body contains
the post's words — the lab searched
for a distinctive sentence about a
blue tin of screws and found it
(four matches across the page's
rendered text and structured data).
A pretty front page can be a cached
illusion; a served article with the
right words in it cannot.

## 3. The public API

Themes and apps read Ghost through
the Content API, so it is a reader
too. It needs the content key — a
separate, lesser key the lab's
integration issued alongside the
admin one:

```bash
curl -s "http://localhost:2368/ghost/api/content/posts/?key=<content key>"
```

It returns the published post and
the starter *Coming soon* — and
not the draft. Without the key,
the same address refuses:

```text
{"errors":[{"message":"Authorization failed", ...
```

That refusal is a feature being
demonstrated, not an obstacle:
the public API is keyed on
purpose, so a site can be read by
programs without being readable
by *any* program.

## 4. The restart

The oldest check in this series:
turn it off and on again, and see
what is still true.

```bash
# stop Ghost, then, in its folder:
NODE_ENV=development node index.js
```

With an existing database the boot
took 5.9 seconds — against thirty
for the first run — because there
was nothing to build and, notably,
nothing to fetch: the first-run
fixture work, Gravatar lookup and
all, happens exactly once in a
site's life. Afterwards the front
page answered 200 with the site's
name and the post still listed.
The publication was never "in" the
running program. It is in the
database file, and the program is
its reader — which is why the
final proof works.

## 5. The copy

```bash
cp content/data/ghost-dev.db /somewhere/backup-copy.db
sqlite3 backup-copy.db "select title, status from posts;"
```

```text
Coming soon [published]
About this site [published]
First entry — why this notebook exists [published]
Bench notes — draft, not yet [draft]
```

Four posts, statuses intact,
readable by a tool that has never
heard of Ghost — from a *copy*.
Hold that thought; chapter 11
builds the backup recipe on it.

## What the five checks rule out

Together they exclude the polite
failures: a post that saved but
never published (check 1), a post
that listed but did not render
(2), a site that shows humans one
thing and programs another (3), a
site that lives only in a running
process's memory (4), and a backup
that cannot be read without the
original (5). Ghost passed all
five in this lab. That — not the
screenshots — is what "it works"
means here.
