import os
from pypdf import PdfReader
from docx import Document


def extract_text_from_pdf(file):
    """
    Extract text from a PDF file.
    """

    text = ""

    try:
        reader = PdfReader(file)

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    except Exception as e:
        raise Exception(f"Could not read PDF file: {str(e)}")

    return text


def extract_text_from_docx(file):
    """
    Extract text from a DOCX file.
    """

    text = ""

    try:
        document = Document(file)

        for paragraph in document.paragraphs:
            if paragraph.text.strip():
                text += paragraph.text + "\n"

    except Exception as e:
        raise Exception(f"Could not read DOCX file: {str(e)}")

    return text


def extract_text_from_txt(file):
    """
    Extract text from a TXT file.
    """

    try:
        raw_text = file.read()

        if isinstance(raw_text, bytes):
            raw_text = raw_text.decode("utf-8", errors="ignore")

        return raw_text

    except Exception as e:
        raise Exception(f"Could not read TXT file: {str(e)}")


def extract_text(file):
    """
    Automatically extract text based on file type.
    """

    file_name = file.name.lower()

    if file_name.endswith(".pdf"):
        return extract_text_from_pdf(file)

    elif file_name.endswith(".docx"):
        return extract_text_from_docx(file)

    elif file_name.endswith(".txt"):
        return extract_text_from_txt(file)

    else:
        raise ValueError(
            "Unsupported file type. Please upload PDF, DOCX, or TXT."
        )


def clean_text(text):
    """
    Clean extracted document text.
    """

    if not text:
        return ""

    # Remove excessive spaces
    text = " ".join(text.split())

    return text


def split_text(text, chunk_size=800, overlap=100):
    """
    Split document text into overlapping chunks.

    Overlapping chunks help the RAG system preserve context.
    """

    if not text:
        return []

    chunks = []

    start = 0
    text_length = len(text)

    while start < text_length:

        end = start + chunk_size

        chunk = text[start:end].strip()

        if chunk:
            chunks.append(chunk)

        start += chunk_size - overlap

    return chunks