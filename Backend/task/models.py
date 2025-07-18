from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    id: Optional[str] = None
    title: str
    clientId: str
    status: str  # 'Not Started' | 'In Progress' | 'Completed'
    clientName: Optional[str] = None  # Optional, for UI convenience
