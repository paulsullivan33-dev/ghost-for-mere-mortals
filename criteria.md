# Writing criteria

Every guide in this series is written against the same nine checks:

1. **It starts from the job, not the tool.** The abstract user need — publishing your own words on the web under your own control — comes first, before Ghost is named as the answer.
2. **Verified, not remembered.** Key claims are tested on a real system where the sandbox allows it; the transcripts in `ghost-lab/transcripts/` are the evidence, and they were captured from the runs, not reconstructed afterwards.
3. **One mental model, built once.** Server, database, content folder, theme, admin, two APIs — the model is built in chapter 2 and spent everywhere else.
4. **Honest about its edges.** Development mode on SQLite is the verified route; production on MySQL, real email, real members and the visual editor are labelled documented-only wherever they appear, and chapter 13 gathers the limits.
5. **The reader can check the result.** Every chapter opens with the outcome it delivers and the check that proves it; chapter 7 is five such checks aimed at one published post.
6. **Plain language.** Short sentences; a new term is explained the first time it appears and collected in the glossary; no jargon for its own sake.
7. **Examples invented, and labelled.** *The Shed Notebook*, its owner Jamie Rowan and its posts were made up for this guide; no real people, organisations or machines appear as fixtures. Keys and passwords in transcripts are throwaway lab values for a localhost-only site, called out as such where they appear.
8. **Failures stay in.** The first boot that hung for an hour on a picture lookup, and the token refused for a colon's worth of misunderstanding, are chapters 4 and 14, not secrets — the next reader's afternoon is worth more than the guide's pride.
9. **Nothing faked.** If a step could not be run, the guide says so at the step, not in a footnote.

## Verification

Verified live this session, against a real running Ghost 6.73.0 (the official release archive, `ghost-6.73.0.tgz`, SHA-256 `7377bf3a…`, installed with pnpm on Node v24.22.1, development mode, SQLite database, bound to 127.0.0.1:2368), with the lab working in `~/workspace/ghost-labwork/`:

- The release archive's declared Node engine (`^22.23.1 || ^24.20.0`) and the full dependency install: 957 packages, `pnpm install --prod` completing cleanly, and the `better-sqlite3` native driver loading and answering a query (t00–t01). Ghost 6 has no `sqlite3` module; the driver is `better-sqlite3` via knex, and the transcript keeps the probe that established it.
- The lab config (`config.development.json`: url, server, database path, `Direct` mail, stdout logging) taking effect (t02).
- First boot behaviour, including the failure: a fresh boot builds the schema (90+ `Creating table:` lines) and then, on this sandbox's network, **hangs indefinitely** during first-run fixtures — diagnosed with the request-logging hook in `ghost-lab/netwatch.js` to a single outstanding Gravatar lookup — and the holding page ("We'll be right back", HTTP 503) it serves meanwhile (t03–t04).
- The same boot, with outbound requests failing fast, completing: "Database is in a ready state", "Ghost booted in 30.207s"; the front page answering HTTP 200 with title `Ghost` and the seeded *Coming soon* post (t05).
- Setup through the Admin API endpoint the setup screen uses: owner **Jamie Rowan <jamie@example.com>** created, publication titled **The Shed Notebook**, setup status afterwards `true`, front page title changed to match (t06).
- Sign-in through the session endpoint (HTTP 201) and creation of the integration **Lab publisher**, issuing a content key and an Admin API key in Ghost's `id:secret` form (t07; full lab keys live only in the lab's working files — transcripts show prefixes).
- The publish round trip through the Admin API with a hand-minted JWT: first refused — HTTP 401 `INVALID_JWT`, "invalid signature" — because the token was signed with the whole `id:secret` string, then, signed with the hex-decoded secret half only, **HTTP 201**, with the stored post's slug, URL and publish timestamp returned (t08). The decoder behaviour is as read in Ghost's own api-key auth code, which the lab read to settle it.
- The round trip's reader side: the post on the front page, at its own URL (HTTP 200, correct `<title>`, body text present), and in the Content API under the content key; the Content API refusing the same request without the key (t09).
- Draft privacy: a second post created as a draft appears in the Admin API list with a `/p/<uuid>/` preview URL, and is absent from the front page and from the Content API (t10).
- Site info through the Admin API: title, the theme's default description, version `6.73` (t11).
- Restart persistence: with an existing database, boot in 5.9 s (no fixture work, no lookup, same network) and the publication intact on the front page (t12).
- The backup claim: a plain copy of the database file, opened with the system `sqlite3`, lists all four posts with their statuses and 129 settings rows (t13).

Documented only, taught from Ghost's documentation and the behaviour of the underlying calls where noted:

- The **Ghost-CLI** install route (`ghost install` / `ghost install local`) — the guide presents it as the normal front door; the lab installed the release archive directly because Ghost-CLI manages system services the sandbox cannot provide.
- The **production route**: MySQL 8, a process manager, a reverse proxy, a real domain and TLS. The lab bound Ghost to localhost and never exposed it.
- The **editor and admin screens as clicked experiences** — the lab had no browser. Every flow the guide depends on (setup, sign-in, integration creation, publishing, drafting) was performed through the same Admin API endpoints those screens call, and the guide says which chapters rest on that substitution (6 and 9 especially).
- **Themes beyond the default** — the default theme's rendering is verified in every front-page transcript; choosing, uploading and customising themes is taught from the documentation (chapter 9).
- **Members, newsletters and real email** — no real email service or account was used, no member was created, no message was sent; the lab's mail transport was `Direct` and inert. Chapter 10 is documentation plus inspection of the tables and settings the first boot built.
- **Ghost(Pro)**, paid tiers and Stripe — described for comparison (chapter 12), never connected.
- Scheduled publishing — described as the composition of draft and publish behaviour (chapter 6); the lab ran neither a timer nor a schedule.

Transcripts are kept with the checkout under `ghost-lab/transcripts/`; the publishing script and the request-logging hook are `ghost-lab/publish-post.mjs` and `ghost-lab/netwatch.js`, cleaned to read the key from an environment variable. The lab originals read throwaway keys from local files in the lab working directory, which stays outside the checkout.
