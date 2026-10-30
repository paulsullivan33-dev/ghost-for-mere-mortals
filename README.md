# Ghost for Mere Mortals

Most publishing platforms live on
somebody else's computer: you write
in their editor, your readers visit
their servers, and your archive is
a tenant in their building. **Ghost**
is the same kind of tool — a clean
editor, a public website, members
and newsletters — as a program you
run yourself. It is open source, it
is written in JavaScript and runs on
**Node.js**, and it stores everything
in a database on your own machine.
People pay the Ghost foundation to
host it for them (that is Ghost(Pro),
and it keeps the project alive), but
nothing about the software requires
that. The copy in this guide answers
to nobody but its owner.

This guide explains how Ghost fits
together, how to install it, how to
set up a publication and publish to
it — first through the screens a
human uses, then through the **API**
a program uses — and it proves the
result the way the other guides in
this series do: by checking. The
front page either shows your post
or it does not. The lab's checks are
things you can repeat: load the page,
ask the API, restart the program and
look again.

The lab behind this guide ran the
real thing: **Ghost 6.73.0**, the
official release archive, unpacked
and installed on a small Linux
machine, running in its development
mode on its built-in SQLite database,
bound to localhost only. Against it
the lab created a small invented
publication — *The Shed Notebook* —
through Ghost's own setup calls,
published one post and drafted
another through the Admin API with a
properly signed token, watched the
draft stay invisible to readers,
read the post back through the
public Content API, restarted the
whole program and found everything
still there, and copied the database
file aside and read the posts out of
the copy.

The lab also found a genuine trap,
and it is in this guide in full
because it cost real time: on its
first run, Ghost looks up a Gravatar
picture for its default user, and on
a network where that request
*hangs* instead of failing, the
install appears to freeze forever —
the database half-built, the site
answering "We'll be right back." The
request was found with a logging
hook, the boot was repeated with the
network failing fast instead, and
the same install finished in thirty
seconds. Chapter 14 tells that story
as a troubleshooting entry; the
transcripts keep the evidence.

What the lab could not do, it did
not fake. It had no browser, so the
editor and admin screens are taught
from the documentation and from the
API calls those screens themselves
make — the setup and sign-in in
this guide were done through the
very endpoints the screens use. It
sent no real email and created no
real member accounts, so the
newsletter half of Ghost is
described, not demonstrated.
`criteria.md` keeps the full ledger
of what was run and what was only
read.

## What this guide covers

- [**What Ghost is**](what-ghost-is.md) —
  the mental model: a publication —
  editor, website, members and mail —
  as one program on your own machine
- [**The moving parts**](the-moving-parts.md) —
  the Node.js server, the database,
  the content folder, themes, the
  admin screens and the two APIs —
  and which part holds what
- [**Installing Ghost**](installing-ghost.md) —
  the Node version it demands, the
  official routes in, and the release
  archive install this lab ran and
  verified package by package
- [**Your first run**](your-first-run.md) —
  the small config file, the first
  boot's database build, the "We'll
  be right back" page, and the empty
  site with its starter posts
- [**Setting up the site**](setting-up-the-site.md) —
  the one-time setup: your owner
  account, the publication's name,
  and the checks that show it took
- [**Writing and publishing**](writing-and-publishing.md) —
  posts and pages, drafts and
  published, tags and addresses —
  what each state means to a reader
- [**Proving it worked**](proving-it-worked.md) —
  the round trip: a post on the front
  page, at its own address, in the
  public API — and a draft nowhere a
  reader can see
- [**Publishing by machine**](publishing-by-machine.md) —
  integrations and API keys, the
  signed token the Admin API wants,
  and the colon in the key that
  breaks your first attempt
- [**Themes and design**](themes-and-design.md) —
  the default theme, design settings,
  and what a theme can and cannot
  change — taught, not clicked,
  in this lab
- [**Members and mail**](members-and-mail.md) —
  reader accounts, newsletters and
  the mail settings Ghost cannot
  work without — and what this lab
  deliberately left unrun
- [**Recipes**](recipes.md) — back the
  whole site up by copying one file,
  move a site by its content folder,
  and publish from a script
- [**The neighbours**](the-neighbours.md) —
  WordPress the giant, static site
  generators, hosted Ghost, and the
  newsletter services: what each
  does that Ghost doesn't, and
  vice versa
- [**Limits**](limits.md) — production
  wants MySQL, SQLite is for small
  and development use, one install
  is one publication, and a first
  boot that phones a picture service
- [**Troubleshooting**](troubleshooting.md) —
  the first boot that never finishes,
  the token the API refuses, the
  maintenance page that outstays
  its welcome, and the version
  errors
- [**Glossary**](glossary.md) — the
  terms, collected in one place

## What it doesn't cover

Running Ghost as a public production
service is pointed at, not taught
end to end: this lab bound Ghost to
localhost and never exposed it, so
reverse proxies, certificates and
hardening are named and left to the
guides and docs that own them.
Writing a theme from scratch is a
guide of its own; this one covers
choosing and adjusting. Paid
memberships and payment processing
are described at the level of what
they are — the lab connected no
payment account, on purpose.

## How to use this guide

Read chapter 1 for the model, and
chapter 2 before installing anything —
knowing which part holds what turns
later confusion into a named problem.
Chapters 3 and 4 get you a running
empty site; chapter 5 makes it yours;
chapters 6 and 7 publish and prove
it. Chapter 8 is the machine door —
read it when a script, an importer
or another program needs to publish
for you. The lab's transcripts live
in `ghost-lab/transcripts/`; its
publishing script is
`ghost-lab/publish-post.mjs` and its
request-logging hook is
`ghost-lab/netwatch.js`.

---

## Part of the series

This guide is one of the [For Mere Mortals](https://paulsullivan33-dev.github.io/mere-mortals/) guides: plain-language guides to the tools programmers and makers use.

Related guides:

- [Hugo for Mere Mortals](https://paulsullivan33-dev.github.io/hugo-for-mere-mortals/)
- [Node.js for Mere Mortals](https://paulsullivan33-dev.github.io/nodejs-for-mere-mortals/)
- [MkDocs for Mere Mortals](https://paulsullivan33-dev.github.io/mkdocs-for-mere-mortals/)

## License

The writing in this guide is licensed under [CC BY 4.0](https://github.com/paulsullivan33-dev/ghost-for-mere-mortals/blob/main/LICENSE). Code examples and lab scripts are licensed under the [MIT License](https://github.com/paulsullivan33-dev/ghost-for-mere-mortals/blob/main/LICENSE-CODE).
