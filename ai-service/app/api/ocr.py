from fastapi import APIRouter, UploadFile, File

from app.services.ocr_service import extract_text

import shutil
import os

router = APIRouter()

UPLOAD_DIR = "temp"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/ocr")

async def ocr(file: UploadFile = File(...)):

    path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    text = extract_text(path)

    os.remove(path)

    return {

        "text": text

    }