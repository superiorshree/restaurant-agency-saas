create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,

    full_name text,

    avatar_url text,

    phone text,

    role text not null default 'client',

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);
create index idx_profiles_role
on public.profiles(role);
alter table public.profiles
enable row level security;
create policy "Users can view own profile"

on public.profiles

for select

using (auth.uid() = id);
create policy "Users can update own profile"

on public.profiles

for update

using (auth.uid() = id);