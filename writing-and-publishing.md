# Writing and Publishing

**Outcome: you know what a post's
states mean, what a reader sees in
each, and how the next chapter will
prove it.** The check here is
chapter 7 itself — this chapter
hands it three claims to test:
a published post is everywhere a
reader can look, a draft is nowhere
a reader can look, and both are
equally real inside the admin.

## The editor, honestly labelled

Writing happens in Ghost's editor,
a clean page at `/ghost/` built
around a title, a body made of
blocks (paragraphs, images,
dividers, embeds and more), and a
settings panel for the machinery
below. This lab had no browser, so
the editor's clicking and typing
is *documented-only* in this guide:
described from Ghost's
documentation, not performed.
What the lab performed is the same
journey through the API the editor
saves to — a post with a title, an
HTML body, a tag and a state — and
nothing in the states' behaviour
depends on which door the post
came through.

## The states of a post

A post is in one of three
conditions, and the conditions are
the whole publishing model:

- **Draft.** Exists in the admin,
  nowhere else. It has no public
  address — its URL is a preview
  address under `/p/<a long id>/`,
  useful for sharing a look before
  committing. It is not on the
  front page, not in the Content
  API, not in any feed.
- **Published.** Has a public
  address built from its **slug** —
  the tidy version of the title,
  `first-entry-why-this-notebook-exists`
  in the lab's post — and appears
  everywhere at once: front page,
  its own page, the Content API,
  RSS, and (chapter 10's caveat
  applies) out by email to members
  if you send it.
- **Scheduled.** Published's waiting
  room: a draft with a future
  timestamp, which Ghost promotes
  when the time comes. The lab did
  not run one; it composes the two
  behaviours above and is described
  from the documentation.

Publishing is reversible — a
published post can return to draft,
and disappears from readers when
it does — but it is not erasable
history: the slug, once public, is
an address other sites may have
linked to, and Ghost will warn
about changing it for good reason.

## Posts, pages, tags

The same editor makes **pages**:
flip one switch and a post stops
being an entry in the stream and
becomes a fixture of the site —
dated nothing, listed nowhere,
living at its address. The starter
*About this site* is a page; the
lab's post is a post; the database
stores both in the same table with
a flag between them (chapter 11
sees the table).

**Tags** group posts — the lab's
post carries one, `Notebook` —
and each tag gets its own archive
page. Authors likewise: a post
belongs to a user, and a
publication can have several
writers with roles below the Owner
(chapter 2's database holds them
all; the roles themselves are a
settings-screen matter the lab
describes rather than demonstrates).

## What "publish" sends where

One act, several ripples, all of
which chapter 7 will check from
the reader's side: the front page
gains the post, its own URL starts
answering, and the Content API
begins returning it to any program
holding the content key. That is
the testable surface. Give the
chapter a minute and it will show
all three — plus the draft,
sitting in the admin in plain
sight, casting no shadow at all.
