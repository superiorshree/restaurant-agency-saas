alter table public.domains
  add column if not exists registrar text,
  add column if not exists purchase_date date,
  add column if not exists expiry_date date,
  add column if not exists auto_renewal boolean not null default false,
  add column if not exists ssl_expiry date,
  add column if not exists dns_status text not null default 'Pending',
  add column if not exists verification_status text not null default 'Pending',
  add column if not exists dns_records jsonb not null default '[]'::jsonb;

update public.domains
set registrar = coalesce(provider, 'Unknown')
where registrar is null;

alter table public.domains
  alter column registrar set not null;

alter table public.domains enable row level security;

drop policy if exists "Business owners can manage domains" on public.domains;

create policy "Business owners can manage domains"
on public.domains
for all
using (
  exists (
    select 1 from public.businesses
    where businesses.id = domains.business_id
      and businesses.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.businesses
    where businesses.id = domains.business_id
      and businesses.owner_id = auth.uid()
  )
);
