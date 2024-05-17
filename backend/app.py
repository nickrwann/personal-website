from flask import Flask
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS  # Import CORS
from services.spotify.spotify_controller import spotify_blueprint
from services.spotify.spotify_poller import spotify_poller
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

app.register_blueprint(spotify_blueprint, url_prefix='/api/spotify')

# Swagger specific
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Personal Website API"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

if __name__ == "__main__":
    # Start the Spotify polling thread
    threading.Thread(target=spotify_poller.start_polling, daemon=True).start()
    app.run(debug=True)
