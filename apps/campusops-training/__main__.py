import os
from collections.abc import Iterator
from pathlib import Path

from load_env import require_env
from chunker import DATA_DIR, SUPPORTED_EXTENSIONS, generate_chunks
from embedding import Embedding, generate_embeddings
from supabase import create_client, Client

SUPABASE_URL = require_env("SUPABASE_URL")
SUPABASE_SECRET_KEY = require_env("SUPABASE_SECRET_KEY")

# Files chunked and embedded per step, so a large folder never sits in memory all at once.
# Embedding requests are batched separately inside generate_embeddings.
FILE_BATCH_SIZE = 20
# Rows per Supabase request; keeps each request body a few MB at most.
SAVE_BATCH_SIZE = 100

university_names = ["dokuz-eylul"]

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SECRET_KEY)

def list_document_paths(university_name: str) -> list[str]:
    paths: list[str] = []
    for dirpath, _, filenames in os.walk(DATA_DIR / university_name):
        for filename in sorted(filenames):
            path = os.path.join(dirpath, filename)
            if Path(filename).suffix.lower() in SUPPORTED_EXTENSIONS:
                paths.append(path)
            else:
                print(f"Skipping unsupported file: {os.path.relpath(path, DATA_DIR)}")
    return paths


def iter_embedding_batches(university_name: str, document_paths: list[str]) -> Iterator[list[Embedding]]:
    for i in range(0, len(document_paths), FILE_BATCH_SIZE):
        path_batch = document_paths[i : i + FILE_BATCH_SIZE]
        chunks = generate_chunks(university_name, path_batch)
        vectors = generate_embeddings(chunks)
        yield [Embedding(chunk=chunk, vector=vector) for chunk, vector in zip(chunks, vectors, strict=True)]

def save_embeddings(embeddings: list[Embedding]) -> None:
    # One request per SAVE_BATCH_SIZE rows instead of one per row; each vector is ~1536 floats of JSON.
    rows = [
        {
            "university": embedding.chunk.meta_data["university"],
            "source_path": Path(embedding.chunk.rel_path).as_posix(),
            "chunk_index": embedding.chunk.chunk_index,
            "content": embedding.chunk.content,
            "metadata": embedding.chunk.meta_data,
            "embedding": embedding.vector,
        }
        for embedding in embeddings
    ]
    for i in range(0, len(rows), SAVE_BATCH_SIZE):
        # Upsert on the unique key so re-running the script updates rows instead of failing on duplicates.
        supabase.table("campusops_embeddings").upsert(
            rows[i : i + SAVE_BATCH_SIZE], on_conflict="source_path,chunk_index"
        ).execute()


for university_index, university_name in enumerate(university_names, start=1):
    document_paths = list_document_paths(university_name)
    processed_files = 0
    embedded_chunks = 0

    for embedding_batch in iter_embedding_batches(university_name, document_paths):
        save_embeddings(embedding_batch)
        processed_files = min(processed_files + FILE_BATCH_SIZE, len(document_paths))
        embedded_chunks += len(embedding_batch)
        print(f"[{university_name}] {processed_files}/{len(document_paths)} files, {embedded_chunks} chunks embedded")

    print(f"Processed {university_index}/{len(university_names)} universities: {university_name}")
