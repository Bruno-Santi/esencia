from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class dailySurvey(BaseModel):
    user_id: str
    team_id: str
    sprint: int = 1
    question1: int = 0
    question2: int = 0
    question3: int = 0
    question4: int = 0
    comment: str = "string"

class Comment(BaseModel):
    note: str
    thumb_up: int
    thumb_down: int

class RetroItem(BaseModel):
    team_id: str
    sprint: int
    c1: List[Comment]
    c2: List[Comment]
    c3: List[Comment]
    c4: List[Comment]


