from pdf2image import convert_from_path
import tempfile
import os

from services.ocr_service import extract_text


def extract_text_from_scanned_pdf(pdf_path: str) -> str:

    images = convert_from_path(pdf_path)

    complete_text = []

    for image in images:

        with tempfile.NamedTemporaryFile(
            suffix=".png",
            delete=False
        ) as temp:

            image.save(temp.name, "PNG")

            text = extract_text(temp.name)

            complete_text.append(text)

            os.remove(temp.name)

    return "\n".join(complete_text)