# Backend

This directory contains the backend code for the personal website, built using Python and Flask.

## Setup

1. Create a virtual environment:

   ```bash
   conda create --name myenv python=3.10
   ```

2. Activate the virtual environment:

   ```bash
   conda activate myenv
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```bash
   flask run
   ```

## Environment Variables

Ensure you have a `.env` file with the necessary environment variables. Example:

SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

## Endpoints

- `/api/spotify/now-playing`: Fetches the currently playing song from Spotify.

## Deployment

The backend can be deployed using your preferred method. Ensure that the environment variables are correctly set in your deployment environment.
