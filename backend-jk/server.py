import time
from flask import Flask, request, jsonify
import requests
import json
import os
from flask_cors import CORS
import dotenv
import datetime

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000", 
    "http://localhost:3001", 
    "http://localhost:3002", 
    "https://jobkompassv2.vercel.app"
])

dotenv.load_dotenv()

API_KEY = os.getenv("API_KEY")

def example_function():
    return 'Hello from JobKompass API!'

@app.route('/default-route', methods=['POST'])
def function_to_run_when_route_is_called():
    data = request.get_json()
    test = data.get('test')

    response_text = example_function()
    
    if response_text:
        try:
            response_json = json.loads(response_text)
        except json.JSONDecodeError as e:
            print(f"Error parsing response JSON: {e}")
            response_json = {'error': 'Error parsing response...'}
    else:
        response_json = {'error': 'Error generating content...'}

    return jsonify(response_json)

if __name__ == "__main__":
    app.run(debug=True)