from flask import jsonify
import time

def format_time(ms):
    total_seconds = ms // 1000
    minutes = total_seconds // 60
    seconds = total_seconds % 60
    return f"{minutes:02}:{seconds:02}"

def create_response(overrides=None):
    if overrides is None:
        overrides = {}
    return {
        'stopped': True,
        'is_playing': False,
        'item': None,
        'progress_ms': 0,
        'error': False,
        'progress_time': "00:00",  # New field for formatted progress time
        'duration_time': "00:00",  # New field for formatted duration time
        'timestamp': int(time.time() * 1000),  # Add current timestamp in ms
        **overrides,
    }

def handle_api_response(response):
    if response.status_code == 204:
        return create_response()
    if response.status_code >= 400:
        return create_response({'error': True})

    try:
        data = response.json()
        item = data.get('item', {})
        progress_ms = data.get('progress_ms', 0)
        duration_ms = item.get('duration_ms', 0)

        data['progress_time'] = format_time(progress_ms)
        data['duration_time'] = format_time(duration_ms)
        data['timestamp'] = int(time.time() * 1000)

        return create_response({**data, 'stopped': False, 'error': False})
    except ValueError:
        return create_response({'error': True})
