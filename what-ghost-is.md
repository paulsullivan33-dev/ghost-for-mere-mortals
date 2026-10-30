# What Ghost Is

You have things to publish — essays,
notes, a newsletter, the record of a
project — and you want them on the
web under your own name, looking
like a real publication rather than
a folder of files. The familiar way
to get that is a hosted platform:
you write in their editor, readers
come to their servers, and the whole
arrangement lasts exactly as long as
the company and your subscription
agree it should.

**Ghost is that publication as a
program you run yourself.** It is an
open-source publishing platform:
a writing editor, a public website,
reader accounts ("members"),
newsletters by email, and the
machinery to charge for subscriptions
if you want it — all in one
application, written in JavaScript,
running on your own machine against
a database you own. You can pay the
Ghost foundation to run it for you,
and many people do; that service is
called Ghost(Pro) and it funds the
project. But the software itself is
yours to run, and a site built on
your copy keeps existing if every
hosted service on earth changes its
terms tomorrow.

The check that tells you this
chapter landed: by the end of it you
can say what a Ghost site is made
of — a server program, a database,
a folder of content — and which of
those a reader's browser ever meets.

## A first taste

A fresh Ghost, before anyone sets
it up, already answers the web.
Chapter 4 gets to this screen for
real; the shape of the thing is:

```bash
curl http://localhost:2368/
```

and back comes a complete web page —
an empty publication's front door,
titled simply "Ghost", offering a
"Coming soon" post and waiting for
its owner. Everything in this guide
is the journey from that empty page
to a working publication, and every
step of the journey gets checked
the same way: ask the site, read
what it says.

## The shape of a publication

Three ideas carry the whole guide.

**Posts and pages.** Writing lives
in posts — dated, listed, sent to
members — and pages, the same
machinery standing still: an About
page, a contact page. A post is a
*draft* until it is published, and
that one word is the difference
between your desk and the world:
chapter 7 proves a draft is
invisible to every reader-facing
door Ghost has.

**Members.** Readers can have
accounts. A member can be free or
paying, and posts can be public,
members-only, or paid-only. This is
Ghost's reason for existing in its
modern form — it began in 2013 as a
just-a-blog tool, a reaction against
blogging software that had grown
into a general-purpose website
builder, and grew members and
newsletters when publishing itself
moved that way.

**Themes.** How the site looks is a
theme: a bundle of templates the
server fills with your posts. The
words and the look are separate
piles, which is why a site can be
redesigned without touching a
single article.

## What it is not

Ghost is not a general website
builder: it does one shape of site —
a publication — and does not grow
plugins for shops, forums and
booking systems the way WordPress
does (chapter 12 weighs that trade).
It is not a static site generator:
there is no build step and no folder
of finished HTML; the server makes
each page when asked, from the
database. And it is not a notes app
or a private wiki: everything in it
leans towards an audience, even
when the audience is hypothetical.
BookStack and Joplin, elsewhere in
this series, face the other way.

## Who it is for

The writer who wants a newsletter
that is also a website, on their own
domain, with the archive in their
own database. The club, podcast or
small team that outgrew a group
email and wants one public home.
The blogger leaving a hosted
platform who wants the door they
leave by to be a database file,
not an export request. The common
thread is one publication, one
owner, and words meant to be read.

## The honest catch, up front

Ghost is a real server application,
and it asks for real upkeep: it
wants a current Node.js, it keeps a
database, it expects working email
before members can sign up, and
putting it on the public internet
safely is a job this guide names
but does not do (the lab kept its
copy on localhost). It also has one
quirk this guide found the hard way
and reports in full: on its very
first run it reaches out to an
outside service for a picture, and
a network that mishandles that
request can stall the install
before it starts (chapters 4
and 14). Neither catch is hidden
in a footnote; both are part of
the tool as it actually is.
