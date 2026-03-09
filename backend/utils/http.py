import requests

def get_json(url, headers=None, params=None):
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()

def post_json(url, headers=None, data=None):
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()
