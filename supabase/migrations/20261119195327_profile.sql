create table public.profile (
    id uuid primary key references auth.users (id) on delete cascade,
    first_name text,
    last_name text,
    email text unique,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.profile enable row level security;

create policy "profile_select_own" on public.profile
    for select to authenticated
    using ((select auth.uid()) = id);

create policy "profile_insert_own" on public.profile
    for insert to authenticated
    with check ((select auth.uid()) = id);

create policy "profile_update_own" on public.profile
    for update to authenticated
    using ((select auth.uid()) = id)
    with check ((select auth.uid()) = id);
