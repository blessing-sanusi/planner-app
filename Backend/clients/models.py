from pydantic import BaseModel
from typing import Optional

class Client(BaseModel):
    id: Optional[str] = None
    name: str
    dob: Optional[str] = None
    notes: Optional[str] = None
    createdAt: Optional[str] = None
