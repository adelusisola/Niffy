# Neef Studios website: launch notes

This is a static HTML, CSS and JavaScript site. It has no build step or package dependencies.

## Netlify

Connect the repository to Netlify. The included `netlify.toml` sets the publish directory to the repository root. Leave the build command empty. Netlify will serve `404.html` for missing routes and apply the security headers in `netlify.toml`.

The booking form sends enquiries through the Netlify function at `/.netlify/functions/send-booking-email`. To enable email delivery, create a Resend account, verify the sending domain, and set these environment variables in Netlify:

- `RESEND_API_KEY`: Resend API key (keep it private; never put it in client-side code).
- `RESEND_FROM_EMAIL`: verified sender, for example `Neef Studios <bookings@your-verified-domain>`.
- `BOOKING_EMAIL_TO`: optional destination address; defaults to `Neefstudios.uk@gmail.com`.

Redeploy after adding or changing environment variables. Until those values are configured, the function returns an unavailable response and the form opens a prefilled email draft as a fallback. Test a real submission on the deployed HTTPS site.

## GitHub Pages

In the repository settings, enable Pages and publish from the root of the chosen branch. The included `.nojekyll` file keeps GitHub Pages from applying Jekyll processing. GitHub Pages serves the root `404.html` automatically. The Netlify headers configuration is not applied by GitHub Pages. The 404 page treats the first path segment on a `github.io` host as the project-site base; for a user/org Pages site without a custom domain, change `siteRoot` in `404.html` to `/`.

## Before launch

- Content is written as real studio commissions (four projects, two journal entries). If any claim about a named client changes, update the corresponding project page, meta description and `og:description` together so search and social previews stay accurate.
- Imagery is licensed stock standing in for studio work. Replace with the studio's own photographs when available; keep the alt text descriptive either way.
- Confirm the client permissions referenced on the work page ("published with the client's permission") still hold for every named client.
- Confirm the privacy notice matches the booking form fields, email provider, retention practice and data handling.
- Add the controller's full legal identity to the privacy notice if “Neef Studios” is not the legal name of the business.
- Confirm the public contact details and map address are correct and appropriate to publish.
- Once a live domain is chosen, add canonical URLs and update Open Graph images to locally hosted, approved brand or portfolio artwork. A sitemap can then be generated with the final URLs.
- Check every page, booking link, phone/email link, filter, map and the custom 404 page on the deployed HTTPS site.
