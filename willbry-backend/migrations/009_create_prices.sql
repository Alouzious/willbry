CREATE TABLE commodity_prices (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commodity      VARCHAR(100) NOT NULL UNIQUE,
    price_ugx      DOUBLE PRECISION NOT NULL,
    unit           VARCHAR(50) NOT NULL,
    change_percent DOUBLE PRECISION,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO commodity_prices (id, commodity, price_ugx, unit, change_percent) VALUES
(uuid_generate_v4(), 'Irish Potatoes', 800, 'per kg', 2.5),
(uuid_generate_v4(), 'Maize', 1200, 'per kg', -1.2),
(uuid_generate_v4(), 'Coffee (Arabica)', 12000, 'per kg', 5.0),
(uuid_generate_v4(), 'Beans', 3500, 'per kg', 0.8),
(uuid_generate_v4(), 'Sorghum', 900, 'per kg', -0.5),
(uuid_generate_v4(), 'Sweet Potatoes', 600, 'per kg', 1.1);