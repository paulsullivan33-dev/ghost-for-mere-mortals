# Recipes

Small jobs, each built from parts
the earlier chapters verified.
Where a step rests on documentation
rather than the lab, it says so.

## Back up the whole site by copying one file (SQLite mode)

**Works because of chapter 7,
check 5.** In development/SQLite
mode the publication is a file.
Stop Ghost — copying a database
under a running program invites a
torn copy — then:

```bash
cp content/data/ghost-dev.db ghost-backup-2026-10-30.db
```

Verify the backup the way the lab
did (transcript t13): read it with
a tool that owes Ghost nothing.

```bash
sqlite3 ghost-backup-2026-10-30.db \
  "select title, status from posts;"
```

If your posts are listed, your
backup is real. Uploaded images
live outside the database, so the
full-site version of this recipe
copies the whole `content/`
folder; the database alone is the
words, the members and the
settings. On a MySQL production
site the same recipe is `mysqldump`
plus the same folder —
documented-only here, and the
folder half is identical.

## Move the site to a new home

Stop Ghost in both places. Copy
the `content/` folder and (SQLite
mode) nothing else but your
`config.production.json` with the
new home's `url`. Start Ghost.
Chapter 7's restart check is the
acceptance test: front page 200,
your post listed, the draft still
draft. The URL is a *setting*, and
a site moved without updating it
will cheerfully link every reader
back to its old address — the one
field to change, it is in the
config file, not the database.

## Publish from a script

Chapter 8's `ghost-lab/publish-post.mjs`,
run with the integration's key in
an environment variable:

```bash
GHOST_ADMIN_API_KEY="<id>:<secret>" node publish-post.mjs
```

Swap the title, body and status in
the script per post, or feed it
from a folder of HTML files for a
small import. Two habits from the
lab: keep the key in the
environment, never in the script
or the repository; and treat `201`
plus a chapter-7 check — not the
script's cheerfulness — as
"published".

## Add a second pair of hands

Create a *second* integration
(Settings → Integrations) for the
second program, rather than
sharing the first one's key. Each
integration is named, listed and
revocable on its own (chapter 8);
when a program retires, revoke
its door and nothing else changes.
The lab's site needed only one,
and the second is a settings task
— but the session call that made
the first (transcript t07) is the
whole recipe, repeated with a new
name.

## Read your own site like a stranger

A diagnostic, from chapter 7's
toolkit. When something looks
wrong — a post missing, a title
stale — ask the reader-facing
doors before opening the admin:

```bash
curl -s http://localhost:2368/ | grep -o "<title>[^<]*</title>"
curl -s "http://localhost:2368/ghost/api/content/posts/?key=<content key>" \
  | jq -r '.posts[].title'
curl -s http://localhost:2368/ghost/api/admin/authentication/setup/
```

Front page, public API, setup
state: three answers, no login,
and between them they separate
"the site is down" from "the post
is a draft" from "the cache is
lying" faster than any dashboard.
On a public site, run them from
another machine — that is rather
the point of having doors.
