import functions_framework
from flask import jsonify, make_response
from pymongo.mongo_client import MongoClient
from bson import json_util
import os
import json
from datetime import date
#import requests

user = os.environ.get("USER")
pwd = os.environ.get("PASSWORD")
uri = f"mongodb+srv://{user}:{pwd}@esenciaia.xeknyc8.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client["essenciaIA_app"]

@functions_framework.http
def add_daily_survey(request):
    survey = request.get_json()
    current_date = str(date.today())
    
    #in case you want to test a with different dates comment the above current_date and discomment all below this.
    #result = json_util.dumps(db["dates"].find())
    #result = json.loads(result)[0]
    #current_date =  result["date"]

    try:
        n_sprint = json_util.dumps(db["survey_data"].find_one({"team_id":survey["team_id"]},{"retro_count":1,"_id":0}))
        n_sprint = json.loads(n_sprint)
        n_sprint = int(n_sprint["retro_count"]) + 1
    except:
        n_sprint = 1


    try:
        daily_check = json_util.dumps(db["survey_data"].find_one({
                "team_id": survey["team_id"],
                f"daily_survey.{current_date}.survey":{"$elemMatch":{"user_id":survey["user_id"]}}
                }))
        if daily_check == "null":
            db["survey_data"].update_one(filter={
                "team_id": survey["team_id"]
            }, update={
            "$push":{
            f"daily_survey.{current_date}.survey": {
             "user_id": survey["user_id"],
             "sprint": survey["sprint"],
             "question1": survey["question1"],
             "question2": survey["question2"],
             "question3": survey["question3"],
             "question4": survey["question4"],
             "comment": {"content": survey["comment"]}}
              }, 
            "$inc":{"daily_survey_count": 1, 
              "self_satisfaction_general": survey["question1"],
              "work_engagement_general": survey["question2"],
              "team_collaboration_general": survey["question3"],
              "workspace_general": survey["question4"],
              f"daily_survey.{current_date}.self_satisfaction": survey["question1"],
              f"daily_survey.{current_date}.work_engagement": survey["question2"],
              f"daily_survey.{current_date}.team_collaboration": survey["question3"],
              f"daily_survey.{current_date}.workspace": survey["question4"]
              
              },"$setOnInsert":{"retro_count":0},
              "$set":{f"daily_survey.{current_date}.sprint_general": n_sprint}
            }, upsert=True)
            #requests.get("https://us-central1-esencia-app.cloudfunctions.net/short_recommendation", params={"team_id":survey["team_id"]})
            return "Ok"
        else:
            return "user already completed the survey"
    except Exception as e:
        return make_response(str(e), 500)