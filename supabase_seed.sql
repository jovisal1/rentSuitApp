begin;

-- -----------------------------------------------------
-- SCHEMA
-- -----------------------------------------------------

create table if not exists roles (
    id integer primary key,
    name text not null unique,
    description text
);

create table if not exists users (
    id integer primary key,
    role_id integer not null references roles(id),
    name text not null,
    email text not null unique,
    avatar_url text
);

create table if not exists customers (
    id integer primary key,
    name text not null,
    tax_id text,
    phone text,
    email text,
    notes text,
    active boolean not null
);

create table if not exists customer_addresses (
    id integer primary key,
    customer_id integer not null references customers(id) on delete cascade,
    alias text,
    line1 text not null,
    line2 text,
    city text,
    state text,
    postal_code text,
    country text,
    latitude numeric(9, 6),
    longitude numeric(9, 6),
    is_primary boolean not null
);

create table if not exists products (
    id integer primary key,
    name text not null,
    description text,
    price_per_day numeric(10, 2) not null,
    active boolean not null
);

create table if not exists product_sizes (
    id integer primary key,
    product_id integer not null references products(id) on delete cascade,
    size_code text not null,
    description text,
    active boolean not null
);

create table if not exists orders (
    id integer primary key,
    code text not null,
    customer_id integer not null references customers(id),
    delivery_address_id integer,
    pickup_address_id integer,
    start_date date not null,
    end_date date not null,
    status text not null check (status in ('PREPARADO', 'ENTREGADO', 'DEVUELTO', 'PENDIENTE_REVISION', 'FINALIZADO')),
    created_by integer not null references users(id),
    notes text
);

create table if not exists order_lines (
    id integer primary key,
    order_id integer not null references orders(id) on delete cascade,
    product_id integer not null references products(id),
    price_per_day numeric(10, 2) not null,
    rental_days integer not null,
    quantity_total integer not null,
    line_amount numeric(10, 2) not null
);

create table if not exists order_line_sizes (
    id integer primary key,
    order_line_id integer not null references order_lines(id) on delete cascade,
    size_id integer not null references product_sizes(id),
    quantity integer not null
);

create table if not exists order_status_history (
    id integer primary key,
    order_id integer not null references orders(id) on delete cascade,
    previous_status text check (previous_status is null or previous_status in ('PREPARADO', 'ENTREGADO', 'DEVUELTO', 'PENDIENTE_REVISION', 'FINALIZADO')),
    new_status text not null check (new_status in ('PREPARADO', 'ENTREGADO', 'DEVUELTO', 'PENDIENTE_REVISION', 'FINALIZADO')),
    changed_by integer not null references users(id),
    changed_at timestamptz not null,
    notes text
);

-- -----------------------------------------------------
-- DATA
-- -----------------------------------------------------

insert into roles (id, name, description) values
    (1, 'NORMAL', 'Standard user'),
    (2, 'ADMIN', 'System administrator');

