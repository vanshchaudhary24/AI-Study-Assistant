import easyocr

reader = None


def get_reader():
    global reader

    if reader is None:
        reader = easyocr.Reader(
            ["en"],
            gpu=False
        )

    return reader


def extract_text(image_path: str):

    ocr = get_reader()

    result = ocr.readtext(
        image_path,
        detail=0
    )

    return "\n".join(result)