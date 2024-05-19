def create_response(overrides=None):
    if overrides is None:
        overrides = {}
    return {
        'stopped': True,
        'is_playing': False,
        'item': None,
        'progress_ms': 0,
        'error': False,
        **overrides,
    }

def handle_api_response(response):
    if response.status_code == 204:
        return create_response()
    if response.status_code >= 400:
        return create_response({'error': True})

    try:
        data = response.json()
        return create_response({**data, 'stopped': False, 'error': False})
    except ValueError:
        return create_response({'error': True})

