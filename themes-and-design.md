# Themes and Design

**Outcome: you know where a Ghost
site's look lives, what you can
change without code, and what
needs a theme's files.**
*Read this chapter's label first:*
the lab had no browser, so the
design screens are described from
Ghost's documentation, not clicked
through. What the lab verified is
the layer underneath — that the
fresh site serves a finished design
from its default theme (chapter 4's
front page is rendered HTML, not a
placeholder), and that the site's
name and description, which the
theme prints, are settings in the
database that chapter 5 changed
and chapter 7 read back through
the API (`The Shed Notebook`,
"Thoughts, stories and ideas.",
in transcript t11). The look is
data; the rest of this chapter is
a guided tour of where it sits.

## The default theme

Ghost 6 ships and activates a
theme called **Source** — a clean
magazine layout with the
publication's name at the top, a
stream of recent posts, and
membership woven in. It is why a
ten-minute-old Ghost already looks
published rather than assembled.
For many real sites, Source plus
the settings below is the whole
design job.

## Settings, not files

In the admin, Settings → Design
exposes what the theme offers:
publication logo and icon, accent
colour, navigation menus (what
links the header and footer show),
and — Source's particular trick —
a choice of front-page layout.
These are *theme settings*: the
theme declares which choices it
supports, Ghost stores your
answers as settings in the
database, and the templates read
them as they render. Change the
accent colour and no file anywhere
changes; chapter 11's copied
database carries your design
choices along with your posts.

## Installing another theme

A theme is a zip of templates
(Handlebars), styles and a
`package.json` declaring its
settings. Installing one is an
upload in Settings → Design, or
dropping the unpacked folder into
`content/themes/` and activating
it. Ghost checks the theme for
errors with a tool called GScan
before it will run it — a theme
that fails its checks is refused,
not half-applied. Themes from the
official marketplace and from
independent designers are a real
economy; so is the warning that a
theme is code, and a stranger's
theme deserves the same trust
decision as a stranger's program.

## What a theme cannot change

A theme renders posts; it does not
decide what exists. It cannot make
a draft public, unpublish a post,
or show a program anything the
Content API would not — chapter
7's draft stayed invisible through
every door, theme included. It
cannot add behaviour of the
WordPress-plugin kind: no shop, no
forum, no booking calendar arrives
by theme. And it cannot reach your
words: switch themes twice in a
day and every post stands exactly
where it stood, because posts live
in the database and themes merely
visit them. That separation — the
part this lab could and did verify
from underneath — is the design
fact worth keeping from this
chapter.
