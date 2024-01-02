import functions_framework
from flask import jsonify, make_response
from pymongo.mongo_client import MongoClient
from bson import json_util
import os
import json
from datetime import date

user = os.environ.get("USER")
pwd = os.environ.get("PASSWORD")
uri = f"mongodb+srv://{user}:{pwd}@esenciaia.xeknyc8.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client["essenciaIA_app"]

@functions_framework.http
def add_retro(request):
    retro = request.get_json()
    result = json_util.dumps(db["survey_data"].find({"team_id": retro["team_id"]},{"_id":0, "retro_count":1}))
    result = json.loads(result)[0]
    today = str(date.today())
    #today = "2023-12-17"
    try:
        db["survey_data"].update_one(filter={
                "team_id": retro["team_id"]
            }, update={
                "$push": {
                    "retro": {
                    "sprint": int(result["retro_count"]) + 1,
                    "date": today,
                    "c1": retro["c1"],
                    "c2": retro["c2"],
                    "c3": retro["c3"],
                    "c4": retro["c4"]
                    }
                },"$inc":{"retro_count":1}
            }, upsert=True)
        return jsonify({"status":200})
    except Exception as e:
        return make_response(jsonify({'error': str(e)}), 500)