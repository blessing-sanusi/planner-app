# models.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class SupervisionSession(BaseModel):
    userId: str
    clientId: str
    date: datetime
    hours: float
    type: str  # e.g. "direct", "indirect", etc.
    notes: Optional[str] = ""
    isMakeup: bool = False

class SupervisionSessionResponse(SupervisionSession):
    id: str
