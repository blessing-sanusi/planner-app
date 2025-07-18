from pydantic import BaseModel
from typing import Optional

class ScheduleEvent(BaseModel):
    id: Optional[str] = None
    clientId: Optional[str] = None
    title: str
    start: str  # ISO datetime
    end: str    # ISO datetime
    type: Optional[str] = None  # e.g. Direct, Indirect, Parent Training
