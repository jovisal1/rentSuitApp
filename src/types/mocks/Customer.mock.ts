import { Customer } from "@/types/Customer";

export const customers: Customer[] = [
    {
        id: 1,
        name: "Comercial Atlas S.L.",
        taxId: "B12345678",
        phone: "+34 912 345 678",
        email: "contacto@atlas-sl.test",
        notes: "Cliente corporativo con contrato anual.",
        active: true,
        address: {
            id: 101,
            alias: "Oficina central",
            line1: "Calle Gran Vía 45",
            line2: "Planta 3",
            city: "Madrid",
            state: "Madrid",
            postalCode: "28013",
            country: "España",
            latitude: 40.4203,
            longitude: -3.7058,
            isPrimary: true
        }
    },
    {
        id: 2,
        name: "Laura Martínez",
        taxId: "12345678Z",
        phone: "+34 600 123 456",
        email: "laura.martinez@testmail.com",
        notes: "Prefiere contacto por email.",
        active: true,
        address: {
            id: 102,
            alias: "Domicilio",
            line1: "Av. Diagonal 640",
            city: "Barcelona",
            state: "Cataluña",
            postalCode: "08017",
            country: "España",
            latitude: 41.3936,
            longitude: 2.1344,
            isPrimary: true
        }
    },
    {
        id: 3,
        name: "Distribuciones Norte S.A.",
        taxId: "A87654321",
        phone: "+34 944 987 321",
        email: "info@distnorte.test",
        notes: "Requiere facturación mensual agrupada.",
        active: true,
        address: {
            id: 103,
            alias: "Almacén",
            line1: "Polígono Industrial Artxanda",
            line2: "Nave 12",
            city: "Bilbao",
            state: "País Vasco",
            postalCode: "48015",
            country: "España",
            latitude: 43.3016,
            longitude: -2.9101,
            isPrimary: true
        }
    },
    {
        id: 4,
        name: "Miguel Torres",
        taxId: "23456789X",
        phone: "+34 611 789 234",
        email: "miguel.torres@example.test",
        notes: "Cliente inactivo por impago.",
        active: false,
        address: {
            id: 104,
            alias: "Casa",
            line1: "Calle Larga 12",
            city: "Jerez de la Frontera",
            state: "Andalucía",
            postalCode: "11402",
            country: "España",
            latitude: 36.6850,
            longitude: -6.1267,
            isPrimary: true
        }
    },
    {
        id: 5,
        name: "Tech Solutions Iberia",
        taxId: "B99887766",
        phone: "+34 931 456 789",
        email: "sales@techiberia.test",
        notes: "Cliente tecnológico, alto volumen.",
        active: true,
        address: {
            id: 105,
            alias: "Sede principal",
            line1: "Carrer de Pallars 193",
            line2: "Edificio MediaTIC",
            city: "Barcelona",
            state: "Cataluña",
            postalCode: "08005",
            country: "España",
            latitude: 41.4036,
            longitude: 2.1920,
            isPrimary: true
        }
    },
    {
        id: 6,
        name: "Ana Gómez",
        taxId: "34567890M",
        phone: "+34 622 456 901",
        email: "ana.gomez@testmail.com",
        notes: "Cliente particular.",
        active: true,
        address: {
            id: 106,
            alias: "Vivienda habitual",
            line1: "Calle del Mar 8",
            city: "Valencia",
            state: "Comunidad Valenciana",
            postalCode: "46003",
            country: "España",
            latitude: 39.4769,
            longitude: -0.3763,
            isPrimary: true
        }
    },
    {
        id: 7,
        name: "Logística Sur S.L.",
        taxId: "B44556677",
        phone: "+34 954 321 987",
        email: "operaciones@logsur.test",
        notes: "Entrega en horario de mañana.",
        active: true,
        address: {
            id: 107,
            alias: "Centro logístico",
            line1: "Polígono La Isla",
            line2: "Parcela 22",
            city: "Dos Hermanas",
            state: "Andalucía",
            postalCode: "41703",
            country: "España",
            latitude: 37.2865,
            longitude: -5.9243,
            isPrimary: true
        }
    },
    {
        id: 8,
        name: "Carlos Ruiz",
        phone: "+34 633 987 654",
        email: "carlos.ruiz@testmail.com",
        notes: "Sin datos fiscales registrados.",
        active: false,
        address: {
            id: 108,
            alias: "Residencia",
            line1: "Camino Viejo 4",
            city: "Murcia",
            state: "Región de Murcia",
            postalCode: "30008",
            country: "España",
            latitude: 37.9922,
            longitude: -1.1307,
            isPrimary: true
        }
    },
    {
        id: 9,
        name: "Editorial Prisma",
        taxId: "B11223344",
        phone: "+34 915 888 222",
        email: "administracion@prisma.test",
        notes: "Facturación trimestral.",
        active: true,
        address: {
            id: 109,
            alias: "Oficinas",
            line1: "Paseo de la Castellana 120",
            city: "Madrid",
            state: "Madrid",
            postalCode: "28046",
            country: "España",
            latitude: 40.4601,
            longitude: -3.6890,
            isPrimary: true
        }
    },
    {
        id: 10,
        name: "Lucía Fernández",
        taxId: "45678901P",
        phone: "+34 644 222 111",
        email: "lucia.fernandez@testmail.com",
        notes: "Cliente nuevo.",
        active: true,
        address: {
            id: 110,
            alias: "Piso",
            line1: "Rua do Franco 15",
            city: "Santiago de Compostela",
            state: "Galicia",
            postalCode: "15702",
            country: "España",
            latitude: 42.8805,
            longitude: -8.5457,
            isPrimary: true
        }
    }
];
