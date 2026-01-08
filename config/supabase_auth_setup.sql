begin;

-- Link app profiles to Supabase Auth users
alter table public.users
add column if not exists auth_user_id uuid unique;

-- RLS for users table (only owner can read/write)
alter table public.users enable row level security;

drop policy if exists users_select_all on public.users;
drop policy if exists users_select_own on public.users;
create policy "users_select_own"
on public.users
for select
using (auth.uid() = auth_user_id);

drop policy if exists users_update_auth on public.users;
drop policy if exists users_update_own on public.users;
create policy "users_update_own"
on public.users
for update
using (auth.uid() = auth_user_id)
with check (auth.uid() = auth_user_id);

drop policy if exists users_insert_all on public.users;
drop policy if exists users_insert_auth on public.users;
create policy "users_insert_auth"
on public.users
for insert
with check (auth.role() = 'authenticated');

drop policy if exists users_delete_all on public.users;
drop policy if exists users_delete_auth on public.users;
create policy "users_delete_auth"
on public.users
for delete
using (auth.role() = 'authenticated');

commit;
