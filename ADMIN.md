# Admin panel setup

The `/admin` page has five tabs:

- **Events** — post new events, delete existing ones, mark one "Fully booked"
- **Bookings** — every table booking request from `/book`, newest first, with a "Contacted" checkbox to track follow-up
- **Orders** — every delivery order from `/order`, newest first, with a "Delivered" checkbox
- **Venue Hire** — every party/celebration/full-venue-hire enquiry from `/venue-hire`, newest first, with a "Contacted" checkbox
- **Careers** — every job application from `/careers` (including a CV download link), newest first, with a "Reviewed" checkbox

It's **not linked in the site navigation** — it's a staff-only tool,
reached by going to `/admin` directly.

## Right now: local demo mode

Out of the box (no setup needed), the admin panel runs on a
**localStorage-backed demo store**. This means:

- You can fully test posting, deleting, and toggling "Fully booked" today.
- Changes only show up **in the browser you made them in** — not to real
  site visitors, and not on other devices. Refreshing your own browser
  keeps your changes; opening the site on your phone won't show them.

This is fine for testing the workflow, but **not fine for a real launch**
— for that, connect Supabase (below). The admin page shows a visible
banner reminding you which mode you're in.

## Going live: connect Supabase

You already use Supabase elsewhere, so this should be quick.

### 1. Create the tables

In your Supabase project's SQL editor, run:

```sql
create table events (
  id text primary key,
  slug text not null,
  date date not null,
  "endDate" date,
  title text not null,
  category text,
  time text,
  "lastEntry" text,
  age text,
  image text,
  "shortDescription" text,
  "fullDescription" text,
  lineup jsonb default '[]',
  "ticketUrl" text not null,
  "bookingCta" text default 'tickets',
  featured boolean default false,
  "soldOut" boolean default false,
  published boolean default true,
  created_at timestamptz default now()
);

-- Allow the site to read published events, and the admin password
-- gate is the only thing standing between the public and write access
-- via the anon key — for anything more sensitive than "delete a party
-- flyer", tighten these policies or add real Supabase Auth.
alter table events enable row level security;

create policy "Public read access"
  on events for select
  using (true);

create policy "Public write access (gated by admin password in the app)"
  on events for all
  using (true)
  with check (true);

-- One-row-per-setting table, used for the admin password so it can be
-- changed from inside the app instead of requiring a rebuild.
create table admin_settings (
  key text primary key,
  value text not null
);

alter table admin_settings enable row level security;

create policy "Public read/write access (gated by admin password in the app)"
  on admin_settings for all
  using (true)
  with check (true);

-- Booking requests from /book, viewable in the Admin > Bookings tab.
-- Same posture as the tables above: no real per-user auth, so this data
-- is technically readable via the anon key by anyone who looks for it
-- (not exposed anywhere in the UI, but not cryptographically private
-- either). Add Supabase Auth later if that ever matters for this data.
create table bookings (
  id text primary key,
  name text not null,
  phone text not null,
  email text not null,
  guests text not null,
  date date not null,
  time text,
  occasion text,
  message text,
  contacted boolean default false,
  created_at timestamptz default now()
);

alter table bookings enable row level security;

create policy "Write and read access (gated by admin password in the app)"
  on bookings for all
  using (true)
  with check (true);

-- Delivery orders from /order, viewable in the Admin > Orders tab.
create table orders (
  id text primary key,
  name text not null,
  phone text not null,
  address text not null,
  notes text,
  items jsonb not null,
  fulfilled boolean default false,
  created_at timestamptz default now()
);

alter table orders enable row level security;

create policy "Write and read access (gated by admin password in the app)"
  on orders for all
  using (true)
  with check (true);

-- Venue hire enquiries (parties, celebrations, full venue takeovers)
-- from /venue-hire, viewable in the Admin > Venue Hire tab.
create table venue_hire_enquiries (
  id text primary key,
  name text not null,
  phone text not null,
  email text not null,
  date date,
  guests text not null,
  event_type text not null,
  arrival_time text,
  message text,
  contact_ok boolean default false,
  contacted boolean default false,
  created_at timestamptz default now()
);

alter table venue_hire_enquiries enable row level security;

create policy "Write and read access (gated by admin password in the app)"
  on venue_hire_enquiries for all
  using (true)
  with check (true);

-- Job applications from /careers, viewable in the Admin > Careers tab.
-- This table holds meaningfully more sensitive data than the others —
-- date of birth and right-to-work status — worth reading the note below
-- the storage bucket section before this goes live with real applicants.
create table job_applications (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  age integer not null,
  dob date not null,
  right_to_work text not null,
  right_to_work_details text,
  summary text not null,
  cv_url text,
  cv_file_name text,
  reviewed boolean default false,
  created_at timestamptz default now()
);

alter table job_applications enable row level security;

create policy "Write and read access (gated by admin password in the app)"
  on job_applications for all
  using (true)
  with check (true);
```

