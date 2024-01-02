<h1 align="center">GCP Endpoints</h1>

<h2>/welcome</h2>
<pre>
shows you the API documentation in json format
</pre>

<h2>/daily_survey</h2>
<pre>
"method": "POST"
"description": "To add a new daily survey, all fields must be filled"
"body_input":
{
	"comment": "string",
	"question1": 0,
	"question2": 0,
	"question3": 0,
	"question4": 0,
	"sprint": 1,
	"team_id": "string",
	"user_id": "string"
}
</pre>

<h2>/daily_survey_comment</h2>
<pre>
"method": "PUT"
"description": "To update a user's comment"
"query_input":
{
	"comment": "string",
	"team_id": "string",
	"user_id": "string"
}
</pre>

<h2>/daily_survey_get_all_by_team</h2>
<pre>
"method": "GET"
"description": "To retrieve all daily survey data given a team_id"
"query_input":
{
	"team_id": "string"
}
</pre>

<h2>/dashboard_data</h2>
<pre>
"method": "GET"
"description": "To retrieve the data to make the dashboard"
"query_input":
{
    "team_id": "string"
}
</pre>

<h2>/retro</h2>
<pre>
"method": "POST"
"description": "To add a retro, all fields must be filled, empty array for (c1,c2,c3,c4) in case of absence of sticky notes"
"body_input":
{
	"c1":[
			{
				"note": "string",
				"thumb_down": 0,
				"thumb_up": 0
			}
		],
	"c2":[
			{
				"note": "string",
				"thumb_down": 0,
				"thumb_up": 0
			}
		],
	"c3":[
			{
				"note": "string",
				"thumb_down": 0,
				"thumb_up": 0
			}
		],
	"c4":[
			{
				"note": "string",
				"thumb_down": 0,
				"thumb_up": 0
			}
		],
	"sprint": 0,
	"team_id": "string"
}
</pre>

<h2>/get_long_recommendation</h2>
<pre>
{
    "/get_long_recommendation": {
    "method": "GET",
    "description": "retrieve the long recommendation",
    "query_input": {
                    "team_id": "string"
                    }
        }
}
</pre>