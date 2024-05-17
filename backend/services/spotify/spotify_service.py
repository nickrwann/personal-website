import requests
from base64 import b64encode
from config import Config
from utils.utils import handle_api_response

class SpotifyService:
    @staticmethod
    def fetch_access_token():
        basic_auth = b64encode(f"{Config.SPOTIFY_CLIENT_ID}:{Config.SPOTIFY_CLIENT_SECRET}".encode('utf-8')).decode('utf-8')
        response = requests.post(Config.SPOTIFY_TOKEN_URL, data={
            'grant_type': 'refresh_token',
            'refresh_token': Config.SPOTIFY_REFRESH_TOKEN,
        }, headers={
            'Authorization': f'Basic {basic_auth}',
            'Content-Type': 'application/x-www-form-urlencoded',
        })

        response_data = response.json()
        if 'access_token' in response_data:
            return response_data['access_token']
        else:
            raise KeyError("Access token not found in the response")

    @staticmethod
    def get_now_playing():
        access_token = SpotifyService.fetch_access_token()
        response = requests.get(Config.SPOTIFY_NOW_PLAYING_URL, headers={
            'Authorization': f'Bearer {access_token}'
        })
        
        return handle_api_response(response)
