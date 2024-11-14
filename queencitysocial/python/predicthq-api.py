import requests

# Define the API endpoint and your API key
url = "https://api.predicthq.com/v1/events/"
api_key = "YOUR_API_KEY"  # Replace with your PredictHQ API key

# Define the query parameters
params = {
    "within": "15mi@35.2271,-80.8431",  # Charlotte, NC latitude and longitude
    "active.gte": "2024-01-01",          # Start date
    "active.lte": "2024-12-31",          # End date
    "active.tz": "America/New_York",     # Time zone
    "limit": 50,                         # Number of results to return
    "category": "community,festivals,concerts"  # Example categories
}

# Set up the headers, including authorization
headers = {
    "Authorization": f"Bearer {api_key}",
    "Accept": "application/json"
}

# Send the request to PredictHQ
response = requests.get(url, headers=headers, params=params)

# Check if the request was successful
if response.status_code == 200:
    # Print or process the JSON response
    events = response.json()
    print(events)
else:
    print(f"Error: {response.status_code} - {response.text}")
