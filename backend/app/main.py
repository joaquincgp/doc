### backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api import doctors, clinics, appointments, prescriptions, users
from backend.app.database.session import engine, Base
app = FastAPI()
# Crear las tablas
Base.metadata.create_all(bind=engine)
# Incluir rutas
app.include_router(users.router)
app.include_router(doctors.router)
app.include_router(clinics.router)
app.include_router(appointments.router)
app.include_router(prescriptions.router)

#Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)