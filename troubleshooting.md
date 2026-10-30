# Troubleshooting

Failure modes this lab actually
met, in the order a new installer
meets them, plus the checks that
name the rest. Each entry gives
the symptom, the cause the
evidence supported, and the fix
or the honest verdict.

## The first boot never finishes

**Symptom.** The boot log stops
after the `Creating table:` lines
— the last one reads `Creating
view: members_resolved_subscription`
— and stays stopped for many
minutes. The site answers every
request with the "We'll be right
back" page, HTTP 503. The database
file exists but the site was never
set up; `settings` and `users`
are empty if you look.

**Cause (transcripts t03, t04).**
While writing its first-run
starter data, Ghost looks up a
Gravatar picture for its default
user. If your network *hangs* that
request — a proxy that accepts and
never answers, a firewall that
drops silently — the boot waits on
it without a timeout worth the
name. The lab proved the cause by
preloading a request logger
(`ghost-lab/netwatch.js`): exactly
one outbound request was
outstanding, `www.gravatar.com`,
called from the fixture code.

**Fix.** Make the request fail
fast instead of hanging, and boot
again from a clean database
(delete the half-made one first —
it holds a migrations lock). Any
of: fix the network path so
refusals are refusals; or, for a
local install, start the first
boot with the proxy environment
pointed somewhere that refuses at
once, as the lab did:

```bash
env NODE_ENV=development \
  http_proxy=http://127.0.0.1:9999 \
  https_proxy=http://127.0.0.1:9999 \
  node index.js
```

Ghost treats the failed lookup as
"no picture" and finishes in
thirty seconds. Later boots need
none of this — the lookup belongs
to first-run fixtures only.

## The API refuses your token: "invalid signature"

**Symptom.** Calls to the Admin
API answer `401` with
`Invalid token: invalid signature`
and code `INVALID_JWT` — although
the key came straight off the
integration's page.

**Cause (transcript t08).** You
signed with the whole key string.
The Admin API key is shown as
`id:secret`; the JWT must be
signed with the *secret half*
only, decoded from hex. Chapter 8
has the split and the mint. Two
neighbours of this error: signing
with the secret as text rather
than hex-decoded bytes (same
symptom, subtler), and an old
token — five minutes is the
maximum life, so a `401` on a
token that worked at breakfast is
not a mystery, it is a clock.

## "We'll be right back" that will not leave

**Symptom.** The maintenance page
with HTTP 503, long after boot.

**Cause and checks.** That page is
Ghost's answer *while it is not
ready*, and one of three things
holds it there. The boot is still
running — read the log's tail; a
finished boot ends with
`Ghost booted in ...`. The boot
*died* — the log ends in an error,
or nothing listens on the port at
all (`curl` gets connection
refused, not a page). Or the boot
is the first entry above, frozen
mid-fixture — the log frozen at
the same `Creating ...` line for
minutes is its fingerprint. The
page is a symptom with good
manners: it never lies about
readiness, it just won't say why.
The log is where why lives.

## Node version complaints and strange crashes

**Symptom.** Ghost refuses to
start, or dies in ways that look
like code bugs, on a machine where
other Node programs run fine.

**Cause and check.** Ghost holds a
strict version line, printed in
its own `package.json`: for 6.73,
`"node": "^22.23.1 || ^24.20.0"`.
Compare with `node --version`
before debugging anything else.
Distribution-packaged Node is
routinely too old; this is the
single most common Ghost install
failure and the cheapest to rule
out — chapter 3 puts it first for
that reason.

## Port 2368 is taken

**Symptom.** Boot fails early with
an `EADDRINUSE` for the port.

**Check and fix.** Something else
— often yesterday's Ghost —
already listens. `ss -tlnp | grep 2368`
names it. Stop the squatter, or
move Ghost by changing `server.port`
(and `url`, to match) in the
config file. The URL and the port
are a pair; changing one without
the other gives a site that works
at its address and links to
another.

## The site works, but its links point at localhost

**Symptom.** On a real server, the
pages load and every link, image
and feed address points at
`http://localhost:2368`.

**Cause.** `url` in the config is
the site's public identity, used
to build every absolute address
Ghost emits — the lab's transcripts
show post URLs minted as
`http://localhost:2368/...` for
exactly this reason. Set `url` to
the public address in
`config.production.json` and
restart; there is no admin screen
for it, by design, because the
admin screen's own address
depends on it.
