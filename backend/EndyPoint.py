import requests

#to define the API URL
url = "THENWEPASTEITINHERE"

#Start the request 
try:
    response = requests.get(url)

    #check successful response, code 200
    if response.get() == 200:
        data = response.json()
        print("Data retrieved")
        print(data)
    else:
        
