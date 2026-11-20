-- The HNSW index returns its ef_search (40) nearest rows before the university filter runs,
-- so universities without a row among them got no matches. Iterative scan keeps searching
-- the index until match_count rows pass the filter (pgvector 0.8+).
-- It is set with set_config inside the body because a function-level SET of
-- hnsw.iterative_scan needs superuser; is_local = true limits it to the current transaction.
create or replace function public.match_campusops_embeddings(
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
language plpgsql
volatile
security invoker
set search_path = ''
as $$
begin
    perform pg_catalog.set_config('hnsw.iterative_scan', 'relaxed_order', true);

    -- relaxed_order can return rows slightly out of order; sort the final rows again.
    return query
    with matches as materialized (
        select
            e.id,
            e.university,
            e.source_path,
            e.content,
            e.metadata,
            e.embedding operator(extensions.<=>) query_embedding as distance
        from public.campusops_embeddings as e
        where filter_university is null or e.university = filter_university
        order by e.embedding operator(extensions.<=>) query_embedding
        limit match_count
    )
    select m.id, m.university, m.source_path, m.content, m.metadata, 1 - m.distance as similarity
    from matches as m
    order by m.distance;
end;
$$;
