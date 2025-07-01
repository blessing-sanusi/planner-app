from sqlmodel import create_engine, Session, SQLModel

DATABASE_URL = "sqlite:///./aba.db"

engine = create_engine(DATABASE_URL, echo=True)

def create_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
