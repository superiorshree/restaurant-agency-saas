alter table public.websites
  add column if not exists domain_id uuid references public.domains(id) on delete set null;

create index if not exists idx_websites_domain_id on public.websites(domain_id);

alter table public.websites enable row level security;

drop policy if exists "Business owners can manage websites" on public.websites;

create policy "Business owners can manage websites"
on public.websites
for all
using (
  exists (
    select 1 from public.businesses
    where businesses.id = websites.business_id
      and businesses.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.businesses
    where businesses.id = websites.business_id
      and businesses.owner_id = auth.uid()
  )
);
