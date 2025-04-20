import base64
from io import BytesIO
from PIL import Image
import pandas as pd
from predict_spawn import predict_spawn
from predict_growth import predict_growth

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

def spawn_predict(base64_string):
    """แปลงสตริง Base64 เป็นอ็อบเจ็กต์ Image ของ PIL."""
    try:
        image_bytes = base64.b64decode(base64_string)
        image = Image.open(BytesIO(image_bytes))
        data = predict_spawn(image)
        return data
    except Exception as e:
        print(f"เกิดข้อผิดพลาดในการแปลง Base64: {e}")
        return None


@app.route('/spawn', methods=['POST'])
def spawn():
    try:
        data = request.json
        base64_str = data['base64']
        data = spawn_predict(base64_str)
        return data
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    



def growth_predict(base64_string):
    """แปลงสตริง Base64 เป็นอ็อบเจ็กต์ Image ของ PIL."""
    try:
        image_bytes = base64.b64decode(base64_string)
        image = Image.open(BytesIO(image_bytes))
        data = predict_growth(image)
        return data
    except Exception as e:
        print(f"เกิดข้อผิดพลาดในการแปลง Base64: {e}")
        return None
    
        
@app.route('/growth', methods=['POST'])
def growth():
    try:
        data = request.json
        base64_str = data['base64']
        data = growth_predict(base64_str)
        return data
    except Exception as e:
        return jsonify({'error': str(e)}), 500    
    
@app.route("/")
@cross_origin()
def helloWorld():
	return "V89's test flask"

    
if __name__ == '__main__':
	
	app.run(host='0.0.0.0', port=8989, debug=True)    