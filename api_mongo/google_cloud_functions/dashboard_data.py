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
def dashboard_AllData(request):
    try:
        team_id = request.args.get("team_id")
        result = json_util.dumps(db["survey_data"].find({"team_id": team_id},{"_id":0}))
        result = json.loads(result)[0]
        try:
            retro_count = result["retro_count"]
        except:
            retro_count = 0
        try:
            report_count = result["reports_count"]
        except:
            report_count = 0
        try:
            short_recom = {"Satisfaccion General": str(result["short_recommendation"]["content"]["recommendation1"]), "Cuadrantes": str(result["short_recommendation"]["content"]["recommendation2"])} 
        except:
            short_recom = "there are no recommendations"
        self_satisfaction = []
        work_engagement = []
        team_collaboration = []
        workspace = []
        for days in list(result['daily_survey'].keys()):
            sur_list = len(result['daily_survey'][days]["survey"])
            self_satisfaction.append(int((result['daily_survey'][days]["self_satisfaction"]/sur_list)*10))
            work_engagement.append(int((result['daily_survey'][days]["work_engagement"]/sur_list)*10))
            team_collaboration.append(int((result['daily_survey'][days]["team_collaboration"]/sur_list)*10))
            workspace.append(int((result['daily_survey'][days]["workspace"]/sur_list)*10))
        dashboard = {
        "pie_chart": {"self_satisfaction": int((result["self_satisfaction_general"] / result["daily_survey_count"])*10),
                            "work_engagement":int((result["work_engagement_general"] / result["daily_survey_count"])*10),
                            "team_collaboration": int((result["team_collaboration_general"] / result["daily_survey_count"])*10),
                            "workspace": int((result["workspace_general"] / result["daily_survey_count"])*10)},
        "data_amounts": {"daily_survey_amount": result["daily_survey_count"],
                            "retro_amount": retro_count,
                            "report_amount": report_count},
        "lines_graph": {
                "label_x": list(result['daily_survey'].keys()),
                "self_satisfaction": self_satisfaction,
                "work_engagement": work_engagement,
                "team_collaboration": team_collaboration,
                "workspace": workspace
                },
        "short_recommendation": short_recom
            }
        return jsonify(dashboard)
    except Exception as e:
        return make_response(jsonify({'error': str(e)}), 500)