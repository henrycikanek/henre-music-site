# Henre Music Site

This is a Next.js based portfolio website for a music producer/engineer, featuring an automated discography system that syncs with Spotify playlists.

## Features

- **Dynamic Discography**: Automatically syncs your discography from a Spotify playlist
- **Sorting by Popularity**: Tracks can be displayed based on Spotify popularity metrics
- **Admin Interface**: Manage track metadata through a simple admin UI
- **Scheduled Updates**: Can be configured to automatically update on a schedule

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with your Spotify API credentials (see `.env.local.example`)
4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Spotify Integration Setup

1. Create a Spotify Developer account at [developer.spotify.com](https://developer.spotify.com/)
2. Create a new application to get your Client ID and Client Secret
3. Add these credentials to your `.env.local` file
4. Create a playlist on Spotify with all the tracks you want in your discography
5. Add the playlist URL to your `.env.local` file as `SPOTIFY_PLAYLIST_URL`

## Snipcart Integration Setup

1. Create a Snipcart account at [snipcart.com](https://snipcart.com)
2. Once logged in, go to Account > API Keys to get your public API key
3. Add your Snipcart API key to your `.env.local` file as `NEXT_PUBLIC_SNIPCART_API_KEY`
4. For testing, use your "Public Test API Key"; switch to your "Public Live API Key" for production
5. Configure your payment gateway and other settings in the Snipcart dashboard

### Customizing Snipcart

The Snipcart integration can be customized in several ways:

- Edit the cart styling in `pages/_app.tsx`
- Modify product templates in the data-templates-override section
- Edit product data in `pages/api/services.ts` to update or add new services
- Customize the cart display in the navbar component

For more information, see the [Snipcart documentation](https://docs.snipcart.com/v3/).

## Updating Your Discography

### Manual Update

Visit the admin interface at `/admin/tracks` to:
- View all tracks in your discography
- Edit track metadata (roles, categories)
- Trigger a manual update from your Spotify playlist

### Automated Updates

To set up automated updates:
1. Set up a cron job or scheduled task to hit the API endpoint:
```
POST /api/cron/update-discography?secret=your_cron_secret
```
2. For services like Vercel, you can use their Cron Jobs feature to schedule this endpoint to run daily.

## Customizing Track Metadata

For each track, you can customize:
- **Role**: What you did on the track (e.g., "Mixing, Production")
- **Category**: Main category for filtering (e.g., "production", "mixing")

These are stored in `data/track-metadata.json` and will persist across playlist updates.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) - learn about Spotify's API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

If deploying on Vercel, you'll need to add all the environment variables from your `.env.local` file to your Vercel project settings.
