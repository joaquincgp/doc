from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.schemas.prescription import PrescriptionCreate, PrescriptionOut
from backend.app.models.prescription import Prescription
from backend.app.database.session import get_db

router = APIRouter(prefix="/prescriptions", tags=["Prescriptions"])

@router.post("/", response_model=PrescriptionOut)
def create_prescription(prescription: PrescriptionCreate, db: Session = Depends(get_db)):
    db_prescription = Prescription(**prescription.dict())
    db.add(db_prescription)
    db.commit()
    db.refresh(db_prescription)
    return db_prescription

@router.get("/", response_model=list[PrescriptionOut])
def read_prescriptions(db: Session = Depends(get_db)):
    return db.query(Prescription).all()