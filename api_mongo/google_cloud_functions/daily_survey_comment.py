import functions_framework
from flask import jsonify
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
def add_daily_survey_comment(request):
    user_id = request.args.get("user_id")
    team_id = request.args.get("team_id")
    comment = request.args.get("comment")
    try:
        #result = json_util.dumps(db["dates"].find())
        #result = json.loads(result)[0]
        #current_date =  result["date"]
        current_date = str(date.today())

        db["survey_data"].update_one(filter={
                "team_id": team_id,
                f"daily_survey.{current_date}.survey":{"$elemMatch":{"user_id": user_id}}
            }, update={"$set":{
                f"daily_survey.{current_date}.survey.$.comment.content": comment
            }})
        return jsonify({"status":200})
    except Exception as e:
        return make_response(jsonify({'error': str(e)}), 500)