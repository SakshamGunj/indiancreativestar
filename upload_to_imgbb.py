
import requests
import base64
import os
import json

API_KEY = "3c4e681b2f5c0d00e228a0d02ef74def"
UPLOAD_URL = "https://api.imgbb.com/1/upload"
IMAGE_DIR = "public/images"
OUTPUT_FILE = "image_urls.json"

image_urls = []

for filename in os.listdir(IMAGE_DIR):
    filepath = os.path.join(IMAGE_DIR, filename)
    if os.path.isfile(filepath):
        with open(filepath, "rb") as f:
            try:
                encoded_string = base64.b64encode(f.read())
                payload = {
                    "key": API_KEY,
                    "image": encoded_string
                }
                response = requests.post(UPLOAD_URL, data=payload)
                response.raise_for_status()  # Raise an exception for bad status codes
                result = response.json()
                if result["success"]:
                    image_urls.append({
                        "filename": filename,
                        "url": result["data"]["url"]
                    })
                    print(f"Successfully uploaded {filename}")
                else:
                    print(f"Failed to upload {filename}: {result}")
            except requests.exceptions.RequestException as e:
                print(f"Error uploading {filename}: {e}")
            except Exception as e:
                print(f"An unexpected error occurred with {filename}: {e}")

with open(OUTPUT_FILE, "w") as f:
    json.dump(image_urls, f, indent=4)

print(f"Image URLs saved to {OUTPUT_FILE}")
