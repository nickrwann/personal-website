from cachetools import TTLCache
import time
import logging
from services.spotify.spotify_service import SpotifyService
from threading import Lock

class SpotifyPoller:
    _instance = None
    _lock = Lock()

    def __new__(cls, polling_interval=1, cache_ttl=10):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(SpotifyPoller, cls).__new__(cls)
                cls._instance._initialized = False
        return cls._instance

    def __init__(self, polling_interval=1, cache_ttl=10):
        if self._initialized:
            return
        self.polling_interval = polling_interval
        self.cache = TTLCache(maxsize=1, ttl=cache_ttl)
        self.logger = logging.getLogger('SpotifyPoller')
        self._initialized = True

    def start_polling(self):
        while True:
            try:
                now_playing = SpotifyService.get_now_playing()
                self.cache['now_playing'] = now_playing
            except Exception as e:
                self.logger.error(f"Error polling Spotify API: {e}")
            time.sleep(self.polling_interval)

    def get_cached_now_playing(self):
        return self.cache.get('now_playing', {"error": "No data available"})

# Create a single instance of SpotifyPoller to be used by the app
spotify_poller = SpotifyPoller()
