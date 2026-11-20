import os
from pathlib import Path

from langchain_community.document_loaders import Docx2txtLoader, PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pptx import Presentation
from dataclasses import dataclass
from langchain_core import documents



def extract_pptx_docs(path: str) -> list[documents.Document]:
    slide_docs: list[documents.Document] = []
    for slide_index, slide in enumerate(Presentation(path).slides):
        parts: list[str] = []
        for shape in slide.shapes:
            if shape.has_text_frame:
                parts.append(shape.text_frame.text)
            elif shape.has_table:
                for row in shape.table.rows:
                    cells = [cell.text.strip() for cell in row.cells]
                    if any(cells):
                        parts.append(" | ".join(cells))
        text = "\n".join(part for part in parts if part.strip())
        if text:
            slide_docs.append(
                documents.Document(page_content=text, metadata={"source": path, "slide": slide_index})
            )
    return slide_docs


SUPPORTED_EXTENSIONS = {".pdf", ".docx", ".pptx", ".md", ".txt"}


def extreact_document(path: str) -> list[documents.Document]:
    if not os.path.isabs(path):
        path = os.path.abspath(path)

    extension = Path(path).suffix.lower()
    if extension == ".pdf":
        docs = PyPDFLoader(path).load()
    elif extension == ".docx":
        docs = Docx2txtLoader(path).load()
    elif extension in (".md", ".txt"):
        docs = TextLoader(path, encoding="utf-8").load()
    elif extension == ".pptx":
        return extract_pptx_docs(path)
    else:
        raise ValueError(f"Unsupported file type: {path} (supported: {sorted(SUPPORTED_EXTENSIONS)})")

    return docs



DATA_DIR = Path(__file__).resolve().parent / "data"

splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)


@dataclass
class Chunk:
    abs_path: str
    rel_path: str
    # Position within its file; with rel_path it is the row's unique key in campusops_embeddings.
    chunk_index: int
    content: str
    meta_data: dict[str, str]

def generate_chunks(university_name: str, document_paths: list[str]) -> list[Chunk]:
    chunks_list: list[Chunk] = []
    for path in document_paths:
        chunk_index = 0
        for doc in extreact_document(path):
            for chunk in splitter.split_text(doc.page_content):
                chunks_list.append(Chunk(
                    abs_path=path,
                    rel_path=os.path.relpath(path, DATA_DIR),
                    chunk_index=chunk_index,
                    content=chunk,
                    meta_data={**doc.metadata, "university": university_name}
                ))
                chunk_index += 1
    return chunks_list

