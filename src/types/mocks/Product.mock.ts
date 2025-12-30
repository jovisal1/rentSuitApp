import { Product, ProductSize } from '../Product';

// -----------------------------------------------------
// PRODUCTS (extended list)
// -----------------------------------------------------

export const products: Product[] = [
    // Helmets
    {
        id: 1,
        name: 'Motorcycle Helmet',
        description: 'Homologated full-face helmet',
        pricePerDay: 8,
        active: true,
    },
    {
        id: 2,
        name: 'Open-Face Helmet',
        description: 'Lightweight open-face helmet',
        pricePerDay: 6,
        active: true,
    },

    // Suits
    {
        id: 3,
        name: 'Gala Suit',
        description: 'Formal suit for events',
        pricePerDay: 12,
        active: true,
    },
    {
        id: 4,
        name: 'Tuxedo',
        description: 'Premium black tuxedo',
        pricePerDay: 18,
        active: true,
    },

    // Tents
    {
        id: 5,
        name: 'XL Tent',
        description: 'Outdoor event tent 5x10m',
        pricePerDay: 35,
        active: true,
    },
    {
        id: 6,
        name: 'Medium Tent',
        description: 'Medium-size tent 3x6m',
        pricePerDay: 22,
        active: true,
    },
    {
        id: 7,
        name: 'Small Gazebo',
        description: 'Portable gazebo 3x3m',
        pricePerDay: 10,
        active: true,
    },

    // Speakers
    {
        id: 8,
        name: 'PA Speaker 12"',
        description: '500W powered speaker',
        pricePerDay: 15,
        active: true,
    },
    {
        id: 9,
        name: 'PA Speaker 15"',
        description: '800W powered speaker',
        pricePerDay: 20,
        active: true,
    },

    // Lighting
    {
        id: 10,
        name: 'LED Spotlight',
        description: 'RGB LED spotlight for ambient lighting',
        pricePerDay: 5,
        active: true,
    },
    {
        id: 11,
        name: 'Moving Head Light',
        description: 'Professional moving-head stage light',
        pricePerDay: 25,
        active: true,
    },

    // Chairs & Tables
    {
        id: 12,
        name: 'Folding Chair',
        description: 'Lightweight folding chair for events',
        pricePerDay: 2,
        active: true,
    },
    {
        id: 13,
        name: 'Round Table 150cm',
        description: 'Large round table for 8-10 people',
        pricePerDay: 10,
        active: true,
    },

    // Generators
    {
        id: 14,
        name: 'Electric Generator 3kW',
        description: 'Portable generator for small events',
        pricePerDay: 28,
        active: true,
    },
    {
        id: 15,
        name: 'Electric Generator 6kW',
        description: 'Medium-power generator',
        pricePerDay: 45,
        active: true,
    },

    // Cameras / audiovisual
    {
        id: 16,
        name: '4K Video Camera',
        description: 'High-resolution camera for event recording',
        pricePerDay: 40,
        active: true,
    },
    {
        id: 17,
        name: 'Wireless Microphone Kit',
        description: 'Handheld microphone with receiver',
        pricePerDay: 18,
        active: true,
    },

    // Scaffolding
    {
        id: 18,
        name: 'Small Scaffold Tower',
        description: '2m scaffold tower for assembly staff',
        pricePerDay: 25,
        active: true,
    },
    {
        id: 19,
        name: 'Large Scaffold Tower',
        description: '5m scaffold tower for event construction',
        pricePerDay: 45,
        active: true,
    },

    // Decoration
    {
        id: 20,
        name: 'Red Velvet Rope',
        description: 'VIP rope divider',
        pricePerDay: 3,
        active: true,
    },
    {
        id: 21,
        name: 'Golden Stanchion',
        description: 'Metal stanchion for VIP lanes',
        pricePerDay: 5,
        active: true,
    },

    // More items to reach a large realistic inventory
    {
        id: 22,
        name: 'Portable Bar Counter',
        description: 'Folding bar counter for events',
        pricePerDay: 35,
        active: true,
    },
    {
        id: 23,
        name: 'Outdoor Heater',
        description: 'Gas-powered patio heater',
        pricePerDay: 30,
        active: true,
    },
    {
        id: 24,
        name: 'Fiber Carpet Roll 10m',
        description: 'Event carpet roll for flooring',
        pricePerDay: 12,
        active: true,
    },
    {
        id: 25,
        name: 'LED Wall Panel',
        description: 'Modular LED video wall panel',
        pricePerDay: 50,
        active: true,
    },
];
