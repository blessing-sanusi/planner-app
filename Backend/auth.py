from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from models import User
from database import get_session

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "super-secret-key"
ALGORITHM = "HS256"

def create_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register")
def register(email: str, password: str, session: Session = Depends(get_session)):
    user_exists = session.exec(select(User).where(User.email == email)).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="Email already registered.")
    
    hashed = pwd_context.hash(password)
    new_user = User(email=email, hashed_password=hashed)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    token = create_token({"sub": new_user.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login")
def login(email: str, password: str, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user or not pwd_context.verify(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    
    token = create_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
