# Siddhant & Srishti — Royal Wedding Invitation (V9)

A mobile-responsive Next.js invitation for Siddhant and Srishti.

## Run locally

1. Install Node.js 20 or newer.
2. Extract this ZIP into a new folder and open the folder containing `package.json`.
3. Run `npm install`.
4. Run `npm run dev`.
5. Visit `http://localhost:3000`.

## Guest invitation

- Full-screen royal palace gate opening and cinematic entrance.
- Scratch-to-reveal wedding date; the invitation remains locked until the foil is scratched away.
- Couple introduction, parents' blessings, countdown, four-day celebration schedule and venue directions.
- Supplied 93-second MP3 soundtrack starts after the guest opens the gates and loops with a music toggle.
- Responsive mobile and desktop layouts.
- **There is no RSVP page, form, guest collection, RSVP database or RSVP navigation.**
- The invitation closes directly from the venue section into the farewell scene.

## Admin/CMS foundation

The next implementation stage is a private, single-admin content dashboard. The `supabase/schema.sql` file defines the content-only database foundation with row-level security. It intentionally contains no guest or RSVP tables.

To connect it:

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Create your admin user in Supabase Authentication.
4. Add that user's UUID to `public.site_admins` using the SQL Editor:

   ```sql
   insert into public.site_admins (user_id)
   values ('YOUR_AUTH_USER_UUID');
   ```

5. Copy `.env.example` to `.env.local` and fill in the Project URL and anon/public key.

Never put a Supabase service-role key in a `NEXT_PUBLIC_` variable or in browser code. The admin dashboard and CMS UI will be connected after the project credentials are configured.

## Validation status

- RSVP UI, state, form submission handler, navigation link and RSVP styling have been removed.
- TypeScript/JSX and production build still need to be run after installing dependencies in your local environment.