Then copy your 4 current events from `src/data/events.js` into the `events`
table (or just re-add them through the `/admin` form once it's connected —
the static file's values are the same data). `bookings`, `orders`,
`venue_hire_enquiries` and `job_applications` all start empty — they fill
up as real requests/applications come in.

### 2. Create the storage buckets

In your Supabase project → Storage, create two buckets:

- `event-flyers` — set to **public**. The admin event form uploads
  directly to it and the site links straight to the public URL.
- `cv-uploads` — also public in this setup (same simple posture as
  everything else here), used by the Careers form.

No extra SQL needed for a public bucket, but if you want the same "gated
by admin password in the app, not Supabase Auth" posture as the tables
above, add a permissive storage policy the same way.

**A specific note on `cv-uploads`:** a "public" bucket means anyone who
somehow gets the exact file URL could open that CV — it's not indexed or
linked anywhere public, but it isn't cryptographically private either,
same caveat as the admin password. CVs plus the `job_applications` table
(which includes date of birth and right-to-work status) is meaningfully
more sensitive than a party enquiry or a flyer image. If you're taking
real applications, it's worth either tightening this with Supabase Auth
+ signed URLs, or at minimum making sure whoever has the admin password
is someone you'd trust with that data anyway. Also worth having a short
line in your privacy policy covering job applicants specifically — the
current `/privacy` page is written for customers/guests, not applicants.

### 3. Add your credentials

In your Supabase project settings → API, copy the **Project URL** and
**anon public key**. Create a `.env` file in the project root (copy
`.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_PASSWORD=choose-a-real-password
```

Restart `npm run dev` after adding these. The app detects the Supabase
keys automatically and switches from local demo mode to real, live
persistence — no code changes needed. Add the same three variables in
your Vercel project's Environment Variables when you deploy.

## Email notifications (EmailJS)

Without this set up, submitting the booking or order forms opens a
pre-filled email on the **guest's own device** — it works, but it means
you're relying on every guest's phone/laptop being set up to send email,
and you won't see anything until they actually hit send. EmailJS sends
the notification directly from the site to your inbox instead, with
nothing required from the guest.

### 1. Create an EmailJS account and service

At [emailjs.com](https://www.emailjs.com), create a free account, then
add an **Email Service** (connect the inbox you want notifications sent
to — Gmail, Outlook, etc.). Note the **Service ID** it gives you.

### 2. Create one email template

Create a new template with exactly these three variables — this one
template is reused for bookings, orders, venue hire enquiries and
careers applications alike:

- `{{subject}}`
- `{{message}}`
- `{{reply_to}}`

A simple template body works fine:

```
Subject: {{subject}}

{{message}}

---
Reply-to: {{reply_to}}
```

Set the template's "Reply To" field to `{{reply_to}}` so you can hit
reply and email the guest back directly. Note the **Template ID**.

### 3. Get your public key

In EmailJS account settings, copy your **Public Key**.

### 4. Add the three values to your `.env`

```
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

Restart `npm run dev`. Once all three are set, booking, order, venue
hire and careers submissions email you directly; if EmailJS ever fails
to send (bad connection, EmailJS outage, etc.), booking/order/venue-hire
requests automatically fall back to the pre-filled mailto so nothing's
silently lost. Job applications don't fall back to mailto — a CV can't
travel through a mailto link — but the application and CV are always
saved to the Careers tab regardless of whether the email send worked, so
nothing's actually lost; just check the tab as well as your inbox.

The free EmailJS tier caps at 200 emails/month — worth knowing before a
big event weekend. The Admin dashboard shows a reminder banner if
EmailJS isn't configured yet.

## About the admin password

The `/admin` login is a **single shared password** — this was a
deliberate scope decision for the 3-day build (vs. full per-user login).
It can now be changed from inside the dashboard itself (there's a
"Change password" link once you're logged in) — the new password is
saved to the same store as everything else (localStorage in demo mode,
the `admin_settings` table once Supabase is connected), so it works
immediately without a rebuild.

Be clear-eyed about what the password check does and doesn't protect
against, whichever backend it's stored in:

- It keeps casual visitors from stumbling into `/admin` and messing
  with events.
- It does **not** stand up to anyone who opens browser devtools — the
  check happens client-side, so the current password is visible in
  network/JS inspection to anyone who looks.
- Change it from the default (`VITE_ADMIN_PASSWORD` / `sandys111admin`)
  before sharing the live site with anyone.

If real access control matters later (multiple staff, audit trail, etc.),
that's a Supabase Auth integration — a separate, bigger piece of work.
