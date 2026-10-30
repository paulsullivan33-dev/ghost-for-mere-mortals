# Installing Ghost

**Outcome: Ghost's files are on the
machine, its dependencies are
installed, and you have proof the
pile is complete before first run.**
The check (from transcript t01):
the install command finishes with
no errors, and the database driver
loads —

```bash
node -e "const D = require('better-sqlite3'); new D(':memory:'); console.log('driver ok')"
```

(run inside the Ghost folder's
installed tree). If it prints
`driver ok`, the native part — the
one that used to need a compiler —
is already sound.

## First, the version gate

Ghost is picky about Node.js, and
says so in its own file. The
release this lab installed declares:

```json
"engines": { "node": "^22.23.1 || ^24.20.0" }
```

Read that as: Node 22 (at least
22.23.1) or Node 24 (at least
24.20.0). Not 18, not 20, not the
odd-numbered lines. The lab's
machine had Node **v24.22.1**, which
qualifies. Check yours before
anything else:

```bash
node --version
```

A wrong Node is the cheapest
failure to have, because every
other failure looks like it. The
[Node.js guide](https://paulsullivan33-dev.github.io/nodejs-for-mere-mortals/)
in this series covers getting a
current one.

## The three doors in

**Ghost-CLI (the usual door).**
The project's own installer:
`npm install -g ghost-cli`, then
`ghost install` in an empty folder
for a production-shaped install
(it will want MySQL and a process
manager), or `ghost install local`
for a development one. This is the
route Ghost's documentation teaches
and the one to prefer on a real
server. This lab did not run it —
Ghost-CLI manages system services
the sandbox cannot provide — and
the guide says so rather than
implying otherwise.

**The release archive (the lab's
door).** Each Ghost release is also
published as a plain archive of the
program — for 6.73.0, the file
`ghost-6.73.0.tgz` on the project's
GitHub releases page (15 MB, with
its SHA-256 recorded in transcript
t00). Unpack it, install its
dependencies, and you have exactly
what Ghost-CLI would have laid
down. This route shows its working,
which is why a guide's lab takes it:

```bash
curl -LO https://github.com/TryGhost/Ghost/releases/download/v6.73.0/ghost-6.73.0.tgz
mkdir ghost && tar -xzf ghost-6.73.0.tgz -C ghost --strip-components=1
cd ghost
```

**A container image** exists for
those who run things that way; it
is a packaging of the same two
steps and is documented-only here.

## Installing the dependencies

Ghost's archive carries its own
lockfile (957 packages), and the
archive's tooling is pnpm — the
project moved from Yarn to pnpm,
and the lockfile in the box is a
pnpm one. The lab installed pnpm
itself with npm, then:

```bash
pnpm install --prod
```

which finished in just under three
minutes on the lab's shared machine
(transcript t01). Three things
worth knowing about that step:

- It is all downloads and links —
  no compiling. The one native
  module that matters here,
  `better-sqlite3`, ships a prebuilt
  binary for ordinary platforms,
  which is what the check above
  proves.
- Older guides will tell you to
  look for a `sqlite3` package.
  Ghost 6 replaced that driver with
  `better-sqlite3`; if a probe for
  the old name fails with
  `MODULE_NOT_FOUND`, nothing is
  broken — the tool moved.
- A slow registry makes this step
  look stuck long before it is.
  The lab's log is full of download
  speed warnings; they are noise,
  and the `Done in ...` line at the
  end is the only verdict.

## What you have now

A folder containing the program
(`core/`, `index.js`), an empty
`content/` skeleton, and
`node_modules`. Nothing is running,
nothing is configured, and the
database does not exist yet — the
first run builds it. That is the
next chapter, and it contains the
one genuinely strange failure in
this guide: if your network is
unusual, read chapter 14's first
entry *before* you boot, not after
an hour of watching nothing happen.
