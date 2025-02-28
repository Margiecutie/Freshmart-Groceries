import requests
from django.conf import settings

def send_event_to_esb(event_type, payload):
    try:
        response = requests.post(settings.ESB_URL, json={"event_type": event_type, "data": payload})
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Failed to send event to ESB: {e}")
