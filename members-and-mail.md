# Members and Mail

**Outcome: you can explain how
readers become members, why email
is the load-bearing wall of that
system, and what this lab
deliberately did not run.**
*Read this chapter's label first:*
membership and newsletters are
**documented-only** in this guide.
The lab used no real email service,
created no member accounts, and
connected no payment provider — so
everything here is taught from
Ghost's documentation and from the
parts of the machinery the lab
could inspect without sending a
byte: the mail setting in its own
config, and the membership tables
and settings the first boot built.
Nothing below is dressed up as a
demonstration.

## Members, in one paragraph

A **member** is a reader with an
account. Joining means giving an
email address and clicking the
sign-in link Ghost mails — there
are no member passwords; the email
*is* the credential. Members are
free or paying. A post can be
public, free-members-only, or
paid-only, and the front page,
feeds and emails each honour the
same line. Paying runs through
Stripe, the one payment provider
Ghost integrates, and tiers —
named levels with prices — are
set in Settings → Membership.

## Why mail is not a detail

Two of Ghost's jobs are email
jobs. Sign-in links are email.
Newsletters — the post you publish
can be sent, in the same act, to
every member's inbox — are email
at publication scale. Ghost
therefore separates mail into two
kinds, configured in different
places:

- **Transactional mail** — sign-in
  links, password resets, the
  one-to-one messages — goes
  through the `mail` settings in
  the config file: an SMTP service
  you name.
- **Bulk mail** — the newsletter
  itself — goes through Mailgun,
  the one bulk sender Ghost
  integrates directly, configured
  in the admin; a publication of
  any size sending from a bare SMTP
  account will be eaten by spam
  systems, and Ghost's design
  admits it.

The lab's config said
`"mail": {"transport": "Direct"}` —
deliver to the local machine's
mail system, of which the sandbox
has none worth the name. That was
an honest lab choice: nothing was
sent, nothing pretended to be.
On a real install, working mail
is not step nine; it is the thing
that makes members possible at
all, and Ghost's setup flow will
keep reminding you until it works.

## What the lab could see

The first boot built the whole
membership machine even though it
never ran: tables for members,
their subscriptions, labels,
newsletters and the emails
themselves, and settings rows the
site-info check of transcript t11
sits alongside. Ghost also seeds a
default newsletter — the
publication itself — so "publish
and send" is one motion once mail
exists. The machine is present
and inspected; only the sending
is unproven here, and this guide
would rather say that plainly than
walk a fake member through a fake
signup. When you run yours for
real, the verification from
chapter 7 ports over unchanged:
join as a member with an address
you control, and the link in your
inbox is the front page test,
wearing a stamp.
