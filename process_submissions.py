import firebase_admin
from firebase_admin import credentials, firestore
import requests
import os

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceaccount.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Create images directory if it doesn't exist
if not os.path.exists("images"):
    os.makedirs("images")

# Process submissions
submissions_ref = db.collection("submissions")
for doc in submissions_ref.stream():
    data = doc.to_dict()
    doc_id = doc.id

    if "imageUrl" in data:
        image_url = data["imageUrl"]
        try:
            response = requests.get(image_url, stream=True)
            response.raise_for_status()
            file_extension = os.path.splitext(image_url)[1]
            with open(f"images/{doc_id}{file_extension}", "wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"Downloaded image for submission {doc_id}")
        except requests.exceptions.RequestException as e:
            print(f"Error downloading image for submission {doc_id}: {e}")

    if "artworkLink" in data:
        artwork_link = data["artworkLink"]
        with open("link.txt", "a") as f:
            f.write(f"{artwork_link}\n")
        print(f"Saved artwork link for submission {doc_id}")
