from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth.routes import router as auth_router
from clients.routes import router as clients_router
from tasks.routes import router as tasks_router
from notes.routes import router as notes_router
from schedule.routes import router as schedule_router

app = FastAPI(title="Client Care Hub API")

# CORS setup - adjust origins as needed
origins = [
    "http://localhost",
    "http://localhost:3000",  # React dev server
    # Add your production URLs here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(clients_router, prefix="/clients", tags=["clients"])
app.include_router(tasks_router, prefix="/tasks", tags=["tasks"])
app.include_router(notes_router, prefix="/notes", tags=["notes"])
app.include_router(schedule_router, prefix="/schedule", tags=["schedule"])

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to Client Care Hub API"}

