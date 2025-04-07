from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.schemas.clinic import ClinicCreate, ClinicOut
from backend.app.models.clinic import Clinic
from backend.app.database.session import get_db

router = APIRouter(prefix="/clinics", tags=["Clinics"])

@router.post("/", response_model=ClinicOut)
def create_clinic(clinic: ClinicCreate, db: Session = Depends(get_db)):
    db_clinic = Clinic(**clinic.dict())
    db.add(db_clinic)
    db.commit()
    db.refresh(db_clinic)
    return db_clinic

@router.get("/", response_model=list[ClinicOut])
def read_clinics(db: Session = Depends(get_db)):
    return db.query(Clinic).all()