insert into users (id, role_id, name, email, avatar_url) values
    (1, 2, 'Main Admin', 'pvidalsalvador@gmail.com', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&auto=format&fit=crop&q=80'),
    (2, 1, 'Operator 1', 'operator@gmail.com', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=128&auto=format&fit=crop&q=80');

insert into customers (id, name, tax_id, phone, email, notes, active) values
    (1, 'Comercial Atlas S.L.', 'B12345678', '+34 912 345 678', 'contacto@atlas-sl.test', 'Cliente corporativo con contrato anual.', true),
    (2, 'Laura Martínez', '12345678Z', '+34 600 123 456', 'laura.martinez@testmail.com', 'Prefiere contacto por email.', true),
    (3, 'Distribuciones Norte S.A.', 'A87654321', '+34 944 987 321', 'info@distnorte.test', 'Requiere facturación mensual agrupada.', true),
    (4, 'Miguel Torres', '23456789X', '+34 611 789 234', 'miguel.torres@example.test', 'Cliente inactivo por impago.', false),
    (5, 'Tech Solutions Iberia', 'B99887766', '+34 931 456 789', 'sales@techiberia.test', 'Cliente tecnológico, alto volumen.', true),
    (6, 'Ana Gómez', '34567890M', '+34 622 456 901', 'ana.gomez@testmail.com', 'Cliente particular.', true),
    (7, 'Logística Sur S.L.', 'B44556677', '+34 954 321 987', 'operaciones@logsur.test', 'Entrega en horario de mañana.', true),
    (8, 'Carlos Ruiz', null, '+34 633 987 654', 'carlos.ruiz@testmail.com', 'Sin datos fiscales registrados.', false),
    (9, 'Editorial Prisma', 'B11223344', '+34 915 888 222', 'administracion@prisma.test', 'Facturación trimestral.', true),
    (10, 'Lucía Fernández', '45678901P', '+34 644 222 111', 'lucia.fernandez@testmail.com', 'Cliente nuevo.', true);

insert into customer_addresses (id, customer_id, alias, line1, line2, city, state, postal_code, country, latitude, longitude, is_primary) values
    (101, 1, 'Oficina central', 'Calle Gran Vía 45', 'Planta 3', 'Madrid', 'Madrid', '28013', 'España', 40.420300, -3.705800, true),
    (102, 2, 'Domicilio', 'Av. Diagonal 640', null, 'Barcelona', 'Cataluña', '08017', 'España', 41.393600, 2.134400, true),
    (103, 3, 'Almacén', 'Polígono Industrial Artxanda', 'Nave 12', 'Bilbao', 'País Vasco', '48015', 'España', 43.301600, -2.910100, true),
    (104, 4, 'Casa', 'Calle Larga 12', null, 'Jerez de la Frontera', 'Andalucía', '11402', 'España', 36.685000, -6.126700, true),
    (105, 5, 'Sede principal', 'Carrer de Pallars 193', 'Edificio MediaTIC', 'Barcelona', 'Cataluña', '08005', 'España', 41.403600, 2.192000, true),
    (106, 6, 'Vivienda habitual', 'Calle del Mar 8', null, 'Valencia', 'Comunidad Valenciana', '46003', 'España', 39.476900, -0.376300, true),
    (107, 7, 'Centro logístico', 'Polígono La Isla', 'Parcela 22', 'Dos Hermanas', 'Andalucía', '41703', 'España', 37.286500, -5.924300, true),
    (108, 8, 'Residencia', 'Camino Viejo 4', null, 'Murcia', 'Región de Murcia', '30008', 'España', 37.992200, -1.130700, true),
    (109, 9, 'Oficinas', 'Paseo de la Castellana 120', null, 'Madrid', 'Madrid', '28046', 'España', 40.460100, -3.689000, true),
    (110, 10, 'Piso', 'Rua do Franco 15', null, 'Santiago de Compostela', 'Galicia', '15702', 'España', 42.880500, -8.545700, true);

insert into products (id, name, description, price_per_day, active) values
    (1, 'Motorcycle Helmet', 'Homologated full-face helmet', 8, true),
    (2, 'Open-Face Helmet', 'Lightweight open-face helmet', 6, true),
    (3, 'Gala Suit', 'Formal suit for events', 12, true),
    (4, 'Tuxedo', 'Premium black tuxedo', 18, true),
    (5, 'XL Tent', 'Outdoor event tent 5x10m', 35, true),
    (6, 'Medium Tent', 'Medium-size tent 3x6m', 22, true),
    (7, 'Small Gazebo', 'Portable gazebo 3x3m', 10, true),
    (8, 'PA Speaker 12"', '500W powered speaker', 15, true),
    (9, 'PA Speaker 15"', '800W powered speaker', 20, true),
    (10, 'LED Spotlight', 'RGB LED spotlight for ambient lighting', 5, true),
    (11, 'Moving Head Light', 'Professional moving-head stage light', 25, true),
    (12, 'Folding Chair', 'Lightweight folding chair for events', 2, true),
    (13, 'Round Table 150cm', 'Large round table for 8-10 people', 10, true),
    (14, 'Electric Generator 3kW', 'Portable generator for small events', 28, true),
    (15, 'Electric Generator 6kW', 'Medium-power generator', 45, true),
    (16, '4K Video Camera', 'High-resolution camera for event recording', 40, true),
    (17, 'Wireless Microphone Kit', 'Handheld microphone with receiver', 18, true),
    (18, 'Small Scaffold Tower', '2m scaffold tower for assembly staff', 25, true),
    (19, 'Large Scaffold Tower', '5m scaffold tower for event construction', 45, true),
    (20, 'Red Velvet Rope', 'VIP rope divider', 3, true),
    (21, 'Golden Stanchion', 'Metal stanchion for VIP lanes', 5, true),
    (22, 'Portable Bar Counter', 'Folding bar counter for events', 35, true),
    (23, 'Outdoor Heater', 'Gas-powered patio heater', 30, true),
    (24, 'Fiber Carpet Roll 10m', 'Event carpet roll for flooring', 12, true),
    (25, 'LED Wall Panel', 'Modular LED video wall panel', 50, true);

insert into product_sizes (id, product_id, size_code, description, active) values
    (1, 1, 'M', 'Medium helmet', true),
    (2, 1, 'L', 'Large helmet', true),
    (3, 3, 'M', 'Medium suit', true),
    (4, 3, 'L', 'Large suit', true),
    (5, 5, 'XL', 'Extra large tent', true);

insert into orders (id, code, customer_id, delivery_address_id, pickup_address_id, start_date, end_date, status, created_by, notes) values
    (1, 'P-001', 1, 1, 1, '2025-12-10', '2025-12-14', 'PREPARADO', 2, 'Delivery in the morning'),
    (2, 'P-002', 2, 2, 2, '2025-12-08', '2025-12-11', 'ENTREGADO', 2, null),
    (3, 'P-003', 3, 3, 3, '2025-12-05', '2025-12-09', 'PENDIENTE_REVISION', 1, 'Check possible tent damage'),
    (4, 'P-004', 1, 1, 1, '2025-12-01', '2025-12-03', 'FINALIZADO', 2, null),
    (5, 'P-005', 4, 4, 4, '2025-11-20', '2025-11-23', 'ENTREGADO', 1, 'Entrega en turno de tarde'),
    (6, 'P-006', 5, 5, 5, '2025-11-25', '2025-11-29', 'PREPARADO', 2, null),
    (7, 'P-007', 6, 6, 6, '2025-12-02', '2025-12-06', 'DEVUELTO', 1, 'Devolucion completa'),
    (8, 'P-008', 7, 7, 7, '2025-12-12', '2025-12-15', 'PENDIENTE_REVISION', 2, 'Pendiente de revision de material'),
    (9, 'P-009', 8, 8, 8, '2025-11-10', '2025-11-13', 'FINALIZADO', 1, null),
    (10, 'P-010', 9, 9, 9, '2025-11-14', '2025-11-18', 'ENTREGADO', 2, null),
    (11, 'P-011', 10, 10, 10, '2025-12-18', '2025-12-22', 'PREPARADO', 1, 'Confirmar horario de recogida'),
    (12, 'P-012', 2, 2, 2, '2025-11-05', '2025-11-07', 'FINALIZADO', 1, null),
    (13, 'P-013', 3, 3, 3, '2025-11-30', '2025-12-02', 'ENTREGADO', 2, 'Revisar accesorios incluidos'),
    (14, 'P-014', 1, 1, 1, '2025-12-20', '2025-12-24', 'PREPARADO', 2, null),
    (15, 'P-015', 5, 5, 5, '2025-11-01', '2025-11-04', 'FINALIZADO', 1, null),
    (16, 'P-016', 6, 6, 6, '2025-12-07', '2025-12-10', 'DEVUELTO', 2, null),
    (17, 'P-017', 7, 7, 7, '2025-11-22', '2025-11-26', 'PENDIENTE_REVISION', 1, 'Falta una chaqueta'),
    (18, 'P-018', 8, 8, 8, '2025-12-26', '2025-12-29', 'ENTREGADO', 2, null),
    (19, 'P-019', 9, 9, 9, '2025-12-28', '2026-01-02', 'PREPARADO', 1, 'Pedido para cierre de anio');

insert into order_lines (id, order_id, product_id, price_per_day, rental_days, quantity_total, line_amount) values
    (1, 1, 1, 8, 4, 3, 96),
    (2, 1, 2, 12, 4, 2, 96),
    (3, 2, 1, 8, 3, 3, 72),
    (4, 3, 2, 12, 4, 6, 288),
    (5, 3, 3, 35, 4, 2, 280),
    (6, 3, 1, 8, 4, 6, 192),
    (7, 4, 1, 8, 2, 2, 32);

insert into order_line_sizes (id, order_line_id, size_id, quantity) values
    (1, 1, 1, 2),
    (2, 1, 2, 1),
    (3, 2, 3, 1),
    (4, 2, 4, 1),
    (5, 3, 1, 1),
    (6, 3, 2, 2),
    (7, 4, 3, 4),
    (8, 4, 4, 2),
    (9, 5, 5, 2),
    (10, 6, 1, 3),
    (11, 6, 2, 3),
    (12, 7, 1, 2);

insert into order_status_history (id, order_id, previous_status, new_status, changed_by, changed_at, notes) values
    (1, 3, 'DEVUELTO', 'PENDIENTE_REVISION', 2, '2025-12-09T18:30:00Z', 'Missing photos of the tent');

commit;
