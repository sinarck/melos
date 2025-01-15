from flask import Flask, jsonify, request
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image
import torch.nn as nn
from torchvision import models
import os
import requests
from io import BytesIO


class EmotionMappingModel(nn.Module):
    def __init__(self, num_classes):
        super(EmotionMappingModel, self).__init__()
        base_model = models.efficientnet_b0(weights=None)
        self.feature_extractor = nn.Sequential(*list(base_model.children())[:-1])

        self.fc = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Flatten(),
            nn.BatchNorm1d(1280),
            nn.Linear(1280, 512),
            nn.ReLU(),
            nn.BatchNorm1d(512),
            nn.Dropout(0.5),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.BatchNorm1d(256),
            nn.Dropout(0.3),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        x = self.feature_extractor(x)
        x = self.fc(x)
        return x

def load_emotion_model(model_path, num_classes=8, device=None):
    if device is None:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = EmotionMappingModel(num_classes).to(device)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
    return model, device

def preprocess_image_from_url(url):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raise error for bad status codes
        
        # Check if content type is an image
        if 'image' not in response.headers['Content-Type']:
            raise ValueError("URL does not point to an image")
            
        image = Image.open(BytesIO(response.content))
        if not image.format:
            raise ValueError("Cannot identify image format")
            
        image = image.convert('RGB')
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
        return transform(image).unsqueeze(0)
    except requests.RequestException as e:
        raise ValueError(f"Error fetching image: {str(e)}")
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")

# ...rest of the code remains the same...
def predict_emotion(model, image_tensor, device):
    emotion_labels = {
        0: "Anger", 1: "Contempt", 2: "Disgust", 3: "Fear",
        4: "Happy", 5: "Neutral", 6: "Sad", 7: "Surprise"
    }
    
    with torch.no_grad():
        outputs = model(image_tensor.to(device))
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
        predicted_class = torch.argmax(probabilities, dim=1).item()
        confidence = probabilities[0][predicted_class].item()
        
        top3_prob, top3_indices = torch.topk(probabilities, 3)
        top3_predictions = [(emotion_labels[idx.item()], prob.item())
                          for idx, prob in zip(top3_indices[0], top3_prob[0])]
        
        return {
            'primary_emotion': emotion_labels[predicted_class],
            'confidence': confidence,
            'top3_predictions': top3_predictions
        }

app = Flask(__name__)
CORS(app)

# Load model on startup
model_path = "best_emotion_model.pth"
model, device = load_emotion_model(model_path)

@app.route('/generate', methods=['POST'])
def analyze_image():
    try:
        url = request.json['url']
        image_tensor = preprocess_image_from_url(url)
        result = predict_emotion(model, image_tensor, device)
        
        return jsonify({
            "status": "success",
            "data": result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5328, debug=True)