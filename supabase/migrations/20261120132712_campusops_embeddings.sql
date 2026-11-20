create extension if not exists vector with schema extensions;

-- One row per embedded chunk, written by apps/campusops-training.
create table public.campusops_embeddings (
    id bigint generated always as identity primary key,
    university text not null,
    -- File path relative to the training data/ folder, e.g. 'dokuz-eylul/DEU_Yerleskeler.pdf'.
    source_path text not null,
    -- Position of the chunk within its file; with source_path it lets re-runs upsert instead of duplicating.
    chunk_index integer not null check (chunk_index >= 0),
    content text not null,
    metadata jsonb not null default '{}'::jsonb,
    -- Must match EMBEDDING_DIMENSIONS in the API and the training script.
    embedding extensions.vector(1536) not null,
    created_at timestamptz not null default now(),
    unique (source_path, chunk_index)
);

-- Cosine distance (<=>) for similarity search.
create index campusops_embeddings_embedding_idx
    on public.campusops_embeddings
    using hnsw (embedding extensions.vector_cosine_ops);

create index campusops_embeddings_university_idx
    on public.campusops_embeddings (university);

-- No policies: only the secret key (service role, bypasses RLS) can read or write.
alter table public.campusops_embeddings enable row level security;

-- Nearest chunks to a query embedding, optionally limited to one university.
create function public.match_campusops_embeddings(
    query_embedding extensions.vector(1536),
    match_count integer default 5,
    filter_university text default null
)
returns table (
    id bigint,
    university text,
    source_path text,
    content text,
    metadata jsonb,
    similarity double precision
)
language sql
stable
security invoker
set search_path = ''
as $$
    select
        e.id,
        e.university,
        e.source_path,
        e.content,
        e.metadata,
        1 - (e.embedding operator(extensions.<=>) query_embedding) as similarity
    from public.campusops_embeddings as e
    where filter_university is null or e.university = filter_university
    order by e.embedding operator(extensions.<=>) query_embedding
    limit match_count;
$$;
