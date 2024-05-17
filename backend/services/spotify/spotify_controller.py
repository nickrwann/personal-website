from flask import Blueprint, jsonify
from services.spotify.spotify_poller import spotify_poller

spotify_blueprint = Blueprint('spotify', __name__)

@spotify_blueprint.route('/now-playing', methods=['GET'])
def now_playing():
    data = spotify_poller.get_cached_now_playing()
    return jsonify(data)
