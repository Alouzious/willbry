CREATE TABLE products (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(255) NOT NULL,
    slug        VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price       DOUBLE PRECISION,
    unit        VARCHAR(50),
    category    VARCHAR(100) NOT NULL,
    image_url   TEXT,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO products (id, name, slug, description, price, unit, category, active) VALUES
(uuid_generate_v4(), 'WillBry SmartCrisps', 'willbry-smartcrisps', 'High-quality potato crisps processed under hygienic, automated systems with consistent crunch and flavor.', 5000, '100g pack', 'food', true),
(uuid_generate_v4(), 'WillBry SmartFlour', 'willbry-smartflour', 'Fortified potato flour enhanced with essential nutrients, ideal for baking, thickening, and export markets.', 15000, '1kg bag', 'food', true),
(uuid_generate_v4(), 'Digital Farming Advisory', 'digital-farming-advisory', 'AI-powered advisory tools, precision farming, and real-time data analytics for smart decision making.', NULL, 'per session', 'service', true),
(uuid_generate_v4(), 'Training & Capacity Building', 'training-capacity-building', 'Capacity building for youth, women, and smallholder farmers in agritech, business incubation, and value addition.', NULL, 'per group', 'service', true);