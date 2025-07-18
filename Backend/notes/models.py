from pydantic import BaseModel
from typing import Optional

class Note(BaseModel):
    id: Optional[str] = None
    clientId: str
    title: str
    content: str
    createdAt: Optional[str] = None
