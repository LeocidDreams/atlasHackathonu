import json
from pathlib import Path
from load_env import require_env
from google import genai
from google.genai import types
from dataclasses import dataclass
from chunker import Chunk


GEMINI_API_KEY = require_env("GEMINI_API_KEY")

EMBEDDING_MODEL = "gemini-embedding-2"
# Must match the API (apps/api gemini-embedding-generator.ts) and the vector(N) column.
EMBEDDING_DIMENSIONS = 1536

# Only metadata that helps retrieval; PDF fields like producer/creationdate/source path are noise.
EMBEDDED_METADATA_KEYS = ("university", "page_label", "slide", "title", "subject")


def to_document_prompt(chunk: Chunk) -> str:
    # gemini-embedding-2 has no task_type option; the retrieval task goes into the text itself.
    # Same "title: ... | text: ..." format the API uses, so documents and queries embed consistently.
    title = chunk.meta_data.get("title") or Path(chunk.rel_path).stem
    metadata = {
        key: chunk.meta_data[key] for key in EMBEDDED_METADATA_KEYS if chunk.meta_data.get(key) not in (None, "")
    }
    return f"title: {title} | text: {chunk.content}, metadata: {json.dumps(metadata, ensure_ascii=False)}"


client = genai.Client(api_key=GEMINI_API_KEY)
BATCH_SIZE = 100


@dataclass
class Embedding:
    chunk: Chunk
    vector: list[float]

def generate_embeddings(chunks: list[Chunk]) -> list[list[float]]:
    embeddings: list[list[float]] = []
    for i in range(0, len(chunks), BATCH_SIZE):
        batch = chunks[i : i + BATCH_SIZE]
        result = client.models.embed_content(
            model=EMBEDDING_MODEL,
            # One Content per chunk; a plain list[str] becomes parts of a single Content and yields ONE merged embedding.
            contents=[types.Content(parts=[types.Part(text=to_document_prompt(chunk))]) for chunk in batch],
            config=types.EmbedContentConfig(output_dimensionality=EMBEDDING_DIMENSIONS),
        )
        embeddings.extend(e.values for e in result.embeddings)
    return embeddings  # embeddings[i] -> chunks[i]
