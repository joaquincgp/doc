from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.schemas.appointment import AppointmentCreate, AppointmentOut
from backend.app.models.appointment import Appointment
from backend.app.database.session import get_db

router = APIRouter(prefix="/appointments", tags=["Appointments"])

@router.post("/", response_model=AppointmentOut)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@router.get("/", response_model=list[AppointmentOut])
def read_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).all()