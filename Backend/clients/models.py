from pydantic import BaseModel
from typing import Optional

class Client(BaseModel):
    id: Optional[str] = None
    name: str
    goal: Optional[str] = ""
    mastered: Optional[int] = 0
    total: Optional[int] = 0
