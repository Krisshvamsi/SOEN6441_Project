from Requests import response
import json
import pandas as pd

response_info = response.json()
jsonString = json.dumps(response_info)
jsonFile = open("data.json", "w")
jsonFile.write(jsonString)
jsonFile.close()

with open('./data.json', 'r') as f:
    data = json.loads(f.read())
dataframe = pd.json_normalize(data, record_path=['data'])
print(dataframe.head())
