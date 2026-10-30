# Limits

**Outcome: you can name the walls
before you walk into them.** Every
claim here was either met in the
lab or is labelled as read from
the project's own statements.

## Production wants MySQL

The lab ran Ghost the way its
development mode intends: SQLite,
in a file. Ghost's own position is
that production sites run **MySQL
8**, and SQLite is for development
and small-scale use. The file
database is a delight to back up
(chapter 11) and entirely real —
but a busy site with many writers
and members will outgrow a single
file's one-writer-at-a-time
nature. Treat SQLite as the
training ground it is, and the
config's `database` block as the
seam where the grown-up database
goes.

## One install, one publication

A Ghost is *a* site: one title,
one theme, one member list. There
is no multisite switch. Ten
publications are ten installs —
ten processes, ten databases.
They are cheap to run, but they
are ten things to upgrade.

## A first boot that reaches out

Met in the lab, in full, in
transcript t03 and t04: building
its starter data, Ghost looks up
a Gravatar picture for its default
user. On a healthy network that
costs a blink. On a network where
the request hangs — neither
answered nor refused — the first
boot waits forever, site answering
"We'll be right back", database
half-made. Once setup exists, the
lookup never happens again
(chapter 7's restart took six
seconds on the same network). It
is a first-five-minutes risk, not
a running risk — but it is real,
it is undocumented behaviour
surfaced by measurement, and
chapter 14 carries the fix.

## Email is a dependency, not a feature

Chapter 10's plain fact belongs
here too: without configured,
working mail, members cannot join,
passwords cannot reset, and the
newsletter half of Ghost is a
loaded spring with nowhere to go.
Publishing to the web works
without it; the publication
Ghost advertises does not. Budget
the mail service when you budget
the server.

## The editor's shape is fixed

Posts are made of Ghost's blocks,
in Ghost's editor (or its API
equivalents). There is no plugin
system to add new kinds of
behaviour, no shortcode economy,
and no roadmap promise of one —
the project's bet is that a
publication needs restraint more
than extensibility. Chapter 12's
trade, stated as a limit: if the
site must become something else
later, Ghost will not become it
with you.

## What this lab could not see

The honest edges of the guide
itself. Everything here is one
development-mode install on
localhost: production behaviour
under MySQL, behind a proxy, on a
public address, is read, not run.
Members, payments and real email
are described (chapter 10). The
admin screens and editor are
taught through the API they call
(chapter 6). A reader who needs
those proven needs a browser, a
mailbox and a test card — and
chapter 7's method, which ports
to all three unchanged.
