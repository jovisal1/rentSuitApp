begin;

-- Ensure RLS is enabled
alter table public.roles enable row level security;
alter table public.customers enable row level security;
alter table public.customer_addresses enable row level security;
alter table public.products enable row level security;
alter table public.product_sizes enable row level security;
alter table public.orders enable row level security;
alter table public.order_lines enable row level security;
alter table public.order_line_sizes enable row level security;
alter table public.order_status_history enable row level security;

-- SELECT policies (authenticated only)
drop policy if exists roles_select_all on public.roles;
drop policy if exists roles_select_auth on public.roles;
create policy "roles_select_auth"
on public.roles
for select
using (auth.role() = 'authenticated');

drop policy if exists customers_select_all on public.customers;
drop policy if exists customers_select_auth on public.customers;
create policy "customers_select_auth"
on public.customers
for select
using (auth.role() = 'authenticated');

drop policy if exists customer_addresses_select_all on public.customer_addresses;
drop policy if exists customer_addresses_select_auth on public.customer_addresses;
create policy "customer_addresses_select_auth"
on public.customer_addresses
for select
using (auth.role() = 'authenticated');

drop policy if exists products_select_all on public.products;
drop policy if exists products_select_auth on public.products;
create policy "products_select_auth"
on public.products
for select
using (auth.role() = 'authenticated');

drop policy if exists product_sizes_select_all on public.product_sizes;
drop policy if exists product_sizes_select_auth on public.product_sizes;
create policy "product_sizes_select_auth"
on public.product_sizes
for select
using (auth.role() = 'authenticated');

drop policy if exists orders_select_all on public.orders;
drop policy if exists orders_select_auth on public.orders;
create policy "orders_select_auth"
on public.orders
for select
using (auth.role() = 'authenticated');

drop policy if exists order_lines_select_all on public.order_lines;
drop policy if exists order_lines_select_auth on public.order_lines;
create policy "order_lines_select_auth"
on public.order_lines
for select
using (auth.role() = 'authenticated');

drop policy if exists order_line_sizes_select_all on public.order_line_sizes;
drop policy if exists order_line_sizes_select_auth on public.order_line_sizes;
create policy "order_line_sizes_select_auth"
on public.order_line_sizes
for select
using (auth.role() = 'authenticated');

drop policy if exists order_status_history_select_all on public.order_status_history;
drop policy if exists order_status_history_select_auth on public.order_status_history;
create policy "order_status_history_select_auth"
on public.order_status_history
for select
using (auth.role() = 'authenticated');

-- INSERT policies (authenticated only)
drop policy if exists customers_insert_all on public.customers;
drop policy if exists customers_insert_auth on public.customers;
create policy "customers_insert_auth"
on public.customers
for insert
with check (auth.role() = 'authenticated');

drop policy if exists customer_addresses_insert_all on public.customer_addresses;
drop policy if exists customer_addresses_insert_auth on public.customer_addresses;
create policy "customer_addresses_insert_auth"
on public.customer_addresses
for insert
with check (auth.role() = 'authenticated');

drop policy if exists orders_insert_all on public.orders;
drop policy if exists orders_insert_auth on public.orders;
create policy "orders_insert_auth"
on public.orders
for insert
with check (auth.role() = 'authenticated');

drop policy if exists order_lines_insert_all on public.order_lines;
drop policy if exists order_lines_insert_auth on public.order_lines;
create policy "order_lines_insert_auth"
on public.order_lines
for insert
with check (auth.role() = 'authenticated');

drop policy if exists order_line_sizes_insert_all on public.order_line_sizes;
drop policy if exists order_line_sizes_insert_auth on public.order_line_sizes;
create policy "order_line_sizes_insert_auth"
on public.order_line_sizes
for insert
with check (auth.role() = 'authenticated');

drop policy if exists order_status_history_insert_all on public.order_status_history;
drop policy if exists order_status_history_insert_auth on public.order_status_history;
create policy "order_status_history_insert_auth"
on public.order_status_history
for insert
with check (auth.role() = 'authenticated');

-- UPDATE policies (authenticated only)
drop policy if exists customers_update_all on public.customers;
drop policy if exists customers_update_auth on public.customers;
create policy "customers_update_auth"
on public.customers
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists customer_addresses_update_all on public.customer_addresses;
drop policy if exists customer_addresses_update_auth on public.customer_addresses;
create policy "customer_addresses_update_auth"
on public.customer_addresses
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists orders_update_all on public.orders;
drop policy if exists orders_update_auth on public.orders;
create policy "orders_update_auth"
on public.orders
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists order_lines_update_all on public.order_lines;
drop policy if exists order_lines_update_auth on public.order_lines;
create policy "order_lines_update_auth"
on public.order_lines
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists order_line_sizes_update_all on public.order_line_sizes;
drop policy if exists order_line_sizes_update_auth on public.order_line_sizes;
create policy "order_line_sizes_update_auth"
on public.order_line_sizes
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists order_status_history_update_all on public.order_status_history;
drop policy if exists order_status_history_update_auth on public.order_status_history;
create policy "order_status_history_update_auth"
on public.order_status_history
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

-- DELETE policies (authenticated only)
drop policy if exists customers_delete_all on public.customers;
drop policy if exists customers_delete_auth on public.customers;
create policy "customers_delete_auth"
on public.customers
for delete
using (auth.role() = 'authenticated');

drop policy if exists customer_addresses_delete_all on public.customer_addresses;
drop policy if exists customer_addresses_delete_auth on public.customer_addresses;
create policy "customer_addresses_delete_auth"
on public.customer_addresses
for delete
using (auth.role() = 'authenticated');

drop policy if exists orders_delete_all on public.orders;
drop policy if exists orders_delete_auth on public.orders;
create policy "orders_delete_auth"
on public.orders
for delete
using (auth.role() = 'authenticated');

drop policy if exists order_lines_delete_all on public.order_lines;
drop policy if exists order_lines_delete_auth on public.order_lines;
create policy "order_lines_delete_auth"
on public.order_lines
for delete
using (auth.role() = 'authenticated');

drop policy if exists order_line_sizes_delete_all on public.order_line_sizes;
drop policy if exists order_line_sizes_delete_auth on public.order_line_sizes;
create policy "order_line_sizes_delete_auth"
on public.order_line_sizes
for delete
using (auth.role() = 'authenticated');

drop policy if exists order_status_history_delete_all on public.order_status_history;
drop policy if exists order_status_history_delete_auth on public.order_status_history;
create policy "order_status_history_delete_auth"
on public.order_status_history
for delete
using (auth.role() = 'authenticated');

commit;
