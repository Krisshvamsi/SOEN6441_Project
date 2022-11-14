import requests

url = "https://free-nba.p.rapidapi.com/teams"

querystring = {"page":"0"}

headers = {
	"X-RapidAPI-Key": "d3951501acmsh251b6b4cc197a9ap1dba5ajsn2be92ac06320",
	"X-RapidAPI-Host": "free-nba.p.rapidapi.com"
}

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)